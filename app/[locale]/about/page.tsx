import Image from 'next/image';
import { ASSET_METADATA, getImagePath } from '@/lib/assets';
import { AboutCulturalContent } from '@/components/CulturalBlurbs';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    title: 'About - Nature Village',
    description: 'Our story, heritage, and values at Nature Village Kurdish Restaurant.',
    path: '/about',
    locale,
  });
}

const timeline: { year: string; title: string; description: string }[] = [
  {
    year: '1980s',
    title: 'Roots in the Zagros',
    description: 'Our family recipes began in small villages along the Zagros mountains, where hospitality is a way of life.'
  },
  {
    year: '2005',
    title: 'First Pop‑ups',
    description: 'We started with community pop‑ups—sharing Kurdish dishes at local markets and cultural festivals.'
  },
  {
    year: '2014',
    title: 'Nature Village is Born',
    description: 'We opened our first brick‑and‑mortar restaurant, guided by the values of generosity and authenticity.'
  },
  {
    year: 'Today',
    title: 'Carrying the Tradition',
    description: 'We continue to cook with heart, sourcing fresh ingredients and honoring recipes passed down through generations.'
  }
];

const values: { icon: string; name: string; desc: string }[] = [
  { icon: '🤝', name: 'Hospitality', desc: 'Every guest is welcomed like family.' },
  { icon: '🌿', name: 'Freshness', desc: 'We use seasonal produce and time‑honored spices.' },
  { icon: '🏔️', name: 'Heritage', desc: 'Our food reflects the culture of the Zagros heartland.' },
  { icon: '🕊️', name: 'Respect', desc: 'Halal practices and inclusive dining for all.' }
];

export default function AboutPage() {
  const portrait = ASSET_METADATA.images.portraitKurdishWoman;

  return (
    <div className="bg-nv-paper">
      {/* Cultural Content using translations */}
      <AboutCulturalContent />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid md:grid-cols-2 gap-8 items-start">
        <figure className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={getImagePath('portraitKurdishWoman')}
            alt="Portrait of a Kurdish woman in traditional attire"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority={false}
          />
          <figcaption className="sr-only">Portrait of a Kurdish woman in traditional attire</figcaption>
        </figure>

        <article className="space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-nv-ink">From our family to yours</h2>
          <p className="font-body text-nv-ink">
            We cook with the flavors that raised us—smoky kebabs, fragrant saffron rice, hand‑rolled dolma, and tea served in
            istikan glasses. We welcome everyone to experience the warmth and generosity that define Kurdish culture.
          </p>

          <div>
            <h3 className="font-heading text-xl font-semibold text-nv-ink mb-3">Timeline</h3>
            <ol className="relative border-s border-nv-sand pl-6" aria-label="Restaurant timeline">
              {timeline.map((item) => (
                <li key={item.year} className="mb-6">
                  <div className="absolute -left-1.5 w-3 h-3 bg-nv-terracotta rounded-full" aria-hidden />
                  <div className="font-heading text-nv-ink font-bold">{item.year} — {item.title}</div>
                  <p className="font-body text-nv-olive">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-nv-ink mb-3">Our Values</h3>
            <ul className="grid sm:grid-cols-2 gap-3" aria-label="Restaurant values">
              {values.map((v) => (
                <li key={v.name} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-nv-sand">
                  <span aria-hidden className="text-2xl">{v.icon}</span>
                  <div>
                    <div className="font-heading text-nv-ink font-semibold">{v.name}</div>
                    <p className="font-body text-nv-olive text-sm">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  );
}
