import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How fast is your shipping?", a: "We ship worldwide with standard delivery in 5-14 business days. Express shipping options are available at checkout. All orders include tracking information." },
  { q: "Are your products compatible with Mac and PC?", a: "Yes! All our USB equipment — drives, hubs, cables, and adapters — are compatible with Windows, macOS, Linux, and most devices with USB ports. Many also support Android via USB-C or OTG." },
  { q: "What warranty do you offer?", a: "All products come with a minimum 1-year manufacturer warranty. Premium products include up to 5-year warranty. We also offer a 30-day money-back guarantee." },
  { q: "Do you offer bulk or wholesale pricing?", a: "Yes, we offer special pricing for bulk orders of 50+ units. Contact us at nanbonkayu@gmail.com for a custom quote tailored to your needs." },
  { q: "What types of USB equipment do you sell?", a: "We carry a full range: flash drives, external HDDs & SSDs, USB hubs & docking stations, cables & adapters (USB-C, Lightning, Micro-USB), card readers, chargers, and other USB peripherals." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit SSL encryption." },
];

const FAQSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">Got questions? We've got answers.</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg bg-card px-6 data-[state=open]:border-primary/30">
            <AccordionTrigger className="text-sm font-heading font-semibold text-foreground hover:text-primary hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
