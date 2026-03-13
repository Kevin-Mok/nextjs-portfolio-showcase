import type { Metadata } from 'next';
import LayoutManager from '@/components/layout/LayoutManager';
import { FocusProvider } from '@/contexts/FocusContext';
import { ViewProvider } from '@/contexts/ViewContext';

const homepageTitle = 'Kevin Mok | Full-Stack Engineer Open to Work';
const homepageDescription =
  'Full-stack engineer open to work. I build production web apps and AI systems with TypeScript, React, Next.js, Node.js, and cloud tooling. View my resume on kevin-mok.com/resume or hire me on Upwork.';

export const metadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    type: 'website',
    url: 'https://kevin-mok.com',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: homepageTitle,
    description: homepageDescription,
    images: ['/opengraph-image.png'],
  },
};

export default function Home() {
  // ThemeProvider comes from root layout (app/layout.tsx)
  // Only need Focus/View providers for homepage layout management
  return (
    <FocusProvider>
      <ViewProvider>
        <LayoutManager />
      </ViewProvider>
    </FocusProvider>
  );
}
