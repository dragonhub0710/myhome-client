import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "How much does this software cost?",
      answer:
        "We offer flexible pricing plans tailored to your business needs. Contact our sales team for detailed pricing information.",
    },
    {
      question: "Who is this built for?",
      answer:
        "This software is specifically designed for real estate flippers and rehabbers who want to streamline their design, material procurement, and contractor communication processes.",
    },
    {
      question: "I'm ready to sign up. Where do I start?",
      answer:
        "Simply click the 'Get Started' button at the top of the page to begin your journey. Our onboarding team will guide you through the process.",
    },
    {
      question: "Do I have to use all of the features?",
      answer:
        "No, our platform is modular. You can choose which features best suit your needs and only use those that add value to your workflow.",
    },
    {
      question: "Can my team members use this?",
      answer:
        "Yes! We offer team collaboration features. You can add team members and set different permission levels based on their roles.",
    },
    {
      question: "Does this have a mobile app?",
      answer:
        "Yes, we offer a mobile app for both iOS and Android, allowing you to manage your projects on the go.",
    },
  ];

  return (
    <section className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
