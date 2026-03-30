/**
 * Canonical resume PDF variants used by generation and validation scripts.
 *
 * Keep this list in sync with the variant definitions in `lib/resume-data.ts`.
 */
export const resumePdfVariants = [
  { id: 'web-dev', fileName: 'kevin-mok-resume-web-dev.pdf' },
  {
    id: 'ai-agentic',
    fileName: 'kevin-mok-resume-ai-agentic.pdf',
    bottomWhitespaceMinPts: 0,
    bottomWhitespaceMaxPts: 15,
  },
  { id: 'web-dev-django', fileName: 'kevin-mok-resume-web-dev-django.pdf' },
  { id: 'python', fileName: 'kevin-mok-resume-python.pdf' },
  { id: 'aws', fileName: 'kevin-mok-resume-aws.pdf' },
  { id: 'aws-web-dev', fileName: 'kevin-mok-resume-aws-web-dev.pdf' },
  { id: 'aws-python', fileName: 'kevin-mok-resume-aws-python.pdf' },
  { id: 'it-support', fileName: 'kevin-mok-resume-it-support.pdf' },
  { id: 'it-support-sql', fileName: 'kevin-mok-resume-it-support-sql.pdf' },
  { id: 'it-support-aws', fileName: 'kevin-mok-resume-it-support-aws.pdf' },
  { id: 'sales', fileName: 'kevin-mok-resume-sales.pdf' },
  { id: 'call-centre', fileName: 'kevin-mok-resume-call-centre.pdf' },
];

export const resumePdfFileNames = resumePdfVariants.map((variant) => variant.fileName);
