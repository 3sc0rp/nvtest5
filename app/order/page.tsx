import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Order Online - Nature Village | Kurdish Food Delivery & Takeout',
  description: 'Order authentic Kurdish cuisine for delivery or pickup. Fresh ingredients, traditional recipes, and Kurdish hospitality delivered to your door.',
  keywords: 'Kurdish food delivery, order online, takeout, DoorDash, Uber Eats, authentic Kurdish cuisine delivery',
  openGraph: {
    title: 'Order Online - Nature Village Kurdish Restaurant',
    description: 'Order authentic Kurdish cuisine for delivery or pickup',
    images: ['/images/hero-mountains.jpg']
  }
};

// Business hours check
const isOpen = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Sunday: 12-21, Mon-Thu: 11-22, Fri-Sat: 11-23
  if (day === 0) return hour >= 12 && hour < 21;
  if (day >= 1 && day <= 4) return hour >= 11 && hour < 22;
  if (day >= 5 && day <= 6) return hour >= 11 && hour < 23;
  
  return false;
};

export default function OrderPage() {
  const isCurrentlyOpen = isOpen();

  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Hero Section */}
      <Section
        title="Order"
        description="Enjoy authentic Kurdish flavors at home. Order through our delivery partners or call for pickup."
        className="bg-gradient-to-br from-nv-sand to-nv-paper border-b border-nv-sand/50"
      >
        {/* Status Banner */}
        <div className={`max-w-md mx-auto mb-8 p-4 rounded-xl border-2 text-center ${
          isCurrentlyOpen 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-orange-50 border-orange-200 text-orange-800'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              isCurrentlyOpen ? 'bg-green-500' : 'bg-orange-500'
            }`} />
            <span className="font-semibold">
              {isCurrentlyOpen ? 'Open Now' : 'Currently Closed'}
            </span>
          </div>
          <p className="text-sm">
            {isCurrentlyOpen 
              ? 'Accepting orders for delivery and pickup'
              : 'We open at 11:00 AM. You can still place orders for later!'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Delivery Options */}
          <div className="space-y-6">
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-nv-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-nv-night mb-4">
                Delivery Partners
              </h3>
              
              <p className="text-nv-olive mb-6">
                Order through our trusted delivery partners for contactless delivery to your door.
              </p>
              
              <div className="space-y-4">
                <Button
                  as="a"
                  href={process.env.NEXT_PUBLIC_DOORDASH_URL || 'https://www.doordash.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="btn-hover-lift w-full min-h-[48px]"
                >
                  Order on DoorDash
                </Button>

                <Button
                  as="a"
                  href={process.env.NEXT_PUBLIC_UBEREATS_URL || 'https://www.ubereats.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="btn-hover-lift w-full min-h-[48px]"
                >
                  Order on Uber Eats
                </Button>

                {/* Fallback phone order always available */}
                <Button
                  as="a"
                  href="tel:+15551234567"
                  variant="ghost"
                  size="lg"
                  className="btn-hover-lift w-full min-h-[48px]"
                >
                  Call to Order
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-nv-olive/5 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nv-olive">Delivery Fee:</span>
                  <span className="font-semibold text-nv-night">$2.99</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nv-olive">Minimum Order:</span>
                  <span className="font-semibold text-nv-night">$25.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nv-olive">Delivery Time:</span>
                  <span className="font-semibold text-nv-night">25-35 mins</span>
                </div>
              </div>
            </div>

            {/* Pickup Option */}
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-nv-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-nv-night mb-4">
                Pickup Orders
              </h3>
              
              <p className="text-nv-olive mb-6">
                Order ahead and pickup at our restaurant. No fees, just fresh food ready when you arrive.
              </p>
              
              <div className="space-y-4">
                <Button
                  as="a"
                  href="tel:+15551234567"
                  variant="primary"
                  size="lg"
                  className="btn-hover-lift w-full min-h-[48px]"
                >
                  Call to Order for Pickup
                </Button>
                
                <div className="text-sm text-nv-olive space-y-1">
                  <p><strong>Address:</strong> 123 Village Street</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Pickup Time:</strong> 15-20 minutes</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">Free parking available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Items */}
          <div className="space-y-6">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-mountains.jpg"
                alt="Fresh Kurdish dishes ready for delivery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-nv-night/80 via-nv-night/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-nv-paper">
                <h3 className="font-heading text-xl font-bold mb-2">
                  Most Popular for Delivery
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Zagros Mountain Kofta - $18.95</li>
                  <li>• Kurdish Fire Kebab - $24.95</li>
                  <li>• Nature Village Dolma - $14.95</li>
                  <li>• Mountain Honey Baklava - $8.95</li>
                </ul>
              </div>
            </div>

            {/* Special Offers */}
            <div className="card-elevated p-6 bg-gradient-to-r from-nv-gold/10 to-nv-saffron/10 border border-nv-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-nv-gold/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-nv-night">
                  Special Offers
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-nv-olive">Free delivery on orders over $50</span>
                  <span className="bg-nv-gold/20 text-nv-gold px-2 py-1 rounded text-xs font-semibold">SAVE $2.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-nv-olive">10% off pickup orders</span>
                  <span className="bg-nv-terracotta/20 text-nv-terracotta px-2 py-1 rounded text-xs font-semibold">PICKUP10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-nv-olive">Family meal deals available</span>
                  <span className="bg-nv-olive/20 text-nv-olive px-2 py-1 rounded text-xs font-semibold">FAMILY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Hours & Contact */}
      <Section
        title="Hours & Contact"
        className="bg-surface"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-heading text-lg font-bold text-nv-night mb-4">Order Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-nv-olive">Monday - Thursday</span>
                <span className="text-nv-night">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nv-olive">Friday - Saturday</span>
                <span className="text-nv-night">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nv-olive">Sunday</span>
                <span className="text-nv-night">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-heading text-lg font-bold text-nv-night mb-4">Phone Orders</h3>
            <a 
              href="tel:+15551234567" 
              className="text-xl font-bold text-nv-terracotta hover:text-nv-saffron transition-colors block mb-2"
            >
              (555) 123-4567
            </a>
            <p className="text-sm text-nv-olive">
              Call ahead for faster pickup
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-heading text-lg font-bold text-nv-night mb-4">Location</h3>
            <div className="text-sm text-nv-olive space-y-1">
              <p>123 Village Street</p>
              <p>Downtown Village District</p>
              <p>City, State 12345</p>
            </div>
            <a 
              href="https://maps.google.com/?q=123+Village+Street"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-nv-terracotta hover:text-nv-saffron mt-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}