/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { Printer, FileText, Sparkles, Download, ArrowLeft, Hammer, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NoticeForm } from './components/NoticeForm';
import { NoticePreview } from './components/NoticePreview';
import { NoticeData, defaultNoticeData } from './types';

export default function App() {
  const [currentApp, setCurrentApp] = useState<'home' | 'demand-notice'>('home');
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

      <AnimatePresence mode="wait">
        {currentApp === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="dashboard-container"
          >
            {/* Top bar */}
            <div className="dash-topbar">
              <span className="dash-topbar-label">DCCB — Allavaram Branch</span>
            </div>

            {/* Hero */}
            <div className="dash-hero">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="dash-hero-title"
              >
                Welcome back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="dash-hero-sub"
              >
                Choose a service to continue
              </motion.p>
            </div>

            {/* Cards */}
            <main className="dash-cards-area">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="dash-card dash-card--primary"
                onClick={() => setCurrentApp('demand-notice')}
              >
                <div className="dash-card-icon">
                  <FileText size={22} />
                </div>
                <div className="dash-card-body">
                  <h3>Demand Notice</h3>
                  <p>Generate & download official notices</p>
                </div>
                <span className="dash-card-arrow">→</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="dash-card dash-card--muted"
              >
                <div className="dash-card-icon">
                  <Hammer size={22} />
                </div>
                <div className="dash-card-body">
                  <h3>Coming Soon</h3>
                  <p>New tools are on the way</p>
                </div>
                <span className="dash-card-badge">Soon</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="dash-card dash-card--accent"
                onClick={() => {
                  const subject = encodeURIComponent("New App Idea for DCCB Allavaram Workspace");
                  const body = encodeURIComponent("Hi team,\n\nI have a new idea for an application:\n\n[Describe your idea here]\n\nThanks!");
                  window.location.href = `mailto:sankeerthbalabhadra@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <div className="dash-card-icon">
                  <Lightbulb size={22} />
                </div>
                <div className="dash-card-body">
                  <h3>Suggest an App</h3>
                  <p>Share your idea with us</p>
                </div>
                <span className="dash-card-arrow">→</span>
              </motion.div>
            </main>

            <footer className="dash-footer">
              <span>© 2026 DCCB Allavaram · All rights reserved</span>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="demand-notice"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="app-view-container"
          >
            {/* Header */}
            <header className="app-header no-print">
              <div className="app-header-inner">
                <div className="header-brand" style={{ cursor: 'pointer' }} onClick={() => setCurrentApp('home')}>
                  <div className="header-icon" style={{ background: 'var(--text-secondary)' }}>
                    <ArrowLeft size={20} color="white" />
                  </div>
                  <div>
                    <div className="header-title">Bank Notice Generator</div>
                    <div className="header-subtitle">← Back to Workspace</div>
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
            </header>

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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
