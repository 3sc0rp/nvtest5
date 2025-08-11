import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order - Nature Village',
  description: 'Order delivery or pickup from Nature Village via DoorDash or Uber Eats.',
};

const DOORDASH_URL = process.env.DOORDASH_URL || '';
const UBEREATS_URL = process.env.UBEREATS_URL || '';

export default function OrderPage() {
  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-8">
          Order Online
        </h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-nv-olive mb-8">
            Order your favorite Kurdish dishes for delivery or pickup through our delivery partners.
          </p>
          
          {(DOORDASH_URL || UBEREATS_URL) ? (
            <div className="space-y-4">
              {DOORDASH_URL && (
                <a
                  href={DOORDASH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
                >
                  Order with DoorDash
                </a>
              )}
              {UBEREATS_URL && (
                <a
                  href={UBEREATS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-nv-olive hover:bg-nv-olive/90 text-nv-paper font-body font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
                >
                  Order with Uber Eats
                </a>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-md">
              <p className="font-body text-nv-ink mb-4">
                Online ordering is currently unavailable. Please call us to place your order.
              </p>
              <p className="font-body text-nv-olive">
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
