import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function S1Algebre() {
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated API configuration for Vercel deployment
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // For local development
    return import.meta.env.VITE_API_URL || "http://localhost:5000";
  }
  
  // In production, use your separate backend URL
  return import.meta.env.VITE_PROD_API_URL || "https://archiv-three.vercel.app";
};
  const API_BASE_URL = getApiBaseUrl();

  // Fetch available PDFs from server
  useEffect(() => {
    fetchPdfList();
  }, []);

  const fetchPdfList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("🌐 Fetching PDFs from:", `${API_BASE_URL}/api/pdf/list`);
      
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
        throw new Error(`Erreur serveur: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0) {
          setSelectedPdf(data.pdfs[0].filename);
        }
        console.log(`✅ Loaded ${data.pdfs.length} PDF files`);
      } else {
        throw new Error('Format de réponse invalide du serveur');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Délai d\'attente dépassé. Vérifiez votre connexion.');
      } else if (err.message.includes('fetch') || err.message.includes('NetworkError')) {
        setError(`Impossible de se connecter au serveur (${API_BASE_URL}). Vérifiez que le serveur est démarré.`);
      } else {
        setError(`Erreur: ${err.message}`);
      }
      console.error('❌ Error fetching PDFs:', err);
      console.error('🔗 API URL used:', `${API_BASE_URL}/api/pdf/list`);
    } finally {
      setLoading(false);
    }
  };

  // Updated to work with Vercel's rewrite rules
  const getPdfUrl = (filename) => {
    if (!filename) return '';
    // This will use the rewrite rule in vercel.json to redirect to /api/pdf/[filename]
    return `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}`;
  };

  const downloadPdf = async (filename) => {
    if (!filename) return;
    
    try {
      const url = getPdfUrl(filename);
      console.log('📥 Downloading PDF from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/pdf',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL
      window.URL.revokeObjectURL(downloadUrl);
      console.log('✅ Download completed:', filename);
    } catch (err) {
      console.error('❌ Download error:', err);
      alert(`Erreur lors du téléchargement: ${err.message}`);
    }
  };

  const getChapterName = (filename) => {
    if (!filename) return 'Chapitre';
    
    const lower = filename.toLowerCase();
    if (lower.includes('ch i') || lower.includes('ch 1') || lower.includes('chapitre 1')) {
      return 'Chapitre I';
    } else if (lower.includes('ch ii') || lower.includes('ch 2') || lower.includes('chapitre 2')) {
      return 'Chapitre II';
    } else if (lower.includes('ch iii') || lower.includes('ch 3') || lower.includes('chapitre 3')) {
      return 'Chapitre III';
    } else if (lower.includes('ch iv') || lower.includes('ch 4') || lower.includes('chapitre 4')) {
      return 'Chapitre IV';
    }
    return 'Chapitre';
  };

  // Enhanced styles with better responsiveness
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      minHeight: '100vh',
      background: '#f8fafc',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#667eea',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '20px',
      padding: '10px 18px',
      borderRadius: '14px',
      background: 'rgba(102, 126, 234, 0.08)',
      border: '2px solid rgba(102, 126, 234, 0.15)',
      transition: 'all 0.3s ease',
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 20px 0',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '30px',
      flexWrap: 'wrap',
    },
    tabButton: (isActive) => ({
      padding: '12px 20px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '0.9rem',
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
      minWidth: '140px',
    }),
    pdfContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      minHeight: '800px',
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
      minWidth: '200px',
    },
    controlsRight: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      background: '#667eea',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.9rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
    iframe: {
      width: '100%',
      height: 'clamp(600px, 80vh, 800px)',
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    debugInfo: {
      marginTop: '15px', 
      padding: '12px',
      background: '#f0f9ff',
      borderRadius: '8px',
      border: '1px solid #bae6fd',
      fontSize: '0.8rem',
      color: '#0369a1'
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
    iframeContainer: {
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      minHeight: '600px',
      position: 'relative',
    },
    fallbackMessage: {
      padding: '40px',
      textAlign: 'center',
      color: '#64748b',
      background: '#f8fafc',
    }
  };

  const currentPdf = pdfFiles.find(pdf => pdf.filename === selectedPdf);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔄</div>
          <div style={{ fontSize: '1.2rem', color: '#64748b' }}>Chargement des cours...</div>
          {import.meta.env.DEV && (
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#94a3b8' }}>
              API: {API_BASE_URL}
            </div>
          )}
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
            🔄 Réessayer
          </button>
          {import.meta.env.DEV && (
            <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#64748b' }}>
              <strong>Debug Info:</strong><br/>
              API URL: {API_BASE_URL}<br/>
              Environment: {import.meta.env.MODE}<br/>
              Dev Mode: {import.meta.env.DEV ? 'Yes' : 'No'}
            </div>
          )}
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
            Aucun PDF trouvé
          </div>
          <button 
            onClick={fetchPdfList}
            style={styles.button}
          >
            🔄 Actualiser
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <Link to="/s1" style={styles.backButton}>
          ← Retour aux cours
        </Link>
        
        <h1 style={styles.title}>🔢 Algèbre Linéaire</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
          Cours de Mathématiques - Semestre 1
        </p>
      </div>

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

      <div style={styles.pdfContainer}>
        <div style={styles.controls}>
          <div style={styles.controlsLeft}>
            <h3 style={{ color: '#334155', fontSize: '1.2rem', margin: 0 }}>
              📖 {currentPdf?.title || 'Sélectionnez un chapitre'}
            </h3>
            {currentPdf && (
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                Taille: {Math.round(currentPdf.size / 1024)} KB • 
                Modifié: {new Date(currentPdf.lastModified).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
          
          <div style={styles.controlsRight}>
            <button 
              onClick={() => downloadPdf(selectedPdf)}
              style={styles.button}
              title="Télécharger le PDF"
              disabled={!selectedPdf}
            >
              📥 Télécharger
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
              title="Ouvrir dans un nouvel onglet"
            >
              🔗 Nouvel onglet
            </a>

            <button
              onClick={fetchPdfList}
              style={{...styles.button, background: '#f59e0b'}}
              title="Actualiser la liste"
            >
              🔄 Actualiser
            </button>
          </div>
        </div>

        {selectedPdf && (
          <div style={styles.iframeContainer}>
            <iframe
              src={getPdfUrl(selectedPdf)}
              style={styles.iframe}
              title={`PDF: ${currentPdf?.title}`}
              onError={(e) => {
                console.error('PDF loading error:', e);
              }}
              onLoad={() => {
                console.log('✅ PDF loaded successfully:', selectedPdf);
              }}
            >
              <div style={styles.fallbackMessage}>
                <h3>Navigateur non compatible</h3>
                <p>Votre navigateur ne supporte pas l'affichage des PDFs.</p>
                <a 
                  href={getPdfUrl(selectedPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.button}
                >
                  🔗 Ouvrir le PDF
                </a>
              </div>
            </iframe>
          </div>
        )}

        {import.meta.env.DEV && (
          <div style={styles.debugInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <strong>🌐 Serveur:</strong> {API_BASE_URL} • 
                <strong> PDFs trouvés:</strong> {pdfFiles.length} • 
                <strong> Sélectionné:</strong> {selectedPdf || 'Aucun'} •
                <strong> Mode:</strong> {import.meta.env.MODE} •
                <strong> Platform:</strong> Vercel Serverless
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}