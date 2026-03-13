import React from 'react';
import Link from 'next/link';
import { getPortfolioConfig } from '@/config/portfolio.config';

/**
 * Resume CTA section for mobile parallax layout.
 * Keeps homepage concise while routing to the full resume page.
 */
export const ParallaxResumeCtaSection: React.FC = () => {
  const upworkUrl =
    getPortfolioConfig().system.upwork?.url ||
    'https://www.upwork.com/freelancers/kevinmok';

  return (
    <div className="parallax-panel">
      <h2 className="parallax-section-title">Resume</h2>
      <p className="parallax-section-subtitle">
        See my one-page resume, grab the PDF, or hire me on Upwork.
      </p>

      <div className="parallax-cta-row">
        <Link href="/resume" className="parallax-cta-button">
          Open Resume
        </Link>
        <a
          href="/resume/kevin-mok-resume-web-dev.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="parallax-cta-link"
        >
          PDF
        </a>
        <a
          href={upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="parallax-cta-link"
        >
          Upwork
        </a>
      </div>
    </div>
  );
};
