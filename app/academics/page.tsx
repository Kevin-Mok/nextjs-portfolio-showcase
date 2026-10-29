import type { Metadata } from 'next';
import { AcademicExplorer } from '@/components/academics/AcademicExplorer';
import { FramedPageLayout } from '@/components/layout/FramedPageLayout';
import '@/app/styles/academics.css';

export const metadata: Metadata = {
  title: 'Academic Record - Kevin Mok',
  description: 'Explore Kevin Mok’s University of Toronto coursework by subject, year, and programming language.',
};

export default function AcademicsPage() {
  return (
    <FramedPageLayout autoFocus={false}>
      <AcademicExplorer />
    </FramedPageLayout>
  );
}
