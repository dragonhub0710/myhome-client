import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: April 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                1. Agreement to Terms
              </h2>
              <p className="mb-4">
                By accessing or using flipit&apos;s website and services, you
                agree to be bound by these Terms of Service. If you do not agree
                to these Terms, you may not access or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                2. Description of Services
              </h2>
              <p className="mb-4">
                flipit provides home renovation planning, design, and material
                estimation tools. Our services include design automation,
                material takeoff calculations, contractor guidance, cost
                estimation, and product recommendations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                You may need to create an account to use certain features of our
                services. You are responsible for maintaining the
                confidentiality of your account information and for all
                activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. Affiliate Disclosures
              </h2>
              <p className="mb-4">
                This website participates in affiliate programs including Amazon
                Associates, Lowe&apos;s Affiliate Program, and Home Depot
                Affiliate Program. As an affiliate, we earn from qualifying
                purchases when you click on affiliate links at no additional
                cost to you.
              </p>
              <p className="mb-4">
                Product recommendations are based on our professional judgment,
                but we may receive compensation when you purchase through our
                affiliate links.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                5. Intellectual Property
              </h2>
              <p className="mb-4">
                All content, features, and functionality on our website,
                including text, graphics, logos, design, and software, are owned
                by flipit or its licensors and are protected by copyright,
                trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. User Content</h2>
              <p className="mb-4">
                You retain ownership of any content you submit to our services.
                By submitting content, you grant us a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, and display your
                content in connection with our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                7. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the maximum extent permitted by law, flipit shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or relating to your use of our
                services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                8. Changes to Terms
              </h2>
              <p className="mb-4">
                We may modify these Terms at any time. If we make material
                changes, we will notify you by email or by posting a notice on
                our website. Your continued use of our services after such
                modifications will constitute your acceptance of the revised
                Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                9. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us
                at: terms@flipit.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
