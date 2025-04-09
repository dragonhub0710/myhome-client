import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";

const FastUpgrades = () => {
  // Product data
  const products = [
    {
      id: 1,
      category: "Light Fixtures",
      title: "Modern Farmhouse 5-Light Kitchen Island Pendant",
      description:
        "This statement chandelier combines industrial black metal with clear glass shades, creating dramatic impact over kitchen islands, dining areas, or entryways. The adjustable height makes it versatile for various ceiling heights, while the modern farmhouse aesthetic appeals to today's buyers.",
      pros: [
        "Creates instant visual impact in listing photos",
        "Appeals to current modern farmhouse trend",
        "Adjustable hanging height for various spaces",
        "Relatively simple electrical installation",
      ],
      cons: [
        "Style may eventually date as trends change",
        "Requires proper junction box support for weight",
        "May need professional installation in older homes",
        "Clear glass shades require regular cleaning",
      ],
      link: "https://amzn.to/4j5OjnY",
    },
    {
      id: 2,
      category: "Plumbing Fixtures",
      title: "Brushed Gold Single-Handle Pull-Down Kitchen Faucet",
      description:
        "This eye-catching brushed gold kitchen faucet combines practicality with luxury appeal. The pull-down sprayer and single-handle design offer convenience, while the warm gold finish creates a high-end look that instantly elevates kitchen renovations without requiring major structural changes.",
      pros: [
        "Upscale finish that signals luxury to buyers",
        "Universal single-hole mounting fits most sinks",
        "Pull-down functionality appeals to home chefs",
        "Quick installation (typically under 30 minutes)",
      ],
      cons: [
        "Bold finish may not appeal to all buyers",
        "Requires consistent hardware finishes elsewhere",
        "Shows water spots more than brushed nickel",
        "May highlight dated elements in an older kitchen",
      ],
      link: "https://amzn.to/4jevRZG",
    },
    {
      id: 3,
      category: "Wallpaper",
      title: "Peel and Stick Geometric Hexagon Wallpaper",
      description:
        "This removable wallpaper creates instant drama in accent walls, bathroom vanity areas, or behind shelving. The subtle geometric pattern adds texture and interest without overwhelming the space, while the peel-and-stick application makes it ideal for quick transformations in rental properties or flips.",
      pros: [
        "Creates dramatic visual interest in hours",
        "Removable nature appeals to hesitant buyers",
        "No paste or water needed for installation",
        "Can cover minor wall imperfections",
      ],
      cons: [
        "Requires careful pattern matching during installation",
        "May not adhere well to textured walls",
        "Higher cost per square foot than paint",
        "Can be challenging to remove from improperly prepared surfaces",
      ],
      link: "https://amzn.to/4lgRL0x",
    },
    {
      id: 4,
      category: "Door Knobs",
      title: "Matte Black Square Lever Door Handles (5-pack)",
      description:
        "These contemporary square lever handles in matte black instantly modernize interior doors. The sleek design and smooth operation create a high-end tactile experience that subtly signals quality to potential buyers, while the bulk pack pricing keeps costs manageable across multiple doors.",
      pros: [
        "Simple installation with basic screwdriver",
        "Consistent style throughout the home",
        "Universal fit for standard door preparations",
        "Matte finish hides fingerprints and smudges",
      ],
      cons: [
        "May highlight older or misaligned doors",
        "Requires consistent hardware finishes house-wide",
        "Lever style not ideal for homes with small children",
        "May require slight adjustments to strike plates",
      ],
      link: "https://amzn.to/4iToRSp",
    },
    {
      id: 5,
      category: "Cabinet Hardware",
      title: "Brushed Brass Cabinet Pulls and Knobs Set",
      description:
        "This comprehensive cabinet hardware set includes both pulls and knobs in a modern brushed brass finish. The warm metallic tone adds instant sophistication to kitchen and bathroom cabinets, while the bulk set pricing makes it economical to update all cabinetry for a cohesive look.",
      pros: [
        "Dramatic before/after transformation for minimal cost",
        "Creates cohesive look throughout cabinets",
        "Simple 15-minute installation per piece",
        "Works with existing cabinet construction",
      ],
      cons: [
        "Reveals cabinet imperfections if not properly installed",
        "Requires precise measurement for consistent placement",
        "May necessitate filling old hardware holes",
        "Trends in hardware finishes change frequently",
      ],
      link: "https://amzn.to/4lmvpuj",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Affiliate Disclosure Banner */}
        <div className="bg-accent py-2 px-4 text-center text-sm">
          <p>
            Disclosure: As an Amazon, Lowe&apos;s, and Home Depot affiliate, I
            earn from qualifying purchases.
          </p>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-8">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              5 Fast Upgrades That Add $10K+ in Perceived Value to a Flip
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              These high-impact, low-effort improvements create immediate visual
              appeal and justify higher listing prices without breaking your
              renovation budget.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto prose">
            <h2>The Secret to Profitable Flips: Strategic Upgrades</h2>
            <p>
              After flipping over 75 properties in the last decade, I&apos;ve
              discovered that buyers consistently overestimate the value of
              certain visual upgrades. While major renovations like kitchens and
              bathrooms certainly matter, there are several quick, relatively
              inexpensive improvements that create outsized returns on
              investment.
            </p>
            <p>
              These strategic upgrades work because they target what I call
              &quot;buyer perception points&quot; – the visual elements that
              create strong first impressions during showings. When buyers
              perceive high quality in these visible areas, they subconsciously
              assume the same quality extends to less visible aspects of the
              home.
            </p>
            <p>
              The five upgrades I&apos;m sharing below can be completed in a
              single weekend, often for under $1,000 total, yet can help justify
              $10,000+ in additional asking price when executed properly.
              I&apos;ve tested these strategies across different markets and
              property types with consistent results.
            </p>

            <h2>Why These Specific Upgrades Work</h2>
            <p>
              The most effective quick upgrades share these key characteristics:
            </p>
            <ul>
              <li>
                <strong>High visibility</strong> during showings and in listing
                photos
              </li>
              <li>
                <strong>Low installation complexity</strong> requiring minimal
                specialized skills
              </li>
              <li>
                <strong>Dramatic before/after contrast</strong> that&apos;s
                immediately noticeable
              </li>
              <li>
                <strong>Current design appeal</strong> that aligns with buyer
                preferences
              </li>
              <li>
                <strong>Quality signaling</strong> that suggests overall
                property excellence
              </li>
            </ul>
            <p>
              Let&apos;s examine the five specific upgrades that best meet these
              criteria and deliver exceptional ROI for flippers.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="space-y-4">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Pros:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {product.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Cons:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {product.cons.map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4">
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
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto prose">
            <h2>Implementation Tips for Maximum Impact</h2>
            <p>
              To maximize the value perception from these upgrades, follow these
              implementation strategies:
            </p>

            <h3>Create Cohesive Design Themes</h3>
            <p>
              When selecting finishes, maintain consistency throughout the
              property. If you choose brushed gold for kitchen faucets, for
              example, echo that finish in nearby lighting, cabinet hardware,
              and even switch plates. This cohesion signals intentional design
              rather than piecemeal renovation.
            </p>

            <h3>Focus on Entry Points and Sight Lines</h3>
            <p>
              Prioritize upgrades in areas immediately visible upon entering
              spaces. The entry door hardware, foyer light fixture, and kitchen
              elements visible from the front door create critical first
              impressions that set expectations for the entire property.
            </p>

            <h3>Highlight Upgrades in Listing Materials</h3>
            <p>
              Ensure your listing photos, descriptions, and agent talking points
              specifically highlight these upgrades. Phrases like &quot;designer
              light fixtures,&quot; &quot;premium plumbing fixtures,&quot; and
              &quot;custom hardware throughout&quot; help justify higher pricing
              and attract quality buyers.
            </p>

            <h3>Combine With Strategic Painting</h3>
            <p>
              Pair these hardware and fixture upgrades with strategic painting
              for maximum impact. Fresh, neutral wall colors create a blank
              canvas that makes your upgraded elements stand out even more
              dramatically during showings.
            </p>

            <h2>Timing These Upgrades During Your Flip</h2>
            <p>
              For maximum efficiency, schedule these upgrades at specific points
              in your renovation timeline:
            </p>
            <ul>
              <li>
                <strong>Light fixtures:</strong> Install after painting but
                before final cleaning
              </li>
              <li>
                <strong>Plumbing fixtures:</strong> Install after countertops
                but before staging photos
              </li>
              <li>
                <strong>Wallpaper:</strong> Apply after painting adjacent walls
                but before installing nearby fixtures
              </li>
              <li>
                <strong>Door hardware:</strong> Install after doors are painted
                and rehung
              </li>
              <li>
                <strong>Cabinet hardware:</strong> Install after cabinet
                painting/refacing but before final cleaning
              </li>
            </ul>
            <p>
              By scheduling these upgrades strategically, you can minimize
              potential damage to your newly installed high-impact elements
              while maximizing their visual effect in a freshly renovated space.
            </p>

            <h2>The Bottom Line: ROI Calculation</h2>
            <p>
              Let&apos;s break down the typical cost-to-value ratio of these
              five upgrades based on my real-world experience across dozens of
              flips:
            </p>
            <ul>
              <li>
                <strong>Statement light fixtures:</strong> $200-400 investment →
                $1,500-3,000 perceived value increase
              </li>
              <li>
                <strong>Premium plumbing fixtures:</strong> $250-500 investment
                → $2,000-4,000 perceived value increase
              </li>
              <li>
                <strong>Accent wallpaper:</strong> $100-300 investment →
                $1,000-2,000 perceived value increase
              </li>
              <li>
                <strong>Quality door hardware:</strong> $150-300 investment →
                $1,000-2,000 perceived value increase
              </li>
              <li>
                <strong>Coordinated cabinet hardware:</strong> $100-250
                investment → $1,500-3,000 perceived value increase
              </li>
            </ul>
            <p>
              Total investment: $800-1,750
              <br />
              Total perceived value increase: $7,000-14,000
            </p>
            <p>
              This represents an impressive 700-800% return on your investment,
              making these upgrades some of the most profitable improvements you
              can make to a flip property.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16 bg-accent mt-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Maximize Your Flip Profits?
            </h2>
            <p className="text-lg mb-8">
              Subscribe to my weekly newsletter for more insider tips,
              step-by-step renovation guides, and exclusive discounts on my
              recommended products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>

        {/* Affiliate Disclosure (Bottom) */}
        <div className="bg-accent py-4 px-4 text-center mt-12">
          <p className="text-sm max-w-3xl mx-auto">
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

export default FastUpgrades;
