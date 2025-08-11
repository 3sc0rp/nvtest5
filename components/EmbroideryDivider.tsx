// components/EmbroideryDivider.tsx
import Image from 'next/image';
import { getPatternPath } from '@/lib/assets';

interface EmbroideryDividerProps {
  title?: string;
}

export default function EmbroideryDivider({ title }: EmbroideryDividerProps) {
  return (
    <div className="flex items-center gap-3 my-8">
      <Image
        src={getPatternPath('pomegranate-border.svg')}
        alt=""
        width={120}
        height={16}
        priority={false}
      />
      {title ? <span className="text-sm tracking-wide uppercase">{title}</span> : null}
      <Image
        src={getPatternPath('pomegranate-border.svg')}
        alt=""
        width={120}
        height={16}
        priority={false}
      />
    </div>
  );
}