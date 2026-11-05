'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import styles from './gallery.module.css';

interface PdfPageProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  label: string;
  accessibleText?: boolean;
  onError: () => void;
}

export function PdfPage({ pdf, pageNumber, scale, label, accessibleText = false, onError }: PdfPageProps) {
  const host = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let task: RenderTask | undefined;
    const target = host.current;
    setRendering(true);
    void (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;
      const viewport = page.getViewport({ scale });
      const density = window.devicePixelRatio || 1;
      // Each render owns its canvas so a cancelled zoom cannot paint into its replacement.
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width * density);
      canvas.height = Math.ceil(viewport.height * density);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      canvas.dataset.scale = String(scale);
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', `${label}, page ${pageNumber}`);
      task = page.render({
        canvas,
        viewport,
        transform: [density, 0, 0, density, 0, 0],
      });
      await task.promise;
      if (!cancelled) {
        target?.replaceChildren(canvas);
        setRendering(false);
      }
    })().catch(() => { if (!cancelled) onError(); });
    return () => { cancelled = true; task?.cancel(); };
  }, [pdf, pageNumber, scale, label, onError]);

  useEffect(() => {
    if (!accessibleText) return;
    let cancelled = false;
    void pdf.getPage(pageNumber).then((page) => page.getTextContent()).then((content) => {
      if (!cancelled) setText(content.items.map((item) => 'str' in item ? item.str : '').join(' '));
    }).catch(() => { if (!cancelled) onError(); });
    return () => { cancelled = true; };
  }, [pdf, pageNumber, accessibleText, onError]);

  return (
    <div className={styles.pdfPage} aria-busy={rendering}>
      {rendering && <span role="status" className={styles.renderStatus}>Rendering PDF…</span>}
      <div key={scale} ref={host} />
      {accessibleText && <p className={styles.screenReaderText}>{text}</p>}
    </div>
  );
}
