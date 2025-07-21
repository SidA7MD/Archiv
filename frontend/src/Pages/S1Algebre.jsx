import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export default function S1Algebre() {
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Updated API configuration for Vercel deployment
  const getApiBaseUrl = () => {
    if (import.meta.env.DEV) {
      return import.meta.env.VITE_API_URL || "http://localhost:5000";
    }
    return import.meta.env.VITE_PROD_API_URL || "https://archiv-three.vercel.app";
  };

  const API_BASE_URL = getApiBaseUrl();

  const fetchPdfList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_BASE_URL}/api/pdf/list`, {
        method: 'GET',
        mode: 'cors',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0) {
          setSelectedPdf(data.pdfs[0].filename);
        }
      } else {
        setPdfFiles([]);
        setSelectedPdf("");
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout. Check your connection.');
      } else if (err.message.includes('fetch') || err.message.includes('NetworkError')) {
        setError(`Could not connect to server (${API_BASE_URL}).`);
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchPdfList();
  }, [fetchPdfList]);

  const getPdfUrl = (filename) => {
    if (!filename) return '';
    return `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}`;
  };

  const downloadPdf = async (filename) => {
    if (!filename) return;
    
    try {
      const url = getPdfUrl(filename);
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/pdf',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert(`Download error: ${err.message}`);
    }
  };

  const getChapterName = (filename) => {
    if (!filename) return 'Chapter';
    
    const lower = filename.toLowerCase();
    if (lower.includes('ch i') || lower.includes('ch 1') || lower.includes('chapter 1')) {
      return 'Chapter I';
    } else if (lower.includes('ch ii') || lower.includes('ch 2') || lower.includes('chapter 2')) {
      return 'Chapter II';
    } else if (lower.includes('ch iii') || lower.includes('ch 3') || lower.includes('chapter 3')) {
      return 'Chapter III';
    } else if (lower.includes('ch iv') || lower.includes('ch 4') || lower.includes('chapter 4')) {
      return 'Chapter IV';
    }
    return 'Chapter';
  };

  // Responsive styles
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '15px' : '20px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      minHeight: '100vh',
      background: '#f8fafc',
    },
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '20px' : '30px',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#667eea',
      textDecoration: 'none',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      fontWeight: '600',
      marginBottom: '20px',
      padding: isMobile ? '8px 14px' : '10px 18px',
      borderRadius: '14px',
      background: 'rgba(102, 126, 234, 0.08)',
      border: '2px solid rgba(102, 126, 234, 0.15)',
      transition: 'all 0.3s ease',
      ':hover': {
        background: 'rgba(102, 126, 234, 0.15)',
        borderColor: 'rgba(102, 126, 234, 0.3)',
      }
    },
    title: {
      fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 15px 0',
      lineHeight: '1.2',
    },
    subtitle: {
      color: '#64748b',
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      margin: 0,
    },
    tabsContainer: {
      overflowX: 'auto',
      paddingBottom: '10px',
      marginBottom: isMobile ? '20px' : '30px',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      }
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      padding: isMobile ? '0 5px 5px' : '0 10px 10px',
      minWidth: 'fit-content',
    },
    tabButton: (isActive) => ({
      padding: isMobile ? '10px 15px' : '12px 20px',
      borderRadius: '10px',
      border: 'none',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: isActive 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'white',
      color: isActive ? 'white' : '#64748b',
      boxShadow: isActive 
        ? '0 4px 12px rgba(102, 126, 234, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      minWidth: isMobile ? '110px' : '140px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }),
    pdfContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '15px' : '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      minHeight: isMobile ? 'auto' : '800px',
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '2px solid #e2e8f0',
      flexWrap: 'wrap',
      gap: '15px',
    },
    controlsLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      minWidth: isMobile ? '100%' : '200px',
    },
    controlsRight: {
      display: 'flex',
      gap: isMobile ? '8px' : '12px',
      flexWrap: 'wrap',
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'space-between' : 'flex-start',
    },
    button: {
      padding: isMobile ? '8px 12px' : '10px 16px',
      borderRadius: '8px',
      border: 'none',
      background: '#667eea',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      flex: isMobile ? '1 1 auto' : '0 0 auto',
      ':hover': {
        opacity: 0.9,
        transform: 'translateY(-1px)',
      },
      ':active': {
        transform: 'translateY(0)',
      }
    },
    iframeContainer: {
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      minHeight: isMobile ? '400px' : '600px',
      position: 'relative',
      marginTop: isMobile ? '15px' : '0',
    },
    iframe: {
      width: '100%',
      height: isMobile ? '400px' : 'clamp(600px, 80vh, 800px)',
      border: 'none',
      borderRadius: '8px',
    },
    loadingContainer: {
      textAlign: 'center',
      marginTop: '100px',
    },
    errorContainer: {
      textAlign: 'center',
      marginTop: '100px',
      color: '#ef4444',
    },
    fallbackMessage: {
      padding: '40px',
      textAlign: 'center',
      color: '#64748b',
      background: '#f8fafc',
    },
    fileInfo: {
      color: '#64748b',
      fontSize: isMobile ? '0.75rem' : '0.9rem',
      margin: 0,
    },
    chapterTitle: {
      color: '#334155',
      fontSize: isMobile ? '1rem' : '1.2rem',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }
  };

  const currentPdf = pdfFiles.find(pdf => pdf.filename === selectedPdf);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔄</div>
          <div style={{ fontSize: '1.2rem', color: '#64748b' }}>Loading courses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
          <div style={{ fontSize: '1.2rem', marginBottom: '15px' }}>{error}</div>
          <button 
            onClick={fetchPdfList}
            style={styles.button}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  if (pdfFiles.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📂</div>
          <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '15px' }}>
            No PDFs found on server
          </div>
          <button 
            onClick={fetchPdfList}
            style={styles.button}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <Link to="/s1" style={styles.backButton}>
          ← Back to courses
        </Link>
        
        <h1 style={styles.title}>🔢 Linear Algebra</h1>
        <p style={styles.subtitle}>
          Mathematics Course - Semester 1
        </p>
      </div>

      <div style={styles.tabsContainer}>
        <div style={styles.tabs}>
          {pdfFiles.map((pdf) => (
            <button
              key={pdf.filename}
              style={styles.tabButton(selectedPdf === pdf.filename)}
              onClick={() => setSelectedPdf(pdf.filename)}
              title={pdf.title}
            >
              📄 {getChapterName(pdf.filename)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.pdfContainer}>
        <div style={styles.controls}>
          <div style={styles.controlsLeft}>
            <h3 style={styles.chapterTitle}>
              📖 {currentPdf?.title || 'Select a chapter'}
            </h3>
            {currentPdf && (
              <p style={styles.fileInfo}>
                Size: {Math.round(currentPdf.size / 1024)} KB • 
                Modified: {new Date(currentPdf.lastModified).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div style={styles.controlsRight}>
            <button 
              onClick={() => downloadPdf(selectedPdf)}
              style={styles.button}
              title="Download PDF"
              disabled={!selectedPdf}
            >
              📥 Download
            </button>
            
            <a
              href={selectedPdf ? getPdfUrl(selectedPdf) : '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.button, 
                background: selectedPdf ? '#22c55e' : '#94a3b8',
                pointerEvents: selectedPdf ? 'auto' : 'none'
              }}
              title="Open in new tab"
            >
              🔗 New Tab
            </a>

            <button
              onClick={fetchPdfList}
              style={{...styles.button, background: '#f59e0b'}}
              title="Refresh list"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {selectedPdf && (
          <div style={styles.iframeContainer}>
            <iframe
              src={getPdfUrl(selectedPdf)}
              style={styles.iframe}
              title={`PDF: ${currentPdf?.title}`}
            >
              <div style={styles.fallbackMessage}>
                <h3>Browser not supported</h3>
                <p>Your browser doesn't support PDF display.</p>
                <a 
                  href={getPdfUrl(selectedPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.button}
                >
                  🔗 Open PDF
                </a>
              </div>
            </iframe>
          </div>
        )}
      </div>
    </main>
  );
}