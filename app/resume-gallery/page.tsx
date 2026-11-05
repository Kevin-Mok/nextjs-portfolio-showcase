import type { Metadata } from 'next';
import { pdfVariants } from '@/lib/resume-data';
import { ResumeGallery } from './ResumeGallery';

export const metadata: Metadata = {
  title: 'Resumes',
  robots: { index: false, follow: false },
};

export default function ResumeGalleryPage() {
  return <ResumeGallery variants={pdfVariants} />;
}
