import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              letterSpacing: '0.5rem',
              color: '#00ff00',
              textShadow: '0 0 10px #00ff00',
              marginBottom: 20,
            }}
          >
            kikOS
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#00ff00',
              opacity: 0.7,
              marginBottom: 60,
            }}
          >
            Version 4.2.0
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              fontSize: 24,
              color: '#00ff00',
              marginBottom: 40,
            }}
          >
            <div>Initializing system...</div>
            <div>Loading kernel modules...</div>
            <div>Starting network services...</div>
            <div>Loading user profile...</div>
            <div>kikOS ready.</div>
          </div>
          <div
            style={{
              width: 600,
              height: 6,
              backgroundColor: '#003300',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00ff00',
                boxShadow: '0 0 10px #00ff00',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
