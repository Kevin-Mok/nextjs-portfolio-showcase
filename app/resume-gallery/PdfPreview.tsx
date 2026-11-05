'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { GalleryVariant } from './ResumeGallery';
import type { PdfDocuments } from './pdf-documents';
import { PdfPage } from './PdfPage';
import styles from './gallery.module.css';

export function PdfPreview({ variant, documents, inverted, onToggleColors, hasPrevious, hasNext, onNavigate, onClose }: {
  variant: GalleryVariant;
  documents: PdfDocuments;
  inverted: boolean;
  onToggleColors: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onNavigate: (direction: -1 | 1) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy>();
  const [pageSize, setPageSize] = useState({ width: 612, height: 792 });
  const [fit, setFit] = useState(true);
  const [percentage, setPercentage] = useState(100);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const fail = useCallback(() => setError(true), []);

  useEffect(() => {
    const element = dialog.current!;
    const originalOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalRootOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setError(false);
    setPdf(undefined);
    void documents.load(variant.value).then(async (loaded) => {
      const firstPage = await loaded.getPage(1);
      if (cancelled) return;
      const { width, height } = firstPage.getViewport({ scale: 1 });
      setPageSize({ width, height });
      setPdf(loaded);
    }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [documents, variant.value, attempt]);

  useEffect(() => {
    const element = scroller.current;
    if (!fit || !element) return;
    const resize = () => {
      const scale = Math.min((element.clientWidth - 32) / pageSize.width, (element.clientHeight - 32) / pageSize.height);
      setPercentage(Math.max(25, Math.min(250, Math.floor(scale * 100))));
      element.scrollTo(0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit, pageSize]);

  const zoom = (delta: number) => {
    setFit(false);
    setPercentage((current) => Math.max(25, Math.min(250, current + delta)));
  };
  const close = () => {
    // Remove modal inertness before React unmounts it and restores the invoker's focus.
    dialog.current?.close();
    onClose();
  };

  return (
    <dialog ref={dialog} aria-labelledby="resume-preview-name" className={styles.dialog}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
      <div className={styles.viewer}>
        <div className={styles.toolbar}>
          <div className={styles.documentNavigation}>
            <button type="button" aria-label="Previous resume" disabled={!hasPrevious} onClick={() => onNavigate(-1)}>Prev</button>
            <button type="button" aria-label="Next resume" disabled={!hasNext} onClick={() => onNavigate(1)}>Next</button>
            <h2 id="resume-preview-name">{variant.label}</h2>
          </div>
          <div className={styles.tools}>
            <button type="button" aria-label="Zoom out" disabled={!pdf || percentage <= 25} onClick={() => zoom(-25)}>−</button>
            <output role="status" aria-label="Zoom level">{percentage}%</output>
            <button type="button" aria-label="Zoom in" disabled={!pdf || percentage >= 250} onClick={() => zoom(25)}>+</button>
            <button type="button" aria-pressed={fit} disabled={!pdf} onClick={() => setFit(true)}>Fit page</button>
            <button type="button" aria-pressed={inverted} onClick={onToggleColors}>Invert PDF colors</button>
            <button type="button" onClick={close} autoFocus>Close</button>
          </div>
        </div>
        <div ref={scroller} role="region" aria-label="PDF pages" tabIndex={0} className={styles.scroller}>
          {error ? <div className={styles.message}><p role="alert">Could not load this PDF. Retry or open the PDF directly.</p><button type="button" onClick={() => setAttempt((n) => n + 1)}>Retry</button></div>
            : pdf ? <div className={styles.pages}>{Array.from({ length: pdf.numPages }, (_, i) => <PdfPage key={`${attempt}-${i}`} pdf={pdf} pageNumber={i + 1} scale={percentage / 100} label={variant.label} accessibleText onError={fail} />)}</div>
              : <p role="status" className={styles.message}>Loading PDF…</p>}
        </div>
        <a className={styles.directLink} href={`/resume/${variant.value}`} target="_blank" rel="noreferrer">Open PDF</a>
      </div>
    </dialog>
  );
}
