import React from 'react';
import Link from 'next/link';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

interface PersonalInfo {
  name: string;
  greeting?: string;
  title: string;
  profilePhoto?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    exif?: {
      location?: string;
      aperture?: string;
      shutter?: string;
      iso?: string;
      model?: string;
      task?: string;
    };
    detectionVariant?: {
      src: string;
      exif?: {
        location?: string;
        aperture?: string;
        shutter?: string;
        iso?: string;
        model?: string;
        task?: string;
      };
    };
  };
  bio: {
    intro?: string;
    experience?: string;
    leadership?: string;
    tagline?: string;
    // Fallback fields
    short?: string;
    long?: string;
  };
}

interface ParallaxBioSectionProps {
  personal: PersonalInfo;
}

/**
 * Bio section component for parallax layout
 * Displays extended professional narrative with proper viewport fitting
 */
export const ParallaxBioSection: React.FC<ParallaxBioSectionProps> = ({
  personal
}) => {
  // Use structured bio fields with fallbacks to legacy fields
  const intro = personal.bio.intro || personal.bio.short || '';
  const experience = personal.bio.experience || '';
  const leadership = personal.bio.leadership || personal.bio.long || '';
  const tagline = personal.bio.tagline || '';

  return (
    <div className="parallax-panel parallax-panel-spacious">
      <h2 className="parallax-section-title">
        {personal.greeting || `Hi, I'm ${personal.name}`}
      </h2>

      {personal.profilePhoto && (
        <div className="parallax-bio-photo-wrap">
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

      <div className="parallax-copy-stack">
        {intro && <p className="parallax-copy-lead">{intro}</p>}
        <Link
          href="/academics"
          className="inline-flex min-h-11 w-fit items-center font-semibold text-[var(--accent-color)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-color)]"
        >
          Academic Record
        </Link>
        {experience && <p className="parallax-copy-body">{experience}</p>}
        {leadership && <p className="parallax-copy-body parallax-copy-muted">{leadership}</p>}
        {tagline && <p className="parallax-copy-tagline">{tagline}</p>}
      </div>
    </div>
  );
};
