import Image from 'next/image';
import { getPatternPath } from '@/lib/assets';
import clsx from 'clsx';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, title, description, className, children }: SectionProps) {
  return (
    <section id={id} className={clsx('relative py-12', className)}>
      {(title || description) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            {title && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-nv-ink">{title}</h2>
            )}
            {description && (
              <p className="font-body text-nv-olive mt-2 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
          {/* Divider */}
          <div className="mt-6 h-6 w-full overflow-hidden opacity-60" aria-hidden>
            <div className="relative h-full" style={{ backgroundImage: `url(${getPatternPath('pomegranate')})`, backgroundRepeat: 'repeat', backgroundSize: 'auto 80%' }} />
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
