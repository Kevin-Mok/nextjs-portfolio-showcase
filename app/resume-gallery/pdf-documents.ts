import type { PDFDocumentLoadingTask } from 'pdfjs-dist';

let library: Promise<typeof import('pdfjs-dist')> | undefined;

function loadLibrary() {
  library ??= import('pdfjs-dist').then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url,
    ).toString();
    return pdfjs;
  }).catch((error: unknown) => {
    library = undefined;
    throw error;
  });
  return library;
}

export function createPdfDocuments() {
  const tasks = new Map<string, Promise<PDFDocumentLoadingTask>>();
  let disposed = false;

  return {
    async load(file: string) {
      let pending = tasks.get(file);
      if (!pending) {
        pending = loadLibrary().then((pdfjs) => {
          if (disposed) throw new Error('Gallery closed');
          return pdfjs.getDocument(`/resume/${file}`);
        });
        tasks.set(file, pending);
      }
      try {
        return await (await pending).promise;
      } catch (error) {
        if (tasks.get(file) === pending) tasks.delete(file);
        void pending.then((task) => task.destroy()).catch(() => {});
        throw error;
      }
    },
    dispose() {
      disposed = true;
      for (const task of tasks.values()) void task.then((loaded) => loaded.destroy()).catch(() => {});
      tasks.clear();
    },
  };
}

export type PdfDocuments = ReturnType<typeof createPdfDocuments>;
