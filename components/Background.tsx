import React from 'react';

const chessboardImageBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDggOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjY2E4YTA0Ii8+PHBhdGggZD0iTTAgMGgxdjFIMHogTTIgMGgxdjFIMnogTTQgMGgxdjFIMHogTTYgMGgxdjFINnogTTEgMWgxdjFIMXogTTMgMWgxdjFIM3ogTTUgMWgxdjFINXogTTcgMWgxdjFIN3ogTTAgMmgxdjFIMHogTTIgMmgxdjFIMnogTTQgMmgxdjFIMHogTTYgMmgxdjFINnogTTEgM2gxdjFIMXogTTMgM2gxdjFIM3ogTTUgM2gxdjFINXogTTcgM2gxdjFIN3ogTTAgNGgxdjFIMHogTTIgNGgxdjFIMnogTTQgNGgxdjFIMHogTTYgNGgxdjFINnogTTEgNWgxdjFIMXogTTMgNWgxdjFIM3ogTTUgNWgxdjFINXogTTcgNWgxdjFIN3ogTTAgNmgxdjFIMHogTTIgNmgxdjFIMnogTTQgNmgxdjFIMHogTTYgNmgxdjFINnogTTEgN2gxdjFIMXogTTMgN2gxdjFIM3ogTTUgN2gxdjFINXogTTcgN2gxdjFIN3oiIGZpbGw9IiMxYzE5MTciLz48L3N2Zz4=';

export const Background: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--main-bg)]">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
            style={{
                backgroundImage: `url(${chessboardImageBase64})`,
                filter: 'blur(4px)',
                transform: 'scale(1.1)',
            }}
        />

        <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[50vw] max-w-4xl h-auto text-[var(--accent-color)] opacity-20"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path
                d="M22 10C22.28 10.92 23.32 12.3 23.32 12.3L22.68 14.54L24.92 15.22L24.6 17.54L27.6 18.22L27.6 20.9L25.92 22.22L26.6 25.22L23.92 26.22L23.6 29.54L20.6 29.86L20.28 32.54L16.96 32.54L16.32 30.22L13.32 30.22L12.36 32.54H9L9.32 30.22L6.32 29.22L6.64 26.54L4 25.54L4.68 22.54L3 21.22L3 18.54L6 17.86L5.68 15.54L8 14.86L7.32 12.3L8.36 10.92L9.32 10H14.68L15.32 7.68L17.32 6.36L19.32 7.68L20.32 10H22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                style={{ filter: 'url(#neon-glow)' }}
            />
        </svg>
    </div>
);