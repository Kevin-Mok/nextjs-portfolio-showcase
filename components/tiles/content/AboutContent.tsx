'use client';

import React from 'react';
import Link from 'next/link';
import { usePersonalInfo, useSystemInfo } from '@/lib/config';
import { AboutTechGrid } from '../about/AboutTechGrid';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

/**
 * About content component
 * Displays personal bio information, profile photo, and technology grid
 */
const AboutContentComponent: React.FC = () => {
  const personal = usePersonalInfo();
  const system = useSystemInfo();

  return (
    <div>
      <div style={{
        color: 'var(--theme-text)',
        fontSize: 'calc(clamp(1rem, 1rem + 1.5cqi, 1.1rem) - 2px)',
        paddingLeft: '8px',
        paddingRight: '0px'
      }}>
        {/* Header - Large, full-width, at top */}
        <h1
          className="font-bold"
          style={{
            color: 'var(--accent-color)',
            fontSize: 'calc(clamp(1.1rem, 1.1rem + 1.5cqi, 1.5rem) - 2px)',
            marginBottom: '16px'
          }}
        >
          {personal.greeting || `Hi, I'm ${personal.name}`}
        </h1>

        {/* Profile Photo - Float right, aligned with intro text */}
        {personal.profilePhoto && (
          <div
            className="mb-4"
            style={{
              width: 'clamp(280px, 35%, 400px)',
              float: 'right',
              marginLeft: '32px',
              marginBottom: '12px',
              position: 'relative',
              zIndex: 10
            }}
          >
            <ProfilePhoto
              src={personal.profilePhoto.src}
              alt={personal.profilePhoto.alt}
              width={personal.profilePhoto.width}
              height={personal.profilePhoto.height}
              exif={personal.profilePhoto.exif}
              detectionVariant={personal.profilePhoto.detectionVariant}
            />
          </div>
        )}

        {/* Introduction */}
        {personal.bio.intro && (
          <p className="leading-relaxed mb-3">
            {personal.bio.intro}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          <Link
            href="/resume"
            className="hover:underline"
            style={{
              color: 'var(--accent-color)',
              fontWeight: 600,
              textDecoration: 'none',
              alignSelf: 'center'
            }}
          >
            View Resume
          </Link>

          {system.upwork && (
            <a
              href={system.upwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{
                color: 'var(--theme-text-dimmed)',
                textDecoration: 'none',
                alignSelf: 'center'
              }}
            >
              Upwork
            </a>
          )}
        </div>

        {/* Experience */}
        {personal.bio.experience && (
          <p className="leading-relaxed mb-3" style={{ opacity: 0.95 }}>
            {personal.bio.experience}
          </p>
        )}

        {/* Leadership */}
        {personal.bio.leadership && (
          <p className="leading-relaxed mb-3" style={{ opacity: 0.9 }}>
            {personal.bio.leadership}
          </p>
        )}

        {/* Tagline - last element adjacent to image */}
        {personal.bio.tagline && (
          <p
            className="italic pt-1 mb-3"
            style={{
              color: 'var(--theme-text-dimmed)',
              opacity: 0.8,
              fontSize: 'clamp(0.875rem, 0.875rem + 1cqi, 1rem)'
            }}
          >
            {personal.bio.tagline}
          </p>
        )}

        {/* Clear float - forces tech grid below image */}
        <div style={{ clear: 'both' }} />

        {/* Technology Icons Grid - below image, full width */}
        <div style={{ marginTop: '4px' }}>
          <AboutTechGrid />
        </div>
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export const AboutContent = React.memo(AboutContentComponent);
