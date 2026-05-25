import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: May 24, 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us when you create an account, including your email address and username. We also collect data about your use of the App, such as lessons completed, quiz scores, streak data, and progress through learning modules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to: (a) provide, maintain, and improve the App; (b) track your learning progress and personalize your experience; (c) communicate with you about your account; (d) ensure the security of the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Data Storage</h2>
            <p className="text-muted-foreground">
              Your data is stored securely using Supabase, a cloud database service. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share aggregate, anonymized data (such as overall usage statistics) that does not identify any individual user. We may disclose information when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our App is intended for users 13 years of age and older. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information promptly. Parents or guardians who believe their child has provided us with personal information should contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. AI Features</h2>
            <p className="text-muted-foreground">
              The "Ask Phil" feature uses third-party AI services to answer your questions. Messages you send to Ask Phil may be processed by these services to generate responses. We do not store these conversations beyond what is needed to provide the service. Do not include sensitive personal or financial information in your messages to Ask Phil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal information. You may delete your account at any time through the App settings. Upon account deletion, your personal data will be removed from our systems within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Cookies and Local Storage</h2>
            <p className="text-muted-foreground">
              The App uses local storage to save your preferences (such as theme settings) and session data. This data is stored on your device and is not transmitted to our servers unless associated with your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy in the App. Your continued use of the App after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us through the App.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
