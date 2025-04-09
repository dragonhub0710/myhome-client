import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";

const BathroomDesign = () => {
  // Product data
  const products = [
    {
      id: 1,
      category: "Floor Tile",
      title: "Carrara White Marble Hexagon Mosaic Tile",
      description:
        "Classic hexagon mosaic tiles in genuine Carrara marble that add timeless elegance to any bathroom floor. The natural variation in the stone creates visual interest while maintaining a cohesive look that appeals to a wide range of buyers.",
      pros: [
        "Timeless appeal that won't go out of style",
        "High perceived value to potential buyers",
        "Durable and water-resistant for bathroom use",
        "Works with multiple design styles",
      ],
      cons: [
        "Requires sealing to prevent staining",
        "Higher price point than porcelain alternatives",
        "Installation can be more complex than larger tiles",
      ],
      link: "https://www.lowes.com/pd/SUNWINGS-Carrara-White-11-in-x-12-in-Matte-Composite-Hexagon-Marble-Look-Peel-and-Stick-Wall-Tile-9-35-sq-ft-Carton/5015134557",
    },
    {
      id: 2,
      category: "Wall Tile",
      title: "Subway Ceramic White Glossy Wall Tile",
      description:
        "Classic white subway tiles that create a clean, versatile backdrop for any bathroom style. The bright white finish and glossy texture reflect light, making small bathroom spaces feel larger and more open.",
      pros: [
        "Universally appealing design that attracts most buyers",
        "Extremely cost-effective for flipping projects",
        "Easy to install with minimal waste",
        "Brightens smaller bathroom spaces",
      ],
      cons: [
        "May be considered too common by some high-end buyers",
        "Requires regular grout cleaning",
        "Limited visual interest compared to patterned tiles",
      ],
      link: "https://www.lowes.com/pd/Satori-2-x-8-in-Hudson-Brilliant-White-Glossy-Ceramic-Bullnose-Trim/5014772323",
    },
    {
      id: 3,
      category: "Mirror",
      title: "Modern Frameless Beveled Bathroom Mirror",
      description:
        "Sleek frameless beveled bathroom mirror that adds a touch of contemporary elegance while maximizing the sense of space. The clean lines and beveled edge create visual interest without competing with other design elements.",
      pros: [
        "Maximizes light and sense of space",
        "Works with any design style from traditional to modern",
        "Easy to install with included mounting hardware",
        "Beveled edge adds subtle sophistication",
      ],
      cons: [
        "Requires careful installation to ensure secure mounting",
        "More vulnerable to edge chipping than framed mirrors",
        "May show water spots more readily than framed versions",
      ],
      link: "https://amzn.to/4iTppYt",
    },
    {
      id: 4,
      category: "Light Fixture",
      title: "3-Light Brushed Nickel Vanity Light",
      description:
        "Versatile three-light vanity fixture with a brushed nickel finish and frosted glass shades that provides even, flattering illumination. The transitional design works well with virtually any bathroom style from traditional to contemporary.",
      pros: [
        "Universal appeal that complements various design styles",
        "Provides excellent task lighting for grooming",
        "Durable finish resists corrosion in bathroom environments",
        "Simple installation for DIY flippers",
      ],
      cons: [
        "May require electrical box updates in older homes",
        "Limited wow factor compared to statement fixtures",
        "Standard design may not stand out in listing photos",
      ],
      link: "https://amzn.to/3DZnySR",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Affiliate Disclosure Banner */}
        <div className="bg-accent py-3 px-4 text-center text-sm mb-8">
          <p>
            Disclosure: As an Amazon, Lowe&apos;s, and Home Depot affiliate, I
            earn from qualifying purchases.
          </p>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 mb-16">
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-10">
              How to Design the Perfect Bathroom and My Favorite Materials
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 mb-10">
              Transform your flip property&apos;s bathrooms from dated to
              desirable with these expert design tips and my personally vetted
              material recommendations.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-16 mb-16">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-10">
              Why Bathroom Design Makes or Breaks Your Flip
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              After renovating over 50 properties in the last decade, I&apos;ve
              learned that bathrooms consistently deliver the highest ROI when
              done right. In today&apos;s market, an outdated bathroom can sink
              your profit margins, while a thoughtfully designed one can justify
              a significantly higher asking price.
            </p>
            <p className="text-lg leading-relaxed mb-10">
              The secret to a successful bathroom renovation isn&apos;t spending
              a fortune - it&apos;s making smart material choices that create
              perceived luxury while controlling costs. With the right
              combination of tiles, fixtures, and finishes, you can transform
              even the most dated bathroom into a modern oasis that impresses
              buyers and boosts your bottom line.
            </p>
            <p className="text-lg leading-relaxed mb-16">
              In this guide, I&apos;m sharing my proven formula for designing
              bathrooms that sell properties faster and at higher price points.
              I&apos;ll walk you through each element - from flooring to
              lighting - and share the exact products I use in my own successful
              flips.
            </p>

            <h2 className="text-3xl font-bold mt-20 mb-10">
              The Four Elements of a Perfect Flip Bathroom
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              When renovating a bathroom for maximum ROI, focus on these four
              key elements:
            </p>
            <ol className="list-decimal pl-6 space-y-6 mb-16">
              <li className="text-lg leading-relaxed">
                <strong>Floor tile</strong> that balances durability with style
                appeal
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Wall tile</strong> that creates a clean, spacious feel
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Statement mirror</strong> that expands the perceived
                space
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Quality lighting</strong> that flatters the space and
                its users
              </li>
            </ol>
            <p className="text-lg leading-relaxed mb-16">
              Let&apos;s explore each element and the specific products
              I&apos;ve tested and trust for my own renovation projects.
            </p>

            <h2 className="text-3xl font-bold mt-20 mb-10">
              1. Flooring: The Foundation of Your Bathroom Design
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              Bathroom flooring must balance three crucial factors: water
              resistance, slip resistance, and aesthetic appeal. While vinyl and
              laminate options exist, tile consistently delivers the highest
              perceived value to potential buyers.
            </p>
            <p className="text-lg leading-relaxed mb-10">
              For maximum ROI, I recommend selecting a tile that feels current
              but not trendy. Marble or marble-look tiles in hexagon or
              herringbone patterns create visual interest while maintaining
              broad appeal. Porcelain tiles that mimic natural stone offer
              excellent durability and water resistance at a lower price point
              than genuine stone.
            </p>
            <p className="text-lg leading-relaxed mb-16">
              After testing countless options across dozens of flips, I&apos;ve
              found that medium-sized (2-3 inch) hexagonal tiles in white marble
              or marble-look porcelain consistently photograph well, appeal to
              buyers across demographics, and create a high-end look without
              breaking the budget.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="container mx-auto px-4 py-20 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-20">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-md hover:shadow-lg transition-shadow overflow-hidden mb-16"
                >
                  <div className="p-10">
                    <div className="space-y-8">
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-6 mb-8">
                        {product.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-600 mb-10">
                        {product.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-10 mb-10">
                        <div>
                          <h4 className="font-medium text-lg mb-6">Pros:</h4>
                          <ul className="list-disc pl-6 space-y-4 text-base">
                            {product.pros.map((pro, index) => (
                              <li key={index} className="leading-relaxed">
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-6">Cons:</h4>
                          <ul className="list-disc pl-6 space-y-4 text-base">
                            {product.cons.map((con, index) => (
                              <li key={index} className="leading-relaxed">
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="lg">View Product</Button>
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
        <section className="container mx-auto px-4 py-20 mb-16">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mt-20 mb-10">
              Creating a Cohesive Design That Sells
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              The most successful bathroom renovations create a cohesive look
              where all elements work together harmoniously. When selecting
              materials for your bathroom flip, consider these key principles:
            </p>
            <ul className="list-disc pl-6 space-y-6 mb-16">
              <li className="text-lg leading-relaxed">
                <strong>Stick to a consistent color palette</strong> – I
                recommend whites, light grays, and subtle natural tones as they
                appeal to the widest range of buyers
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Mix textures thoughtfully</strong> – Combine glossy
                tiles with matte flooring or vice versa to create visual
                interest without clashing
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Create one focal point</strong> – Whether it&apos;s a
                statement floor, dramatic mirror, or distinctive lighting, let
                one element shine while keeping other elements more subdued
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Consider scale carefully</strong> – In smaller
                bathrooms, use larger tiles on walls and floors to create the
                illusion of more space
              </li>
            </ul>
            <p className="text-lg leading-relaxed mb-16">
              By following these principles and selecting quality materials that
              offer visual impact without excessive cost, you can create
              bathrooms that significantly increase your property&apos;s market
              value while staying within your renovation budget.
            </p>

            <h2 className="text-3xl font-bold mt-20 mb-10">
              Final Tips for Maximum ROI
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              Before wrapping up, here are a few additional insights I&apos;ve
              gained from years of successful bathroom renovations:
            </p>
            <ul className="list-disc pl-6 space-y-6 mb-16">
              <li className="text-lg leading-relaxed">
                <strong>
                  Always allocate extra budget for unexpected plumbing issues
                </strong>{" "}
                – Water damage behind walls is common and can derail your
                timeline if not addressed
              </li>
              <li className="text-lg leading-relaxed">
                <strong>
                  Invest in professional installation for tile work
                </strong>{" "}
                – Even the most expensive materials look cheap when poorly
                installed
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Don&apos;t skimp on lighting</strong> – Multiple light
                sources create a more luxurious feel and photograph better for
                listings
              </li>
              <li className="text-lg leading-relaxed">
                <strong>Consider adding simple luxury touches</strong> like
                soft-close toilet seats and curved shower rods that cost little
                but enhance the user experience
              </li>
            </ul>
            <p className="text-lg leading-relaxed mb-16">
              Remember that the goal isn&apos;t to create the most expensive
              bathroom possible – it&apos;s to create a space that offers the
              highest perceived value to potential buyers while maintaining
              healthy profit margins for your flip.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-24 bg-accent mt-20 mb-16 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">
              Ready to Transform Your Flip&apos;s Bathrooms?
            </h2>
            <p className="text-xl leading-relaxed mb-12">
              Subscribe to my newsletter for more detailed guides, cost-saving
              tips, and exclusive discounts on the materials I recommend.
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
        <div className="bg-accent py-6 px-4 text-center mt-20">
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

export default BathroomDesign;
