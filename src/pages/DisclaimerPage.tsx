import { SEO, BASE_URL } from '@/components/SEO';

export function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Disclaimer — Snap2Do AI"
        description="AI results from Snap2Do AI may contain errors. Always verify important payments, deadlines, travel information, appointments, addresses, and work instructions before acting."
        canonical={`${BASE_URL}/disclaimer`}
        keywords={['snap2do ai disclaimer', 'AI accuracy disclaimer', 'screenshot analysis disclaimer']}
      />

      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
          <p className="text-sm text-muted mb-8">Last updated: October 10, 2025</p>

          <div className="space-y-6 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">AI Results May Contain Errors</h2>
              <p>
                Snap2Do AI uses artificial intelligence to analyze screenshots and extract actionable information.
                While the AI is highly capable, it is not perfect. Results may contain errors, omissions, or
                misinterpretations. The AI may misread text, confuse dates, misidentify amounts, or fail to
                detect important information. You should always treat AI-generated results as a starting point
                that needs human verification, not as a definitive or authoritative source.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Information You Must Verify</h2>
              <p>Before acting on any information provided by Snap2Do AI, you should independently verify:</p>
              <ul className="space-y-2 ml-6 list-disc mt-3">
                <li><strong>Payment amounts:</strong> Always double-check bill amounts, due dates, and account numbers before making a payment.</li>
                <li><strong>Deadlines:</strong> Verify all deadlines and due dates against the original source to ensure you do not miss critical timing.</li>
                <li><strong>Travel information:</strong> Confirm flight times, check-in windows, gate numbers, and booking details with the airline or travel provider.</li>
                <li><strong>Appointments:</strong> Verify appointment dates, times, and locations with the relevant provider.</li>
                <li><strong>Addresses:</strong> Confirm addresses and locations before traveling to a job site or appointment.</li>
                <li><strong>Work instructions:</strong> If you are a contractor, verify job details, materials, and instructions with your customer before starting work.</li>
                <li><strong>Legal or financial information:</strong> Never rely solely on AI-extracted information for legal or financial decisions. Consult a qualified professional.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">No Professional Advice</h2>
              <p>
                The information provided by Snap2Do AI is for general informational and productivity purposes
                only. It is not intended to constitute legal, financial, medical, or any other type of
                professional advice. You should not rely on AI-extracted information as a substitute for
                professional advice in any important matter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Screenshots May Be Unclear</h2>
              <p>
                The accuracy of the AI analysis depends on the quality of the uploaded screenshot. Blurry,
                low-resolution, or partially cropped images may result in less accurate analysis. If the AI
                reports "No Action Required" or provides unclear results, try uploading a clearer or more
                complete version of the screenshot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Your Responsibility</h2>
              <p>
                You are solely responsible for any actions you take based on the information provided by
                Snap2Do AI. Snap2Do AI is not responsible for any consequences — including but not limited to
                missed payments, missed deadlines, travel disruptions, missed appointments, or incorrect work
                performed — that result from reliance on AI-generated analysis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Use at Your Own Risk</h2>
              <p>
                By using Snap2Do AI, you acknowledge that you understand the limitations of AI analysis and
                accept the risks associated with relying on AI-generated information. You agree to verify
                important details independently before taking action.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
