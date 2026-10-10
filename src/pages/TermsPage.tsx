import { SEO, BASE_URL } from '@/components/SEO';

export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service — Snap2Do AI"
        description="The terms and conditions for using Snap2Do AI, our free AI screenshot analyzer tool. Please read these terms carefully before using the service."
        canonical={`${BASE_URL}/terms`}
        keywords={['snap2do ai terms', 'terms of service', 'AI tool terms']}
      />

      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-sm text-muted mb-8">Last updated: October 10, 2025</p>

          <div className="space-y-6 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Acceptance of Terms</h2>
              <p>
                By using Snap2Do AI, you agree to these Terms of Service. If you do not agree with any part
                of these terms, please do not use the service. Snap2Do AI is a free, no-login-required AI
                screenshot analysis tool provided to you at no cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Description of Service</h2>
              <p>
                Snap2Do AI provides AI-powered screenshot analysis. When you upload a screenshot, the service
                reads the image content and extracts actionable information such as tasks, deadlines, dates,
                times, locations, and amounts. The service returns a structured analysis result that you can
                copy and use in your personal task management systems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">No Account Required</h2>
              <p>
                Snap2Do AI does not require you to create an account, log in, or provide any personal
                information to use the screenshot analysis feature. The service is available to all users
                free of charge.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Acceptable Use</h2>
              <p>You agree to use Snap2Do AI only for lawful purposes. You agree not to:</p>
              <ul className="space-y-2 ml-6 list-disc mt-3">
                <li>Upload screenshots containing illegal, harmful, or malicious content.</li>
                <li>Use the service to attempt to harm, disrupt, or overload the AI processing systems.</li>
                <li>Attempt to reverse engineer, decompile, or otherwise extract the underlying AI models or service internals.</li>
                <li>Use the service in a way that violates any applicable law or regulation.</li>
                <li>Upload screenshots that contain the sensitive personal information of others without their consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">AI Accuracy and Disclaimer</h2>
              <p>
                Snap2Do AI uses artificial intelligence to analyze screenshots. AI analysis is not guaranteed
                to be accurate. Results may contain errors, omissions, or misinterpretations. You are solely
                responsible for verifying any information provided by the service before acting on it. This
                is especially important for payment amounts, deadlines, travel information, appointments,
                addresses, work instructions, and legal or financial information. Please review our
                Disclaimer page for more details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">No Warranty</h2>
              <p>
                Snap2Do AI is provided "as is" and "as available" without any warranties of any kind, either
                express or implied. We do not guarantee that the service will be uninterrupted, error-free,
                or that the analysis results will be accurate or reliable. You use the service at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Snap2Do AI shall not be liable for any direct,
                indirect, incidental, consequential, or special damages arising from your use of the service
                or from any information provided by the service. This includes but is not limited to damages
                resulting from missed deadlines, incorrect payments, travel disruptions, or any other action
                taken based on the AI analysis results.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Data and Privacy</h2>
              <p>
                Your use of the service is also governed by our Privacy Policy, which describes how we handle
                your screenshots and data. By using the service, you consent to the data practices described
                in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Changes to the Service and Terms</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue the service at any time without notice.
                We may also update these Terms of Service from time to time. Continued use of the service after
                changes are posted constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Contact</h2>
              <p>
                If you have questions about these Terms of Service, please use our contact form to reach out.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
