'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { pdfVariants } from '@/lib/resume-data';
import { createPdfDocuments, type PdfDocuments } from './pdf-documents';
import { PdfPage } from './PdfPage';
import { PdfPreview } from './PdfPreview';
import styles from './gallery.module.css';

export type GalleryVariant = (typeof pdfVariants)[number];

function Thumbnail({ variant, documents, onOpen }: {
  variant: GalleryVariant;
  documents: PdfDocuments;
  onOpen: (variant: GalleryVariant, invoker: HTMLButtonElement) => void;
}) {
  const card = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(false);
  const [pdf, setPdf] = useState<PDFDocumentProxy>();
  const [scale, setScale] = useState(0);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const fail = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '300px' });
    if (card.current) observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let pageWidth = 0;
    setFailed(false);
    const resize = () => {
      if (!cancelled && pageWidth && card.current) setScale(card.current.clientWidth / pageWidth);
    };
    const observer = new ResizeObserver(resize);
    void documents.load(variant.value).then(async (loaded) => {
      const page = await loaded.getPage(1);
      if (cancelled) return;
      pageWidth = page.getViewport({ scale: 1 }).width;
      setPdf(loaded);
      resize();
      observer.observe(card.current!);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; observer.disconnect(); };
  }, [near, documents, variant.value, attempt]);

  return (
    <li>
      <button ref={card} type="button" className={styles.card} aria-label={`Preview ${variant.label}`} onClick={(event) => onOpen(variant, event.currentTarget)}>
        <span className={styles.paper}>
          {failed ? <span>Preview unavailable</span> : pdf && scale > 0
            ? <PdfPage pdf={pdf} pageNumber={1} scale={scale} label={variant.label} onError={fail} />
            : <span role="status">Loading preview…</span>}
        </span>
        <span className={styles.label}>{variant.label}</span>
      </button>
      {failed && <div className={styles.cardRecovery}><button type="button" onClick={() => setAttempt((n) => n + 1)}>Retry</button><a href={`/resume/${variant.value}`} target="_blank" rel="noreferrer">Open PDF</a></div>}
    </li>
  );
}

export function ResumeGallery({ variants }: { variants: GalleryVariant[] }) {
  const [documents, setDocuments] = useState<PdfDocuments>();
  const [selected, setSelected] = useState<GalleryVariant>();
  const [inverted, setInverted] = useState(true);
  const invoker = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const store = createPdfDocuments();
    setDocuments(store);
    return () => store.dispose();
  }, []);
  const close = useCallback(() => { setSelected(undefined); invoker.current?.focus(); }, []);
  const open = (variant: GalleryVariant, activatedCard: HTMLButtonElement) => {
    invoker.current = activatedCard;
    setSelected(variant);
  };
  const toggleColors = () => setInverted((current) => !current);
  const selectedIndex = variants.findIndex((variant) => variant.id === selected?.id);
  const navigate = (direction: -1 | 1) => {
    const variant = variants[selectedIndex + direction];
    if (variant) setSelected(variant);
  };

  return (
    <div className={`${styles.gallery} ${inverted ? styles.inverted : ''}`}>
      <svg width="0" height="0" className={styles.colorFilter} aria-hidden="true" focusable="false">
        <defs>
          <filter id="resume-gallery-colors" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={`${240 / 255} ${13 / 255}`} />
              <feFuncG type="table" tableValues={`${246 / 255} ${17 / 255}`} />
              <feFuncB type="table" tableValues={`${252 / 255} ${23 / 255}`} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Resumes</h1>
          <button type="button" className={styles.invertToggle} aria-pressed={inverted} onClick={toggleColors}>Invert PDF colors</button>
        </div>
        <ul className={styles.grid}>
          {variants.map((variant) => documents
            ? <Thumbnail key={variant.id} variant={variant} documents={documents} onOpen={open} />
            : <li key={variant.id}><span>{variant.label}</span></li>)}
        </ul>
      </div>
      {selected && documents && <PdfPreview key={selected.id} variant={selected} documents={documents} inverted={inverted} onToggleColors={toggleColors} hasPrevious={selectedIndex > 0} hasNext={selectedIndex < variants.length - 1} onNavigate={navigate} onClose={close} />}
    </div>
  );
}
