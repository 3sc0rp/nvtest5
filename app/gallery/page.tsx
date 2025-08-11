import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Nature Village',
  description: 'Explore our gallery showcasing the atmosphere, dishes, and culture at Nature Village Kurdish Restaurant.',
};

export default function GalleryPage() {
  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-8">
          Gallery
        </h1>
        <div className="text-center">
          <p className="font-body text-nv-olive text-lg">
            Explore our gallery showcasing the atmosphere, dishes, and culture at Nature Village.
          </p>
        </div>
      </div>
    </div>
  );
}
