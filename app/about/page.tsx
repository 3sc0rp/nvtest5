import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Image from 'next/image';
// import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Nature Village | Kurdish Heritage & Culinary Tradition',
  description: 'Learn about Nature Village\'s story - a family restaurant preserving authentic Kurdish culinary traditions from the Zagros Mountains. Our heritage, values, and commitment to authentic flavors.',
  keywords: 'Kurdish heritage, family restaurant, Zagros Mountains, traditional recipes, Kurdish culture, authentic cuisine, family story',
  openGraph: {
    title: 'About Nature Village - Kurdish Heritage & Tradition',
    description: 'Learn about our family\'s journey preserving authentic Kurdish culinary traditions',
    images: ['/images/portrait-kurdish-woman.jpg']
  }
};

export default function AboutPage() {
  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Hero Section */}
      <Section
        title="Our Story"
        description="From the mountains of Kurdistan to your table - a journey of tradition, family, and authentic flavors."
        className="bg-gradient-to-br from-nv-sand to-nv-paper border-b border-nv-sand/50"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-body text-lg text-nv-olive leading-relaxed">
                Nature Village began as a dream shared by the Rashid family, who immigrated from the heart of Kurdistan with recipes passed down through four generations. What started in a small kitchen in Erbil has now found its home here, where we continue to honor our ancestors&apos; culinary wisdom.
              </p>
              
              <p className="font-body text-lg text-nv-olive leading-relaxed">
                Every dish we serve tells a story of the Zagros Mountains, where wild herbs perfume the air and traditional cooking methods have remained unchanged for centuries. Our family&apos;s commitment is simple: to share the authentic flavors and warm hospitality that define Kurdish culture.
              </p>
              
              <p className="font-body text-lg text-nv-olive leading-relaxed">
                When you dine with us, you&apos;re not just a customer - you&apos;re welcomed as family, continuing a tradition of Kurdish hospitality that spans generations.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/portrait-kurdish-woman.jpg"
                alt="Portrait representing Kurdish heritage and tradition"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-nv-night/20 to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section
        title="Our Journey"
        description="Milestones in our family's culinary adventure"
        className="bg-surface"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                year: "1960s",
                title: "The Beginning",
                description: "Our grandmother Fatima begins documenting family recipes in the mountains near Sulaymaniyah, preserving the traditional flavors of Kurdish cuisine for future generations."
              },
              {
                year: "1985",
                title: "Migration & Dreams",
                description: "The Rashid family immigrates with hopes of sharing their culinary heritage while maintaining the authentic flavors and cooking methods of their homeland."
              },
              {
                year: "2010",
                title: "First Restaurant",
                description: "After years of catering and pop-up events, we open our first small restaurant, serving the local community with traditional Kurdish dishes made from family recipes."
              },
              {
                year: "2020",
                title: "Nature Village Born",
                description: "We establish Nature Village in our current location, expanding our menu while staying true to our roots and commitment to authentic Kurdish cuisine."
              },
              {
                year: "Today",
                title: "Living Heritage",
                description: "Four generations of recipes, modern techniques, and the same warm hospitality. We continue to evolve while honoring our culinary traditions."
              }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-nv-terracotta/10 rounded-full flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-nv-terracotta">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pb-12">
                  <div className="bg-nv-paper rounded-xl p-6 shadow-md border border-nv-sand/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-heading text-sm font-bold text-nv-olive uppercase tracking-wide">
                        {milestone.year}
                      </span>
                      <div className="h-px bg-nv-sand flex-1" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-nv-night mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-nv-olive leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section
        title="Our Values"
        description="The principles that guide everything we do"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-nv-terracotta/10 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-nv-night">
              Hospitality
            </h3>
            <p className="text-nv-olive leading-relaxed">
              Kurdish hospitality means treating every guest as family. We believe food is love, and sharing a meal creates lasting bonds between people.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-nv-olive/10 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-nv-night">
              Fire & Bread
            </h3>
            <p className="text-nv-olive leading-relaxed">
              Traditional cooking methods using open flames and clay ovens. Our bread is baked fresh daily, and our meats are grilled over real charcoal for authentic flavors.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-nv-saffron/10 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-nv-saffron" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-nv-night">
              From the Mountains
            </h3>
            <p className="text-nv-olive leading-relaxed">
              We source the finest ingredients, honoring the natural bounty of the Zagros Mountains. Fresh herbs, premium spices, and authentic flavors in every dish.
            </p>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section
        title="Meet Our Family"
        description="The passionate people bringing authentic Kurdish flavors to your table"
        className="bg-surface"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Chef Ahmad Rashid",
              role: "Head Chef & Owner",
              description: "Third-generation chef carrying forward family traditions with passion and innovation.",
              image: "/images/hero-mountains.jpg"
            },
            {
              name: "Layla Rashid",
              role: "Manager & Recipe Keeper",
              description: "Preserves our grandmother's original recipes while managing daily operations with care.",
              image: "/images/interior-booths.jpg"
            },
            {
              name: "Omar Hassan",
              role: "Grill Master",
              description: "Expert in traditional charcoal grilling techniques, creating perfectly seasoned kebabs and meats.",
              image: "/images/portrait-kurdish-woman.jpg"
            }
          ].map((member, index) => (
            <div key={index} className="card-elevated p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-nv-night mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-nv-terracotta mb-3">
                {member.role}
              </p>
              <p className="text-sm text-nv-olive leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section
        title="Experience Our Heritage"
        description="Join us for an authentic taste of Kurdish culture and cuisine"
      >
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <p className="font-body text-lg text-nv-olive leading-relaxed">
            Every meal at Nature Village is an invitation to experience the rich culinary heritage of Kurdistan. 
            From our family to yours, we welcome you to taste the authentic flavors that have been passed down through generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as="a"
              href="/reservations"
              variant="primary"
              size="lg"
              className="btn-hover-lift"
            >
              Make a Reservation
            </Button>
            
            <Button
              as="a"
              href="/menu"
              variant="secondary"
              size="lg"
              className="btn-hover-lift"
            >
              View Our Menu
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}