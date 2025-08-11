'use client';

// English-only showcase

export default function BrandShowcase() {
  
  return (
    <div className={`max-w-4xl mx-auto p-8 bg-nv-paper text-left`}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-bold text-nv-ink mb-4">
          Welcome to Nature Village
        </h1>
        <p className="font-body text-xl text-nv-olive max-w-2xl mx-auto">
          Authentic Kurdish flavors with modern hospitality
        </p>
      </div>

      {/* Color Palette Section */}
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-semibold text-nv-ink mb-6 text-center">
          Brand Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-terracotta rounded-lg mx-auto mb-3 shadow-lg"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Terracotta</h3>
            <p className="font-body text-sm text-nv-olive">#B4532A</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-saffron rounded-lg mx-auto mb-3 shadow-lg"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Saffron</h3>
            <p className="font-body text-sm text-nv-olive">#D97706</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-olive rounded-lg mx-auto mb-3 shadow-lg"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Olive</h3>
            <p className="font-body text-sm text-nv-olive">#556B2F</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-sand rounded-lg mx-auto mb-3 shadow-lg border border-nv-olive/20"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Sand</h3>
            <p className="font-body text-sm text-nv-olive">#E8D8B5</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-ink rounded-lg mx-auto mb-3 shadow-lg"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Ink</h3>
            <p className="font-body text-sm text-nv-olive">#0F1A14</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-nv-paper rounded-lg mx-auto mb-3 shadow-lg border border-nv-olive/20"></div>
            <h3 className="font-heading text-lg font-medium text-nv-ink">Paper</h3>
            <p className="font-body text-sm text-nv-olive">#FBF7ED</p>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-semibold text-nv-ink mb-6 text-center">
          Typography
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-nv-sand">
            <h3 className="font-heading text-2xl font-semibold text-nv-terracotta mb-4">
              Playfair Display
            </h3>
            <p className="font-body text-nv-ink mb-2">For headings and display text</p>
            <div className="space-y-2">
              <p className="font-heading text-4xl font-bold text-nv-ink">Aa</p>
              <p className="font-heading text-lg text-nv-olive">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-nv-sand">
            <h3 className="font-heading text-2xl font-semibold text-nv-terracotta mb-4">
              Inter
            </h3>
            <p className="font-body text-nv-ink mb-2">For body text and interfaces</p>
            <div className="space-y-2">
              <p className="font-body text-4xl font-bold text-nv-ink">Aa</p>
              <p className="font-body text-lg text-nv-olive">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Restaurant Card */}
      <div className="bg-gradient-to-br from-nv-sand to-white p-8 rounded-xl border border-nv-terracotta/20 shadow-xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold text-nv-terracotta mb-4">
            Welcome to Our Village
          </h2>
          <p className="font-body text-lg text-nv-ink mb-6 leading-relaxed">
            Experience the rich flavors of Kurdistan in every dish. Our chefs bring traditional recipes 
            passed down through generations, creating an authentic dining experience that connects you 
            to the heart of Kurdish culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors">
              Reserve a Table
            </button>
            <button className="bg-nv-olive hover:bg-nv-olive/90 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors">
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-nv-sand text-center">
          <div className="w-12 h-12 bg-nv-saffron rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">🍽️</span>
          </div>
          <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">Authentic Flavors</h3>
          <p className="font-body text-nv-olive">Traditional Kurdish recipes made with love and care</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-nv-sand text-center">
          <div className="w-12 h-12 bg-nv-olive rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">🌿</span>
          </div>
          <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">Fresh Ingredients</h3>
          <p className="font-body text-nv-olive">Locally sourced, organic ingredients whenever possible</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-nv-sand text-center">
          <div className="w-12 h-12 bg-nv-terracotta rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">❤️</span>
          </div>
          <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">Warm Hospitality</h3>
          <p className="font-body text-nv-olive">Experience the warmth of Kurdish hospitality</p>
        </div>
      </div>
    </div>
  );
}
