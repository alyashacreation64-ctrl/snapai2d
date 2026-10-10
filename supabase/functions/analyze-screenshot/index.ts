const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisResult {
  hasAction: boolean;
  actionRequired?: string;
  when?: string;
  date?: string;
  time?: string;
  where?: string;
  amount?: string;
  importantDetails?: string;
  nextStep?: string;
  summary?: string;
}

const SYSTEM_PROMPT = `You are Snap2Do AI, an expert screenshot analysis assistant. Your job is to analyze screenshots and extract actionable information.

You must:
1. Identify what the screenshot is about
2. Determine what action is required (if any)
3. Extract important dates, deadlines, times, locations, names, amounts, and instructions
4. Recommend the next step the user should take

CRITICAL RULES:
- Only report information that ACTUALLY EXISTS in the screenshot. Never invent or hallucinate information.
- If you cannot read the screenshot or it's unclear, return hasAction: false.
- If the screenshot does not contain actionable information (e.g., a meme, a generic photo, a wallpaper), return hasAction: false.
- Be concise and specific in your responses.
- Format dates and times as they appear in the screenshot.
- For amounts, include the currency symbol if visible.

Return ONLY valid JSON in this exact format:
{
  "hasAction": boolean,
  "actionRequired": string | null,
  "when": string | null,
  "date": string | null,
  "time": string | null,
  "where": string | null,
  "amount": string | null,
  "importantDetails": string | null,
  "nextStep": string | null,
  "summary": string | null
}

Set fields to null if the information is not present in the screenshot.`;

function cleanResult(parsed: Record<string, unknown>): AnalysisResult {
  const getStr = (key: string): string | undefined => {
    const val = parsed[key];
    return val && val !== "null" ? String(val) : undefined;
  };
  return {
    hasAction: Boolean(parsed.hasAction),
    actionRequired: getStr("actionRequired"),
    when: getStr("when"),
    date: getStr("date"),
    time: getStr("time"),
    where: getStr("where"),
    amount: getStr("amount"),
    importantDetails: getStr("importantDetails"),
    nextStep: getStr("nextStep"),
    summary: getStr("summary"),
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { image, mimeType, apiKey } = await req.json();

    if (!image || typeof image !== "string") {
      return new Response(
        JSON.stringify({ error: "No image provided." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = apiKey || Deno.env.get("GEMINI_API_KEY") || Deno.env.get("VITE_GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "AI service is not yet configured. The site owner needs to add a Gemini API key to enable screenshot analysis.",
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dataUrl = `data:${mimeType || "image/png"};base64,${image}`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Analyze this screenshot and extract all actionable information. Return only valid JSON.",
                },
                {
                  inline_data: {
                    mime_type: mimeType || "image/png",
                    data: image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 800,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text().catch(() => "Unknown error");
      console.error("Gemini API error:", geminiResponse.status, errText);
      return new Response(
        JSON.stringify({
          error: "We couldn't analyze this screenshot. The AI service may be temporarily unavailable. Please try again.",
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const content = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      const finishReason = geminiData?.candidates?.[0]?.finishReason;
      if (finishReason === "SAFETY") {
        return new Response(
          JSON.stringify({
            error: "This image was blocked by safety filters. Please try a different screenshot.",
          }),
          { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({
          error: "The AI could not process this screenshot. Please try a clearer image.",
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({
          error: "The AI response was not in the expected format. Please try again.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clean = cleanResult(parsed);

    return new Response(
      JSON.stringify({ result: clean }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({
        error: "Something went wrong while analyzing your screenshot. Please try again.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
