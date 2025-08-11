import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Nature Village',
  description: 'Our story, heritage, and values at Nature Village Kurdish Restaurant.',
};

export default function AboutPage() {
  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-8">
          Our Story
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-nv-olive text-lg leading-relaxed mb-6">
            Nature Village was born from a deep love for Kurdish cuisine and culture. Our founders, 
            originally from the fertile valleys of the Zagros Mountains, brought centuries-old family 
            recipes and cooking traditions to create an authentic dining experience.
          </p>
          <p className="font-body text-nv-olive text-lg leading-relaxed mb-6">
            Every dish at Nature Village tells a story of Kurdish hospitality, where guests are treated 
            as family. We use traditional clay ovens, hand-selected spices from Kurdistan&apos;s highlands, 
            and cooking methods passed down through generations.
          </p>
          <p className="font-body text-nv-olive text-lg leading-relaxed">
            More than just a restaurant, Nature Village is a gathering place where Kurdish culture comes 
            alive. We celebrate traditional holidays and provide a home away from home for our community 
            while welcoming all guests to experience our rich heritage.
          </p>
        </div>
      </div>
    </div>
  );
}
