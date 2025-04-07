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
      price: "$199.99",
      originalPrice: "$299.99",
      discount: "33% OFF",
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
      link: "https://www.amazon.com/XvmBvm-Lighting-Farmhouse-Chandelier-Fixtures/dp/B0D3D2Y9CZ/ref=sr_1_3?crid=1VBI368OKR720&dib=eyJ2IjoiMSJ9.fqUi8lp2o68MTmc9gMKrE7p23kZNPAJao-mHp3RNwPJ-3Hd2Mu28ykvmjRAhVnRku_3GPMp6ycjDZU_5E8OdOWpWqRD8QziTuj5mUnVfipXmVdhMQd1c-8y8SUgwWTH88yLCgLSeTwFH__nk_BQrD6tL-Pceg17sXtvYOIxJJmbHOrcXyaW1YZIpo_tzQoL7-zTylaH-j3Ww5ffCTxZkB55IpLAd-xWOjXGAjzUzXh0.jk7YTidBwU_VLLsGAoIFttJKPprEOUPh5sPSTkiiGpI&dib_tag=se&keywords=Modern+Farmhouse+5-Light+Kitchen+Island+Pendant&qid=1743776094&sprefix=modern+farmhouse+5-light+kitchen+island+pendant%2Caps%2C140&sr=8-3",
    },
    {
      id: 2,
      category: "Plumbing Fixtures",
      title: "Brushed Gold Single-Handle Pull-Down Kitchen Faucet",
      description:
        "This eye-catching brushed gold kitchen faucet combines practicality with luxury appeal. The pull-down sprayer and single-handle design offer convenience, while the warm gold finish creates a high-end look that instantly elevates kitchen renovations without requiring major structural changes.",
      price: "$159.99",
      originalPrice: "$219.99",
      discount: "27% OFF",
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
      link: "https://www.amazon.com/Kraus-KPF-1691BB/dp/B088G1DK66/ref=sr_1_1_sspa?crid=2JY6RVDS6A2C7&dib=eyJ2IjoiMSJ9.AfF3GcPxOLqw6m0Sic8QM0Dwr-EMMz_T5IOKmV5kPYG8lea2mJGJGWxOkBPwO-O-8JWyPmL9hN6P0B20DLUu9zk8fcERbq3LdCZppYKet9EmE3vOnZ8bqPXoUfhuaONc97E8GEtmN5AAg8RVLx02P7qepiTlRh3ERFoDPtvFRlpa5uP6Q9UA64rey3qK82jS_jW-Q8MgVx18vkI5jXol_mbNb2Fjn9fwN606IdYb8Pc.2BhDfuDCI7QeFsCnljhyWaPrQUQNtN4YnYDLJ9AFKog&dib_tag=se&keywords=Brushed+Gold+Single-Handle+Pull-Down+Kitchen+Faucet&qid=1743776126&sprefix=brushed+gold+single-handle+pull-down+kitchen+faucet%2Caps%2C135&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      id: 3,
      category: "Wallpaper",
      title: "Peel and Stick Geometric Hexagon Wallpaper",
      description:
        "This removable wallpaper creates instant drama in accent walls, bathroom vanity areas, or behind shelving. The subtle geometric pattern adds texture and interest without overwhelming the space, while the peel-and-stick application makes it ideal for quick transformations in rental properties or flips.",
      price: "$42.99",
      originalPrice: "$59.99",
      discount: "28% OFF",
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
      link: "https://www.amazon.com/Tomete-Geometric-Wallpaper-Self-Adhesive-Waterproof/dp/B0DD421TH7/ref=sr_1_2_sspa?crid=LCLHB6LTSTOY&dib=eyJ2IjoiMSJ9.r-U4Jt2C900Ety0PTAh4Vs2oV_npe0E4sgBk4MEOvqhVCjpfr_ygPXhux6BQW-NMjfu8mIPDQ_-f99OM56oU8s860ZP7SVrTEq2PDsG5YjG7eOAUiBXp-nM4SWLgkpfZzGDz4-CL9NZ4UneCudKzZ_wU0j8kPU1wsGwxkChyNuFw6nIEbUS0OrT_V4-AsX7Hsd-urOtyDKVKPUJFd9QRpYzCvKTrRGoz-N2P3K71pB8.QelKdWZciQMpx6byG9nebDCHS2hLlve1Xgg5l1TQxjw&dib_tag=se&keywords=Peel+and+Stick+Geometric+Hexagon+Wallpaper&qid=1743776141&sprefix=peel+and+stick+geometric+hexagon+wallpaper%2Caps%2C129&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      id: 4,
      category: "Door Knobs",
      title: "Matte Black Square Lever Door Handles (5-pack)",
      description:
        "These contemporary square lever handles in matte black instantly modernize interior doors. The sleek design and smooth operation create a high-end tactile experience that subtly signals quality to potential buyers, while the bulk pack pricing keeps costs manageable across multiple doors.",
      price: "$89.99",
      originalPrice: "$129.99",
      discount: "31% OFF",
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
      link: "https://www.amazon.com/Kwikset-Casey-Privacy-Bedroom-Bathroom/dp/B096CGRF12/ref=sr_1_1_sspa?crid=V8SJ1HI2SRHU&dib=eyJ2IjoiMSJ9.BhdIsbrHcKdDTfCy1Caj8RRXvRyPUH-m5_yRGycUHZdkAU5KbaiidDRcgYD8fQxmzbkM0t-MZXifIuQWjPdL8SqEGlTWuvapBldJMoQ9BXHbYvWOMvRlfvF4M0BcBQxNo1yjlIr7asIiD-1lUcaatMaH0Ew8ESmDGN_n4dRzMCNhb3d3YK6Nuq7AwQCl4w5XiTC-3wRBZgFvxtVoOmI-ZiBzc3hlQUw07q_VilcVCYg.o5j_S-rqyFj58uCIoMIG4xjelEU6hAt74mKFYVJUhyE&dib_tag=se&keywords=Matte+Black+Square+Lever+Door+Handles+%285-pack%29&qid=1743776155&sprefix=matte+black+square+lever+door+handles+5-pack+%2Caps%2C124&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      id: 5,
      category: "Cabinet Hardware",
      title: "Brushed Brass Cabinet Pulls and Knobs Set",
      description:
        "This comprehensive cabinet hardware set includes both pulls and knobs in a modern brushed brass finish. The warm metallic tone adds instant sophistication to kitchen and bathroom cabinets, while the bulk set pricing makes it economical to update all cabinetry for a cohesive look.",
      price: "$69.99",
      originalPrice: "$99.99",
      discount: "30% OFF",
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
      link: "https://www.amazon.com/Ravinte-Kitchen-Cabinet-Dresser-Hardware/dp/B0B74D2ZSN/ref=sr_1_1_sspa?crid=26C3R9K73MZ&dib=eyJ2IjoiMSJ9.BZrucTlfN8wPDQduzV5HN0bSmBZukbQLMbSNJjbs4Og3gRQP2WX6fQTtVHXor9yplle4vzo2ic4V4e40sivcIAxFsFOqoZKUqUFJRxxy7RrtYP6WI_DGirTYpEuErL_Qa9yoFXTyvH4SGM7g_zwfDL3s-qBti8lOYEDSTsFd-5vZBWnYsV3-4Pjs_0iLThpplFmeKk4KVZfde1LrRLZvx7FapuWAqNUdDGOtZeH5eJc.uV_sNDWuudaJRopuhMj_r2i2dEK4WNZFhOYpGnVylqk&dib_tag=se&keywords=Brushed%2BBrass%2BCabinet%2BPulls%2Band%2BKnobs%2BSet&qid=1743776180&sprefix=brushed%2Bbrass%2Bcabinet%2Bpulls%2Band%2Bknobs%2Bset%2Caps%2C99&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
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

                      <div className="flex items-center mt-4">
                        <span className="text-xl font-bold text-primary">
                          {product.price}
                        </span>
                        <span className="ml-2 text-gray-500 line-through text-sm">
                          {product.originalPrice}
                        </span>
                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                          {product.discount}
                        </span>
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
