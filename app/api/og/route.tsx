
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Nature Village';
  const subtitle = searchParams.get('subtitle') || 'Kurdish Restaurant';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F1A14',
        color: '#FBF7ED',
        position: 'relative',
        fontFamily: 'serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.25) 0%, rgba(15,26,20,0) 60%)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,26,20,0) 0%, rgba(15,26,20,0.3) 100%)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 64, fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 28, color: '#E8D8B5' }}>{subtitle}</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
