import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: 'Reservations - Nature Village',
    description: 'Make a reservation at Nature Village Kurdish Restaurant. Book your table for an authentic dining experience.',
    path: '/reservations',
    locale,
  });
}

export default function ReservationsPage() {
  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-8">
          Make a Reservation
        </h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-nv-olive mb-8">
            Reserve your table at Nature Village for an authentic Kurdish dining experience. 
            Call us or visit in person to make your reservation.
          </p>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="font-heading text-2xl font-bold text-nv-ink mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <strong className="font-body text-nv-ink">Phone:</strong>
                <p className="font-body text-nv-olive">(555) 123-4567</p>
              </div>
              <div>
                <strong className="font-body text-nv-ink">Email:</strong>
                <p className="font-body text-nv-olive">reservations@naturevillage.com</p>
              </div>
              <div>
                <strong className="font-body text-nv-ink">Address:</strong>
                <p className="font-body text-nv-olive">123 Village Street, Your City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
