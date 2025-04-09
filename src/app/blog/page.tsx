import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const BlogIndex = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Design the Perfect Bathroom and My Favorite Materials",
      description:
        "Transform your flip property's bathrooms from dated to desirable with these expert design tips and my personally vetted material recommendations.",
      slug: "/blog/bathroom-design",
      date: "April 1, 2024",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      title: "Best Budget-Friendly Vanities for Quick Bathroom Flips",
      description:
        "Discover which big-box store offers the best value for high-impact, low-cost bathroom vanities that help maximize your flip profits.",
      slug: "/blog/budget-vanities",
      date: "March 25, 2024",
      category: "Product Reviews",
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      title: "5 Fast Upgrades That Add $10K+ in Perceived Value to a Flip",
      description:
        "These high-impact, low-effort improvements create immediate visual appeal and justify higher listing prices without breaking your renovation budget.",
      slug: "/blog/fast-upgrades",
      date: "March 18, 2024",
      category: "Renovation Tips",
      image:
        "https://images.unsplash.com/photo-1600607687644-a7e711722d70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-28">
          <div className="max-w-4xl mx-auto mb-28 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">
              Fix & Flip Blog
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 mb-16">
              Expert advice, product recommendations, and proven strategies to
              maximize your real estate investment returns.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-24 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full"
                >
                  <div className="h-64 bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-14">
                    <div className="space-y-10">
                      <div className="flex justify-between items-center">
                        <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">{post.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {post.description}
                      </p>

                      <div className="pt-10">
                        <Link href={post.slug}>
                          <Button variant="outline">Read Article</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
