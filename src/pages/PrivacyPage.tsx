import { SEO, BASE_URL } from '@/components/SEO';

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy — Snap2Do AI"
        description="Learn how Snap2Do AI handles your screenshots and data. We do not permanently store uploaded images, and your screenshots are never publicly accessible."
        canonical={`${BASE_URL}/privacy`}
        keywords={['snap2do ai privacy policy', 'screenshot privacy', 'AI data handling']}
        noindex
      />

      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted mb-8">Last updated: October 10, 2025</p>

          <div className="space-y-6 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Overview</h2>
              <p>
                Snap2Do AI is a free, no-login-required AI screenshot analysis tool. We are committed to
                being transparent about how your data is handled. This privacy policy explains what happens
                when you upload a screenshot to our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Screenshot Processing</h2>
              <p>
                When you upload a screenshot to Snap2Do AI, the image is sent securely from your browser to
                our server-side AI processing service. The AI analyzes the image content to extract actionable
                information such as tasks, deadlines, dates, times, locations, and amounts. The analysis result
                is then returned to your browser and displayed on screen.
              </p>
              <p className="mt-3">
                The screenshot image data is transmitted over an encrypted connection. The AI processing is
                performed by a third-party AI service provider that processes the image temporarily to generate
                the analysis. We do not retain copies of your uploaded screenshots in our own database.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">What We Do Not Do</h2>
              <ul className="space-y-2 ml-6 list-disc">
                <li>We do not require you to create an account or log in to use the tool.</li>
                <li>We do not permanently store your uploaded screenshots.</li>
                <li>We do not make your screenshots publicly accessible.</li>
                <li>We do not share your screenshots with third parties for advertising purposes.</li>
                <li>We do not sell your data or screenshot content.</li>
                <li>We do not use your screenshots to train AI models.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Contact Form Submissions</h2>
              <p>
                If you submit a message through our contact form, we collect the name, email, and message
                you provide. This information is stored securely in our database and is used solely to respond
                to your inquiry. We do not share your contact information with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Third-Party AI Service</h2>
              <p>
                Snap2Do AI uses a third-party AI service provider to analyze screenshots. When you upload a
                screenshot, the image data is sent to this service for processing. The service processes the
                image temporarily and does not retain it after generating the analysis result. We recommend
                reviewing the AI service provider's privacy policy for additional information about their
                data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Cookies and Local Storage</h2>
              <p>
                Snap2Do AI uses local storage to save your theme preference (dark mode or light mode).
                We do not use tracking cookies, advertising cookies, or analytics cookies. No information
                stored in your browser is sent to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Your Responsibility</h2>
              <p>
                You are responsible for the content of the screenshots you upload. Please do not upload
                screenshots containing sensitive personal information such as Social Security numbers, full
                credit card numbers, medical records, or other highly confidential data. While we take steps
                to protect your data, no system is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Children's Privacy</h2>
              <p>
                Snap2Do AI is not directed at children under the age of 13. We do not knowingly collect
                personal information from children. If you believe a child has provided us with personal
                information, please contact us so we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices or
                for legal reasons. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-foreground">Contact Us</h2>
              <p>
                If you have questions about this privacy policy or how your data is handled, please use our
                contact form to reach out. We are happy to answer any questions you may have.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
