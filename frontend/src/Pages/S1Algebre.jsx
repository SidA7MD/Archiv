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
  const [selectedPdf, setSelectedPdf] = useState("ch1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const API_BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL || "http://localhost:5000"
    : import.meta.env.VITE_PROD_API_URL || "https://archiv-three.vercel.app";

  const chapters = [
    { 
      id: "ch1", 
      title: "Chapitre 1", 
      filename: "ch1-algebre-de-base.pdf",
      description: "Algèbre de base et opérations fondamentales"
    },
    { 
      id: "ch2", 
      title: "Chapitre 2", 
      filename: "ch2-equations-lineaires.pdf",
      description: "Équations linéaires et systèmes"
    },
    { 
      id: "ch3", 
      title: "Chapitre 3", 
      filename: "ch3-fonctions-quadratiques.pdf",
      description: "Fonctions quadratiques et paraboles"
    }
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPdfList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLoading(false);
    } catch (err) {
      setError("Impossible de charger les ressources");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPdfList();
  }, [fetchPdfList]);

  const getPdfUrl = (filename) =>
    filename ? `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}` : "";

  const downloadPdf = () => {
    const chapter = chapters.find(ch => ch.id === selectedPdf);
    if (chapter) {
      alert(`Téléchargement de ${chapter.filename}`);
    }
  };

  const openPdf = () => {
    const chapter = chapters.find(ch => ch.id === selectedPdf);
    if (chapter) {
      if (isMobile) {
        window.open(getPdfUrl(chapter.filename), '_blank');
      } else {
        alert(`Ouverture de ${chapter.filename}`);
      }
    }
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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  const selectedChapter = chapters.find(ch => ch.id === selectedPdf);

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
                {chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPdf(chapter.id)}
                    style={{
                      width: "100%",
                      background: selectedPdf === chapter.id ? "#8B5CF6" : "#F9FAFB",
                      color: selectedPdf === chapter.id ? "white" : "#374151",
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
                      {chapter.title}
                    </div>
                    <div style={{
                      fontSize: "0.875rem",
                      opacity: selectedPdf === chapter.id ? 0.9 : 0.6
                    }}>
                      {chapter.description}
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
                onClick={downloadPdf}
                style={{
                  width: "100%",
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
              >
                <MdCloudDownload size={20} />
                Télécharger
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openPdf}
                style={{
                  width: "100%",
                  background: "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
              >
                <MdOpenInNew size={20} />
                Ouvrir
              </motion.button>
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
                  {selectedChapter?.title} - {selectedChapter?.description}
                </p>
              </div>
            </div>

            {/* PDF Content Area */}
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
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ marginBottom: "20px" }}
                >
                  <MdPictureAsPdf size={64} color="#8B5CF6" />
                </motion.div>
                <h4 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1F2937",
                  margin: "0 0 8px"
                }}>
                  PDF Viewer
                </h4>
                <p style={{
                  margin: "0 0 4px",
                  fontWeight: "500"
                }}>
                  Contenu du {selectedChapter?.title}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  opacity: 0.7
                }}>
                  {selectedChapter?.filename}
                </p>
              </div>
            </div>
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
            {chapters.map((chapter, index) => (
              <motion.button
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPdf(chapter.id)}
                style={{
                  width: "100%",
                  background: selectedPdf === chapter.id ? "#8B5CF6" : "#F9FAFB",
                  color: selectedPdf === chapter.id ? "white" : "#374151",
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
                  {chapter.title}
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  opacity: selectedPdf === chapter.id ? 0.9 : 0.6
                }}>
                  {chapter.description}
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
            onClick={downloadPdf}
            style={{
              width: "100%",
              background: "#EF4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "16px 20px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            }}
          >
            <MdCloudDownload size={20} />
            Télécharger
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.98 }}
            onClick={openPdf}
            style={{
              width: "100%",
              background: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "16px 20px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            }}
          >
            <MdOpenInNew size={20} />
            Ouvrir
          </motion.button>
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