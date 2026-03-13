'use client';

import React, { useState, useEffect } from 'react';
import { archLogoASCII, archLogoCompact, minimalLogo, kmokBlockLetters, dlBlockLetters, kevinBlockLetters } from '@/components/assets/archAscii';
import { usePersonalInfo, useSystemInfo } from '@/lib/config';
import { FONT_SIZES } from '@/lib/constants/typography';

interface NeofetchTileProps {
  isBlurred?: boolean;
  layout?: 'tile' | 'parallax';
}

const NeofetchTile: React.FC<NeofetchTileProps> = ({ isBlurred = false, layout = 'tile' }) => {
  const [windowWidth, setWindowWidth] = useState(1024);
  const personal = usePersonalInfo();
  const system = useSystemInfo();

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get ASCII logo preference from environment or default to kevin
  const logoType = process.env.NEXT_PUBLIC_ASCII_LOGO || 'kevin';

  // Switch ASCII art based on screen size and preference
  let asciiArt;
  if (logoType === 'kevin') {
    asciiArt = kevinBlockLetters;
  } else if (logoType === 'kmok') {
    asciiArt = windowWidth < 400 ? dlBlockLetters : kmokBlockLetters;
  } else if (logoType === 'arch') {
    asciiArt = windowWidth < 400 ? archLogoCompact : archLogoASCII;
  } else {
    asciiArt = minimalLogo;
  }

  // Determine gap and font sizes based on layout
  // Tile layout uses container queries (cqw) for responsive sizing relative to tile size
  // Parallax layout uses viewport queries (vw) for responsive sizing relative to viewport
  // ASCII art max capped lower to prevent overflow in fixed-height tile
  const gapClass = layout === 'parallax' ? 'gap-6 sm:gap-8 md:gap-10' : 'gap-4 sm:gap-5 md:gap-6';
  const asciiFontSize = layout === 'parallax' ?
    (logoType === 'kmok' ? 'clamp(0.55rem, 1vw, 0.75rem)' : 'clamp(0.5rem, 1.4vw, 0.7rem)') :
    (logoType === 'kmok' ? 'clamp(0.3rem, 1.5cqw, 0.75rem)' : 'clamp(0.22rem, 1.5cqw, 0.65rem)');
  const infoFontSize = layout === 'parallax' ? 'clamp(0.75rem, 1.2vw, 0.875rem)' : 'clamp(0.94rem, 2cqw, 1.54rem)';

  return (
    <div
      className={`flex ${gapClass} font-mono transition-all duration-300 w-full h-full`}
      style={{
        color: isBlurred ? 'rgba(var(--theme-text-rgb), 0.7)' : 'var(--theme-text)',
        fontSize: layout === 'tile' ? FONT_SIZES.sm : undefined
      }}>
      {/* ASCII Art Column */}
      <div className="flex-shrink-0"
        style={{
          width: logoType === 'kmok' ? 'auto' : (layout === 'parallax' ? '40%' : '35%'),
          minWidth: logoType === 'kmok' ? 'auto' : '100px',
          maxWidth: logoType === 'kmok' ? 'auto' : '330px'
        }}>
        <pre
          className={`leading-tight transition-all duration-300`}
          style={{
            color: isBlurred ? 'rgba(var(--accent-color-rgb), 0.6)' : 'var(--accent-color)',
            background: 'transparent',
            padding: 0,
            border: 'none',
            margin: 0,
            fontSize: asciiFontSize,
            whiteSpace: 'pre',
            overflow: 'hidden'
          }}
        >
{asciiArt}
        </pre>
      </div>

      {/* Info Column */}
      <div className="flex-1 flex flex-col justify-start h-full">
        <div
          className={`font-bold mb-1 transition-all duration-300`}
          style={{
            color: isBlurred ? 'rgba(var(--accent-color-rgb), 0.6)' : 'var(--accent-color)'
          }}
        >
          <span style={{ color: 'var(--theme-success)' }}>{personal.username}</span>@<span style={{ color: 'var(--theme-info)' }}>portfolio</span>
          <div style={{
            color: isBlurred ? 'rgba(var(--theme-text-dimmed), 0.4)' : 'rgba(var(--theme-text-dimmed), 0.6)'
          }}>---------------</div>
        </div>

        <div className="flex flex-col flex-1 min-h-0" style={{ fontSize: infoFontSize }}>
          <div className="space-y-1">
            {/* GitHub */}
            {system.github && (
              <div>
                <span className={`font-bold transition-all duration-300`} style={{ color: isBlurred ? 'rgba(var(--theme-primary-rgb), 0.6)' : 'var(--theme-primary)' }}>{system.github.platform}</span>:{' '}
                <a
                  href={system.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200 cursor-pointer"
                  style={{ color: 'var(--accent-color)', pointerEvents: 'auto' }}
                >
                  {system.github.username}
                </a>
              </div>
            )}

            {/* Twitter/X */}
            {system.twitter && (
              <div>
                <span className={`font-bold transition-all duration-300`} style={{ color: isBlurred ? 'rgba(var(--theme-primary-rgb), 0.6)' : 'var(--theme-primary)' }}>{system.twitter.platform}</span>:{' '}
                <a
                  href={system.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200 cursor-pointer"
                  style={{ color: 'var(--accent-color)', pointerEvents: 'auto' }}
                >
                  {system.twitter.username}
                </a>
              </div>
            )}

            {/* LinkedIn */}
            {system.linkedin && (
              <div>
                <span className={`font-bold transition-all duration-300`} style={{ color: isBlurred ? 'rgba(var(--theme-primary-rgb), 0.6)' : 'var(--theme-primary)' }}>{system.linkedin.platform}</span>:{' '}
                <a
                  href={system.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200 cursor-pointer"
                  style={{ color: 'var(--accent-color)', pointerEvents: 'auto' }}
                >
                  {system.linkedin.username}
                </a>
              </div>
            )}

            {/* Upwork */}
            {system.upwork && (
              <div>
                <span className={`font-bold transition-all duration-300`} style={{ color: isBlurred ? 'rgba(var(--theme-primary-rgb), 0.6)' : 'var(--theme-primary)' }}>{system.upwork.platform}</span>:{' '}
                <a
                  href={system.upwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200 cursor-pointer"
                  style={{ color: 'var(--accent-color)', pointerEvents: 'auto' }}
                >
                  {system.upwork.username}
                </a>
              </div>
            )}

            {/* Email */}
            <div>
              <span className={`font-bold transition-all duration-300`} style={{ color: isBlurred ? 'rgba(var(--theme-primary-rgb), 0.6)' : 'var(--theme-primary)' }}>Email</span>:{' '}
              <a
                href="mailto:me@kevin-mok.com"
                className="hover:underline transition-colors duration-200 cursor-pointer"
                style={{ color: 'var(--accent-color)', pointerEvents: 'auto' }}
              >
                me@kevin-mok.com
              </a>
            </div>
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(NeofetchTile);
