import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDescription,
  MdCloudDownload,
  MdOpenInNew,
  MdMenuBook,
  MdAccessTime,
  MdErrorOutline,
  MdRefresh,
  MdViewInAr,
  MdSmartphone,
  MdLaptop,
  MdPictureAsPdf
} from "react-icons/md";

export default function S1Algebre() {
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const API_BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL || "http://localhost:5000"
    : import.meta.env.VITE_PROD_API_URL || "https://archiv-three.vercel.app";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPdfList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_BASE_URL}/api/pdf/list`, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0 && !selectedPdf) {
          setSelectedPdf(data.pdfs[0].filename);
        } else if (data.pdfs.length === 0) {
          setSelectedPdf("");
        }
      } else {
        setPdfFiles([]);
        setSelectedPdf("");
        setError("Format de données invalide reçu du serveur.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Délai d'attente dépassé. Veuillez réessayer.");
      } else {
        setError(`Impossible de charger les PDFs: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, selectedPdf]);

  useEffect(() => {
    fetchPdfList();
  }, [fetchPdfList]);

  const getPdfUrl = (filename) =>
    filename ? `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}` : "";

  const downloadPdf = async (filename) => {
    if (!filename) {
      return alert("Aucun PDF sélectionné pour le téléchargement.");
    }
    try {
      const response = await fetch(getPdfUrl(filename), {
        method: "GET",
        headers: { Accept: "application/pdf" },
      });

      if (!response.ok) {
        throw new Error(`Échec du téléchargement PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert("Erreur de téléchargement: " + err.message);
    }
  };

  const getChapterName = (filename) => {
    if (!filename) return "Chapitre";
    const lower = filename.toLowerCase();
    const match = lower.match(/ch\s?([ivx\d]+)/);
    if (match && match[1]) {
      const romanNumerals = {
        "1": "I", "2": "II", "3": "III", "4": "IV", "5": "V",
        "6": "VI", "7": "VII", "8": "VIII", "9": "IX", "10": "X",
      };
      return `Chapitre ${romanNumerals[match[1]] || match[1].toUpperCase()}`;
    }
    return lower.includes("course") || lower.includes("cours") ? "Cours" : "Chapitre";
  };

  const LoadingState = () => (
    <div style={{
      minHeight: "100vh",
      background: isMobile ? "#ffffff" : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: isMobile ? "20px" : "24px",
        padding: isMobile ? "40px 30px" : "50px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}
        >
          <MdAccessTime size={30} color="white" />
        </motion.div>
        <h3 style={{
          fontSize: "1.4rem",
          fontWeight: "600",
          color: "#1F2937",
          margin: "0 0 8px"
        }}>
          Chargement des ressources
        </h3>
        <p style={{
          fontSize: "1rem",
          color: "#6B7280",
          margin: 0
        }}>
          Préparation de vos chapitres d'algèbre...
        </p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div style={{
      minHeight: "100vh",
      background: isMobile ? "#ffffff" : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: isMobile ? "20px" : "24px",
        padding: isMobile ? "40px 30px" : "50px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%"
      }}>
        <MdErrorOutline size={60} color="#EF4444" style={{ marginBottom: "20px" }} />
        <h3 style={{
          fontSize: "1.4rem",
          fontWeight: "600",
          color: "#1F2937",
          margin: "0 0 8px"
        }}>
          Erreur de chargement
        </h3>
        <p style={{
          fontSize: "1rem",
          color: "#6B7280",
          margin: "0 0 24px"
        }}>
          {error}
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchPdfList}
          style={{
            background: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "0 auto"
          }}
        >
          <MdRefresh size={18} />
          Réessayer
        </motion.button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div style={{
      minHeight: "100vh",
      background: isMobile ? "#ffffff" : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: isMobile ? "20px" : "24px",
        padding: isMobile ? "40px 30px" : "50px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%"
      }}>
        <MdPictureAsPdf size={60} color="#6B7280" style={{ marginBottom: "20px" }} />
        <h3 style={{
          fontSize: "1.4rem",
          fontWeight: "600",
          color: "#1F2937",
          margin: "0 0 8px"
        }}>
          Aucun document trouvé
        </h3>
        <p style={{
          fontSize: "1rem",
          color: "#6B7280",
          margin: "0 0 24px"
        }}>
          Aucun document n'est disponible pour le moment.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchPdfList}
          style={{
            background: "#8B5CF6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "0 auto"
          }}
        >
          <MdRefresh size={18} />
          Actualiser la liste
        </motion.button>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (pdfFiles.length === 0) return <EmptyState />;

  const currentPdf = pdfFiles.find((pdf) => pdf.filename === selectedPdf);

  // Desktop Layout with PDF Viewer
  if (!isMobile) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        padding: "40px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: "40px",
          maxWidth: "1400px",
          margin: "0 auto",
          alignItems: "start"
        }}>
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              position: "sticky",
              top: "40px"
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom: "1px solid #F3F4F6"
              }}
            >
              <div style={{
                padding: "12px",
                background: "#8B5CF6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdMenuBook size={24} color="white" />
              </div>
              <div>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1F2937",
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  Chapitres
                </h2>
                <p style={{
                  fontSize: "0.875rem",
                  color: "#6B7280",
                  margin: 0
                }}>
                  S1 Algèbre
                </p>
              </div>
            </motion.div>

            {/* Chapter Selection */}
            <div style={{ marginBottom: "28px" }}>
              <AnimatePresence>
                {pdfFiles.map((pdf, index) => (
                  <motion.button
                    key={pdf.filename}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPdf(pdf.filename)}
                    style={{
                      width: "100%",
                      background: selectedPdf === pdf.filename ? "#8B5CF6" : "#F9FAFB",
                      color: selectedPdf === pdf.filename ? "white" : "#374151",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      marginBottom: "8px",
                      textAlign: "left",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ marginBottom: "4px" }}>
                      {getChapterName(pdf.filename)}
                    </div>
                    <div style={{
                      fontSize: "0.875rem",
                      opacity: selectedPdf === pdf.filename ? 0.9 : 0.6
                    }}>
                      {pdf.title || pdf.filename}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadPdf(selectedPdf)}
                disabled={!selectedPdf}
                style={{
                  width: "100%",
                  background: selectedPdf ? "#EF4444" : "#D1D5DB",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: selectedPdf ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  opacity: selectedPdf ? 1 : 0.6
                }}
              >
                <MdCloudDownload size={20} />
                Télécharger
              </motion.button>

              <motion.a
                href={getPdfUrl(selectedPdf)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  background: selectedPdf ? "#10B981" : "#D1D5DB",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: selectedPdf ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  opacity: selectedPdf ? 1 : 0.6,
                  pointerEvents: selectedPdf ? "auto" : "none"
                }}
              >
                <MdOpenInNew size={20} />
                Ouvrir
              </motion.a>
            </div>

            {/* Device Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "#F3F4F6",
                borderRadius: "8px",
                textAlign: "center"
              }}
            >
              <MdLaptop size={24} color="#8B5CF6" style={{ marginBottom: "8px" }} />
              <p style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                margin: 0,
                lineHeight: "1.4"
              }}>
                Mode Bureau - Visionneuse intégrée
              </p>
            </motion.div>
          </motion.div>

          {/* Right Panel - PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: "white",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "calc(100vh - 80px)",
              minHeight: "700px"
            }}
          >
            {/* PDF Viewer Header */}
            <div style={{
              padding: "20px 30px",
              background: "#1F2937",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdViewInAr size={24} />
              </motion.div>
              <div>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  margin: "0 0 4px"
                }}>
                  Visionneuse PDF
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  margin: 0,
                  opacity: 0.8
                }}>
                  {currentPdf?.title || getChapterName(selectedPdf)} - {selectedPdf}
                </p>
              </div>
            </div>

            {/* PDF Content Area */}
            {selectedPdf ? (
              <iframe
                src={getPdfUrl(selectedPdf)}
                title={currentPdf?.title || getChapterName(selectedPdf)}
                style={{
                  width: "100%",
                  height: "calc(100% - 80px)",
                  border: "none",
                  background: "#F9FAFB"
                }}
                loading="lazy"
              />
            ) : (
              <div style={{
                height: "calc(100% - 80px)",
                background: "#F9FAFB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B7280",
                fontSize: "1.125rem"
              }}>
                <div style={{ textAlign: "center" }}>
                  <MdPictureAsPdf size={64} color="#D1D5DB" style={{ marginBottom: "20px" }} />
                  <h4 style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#9CA3AF",
                    margin: "0 0 8px"
                  }}>
                    Sélectionnez un chapitre
                  </h4>
                  <p style={{
                    margin: 0,
                    fontSize: "1rem",
                    color: "#6B7280"
                  }}>
                    Choisissez un document à visualiser
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Mobile Layout with white background and flat buttons
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      padding: "20px 16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px 20px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          minHeight: "calc(100vh - 40px)",
          maxWidth: "400px",
          margin: "0 auto",
          border: "1px solid #F3F4F6"
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
            paddingBottom: "20px",
            borderBottom: "1px solid #F3F4F6"
          }}
        >
          <div style={{
            padding: "10px",
            background: "#8B5CF6",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <MdMenuBook size={20} color="white" />
          </div>
          <div>
            <h2 style={{
              fontSize: "1.375rem",
              fontWeight: "600",
              color: "#1F2937",
              margin: 0,
              lineHeight: 1.2
            }}>
              Chapitres
            </h2>
            <p style={{
              fontSize: "0.875rem",
              color: "#6B7280",
              margin: 0
            }}>
              S1 Algèbre
            </p>
          </div>
        </motion.div>

        {/* Chapter Selection */}
        <div style={{ marginBottom: "32px" }}>
          <AnimatePresence>
            {pdfFiles.map((pdf, index) => (
              <motion.button
                key={pdf.filename}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPdf(pdf.filename)}
                style={{
                  width: "100%",
                  background: selectedPdf === pdf.filename ? "#8B5CF6" : "#F9FAFB",
                  color: selectedPdf === pdf.filename ? "white" : "#374151",
                  border: "none",
                  borderRadius: "8px",
                  padding: "16px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  marginBottom: "8px",
                  textAlign: "left",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ marginBottom: "4px" }}>
                  {getChapterName(pdf.filename)}
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  opacity: selectedPdf === pdf.filename ? 0.9 : 0.6
                }}>
                  {pdf.title || pdf.filename}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px"
        }}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => downloadPdf(selectedPdf)}
            disabled={!selectedPdf}
            style={{
              width: "100%",
              background: selectedPdf ? "#EF4444" : "#D1D5DB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "16px 20px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: selectedPdf ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              opacity: selectedPdf ? 1 : 0.6
            }}
          >
            <MdCloudDownload size={20} />
            Télécharger
          </motion.button>

          <motion.a
            href={getPdfUrl(selectedPdf)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              background: selectedPdf ? "#10B981" : "#D1D5DB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "16px 20px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: selectedPdf ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              textDecoration: "none",
              opacity: selectedPdf ? 1 : 0.6,
              pointerEvents: selectedPdf ? "auto" : "none"
            }}
          >
            <MdOpenInNew size={20} />
            Ouvrir
          </motion.a>
        </div>

        {/* Mobile Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            padding: "20px",
            background: "#F9FAFB",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #F3F4F6"
          }}
        >
          <MdSmartphone size={24} color="#8B5CF6" style={{ marginBottom: "12px" }} />
          <h4 style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#1F2937",
            margin: "0 0 8px"
          }}>
            Mode Mobile Optimisé
          </h4>
          <p style={{
            fontSize: "0.875rem",
            color: "#6B7280",
            margin: 0,
            lineHeight: "1.5"
          }}>
            Sélectionnez un chapitre puis utilisez "Ouvrir" pour une lecture en plein écran
          </p>
        </motion.div>

        {/* Additional spacing for long container */}
        <div style={{ height: "40px" }} />
      </motion.div>
    </div>
  );
}