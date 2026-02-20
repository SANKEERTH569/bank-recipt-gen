/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { Printer, FileText, Sparkles, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { NoticeForm } from './components/NoticeForm';
import { NoticePreview } from './components/NoticePreview';
import { NoticeData, defaultNoticeData } from './types';

export default function App() {
  const [data, setData] = useState<NoticeData>(defaultNoticeData);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Notice_${data.borrowerName}`,
  });

  const handleDownload = () => {
    const element = componentRef.current;
    if (!element) return;

    const opt: any = {
      margin: 0,
      filename: `Notice_${data.borrowerName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, windowWidth: 800 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'var(--font-ui)' }}>
      {/* Animated Background */}
      <div className="app-bg" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="app-header no-print"
      >
        <div className="app-header-inner">
          <div className="header-brand">
            <div className="header-icon">
              <FileText size={20} color="white" />
            </div>
            <div>
              <div className="header-title">Bank Notice Generator</div>
              <div className="header-subtitle">DCCB Kakinada • Official Telugu Notices</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handlePrint()} className="btn-ghost" style={{ border: '1px solid rgba(0,0,0,0.1)', background: 'white' }}>
              <Printer size={16} />
              Print Preview
            </button>
            <button onClick={handleDownload} className="btn-primary">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="app-main">
        <div className="app-grid">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="form-column no-print"
          >
            <NoticeForm data={data} onChange={setData} />

            {/* Tip Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card tip-card"
            >
              <Sparkles size={18} style={{ color: 'var(--primary-400)', flexShrink: 0, marginTop: 2 }} />
              <p>
                Fill in the details on the left — the preview updates instantly.
                Click <strong>Download PDF</strong> to save.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="preview-wrapper">
              <div className="preview-scale">
                <NoticePreview ref={componentRef} data={data} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
