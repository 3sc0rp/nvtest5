import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-nv-paper flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-nv-ink mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-nv-olive mb-4">Page Not Found</h2>
        <p className="text-nv-olive mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="space-x-4">
          <Link 
            href="/en" 
            className="inline-block bg-nv-terracotta text-nv-paper px-6 py-3 rounded-lg font-semibold hover:bg-nv-terracotta/90 transition-colors"
          >
            Go Home (English)
          </Link>
          <Link 
            href="/ku" 
            className="inline-block bg-nv-olive text-nv-paper px-6 py-3 rounded-lg font-semibold hover:bg-nv-olive/90 transition-colors"
          >
            گەڕانەوە بۆ ماڵەوە (کوردی)
          </Link>
        </div>
      </div>
    </div>
  );
}
