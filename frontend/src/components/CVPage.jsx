import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://portfolioo-backend.onrender.com';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

function buildFileUrl(path) {
  if (!path) return '';
  return `${BACKEND_URL}/${String(path).replace(/\\/g, '/')}`;
}

export default function CVPage() {
  const [cv, setCv] = useState(null);
  const [status, setStatus] = useState('loading');
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(520);

  useEffect(() => {
    let isMounted = true;

    fetch(`${BACKEND_URL}/api/cv`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load CV');
        }

        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (data) {
          setCv(data);
          setStatus('success');
          return;
        }

        setStatus('empty');
      })
      .catch((error) => {
        console.error('Failed to fetch CV:', error);
        if (isMounted) setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fileUrl = buildFileUrl(cv?.path);
  const isPdf = cv?.filename?.toLowerCase().endsWith('.pdf');

  const handleDocumentLoad = ({ numPages: loadedPages }) => {
    setNumPages(loadedPages);
  };

  useEffect(() => {
    const updateWidth = () => {
      const maxWidth = Math.min(540, window.innerWidth - 80);
      setPageWidth(maxWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <main className="page-shell section-surface min-h-screen text-white pt-24 overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-5 md:px-6 py-8 md:py-10">
        <div className="pb-6">
          <div className="text-left">
            <p className="text-24px] font-mono uppercase tracking-[0.4em] text-blue-400">
               CV
            </p>
           
          </div>
        </div>

        <div className="grid flex-1 items-start gap-6 py-8 lg:grid-cols-2 w-full">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.3em] text-white/90">
              <ShieldCheck size={14} />
              Verified document source
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
              Curriculum
              <span className="block bg-gradient-to-b from-white via-white to-white/35 bg-clip-text text-transparent italic">
                Vitae
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              View or download my current CV below. It’s kept up to date, so you’re always seeing the newest version.
            </p>

            {status === 'loading' && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                  Loading current CV...
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
                <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                  Unable to fetch CV
                </p>
                <p className="mt-3 text-sm text-red-100/80">
                  The backend did not return a valid CV record. Please try again later.
                </p>
              </div>
            )}

            {status === 'empty' && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/75">
                <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                  No CV uploaded yet
                </p>
                <p className="mt-3 text-sm text-white/55">
                  The admin panel has not published a CV file yet.
                </p>
              </div>
            )}

            {status === 'success' && cv && (
              <div className="mt-10">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-blue-50 w-full sm:w-auto"
                    >
                      <ExternalLink size={16} />
                      Preview CV
                    </a>
                    <a
                      href={fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 w-full sm:w-auto"
                    >
                      <Download size={16} />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="relative w-full">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10" style={{ background: "rgba(0,0,0,0.2)", boxShadow: "0 24px 70px rgba(0,0,0,0.45)" }}>
              <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-4 px-5 pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-blue-400">
                    Document panel
                  </p>
                  <p className="mt-2 text-sm text-white/45">
                    Embedded custom preview
                  </p>
                </div>
                <FileText size={22} className="text-white/30" />
              </div>

              <div className="p-3 sm:p-5">
                {status === 'success' && cv ? (
                  isPdf ? (
                    <div className="h-[62vh] min-h-[420px] overflow-y-auto rounded-[1.25rem] border border-white/10 bg-[rgba(255,255,255,0.02)] p-3 sm:p-4">
                      <Document
                        file={fileUrl}
                        onLoadSuccess={handleDocumentLoad}
                        loading={
                          <div className="flex h-40 items-center justify-center text-sm uppercase tracking-[0.25em] text-white/40">
                            Loading PDF...
                          </div>
                        }
                        error={
                          <div className="flex h-40 items-center justify-center text-sm uppercase tracking-[0.25em] text-red-300">
                            Failed to render PDF
                          </div>
                        }
                      >
                        <div className="flex flex-col items-center gap-3 sm:gap-4">
                          {Array.from(new Array(numPages || 0), (_, index) => (
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              width={pageWidth}
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                              className="overflow-hidden rounded-lg shadow-[0_12px_35px_rgba(0,0,0,0.35)] w-full"
                            />
                          ))}
                        </div>
                      </Document>
                    </div>
                  ) : (
                    <div className="flex h-[62vh] min-h-[460px] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-black/30 px-6 text-center">
                      <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                        Preview unavailable for this file type
                      </p>
                      <p className="mt-3 max-w-md text-sm text-white/55">
                        This viewer currently renders PDF files only. You can still open
                        or download the document using the buttons on the left.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex h-[62vh] min-h-[460px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-black/30">
                    <p className="max-w-xs text-center text-sm uppercase tracking-[0.25em] text-white/35">
                      {status === 'loading' ? 'Preparing preview...' : 'Preview unavailable'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
