import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: May 24, 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using Phil's Financials ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p className="text-muted-foreground">
              You must be at least 13 years of age to use this App. By creating an account, you confirm that you meet this requirement. If you are under 18, you should review these terms with a parent or guardian.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Educational Purpose Only</h2>
            <p className="text-muted-foreground">
              Phil's Financials is an educational platform designed to teach financial literacy concepts. The content provided is for informational and educational purposes only and does not constitute financial, investment, legal, or tax advice. Always consult a qualified financial professional before making investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Acceptable Use</h2>
            <p className="text-muted-foreground">
              You agree not to: (a) use the App for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the App; (c) upload or transmit harmful, offensive, or inappropriate content; (d) interfere with the App's operation or other users' experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of the App, including but not limited to text, graphics, logos, and software, are the exclusive property of Phil's Financials and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The App is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the App will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, Phil's Financials shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will notify users of significant changes. Your continued use of the App after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms of Service, please contact us through the App.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
