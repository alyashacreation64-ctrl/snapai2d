import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult } from '@/types';

const SYSTEM_PROMPT = `Extract actionable info from the screenshot. Return ONLY JSON, no explanation:
{"hasAction":boolean,"actionRequired":string|null,"when":string|null,"date":string|null,"time":string|null,"where":string|null,"amount":string|null,"importantDetails":string|null,"nextStep":string|null,"summary":string|null}
Only include info visible in the image. Set null for missing fields. hasAction=false if no action needed.`;

const MODELS = ['gemini-flash-latest', 'gemini-2.5-flash'];
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

function cleanResult(parsed: Record<string, unknown>): AnalysisResult {
  const getStr = (key: string): string | undefined => {
    const val = parsed[key];
    return val && val !== 'null' ? String(val) : undefined;
  };
  return {
    hasAction: Boolean(parsed.hasAction),
    actionRequired: getStr('actionRequired'),
    when: getStr('when'),
    date: getStr('date'),
    time: getStr('time'),
    where: getStr('where'),
    amount: getStr('amount'),
    importantDetails: getStr('importantDetails'),
    nextStep: getStr('nextStep'),
    summary: getStr('summary'),
  };
}

let cachedClient: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!cachedClient) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('AI service is not configured. Missing API key.');
    }
    cachedClient = new GoogleGenerativeAI(apiKey);
  }
  return cachedClient;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeScreenshot(
  base64Data: string,
  mimeType: string
): Promise<AnalysisResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const modelName = MODELS[attempt % MODELS.length];

    try {
      const model = getClient().getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 400,
          responseMimeType: 'application/json',
        },
      });

      const result = await model.generateContent([
        { text: 'Extract.' },
        { inlineData: { mimeType, data: base64Data } },
      ]);

      const content = result.response.text();

      if (!content) {
        throw new Error('The AI could not process this screenshot. Please try a clearer image.');
      }

      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(content);
      } catch {
        throw new Error('The AI response was not in the expected format. Please try again.');
      }

      return cleanResult(parsed);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  console.error('[Snap2Do] All retry attempts failed:', lastError?.message);

  const msg = lastError?.message ?? '';
  if (msg.includes('503') || msg.includes('high demand') || msg.includes('overloaded')) {
    throw new Error('The AI service is experiencing high demand. Please try again in a moment.');
  }
  throw lastError ?? new Error('We couldn\'t analyze this screenshot. Please try again.');
}
