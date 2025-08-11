import Image from 'next/image';
import { ASSET_METADATA, getImagePath, getPatternPath } from '@/lib/assets';

export default function AssetShowcase() {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-nv-paper">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-nv-ink mb-4">
          Nature Village Assets Showcase
        </h1>
        <p className="font-body text-lg text-nv-olive max-w-2xl mx-auto">
          A comprehensive display of all restaurant images and decorative patterns
        </p>
      </div>

      {/* Restaurant Images Section */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-semibold text-nv-terracotta mb-8 text-center">
          Restaurant Images
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hero Mountains */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src={getImagePath('heroMountains')}
                alt="Kurdistan Mountains Hero"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                {ASSET_METADATA.images.heroMountains.name}
              </h3>
              <p className="font-body text-sm text-nv-olive mb-2">
                {ASSET_METADATA.images.heroMountains.description}
              </p>
              <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block">
                {ASSET_METADATA.images.heroMountains.dimensions}
              </div>
            </div>
          </div>

          {/* Interior Booths */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src={getImagePath('interiorBooths')}
                alt="Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                {ASSET_METADATA.images.interiorBooths.name}
              </h3>
              <p className="font-body text-sm text-nv-olive mb-2">
                {ASSET_METADATA.images.interiorBooths.description}
              </p>
              <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block">
                {ASSET_METADATA.images.interiorBooths.dimensions}
              </div>
            </div>
          </div>

          {/* Kurdish Woman Portrait */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <Image
                src={getImagePath('portraitKurdishWoman')}
                alt="Kurdish Heritage Portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                {ASSET_METADATA.images.portraitKurdishWoman.name}
              </h3>
              <p className="font-body text-sm text-nv-olive mb-2">
                {ASSET_METADATA.images.portraitKurdishWoman.description}
              </p>
              <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block">
                {ASSET_METADATA.images.portraitKurdishWoman.dimensions}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Patterns Section */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-semibold text-nv-terracotta mb-8 text-center">
          Decorative Patterns
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Floral Corner Pattern */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={getPatternPath('floralCorner')}
                alt="Kurdish Floral Corner"
                width={120}
                height={120}
                className="border border-nv-sand rounded"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
              {ASSET_METADATA.patterns.floralCorner.name}
            </h3>
            <p className="font-body text-sm text-nv-olive mb-2">
              {ASSET_METADATA.patterns.floralCorner.description}
            </p>
            <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block mb-2">
              {ASSET_METADATA.patterns.floralCorner.dimensions}
            </div>
            <p className="font-body text-xs text-nv-olive">
              Usage: {ASSET_METADATA.patterns.floralCorner.usage}
            </p>
          </div>

          {/* Pomegranate Border Pattern */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={getPatternPath('pomegranateBorder')}
                alt="Pomegranate Border"
                width={200}
                height={40}
                className="border border-nv-sand rounded"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
              {ASSET_METADATA.patterns.pomegranateBorder.name}
            </h3>
            <p className="font-body text-sm text-nv-olive mb-2">
              {ASSET_METADATA.patterns.pomegranateBorder.description}
            </p>
            <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block mb-2">
              {ASSET_METADATA.patterns.pomegranateBorder.dimensions}
            </div>
            <p className="font-body text-xs text-nv-olive">
                              Usage: {ASSET_METADATA.patterns.pomegranateBorder.usage}
            </p>
          </div>

          {/* Sun Rays Pattern */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={getPatternPath('sunRays')}
                alt="Kurdish Sun Rays"
                width={120}
                height={120}
                className="border border-nv-sand rounded"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
              {ASSET_METADATA.patterns.sunRays.name}
            </h3>
            <p className="font-body text-sm text-nv-olive mb-2">
              {ASSET_METADATA.patterns.sunRays.description}
            </p>
            <div className="text-xs text-nv-sand bg-nv-olive px-2 py-1 rounded inline-block mb-2">
              {ASSET_METADATA.patterns.sunRays.dimensions}
            </div>
            <p className="font-body text-xs text-nv-olive">
              Usage: {ASSET_METADATA.patterns.sunRays.usage}
            </p>
          </div>
        </div>
      </section>

      {/* Pattern Usage Examples */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-semibold text-nv-terracotta mb-8 text-center">
          Pattern Usage Examples
        </h2>
        
        {/* Card with decorative corners */}
        <div className="relative bg-gradient-to-br from-nv-sand to-white p-8 rounded-xl mb-8 overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
            <Image
              src={getPatternPath('floralCorner')}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 opacity-40 rotate-90">
            <Image
              src={getPatternPath('floralCorner')}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40 -rotate-90">
            <Image
              src={getPatternPath('floralCorner')}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40 rotate-180">
            <Image
              src={getPatternPath('floralCorner')}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          
          <div className="text-center relative z-10">
            <h3 className="font-heading text-2xl font-bold text-nv-ink mb-4">
              Welcome Message with Floral Corners
            </h3>
            <p className="font-body text-nv-olive">
              This card demonstrates how the floral corner pattern can be used to frame content beautifully.
            </p>
          </div>
        </div>

        {/* Section with pomegranate border */}
        <div className="bg-white rounded-lg p-6 border-2 border-nv-sand">
          <div className="flex justify-center mb-4">
            <Image
              src={getPatternPath('pomegranateBorder')}
              alt=""
              width={400}
              height={80}
              className="opacity-60"
            />
          </div>
          <h3 className="font-heading text-2xl font-bold text-nv-ink text-center mb-4">
            Menu Section with Pomegranate Border
          </h3>
          <p className="font-body text-nv-olive text-center">
            Perfect for separating menu sections or highlighting special offers.
          </p>
        </div>
      </section>

      {/* Asset Integration Guide */}
      <section className="bg-nv-olive/10 rounded-lg p-8">
        <h2 className="font-heading text-3xl font-semibold text-nv-ink mb-6 text-center">
          Asset Integration Guide
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-nv-terracotta mb-4">
              Using Images
            </h3>
            <div className="bg-nv-ink text-nv-paper p-4 rounded font-mono text-sm mb-4">
              <div className="mb-2">import {`{ getImagePath }`} from &apos;@/lib/assets&apos;;</div>
              <div className="mb-2">import Image from &apos;next/image&apos;;</div>
              <div className="mb-2"></div>
              <div className="mb-2">&lt;Image</div>
              <div className="mb-2 ml-2">src={`{getImagePath('heroMountains')}`}</div>
              <div className="mb-2 ml-2">alt=&quot;Hero Mountains&quot;</div>
              <div className="mb-2 ml-2">width={`{1920}`}</div>
              <div className="mb-2 ml-2">height={`{1080}`}</div>
              <div>/&gt;</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-semibold text-nv-terracotta mb-4">
              Using Patterns
            </h3>
            <div className="bg-nv-ink text-nv-paper p-4 rounded font-mono text-sm mb-4">
              <div className="mb-2">import {`{ getPatternPath }`} from &apos;@/lib/assets&apos;;</div>
              <div className="mb-2"></div>
              <div className="mb-2">&lt;div</div>
              <div className="mb-2 ml-2">style={`{{`}</div>
              <div className="mb-2 ml-4">backgroundImage:</div>
              <div className="mb-2 ml-6">{"`url(${getPatternPath('sunRays')})`"}</div>
              <div className="mb-2 ml-2">{`}}`}</div>
              <div>/&gt;</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-nv-sand rounded">
          <p className="font-body text-nv-ink text-center">
            <strong>Note:</strong> All assets are optimized placeholders that can be easily replaced with actual 
            restaurant photography and custom Kurdish patterns while maintaining the same file structure and naming conventions.
          </p>
        </div>
      </section>
    </div>
  );
}
