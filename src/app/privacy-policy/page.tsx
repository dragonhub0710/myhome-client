import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: April 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Privacy Policy explains how flipit (&quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses,
                and safeguards your information when you use our website or
                services. We respect your privacy and are committed to
                protecting your personal data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us, such as
                when you create an account, fill out a form, make a purchase, or
                communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Contact information (name, email address, phone number)</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Home renovation details</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                3. Affiliate Disclosure
              </h2>
              <p className="mb-4">
                This website contains affiliate links to products from Amazon,
                Lowe&apos;s, Home Depot, and other retailers. This means that if
                you click on an affiliate link and purchase the item, we may
                receive a commission at no extra cost to you.
              </p>
              <p className="mb-4">
                We only recommend products that we genuinely believe will be
                valuable to our users. The commissions help support the content
                we create and the services we provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your experience</li>
                <li>
                  Send you technical notices, updates, security alerts, and
                  support messages
                </li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p className="mb-4">We may share information with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers who perform services on our behalf</li>
                <li>
                  Partners with whom we offer co-branded services or joint
                  marketing activities
                </li>
                <li>
                  Affiliate partners including Amazon, Lowe&apos;s, and Home
                  Depot
                </li>
                <li>Third parties in connection with a business transaction</li>
                <li>Law enforcement or other parties when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our
                practices, please contact us at: privacy@flipit.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
