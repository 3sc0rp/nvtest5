import { Metadata } from 'next';
import { buildMetadata, restaurantJsonLd, websiteJsonLd } from '@/lib/seo';

const DOORDASH_URL = process.env.DOORDASH_URL || '';
const UBEREATS_URL = process.env.UBEREATS_URL || '';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: 'Order - Nature Village',
    description: 'Order delivery or pickup from Nature Village via DoorDash or Uber Eats.',
    path: '/order',
    locale,
  });
}

// Simple weekly schedule
function isOpenNow(date = new Date()) {
  const day = date.getDay(); // 0 Sun ... 6 Sat
  const hour = date.getHours();
  if (day === 0) return hour >= 12 && hour < 21; // Sun 12-21
  if (day >= 1 && day <= 4) return hour >= 11 && hour < 22; // Mon-Thu 11-22
  if (day === 5 || day === 6) return hour >= 11 && hour < 23; // Fri-Sat 11-23
  return false;
}

function nextOpeningTime(date = new Date()) {
  const d = new Date(date);
  for (let i = 0; i < 8; i++) {
    const day = d.getDay();
    let openHour = 11;
    if (day === 0) openHour = 12; // Sun
    const candidate = new Date(d);
    candidate.setHours(openHour, 0, 0, 0);
    if (candidate > date) return candidate;
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
  }
  return null;
}

export default function OrderPage() {
  const hasDoorDash = Boolean(DOORDASH_URL);
  const hasUberEats = Boolean(UBEREATS_URL);
  const open = isOpenNow();
  const nextOpen = nextOpeningTime();

  const actions = [
    hasDoorDash && {
      '@type': 'OrderAction',
      actionStatus: open ? 'https://schema.org/ActiveActionStatus' : 'https://schema.org/PotentialActionStatus',
      target: { '@type': 'EntryPoint', urlTemplate: DOORDASH_URL },
      provider: { '@type': 'Organization', name: 'DoorDash' }
    },
    hasUberEats && {
      '@type': 'OrderAction',
      actionStatus: open ? 'https://schema.org/ActiveActionStatus' : 'https://schema.org/PotentialActionStatus',
      target: { '@type': 'EntryPoint', urlTemplate: UBEREATS_URL },
      provider: { '@type': 'Organization', name: 'Uber Eats' }
    }
  ].filter(Boolean);

  const localBusinessLd = {
    ...restaurantJsonLd,
    '@type': 'LocalBusiness',
    potentialAction: actions,
  };

  const siteLd = websiteJsonLd('https://naturevillage.com');

  return (
    <div className="min-h-[60vh] bg-nv-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-nv-ink mb-4">Order Online</h1>
        <p className="font-body text-nv-olive mb-8">
          Choose a delivery partner below. Availability depends on store hours.
        </p>

        {!open && (
          <div className="mb-6 rounded-lg border border-nv-sand bg-nv-sand/30 p-4">
            <p className="font-body text-nv-ink">
              We&apos;re currently closed. You can still pre‑order for the next opening time
              {nextOpen ? (
                <>
                  : <span className="font-semibold ml-1">
                    {nextOpen.toLocaleString(undefined, { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              ) : null}
              .
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hasDoorDash ? (
            <a
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 rounded-lg px-6 py-4 font-body font-semibold transition-colors border-2 ${
                open ? 'bg-nv-terracotta text-white border-nv-terracotta hover:bg-nv-terracotta/90' : 'bg-nv-paper text-nv-terracotta border-nv-terracotta'
              }`}
              aria-label={open ? 'Order on DoorDash' : 'Pre-order on DoorDash'}
            >
              <span>🍽️</span>
              <span>{open ? 'Order on DoorDash' : 'Pre-order on DoorDash'}</span>
            </a>
          ) : (
            <div className="rounded-lg px-6 py-4 border-2 border-nv-sand text-nv-olive text-center">DoorDash unavailable</div>
          )}

          {hasUberEats ? (
            <a
              href={UBEREATS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 rounded-lg px-6 py-4 font-body font-semibold transition-colors border-2 ${
                open ? 'bg-nv-olive text-white border-nv-olive hover:bg-nv-olive/90' : 'bg-nv-paper text-nv-olive border-nv-olive'
              }`}
              aria-label={open ? 'Order on Uber Eats' : 'Pre-order on Uber Eats'}
            >
              <span>🛵</span>
              <span>{open ? 'Order on Uber Eats' : 'Pre-order on Uber Eats'}</span>
            </a>
          ) : (
            <div className="rounded-lg px-6 py-4 border-2 border-nv-sand text-nv-olive text-center">Uber Eats unavailable</div>
          )}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </div>
    </div>
  );
}
