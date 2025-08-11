import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Nature Village | Kurdish Restaurant Location & Hours',
  description: 'Contact Nature Village Kurdish Restaurant. Find our location, hours, phone number, and email. We\'re here to serve you authentic Kurdish cuisine with warm hospitality.',
  keywords: 'Nature Village contact, Kurdish restaurant location, restaurant hours, phone number, directions, customer service',
  openGraph: {
    title: 'Contact Nature Village - Kurdish Restaurant',
    description: 'Find our location, hours, and contact information',
    images: ['/images/interior-booths.jpg']
  }
};

export default function ContactPage() {

  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Hero Section */}
      <Section
        title="Contact Us"
        description="We're here to serve you with authentic Kurdish cuisine and warm hospitality. Reach out with any questions or special requests."
        className="bg-gradient-to-br from-nv-sand to-nv-paper border-b border-nv-sand/50"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-nv-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-nv-night mb-2">
                    Phone
                  </h3>
                  <a 
                    href="tel:+15551234567" 
                    className="text-xl font-bold text-nv-terracotta hover:text-nv-saffron transition-colors block mb-2"
                  >
                    (555) 123-4567
                  </a>
                  <p className="text-sm text-nv-olive">
                    Call for reservations, takeout orders, or any questions about our menu and services.
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-nv-olive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-nv-night mb-2">
                    Email
                  </h3>
                  <a 
                    href="mailto:info@naturevillage.com" 
                    className="text-lg font-semibold text-nv-terracotta hover:text-nv-saffron transition-colors block mb-2"
                  >
                    info@naturevillage.com
                  </a>
                  <p className="text-sm text-nv-olive">
                    Send us an email for catering inquiries, private events, or general feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-nv-saffron/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-nv-saffron" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-nv-night mb-2">
                    Location
                  </h3>
                  <address className="not-italic text-nv-night font-medium mb-2">
                    123 Village Street<br />
                    Downtown Village District<br />
                    City, State 12345
                  </address>
                  <p className="text-sm text-nv-olive mb-3">
                    Located in the heart of the Village District with free parking available.
                  </p>
                  <a 
                    href="https://maps.google.com/?q=123+Village+Street+City+State+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-nv-terracotta hover:text-nv-saffron transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Hours */}
          <div className="space-y-8">
            {/* Contact Form */}
            <ContactForm />

            {/* Hours */}
            <div className="card-elevated p-6">
              <h3 className="font-heading text-xl font-bold text-nv-night mb-4">
                Hours of Operation
              </h3>
              <div className="space-y-2">
                {[
                  { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
                  { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
                  { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
                  { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
                  { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
                  { day: 'Saturday', hours: '11:00 AM - 11:00 PM' },
                  { day: 'Sunday', hours: '12:00 PM - 9:00 PM' }
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between">
                    <span className="text-nv-olive font-medium">{schedule.day}</span>
                    <span className="text-nv-night">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-nv-sand/20 rounded-lg">
                <p className="text-sm text-nv-olive">
                  <strong>Holiday Hours:</strong> Please call ahead during holidays as hours may vary.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-6">
              <h3 className="font-heading text-xl font-bold text-nv-night mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  as="a"
                  href="/reservations"
                  variant="primary"
                  size="lg"
                  className="btn-hover-lift w-full"
                >
                  Make a Reservation
                </Button>
                
                <Button
                  as="a"
                  href="/order"
                  variant="secondary"
                  size="lg"
                  className="btn-hover-lift w-full"
                >
                  Order for Pickup/Delivery
                </Button>
                
                <Button
                  as="a"
                  href="/menu"
                  variant="ghost"
                  size="lg"
                  className="btn-hover-lift w-full"
                >
                  View Menu
                </Button>
              </div>
            </div>

            {/* Special Services */}
            <div className="card-elevated p-6">
              <h3 className="font-heading text-xl font-bold text-nv-night mb-4">
                Special Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nv-gold/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nv-night">Private Events</h4>
                    <p className="text-sm text-nv-olive">Birthdays, anniversaries, corporate gatherings</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nv-gold/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nv-night">Catering</h4>
                    <p className="text-sm text-nv-olive">Authentic Kurdish cuisine for your events</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-nv-gold/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nv-night">Gift Cards</h4>
                    <p className="text-sm text-nv-olive">Share the gift of authentic Kurdish cuisine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Placeholder */}
      <Section
        title="Find Us"
        className="bg-surface"
      >
        <div className="card-elevated overflow-hidden">
          <div className="bg-nv-sand/20 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-nv-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-nv-night mb-2">
                Interactive Map
              </h3>
              <p className="text-nv-olive mb-4">
                123 Village Street, Downtown Village District
              </p>
              <Button
                as="a"
                href="https://maps.google.com/?q=123+Village+Street+City+State+12345"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="btn-hover-lift"
              >
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}