import { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, faqJsonLd, websiteJsonLd } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: 'FAQ - Nature Village',
    description: 'Frequently asked questions about Nature Village Kurdish Restaurant. Find answers about our menu, reservations, delivery, and more.',
    path: '/faq',
    locale,
  });
}

const faqs = [
  {
    q: "What type of cuisine does Nature Village serve?",
    a: "We serve authentic Kurdish cuisine, featuring traditional recipes passed down through generations. Our menu includes dishes from various regions of Kurdistan, prepared with fresh, high-quality ingredients."
  },
  {
    q: "Do you have vegetarian and vegan options?",
    a: "Yes! We have many vegetarian dishes including dolma, fresh salads, and vegetable-based appetizers. We also offer several vegan options and can accommodate dietary restrictions with advance notice."
  },
  {
    q: "Is all your meat halal?",
    a: "Yes, all meat served at Nature Village is halal certified. We work with trusted suppliers to ensure our ingredients meet halal standards."
  },
  {
    q: "Do you take reservations?",
    a: "Yes, we recommend making reservations, especially for dinner service and weekends. You can make a reservation through our website or by calling us directly."
  },
  {
    q: "Do you offer delivery and takeout?",
    a: "Yes, we offer both delivery and takeout through DoorDash and Uber Eats. You can also call us directly for pickup orders."
  },
  {
    q: "What are your hours of operation?",
    a: "We're open Monday-Thursday 11am-10pm, Friday-Saturday 11am-11pm, and Sunday 12pm-9pm. Hours may vary on holidays."
  },
  {
    q: "Can you accommodate large groups or private events?",
    a: "Yes, we can accommodate large groups and offer catering services. For private events or groups of 8 or more, please contact us in advance to ensure we can provide the best experience."
  },
  {
    q: "What makes Nature Village different from other restaurants?",
    a: "Our commitment to authentic Kurdish flavors, family recipes, and warm hospitality sets us apart. We use traditional cooking methods and source ingredients that honor our Kurdish heritage."
  },
  {
    q: "Do you have a kids menu?",
    a: "While we don&apos;t have a separate kids menu, many of our dishes are family-friendly. Our staff can recommend milder options that children typically enjoy."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, all major credit cards (Visa, MasterCard, American Express), and contactless payments including Apple Pay and Google Pay."
  }
];

export default function FAQPage() {
  const faqLd = faqJsonLd(faqs);
  const siteLd = websiteJsonLd('https://naturevillage.com');

  return (
    <div className="bg-nv-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-nv-ink mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg text-nv-olive max-w-2xl mx-auto">
            Find answers to common questions about Nature Village, our menu, services, and dining experience.
          </p>
        </header>

        <main>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group bg-white rounded-lg border border-nv-sand shadow-sm"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-nv-sand/20 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2">
                  <h2 className="font-heading text-lg font-semibold text-nv-ink pr-4">
                    {faq.q}
                  </h2>
                  <svg 
                    className="w-5 h-5 text-nv-olive transition-transform group-open:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="sr-only">
                    {/* This text will be read by screen readers */}
                    Toggle answer
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="font-body text-nv-ink leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 p-6 bg-nv-sand/30 rounded-lg border border-nv-sand">
            <h2 className="font-heading text-xl font-semibold text-nv-ink mb-4">
              Still have questions?
            </h2>
            <p className="font-body text-nv-olive mb-4">
              We&apos;re here to help! Feel free to contact us if you can&apos;t find the answer you&apos;re looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+1-555-123-4567"
                className="inline-flex items-center justify-center px-6 py-3 bg-nv-terracotta text-nv-paper font-semibold rounded-lg hover:bg-nv-terracotta/90 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                aria-label="Call Nature Village restaurant"
              >
                <span className="mr-2" aria-hidden="true">📞</span>
                Call Us
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-nv-olive text-nv-olive font-semibold rounded-lg hover:bg-nv-olive hover:text-nv-paper transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                aria-label="Visit contact page for more ways to reach us"
              >
                <span className="mr-2" aria-hidden="true">✉️</span>
                Contact Us
              </Link>
            </div>
          </div>
        </main>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </div>
    </div>
  );
}
