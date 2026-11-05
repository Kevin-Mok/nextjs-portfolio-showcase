/**
 * Canonical resume PDF variants used by generation and validation scripts.
 *
 * Keep this list in sync with the variant definitions in `lib/resume-data.ts`.
 */
export const resumePdfVariants = [
  { id: 'ai-web-dev', fileName: 'kevin-mok-resume-ai-web-dev.pdf' },
  { id: 'web-dev', fileName: 'kevin-mok-resume-web-dev.pdf' },
  {
    id: 'ai-agentic',
    fileName: 'kevin-mok-resume-ai-agentic.pdf',
    bottomWhitespaceMinPts: 0,
    bottomWhitespaceMaxPts: 15,
  },
  { id: 'web-dev-django', fileName: 'kevin-mok-resume-web-dev-django.pdf' },
  { id: 'python', fileName: 'kevin-mok-resume-python.pdf' },
  { id: 'python-nerdwallet', fileName: 'kevin-mok-resume-python-nerdwallet.pdf' },
  { id: 'aws', fileName: 'kevin-mok-resume-aws.pdf' },
  { id: 'aws-web-dev', fileName: 'kevin-mok-resume-aws-web-dev.pdf' },
  { id: 'aws-python', fileName: 'kevin-mok-resume-aws-python.pdf' },
  { id: 'it-support', fileName: 'kevin-mok-resume-it-support.pdf' },
  { id: 'it-support-sql', fileName: 'kevin-mok-resume-it-support-sql.pdf' },
  { id: 'it-support-aws', fileName: 'kevin-mok-resume-it-support-aws.pdf' },
  { id: 'sales', fileName: 'kevin-mok-resume-sales.pdf' },
  { id: 'call-centre', fileName: 'kevin-mok-resume-call-centre.pdf' },
  { id: 'backend-api', fileName: 'kevin-mok-resume-backend-api.pdf' },
  { id: 'developer-tools', fileName: 'kevin-mok-resume-developer-tools.pdf' },
  { id: 'automation-data', fileName: 'kevin-mok-resume-automation-data.pdf' },
  { id: 'cloud-native', fileName: 'kevin-mok-resume-cloud-native.pdf' },
  { id: 'frontend', fileName: 'kevin-mok-resume-frontend.pdf' },
  { id: 'applied-ai', fileName: 'kevin-mok-resume-applied-ai.pdf' },
  { id: 'qa-automation', fileName: 'kevin-mok-resume-qa-automation.pdf' },
  { id: 'browser-extensions', fileName: 'kevin-mok-resume-browser-extensions.pdf' },
  { id: 'linux-self-hosting', fileName: 'kevin-mok-resume-linux-self-hosting.pdf' },
  { id: 'support-automation', fileName: 'kevin-mok-resume-support-automation.pdf' },
  { id: 'technical-documentation', fileName: 'kevin-mok-resume-technical-documentation.pdf' },
];

export const resumePdfFileNames = resumePdfVariants.map((variant) => variant.fileName);
