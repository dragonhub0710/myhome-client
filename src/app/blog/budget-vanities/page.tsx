import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";

const BudgetVanities = () => {
  // Product data
  const products = [
    {
      id: 1,
      store: "Home Depot",
      title:
        "Glacier Bay Stancliff 30.5 in. W Vanity in White with Cultured Marble Vanity Top in White",
      description:
        "This budget-friendly vanity offers a classic Shaker-style design with clean lines and a bright white finish that works in virtually any bathroom. The cultured marble top with integrated sink simplifies installation while providing a clean, seamless look that appeals to buyers looking for no-fuss maintenance.",
      pros: [
        "Pre-assembled cabinet saves installation time",
        "Integrated sink eliminates sealing concerns",
        "Adjustable shelves for flexible storage",
        "Shaker design appeals to most buyers",
      ],
      cons: [
        "MDF construction less durable than solid wood",
        "Limited color options (white only)",
        "Basic hardware may need upgrading",
        "Single-sink design limits utility in master baths",
      ],
      link: "https://www.homedepot.com/p/Glacier-Bay-Everdean-25-in-Single-Sink-Pearl-Gray-Bath-Vanity-with-White-Cultured-Marble-Top-Assembled-EV24P2-PG/311606055",
    },
    {
      id: 2,
      store: "Lowe's",
      title:
        "Allen + Roth Everdene 36-in Gray Oak Single Sink Bathroom Vanity with White Engineered Stone Top",
      description:
        "This mid-range vanity offers exceptional value with its on-trend gray oak finish and engineered stone top. The transitional design bridges modern and traditional elements, making it versatile for various property styles, while the soft-close drawers add a premium touch buyers notice during showings.",
      pros: [
        "Premium-look gray oak finish at budget price",
        "Soft-close drawers and doors add perceived value",
        "Engineered stone top resists stains and water damage",
        "Undermount sink creates upscale appearance",
      ],
      cons: [
        "Requires more assembly than pre-built units",
        "Gray trend may eventually date the bathroom",
        "Lower shelf open storage less desirable than drawers",
        "May be too contemporary for very traditional homes",
      ],
      link: "https://www.lowes.com/collections/allen-roth-Connery-Oak-30-in-Vanity-and-Faucet-Bundle/GR_15809",
    },
    {
      id: 3,
      store: "Home Depot",
      title:
        "Home Decorators Collection Ashburn 24 in. W x 21.75 in. D Vanity in White with Marble Vanity Top in Carrara White",
      description:
        "This compact vanity delivers surprising style with its genuine Carrara marble top and elegant white cabinet design, making it perfect for guest bathrooms and powder rooms. The traditional styling appeals to a wide range of buyers while the genuine stone top creates an upscale impression that helps sell properties faster.",
      pros: [
        "Real Carrara marble top adds luxury appeal",
        "Perfect size for small bathrooms or powder rooms",
        "Traditional design with broad market appeal",
        "Fully assembled for quick installation",
      ],
      cons: [
        "Marble requires sealing and maintenance",
        "Limited storage in smaller size",
        "White shows dirt more readily during showings",
        "Basic included hardware may need upgrading",
      ],
      link: "https://www.homedepot.com/p/Home-Decorators-Collection-Gazette-24-in-W-x-21-75-in-D-x-34-in-H-Bath-Vanity-Cabinet-without-Top-in-White-GAWA2422/203284675",
    },
    {
      id: 4,
      store: "Lowe's",
      title:
        "Style Selections Ellenbee 48-in White Double Sink Bathroom Vanity with White Cultured Marble Top",
      description:
        "This double-sink vanity delivers maximum impact in master bathrooms at a remarkably budget-friendly price point. The traditional white design with satin nickel hardware creates a classic look that appeals to the widest range of buyers, while the double sink configuration is a must-have feature in primary bathroom renovations.",
      pros: [
        "Double sink configuration ideal for master baths",
        "Wide countertop area provides ample space",
        "Six functional drawers offer generous storage",
        "White finish works with any color scheme",
      ],
      cons: [
        "Cultured marble less premium than natural stone",
        "Particleboard construction less durable long-term",
        "Basic included faucets may need upgrading",
        "Heavy unit requires two-person installation",
      ],
      link: "https://www.lowes.com/pd/Wyndham-Collection-Avery-48-Inch-Double-Bathroom-Vanity-in-White-White-Cultured-Marble-Countertop-Undermount-Square-Sinks-46-Inch-Mirror/5013256993",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Affiliate Disclosure Banner */}
        <div className="bg-accent py-3 px-4 text-center text-sm mb-8">
          <p>
            Disclosure: As an Amazon, Lowe&apos;s, and Home Depot affiliate, I
            earn from qualifying purchases.
          </p>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-12 mb-16">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Budget-Friendly Vanities for Quick Bathroom Flips
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              Lowe&apos;s vs. Home Depot
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover which big-box store offers the best value for
              high-impact, low-cost bathroom vanities that help maximize your
              flip profits.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="max-w-3xl mx-auto prose">
            <h2 className="text-3xl font-bold mb-8">
              Why Vanities Make or Break Your Bathroom Budget
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              After renovating dozens of properties, I&apos;ve learned that
              bathroom vanities represent one of the most significant
              opportunities to control costs while still delivering the
              &quot;wow factor&quot; buyers expect. A strategically chosen
              vanity can anchor your bathroom design and create a luxurious
              impression without breaking your renovation budget.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              The two major home improvement retailers—Lowe&apos;s and Home
              Depot—offer remarkably different vanity selections at similar
              price points. Understanding the strengths and weaknesses of each
              store&apos;s offerings can help you make smarter purchasing
              decisions that directly impact your flip&apos;s profitability.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              In this real-world comparison, I&apos;ll share my experience with
              specific models from both retailers that offer exceptional value
              for flippers. I&apos;ve personally installed these units in
              successful flip projects and can vouch for their quality,
              appearance, and buyer appeal.
            </p>

            <h2 className="text-3xl font-bold mt-16 mb-8">
              What Makes a Vanity &quot;Flip-Worthy&quot;?
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Before diving into specific recommendations, let&apos;s establish
              what makes a vanity ideal for fix-and-flip projects:
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-12">
              <li className="text-lg leading-relaxed">
                <strong>Value perception</strong> - It should look more
                expensive than it actually is
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Universal appeal</strong> - Avoid highly specific styles
                that limit buyer interest
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Ease of installation</strong> - Time is money in
                flipping; complex installations cut into profits
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Durability</strong> - It must hold up through showings
                and inspections
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Availability</strong> - Stock items that won&apos;t
                cause project delays
              </li>
            </ul>
            <p className="text-lg leading-relaxed mb-12">
              With these criteria in mind, let&apos;s examine the best options
              from each retailer.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-md hover:shadow-lg transition-shadow overflow-hidden mb-12"
                >
                  <div className="p-8">
                    <div className="space-y-6">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {product.store}
                      </span>
                      <h3 className="text-xl font-bold mt-4">
                        {product.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-600">
                        {product.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-8 mt-8">
                        <div>
                          <h4 className="font-medium mb-4">Pros:</h4>
                          <ul className="list-disc pl-5 space-y-3 text-base">
                            {product.pros.map((pro, index) => (
                              <li key={index} className="leading-relaxed">
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-4">Cons:</h4>
                          <ul className="list-disc pl-5 space-y-3 text-base">
                            {product.cons.map((con, index) => (
                              <li key={index} className="leading-relaxed">
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>View Product</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* More Content */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="max-w-3xl mx-auto prose">
            <h2 className="text-3xl font-bold mt-16 mb-8">
              Lowe&apos;s vs. Home Depot: The Verdict
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              After installing dozens of vanities from both retailers across
              multiple flips, I&apos;ve developed some clear insights about
              which store offers better options for different situations:
            </p>
            <h3 className="text-2xl font-bold mt-12 mb-6">
              When Home Depot Wins:
            </h3>
            <ul className="list-disc pl-6 space-y-4 mb-10">
              <li className="text-lg leading-relaxed">
                <strong>Pre-assembled units</strong> – Home Depot generally
                offers more fully assembled options, saving valuable
                installation time
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Traditional styling</strong> – Their selection excels in
                classic designs with broad appeal
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Compact options</strong> – They offer better selection
                for small bathrooms and powder rooms
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Stone top quality</strong> – Their cultured and natural
                stone tops typically have better veining and finish
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              When Lowe&apos;s Wins:
            </h3>
            <ul className="list-disc pl-6 space-y-4 mb-10">
              <li className="text-lg leading-relaxed">
                <strong>Contemporary options</strong> – Better selection of
                modern and transitional designs
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Hardware quality</strong> – Drawer slides and hinges
                tend to be sturdier
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Larger vanities</strong> – More options in the 48&quot;+
                range for master bathrooms
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Sales frequency</strong> – More consistent discounting
                makes planning easier
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-16 mb-8">
              Money-Saving Tips When Purchasing Vanities
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Regardless of which retailer you choose, these strategies can help
              you maximize your vanity budget:
            </p>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              <li className="text-lg leading-relaxed">
                <strong>Buy floor models</strong> – Ask managers about display
                units, which often sell at 30-50% discounts
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Purchase during holiday sales</strong> – Memorial Day,
                Labor Day, and Black Friday typically offer the deepest
                discounts
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Consider open-box returns</strong> – Inspect carefully,
                but these can offer significant savings
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Bundle with other purchases</strong> – Both retailers
                offer contractor discounts for larger orders
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Upgrade only the visible elements</strong> – Replace
                basic knobs with premium hardware while keeping the
                cost-effective vanity base
              </li>
            </ol>

            <h2 className="text-3xl font-bold mt-16 mb-8">
              Installation Tips for Flippers
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Once you&apos;ve selected the perfect budget-friendly vanity,
              these installation tips will help ensure professional results:
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-12">
              <li className="text-lg leading-relaxed">
                Always check and reinforce wall studs before mounting –
                especially for floating vanities
              </li>
              <li className="text-lg leading-relaxed">
                Use silicone caulk color-matched to your countertop for a
                seamless look
              </li>
              <li className="text-lg leading-relaxed">
                Install vanities before flooring when possible to save on
                material costs
              </li>
              <li className="text-lg leading-relaxed">
                Consider upgrading to soft-close hinges if not included – buyers
                notice these details
              </li>
              <li className="text-lg leading-relaxed">
                Take time to properly level the unit – uneven vanities
                immediately signal amateur work
              </li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-20 bg-accent mt-16 mb-16 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Save on Your Next Flip?
            </h2>
            <p className="text-xl leading-relaxed mb-10">
              Join my email list for weekly alerts on home improvement store
              sales, special buys, and exclusive discounts for real estate
              investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg">Subscribe</Button>
            </div>
          </div>
        </section>

        {/* Affiliate Disclosure (Bottom) */}
        <div className="bg-accent py-6 px-4 text-center mt-16">
          <p className="text-base max-w-3xl mx-auto">
            Disclosure: As an Amazon, Lowe&apos;s, and Home Depot affiliate, I
            earn from qualifying purchases. This means I receive a small
            commission when you buy products through links on this page, at no
            extra cost to you.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetVanities;
