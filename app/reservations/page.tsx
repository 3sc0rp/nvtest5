import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Reservations - Nature Village | Book Your Table for Kurdish Dining',
  description: 'Reserve your table at Nature Village for an authentic Kurdish dining experience. Book online or call us directly for special events and group reservations.',
  keywords: 'Kurdish restaurant reservations, book table, dining reservations, Nature Village booking, authentic Kurdish dining',
  openGraph: {
    title: 'Reservations - Nature Village Kurdish Restaurant',
    description: 'Reserve your table for an authentic Kurdish dining experience',
    images: ['/images/interior-booths.jpg']
  }
};

export default function ReservationsPage() {
  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Hero Section */}
      <Section
        title="Reserve Your Table"
        description="Join us for an unforgettable Kurdish dining experience. Book your table and let us welcome you with traditional hospitality."
        className="bg-gradient-to-br from-nv-sand to-nv-paper border-b border-nv-sand/50"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Booking Options */}
          <div className="space-y-8">
            {/* OpenTable/Resy Integration */}
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-nv-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-nv-night mb-4">
                Book Online
              </h3>
              
              <p className="text-nv-olive mb-6">
                Reserve your table instantly through our online booking partners.
              </p>
              
              <div className="space-y-4">
                {process.env.NEXT_PUBLIC_OPENTABLE_URL && (
                  <Button
                    as="a"
                    href={process.env.NEXT_PUBLIC_OPENTABLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="lg"
                    className="btn-hover-lift w-full"
                  >
                    Book on OpenTable
                  </Button>
                )}
                
                {process.env.NEXT_PUBLIC_RESY_URL && (
                  <Button
                    as="a"
                    href={process.env.NEXT_PUBLIC_RESY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="lg"
                    className="btn-hover-lift w-full"
                  >
                    Book on Resy
                  </Button>
                )}
                
                {/* Fallback if no booking URLs */}
                {!process.env.NEXT_PUBLIC_OPENTABLE_URL && !process.env.NEXT_PUBLIC_RESY_URL && (
                  <div className="p-4 bg-nv-sand/20 rounded-lg border border-nv-sand">
                    <p className="text-sm text-nv-olive mb-4">
                      Online reservations coming soon. Please call us directly.
                    </p>
                    <Button
                      as="a"
                      href="tel:+15551234567"
                      variant="primary"
                      size="lg"
                      className="btn-hover-lift w-full"
                    >
                      Call to Reserve
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Contact */}
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-nv-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-nv-night mb-4">
                Call Directly
              </h3>
              
              <p className="text-nv-olive mb-6">
                Speak with our team for special requests, large parties, or immediate reservations.
              </p>
              
              <div className="space-y-4">
                <div>
                  <a 
                    href="tel:+15551234567" 
                    className="block text-2xl font-bold text-nv-terracotta hover:text-nv-saffron transition-colors"
                  >
                    (555) 123-4567
                  </a>
                  <p className="text-sm text-nv-olive mt-2">
                    Open daily 11:00 AM - 10:00 PM
                  </p>
                </div>
                
                <Button
                  as="a"
                  href="mailto:reservations@naturevillage.com"
                  variant="ghost"
                  size="lg"
                  className="btn-hover-lift w-full"
                >
                  Email Us
                </Button>
              </div>
            </div>
          </div>

          {/* Restaurant Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/interior-booths.jpg"
                alt="Warm and inviting interior of Nature Village restaurant with traditional Kurdish decor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-nv-night/20 to-transparent" />
            </div>
            
            {/* Floating info card */}
            <div className="absolute -bottom-6 -left-6 bg-nv-paper card-elevated p-6 max-w-xs">
              <h4 className="font-heading text-lg font-bold text-nv-night mb-2">
                Perfect for Special Occasions
              </h4>
              <p className="text-sm text-nv-olive">
                Intimate booths, warm lighting, and authentic Kurdish ambiance make every meal memorable.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Reservation Policies */}
      <Section
        title="Reservation Policies"
        description="Please review our policies to ensure the best dining experience for all our guests."
        className="bg-surface"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-nv-terracotta/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-nv-night mb-2">
              2-Hour Seating
            </h3>
            <p className="text-sm text-nv-olive">
              Tables are reserved for 2 hours to accommodate all guests
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-nv-olive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-nv-night mb-2">
              24-Hour Notice
            </h3>
            <p className="text-sm text-nv-olive">
              Cancellations require 24-hour advance notice
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-nv-saffron/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-nv-saffron" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-nv-night mb-2">
              Group Parties
            </h3>
            <p className="text-sm text-nv-olive">
              Parties of 8+ require special arrangements
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-nv-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-nv-night mb-2">
              Special Events
            </h3>
            <p className="text-sm text-nv-olive">
              Private dining and events available upon request
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="Frequently Asked Questions"
        description="Find answers to common questions about dining with us."
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "Do you accommodate dietary restrictions?",
              answer: "Yes! We offer numerous vegetarian, vegan, and gluten-sensitive options. All our dishes are halal, and we can modify many recipes to accommodate specific needs. Please inform us when making your reservation."
            },
            {
              question: "Is there parking available?",
              answer: "We offer complimentary parking in our dedicated lot, accessible from the rear of the building. Street parking is also available on Village Street."
            },
            {
              question: "Can I make same-day reservations?",
              answer: "While we recommend booking in advance, we do accept same-day reservations based on availability. Call us directly for the best chance of securing a table."
            },
            {
              question: "Do you have a dress code?",
              answer: "We welcome casual attire, though many guests choose to dress up for the experience. Our atmosphere is warm and welcoming regardless of what you wear."
            }
          ].map((faq, index) => (
            <div key={index} className="card-elevated p-6">
              <h3 className="font-heading text-lg font-semibold text-nv-night mb-3">
                {faq.question}
              </h3>
              <p className="text-nv-olive leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}