import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: April 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                1. What are Cookies?
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when
                you visit a website. They are widely used to make websites work
                more efficiently and provide information to the website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                2. How We Use Cookies
              </h2>
              <p className="mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Essential cookies: Necessary for the website to function
                  properly
                </li>
                <li>
                  Preference cookies: Enable the website to remember information
                  that changes how the website behaves or looks
                </li>
                <li>
                  Statistical cookies: Help us understand how visitors interact
                  with the website
                </li>
                <li>
                  Marketing cookies: Used to track visitors across websites to
                  display relevant advertisements
                </li>
                <li>
                  Affiliate tracking cookies: Used to track referrals from our
                  affiliate partners such as Amazon, Lowe&apos;s, and Home Depot
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                3. Third-Party Cookies
              </h2>
              <p className="mb-4">
                We use cookies from the following third parties:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Analytics providers:</strong> Google Analytics to help
                  us understand how our website is being used
                </li>
                <li>
                  <strong>Advertising networks:</strong> Google Ads, Facebook
                  Ads to display relevant advertisements
                </li>
                <li>
                  <strong>Affiliate partners:</strong> Amazon Associates,
                  Lowe&apos;s Affiliate Program, Home Depot Affiliate Program to
                  track referrals and commissions
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. Affiliate Cookie Disclosure
              </h2>
              <p className="mb-4">
                As participants in various affiliate programs, including Amazon
                Associates, Lowe&apos;s Affiliate Program, and Home Depot
                Affiliate Program, our website uses affiliate tracking cookies
                to track user referrals to these merchant websites. These
                cookies allow us to earn commissions on qualifying purchases
                made after clicking on affiliate links from our website.
              </p>
              <p className="mb-4">
                These affiliate cookies are typically set to expire within 24
                hours to 30 days depending on the affiliate program&apos;s
                policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                5. Managing Cookies
              </h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their
                settings. You can typically find these settings in the
                &quot;options&quot; or &quot;preferences&quot; menu of your
                browser. You can:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Delete all cookies</li>
                <li>Block all cookies</li>
                <li>Allow all cookies</li>
                <li>Block third-party cookies</li>
                <li>Clear cookies when you close your browser</li>
              </ul>
              <p className="mb-4">
                Please note that restricting cookies may impact the
                functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                6. Changes to this Cookie Policy
              </h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time. The updated
                version will be effective as soon as it is accessible. We
                encourage you to review this Cookie Policy periodically to stay
                informed about how we use cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Cookie Policy, please contact
                us at: cookies@flipit.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
