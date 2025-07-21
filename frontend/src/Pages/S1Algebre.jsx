import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  MdDescription,
  MdFileDownload,
  MdLink,
  MdRefresh,
  MdAccessTime,
  MdErrorOutline,
  MdFolderOpen,
  MdOutlineLibraryBooks,
  MdViewInAr,
  MdCloudDownload,
  MdOpenInNew,
  MdCached,
  MdMenuBook
} from "react-icons/md";
import { FaBookOpen, FaUniversity, FaGraduationCap } from "react-icons/fa";

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
        setError("Invalid data format received from server.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(`Could not load PDFs: ${err.message}`);
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
      return alert("No PDF selected for download.");
    }
    try {
      const response = await fetch(getPdfUrl(filename), {
        method: "GET",
        headers: { Accept: "application/pdf" },
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
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
      alert("Download error: " + err.message);
    }
  };

  const getChapterName = (filename) => {
    if (!filename) return "Chapter";
    const lower = filename.toLowerCase();
    const match = lower.match(/ch\s?([ivx\d]+)/);
    if (match && match[1]) {
      const romanNumerals = {
        "1": "I", "2": "II", "3": "III", "4": "IV", "5": "V",
        "6": "VI", "7": "VII", "8": "VIII", "9": "IX", "10": "X",
      };
      return `Chapter ${romanNumerals[match[1]] || match[1].toUpperCase()}`;
    }
    return lower.includes("course") ? "Course" : "Chapter";
  };

  // Enhanced button styles with better visual hierarchy
  const baseButtonStyles = {
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    border: "none",
    color: "#fff",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
    minWidth: "140px",
  };

  const primaryButtonColors = {
    active: "linear-gradient(135deg, #8a2be2 0%, #6a5acd 100%)",
    inactive: "linear-gradient(135deg, #6a5acd 0%, #483d8b 100%)",
  };

  const actionButtonColors = {
    download: "linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)",
    open: "linear-gradient(135deg, #4ecdc4 0%, #1dd1a1 100%)",
    refresh: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
  };

  const getButtonStyles = (bgColor, isActive = false) => ({
    ...baseButtonStyles,
    background: bgColor,
    padding: isMobile ? "12px 16px" : baseButtonStyles.padding,
    fontSize: isMobile ? "0.9rem" : baseButtonStyles.fontSize,
    minWidth: isMobile ? "100%" : "140px",
    ...(isActive && {
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      transform: "translateY(-2px)",
    }),
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    }
  });

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
    padding: isMobile ? "20px 10px" : "30px 20px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    fontSize: isMobile ? "0.95rem" : "1rem",
  };

  const contentAreaStyle = {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "20px" : "30px",
    padding: isMobile ? "20px" : "30px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
  };

  const messageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 40px)",
    color: "#555",
    fontSize: "1.2rem",
    textAlign: "center",
    gap: "20px",
    padding: "0 20px",
  };

  if (loading)
    return (
      <div style={messageStyle}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <MdAccessTime size={60} color="#6a5acd" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        >
          Loading available documents...
        </motion.p>
      </div>
    );

  if (error)
    return (
      <div style={messageStyle}>
        <MdErrorOutline size={60} color="#ff6b6b" />
        <p style={{ maxWidth: "500px", lineHeight: "1.6" }}>{error}</p>
        <motion.button
          onClick={fetchPdfList}
          style={getButtonStyles(actionButtonColors.refresh)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdCached size={20} /> Try Again
        </motion.button>
      </div>
    );

  if (pdfFiles.length === 0)
    return (
      <div style={messageStyle}>
        <MdFolderOpen size={60} color="#4ecdc4" />
        <p style={{ maxWidth: "500px", lineHeight: "1.6" }}>No documents found at the moment.</p>
        <motion.button
          onClick={fetchPdfList}
          style={getButtonStyles(actionButtonColors.refresh)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdCached size={20} /> Refresh List
        </motion.button>
      </div>
    );

  const currentPdf = pdfFiles.find((pdf) => pdf.filename === selectedPdf);

  return (
    <div style={containerStyle}>
      <div style={contentAreaStyle}>
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "10px",
          }}
        >
          <FaUniversity size={isMobile ? 28 : 36} color="#6a5acd" />
          <h1 style={{
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            color: "#333",
            margin: 0,
            background: "linear-gradient(135deg, #6a5acd 0%, #8a2be2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700
          }}>
            S1 Algebra Resources
          </h1>
        </motion.div>

        {/* PDF Selection Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "20px",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {pdfFiles.map((pdf) => (
            <motion.button
              key={pdf.filename}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPdf(pdf.filename)}
              style={{
                ...getButtonStyles(
                  selectedPdf === pdf.filename
                    ? primaryButtonColors.active
                    : primaryButtonColors.inactive,
                  selectedPdf === pdf.filename
                ),
                width: isMobile ? "100%" : "auto",
              }}
            >
              <MdMenuBook size={18} /> {getChapterName(pdf.filename)}
            </motion.button>
          ))}
        </div>

        {/* Selected PDF Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "#f8f9fa",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "10px",
          }}>
            <FaBookOpen size={isMobile ? 24 : 28} color="#8a2be2" />
            <h3 style={{
              margin: 0,
              color: "#333",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              fontWeight: 600,
            }}>
              {currentPdf?.title || "No Document Selected"}
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: isMobile ? "center" : "flex-start",
              width: "100%",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,107,107,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadPdf(selectedPdf)}
              disabled={!selectedPdf}
              style={getButtonStyles(actionButtonColors.download)}
            >
              <MdCloudDownload size={20} /> Download PDF
            </motion.button>

            <motion.a
              href={getPdfUrl(selectedPdf)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(78,205,196,0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={getButtonStyles(actionButtonColors.open)}
            >
              <MdOpenInNew size={20} /> Open in New Tab
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(26,188,156,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchPdfList}
              style={getButtonStyles(actionButtonColors.refresh)}
            >
              <MdCached size={20} /> Refresh List
            </motion.button>
          </div>

          {!isMobile && selectedPdf && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                overflow: "hidden",
                height: "700px",
                marginTop: "20px",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)",
                background: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{
                padding: "10px 15px",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <MdViewInAr size={18} color="#6a5acd" />
                <span style={{ fontSize: "0.9rem", color: "#555" }}>PDF Viewer</span>
              </div>
              <iframe
                src={getPdfUrl(selectedPdf)}
                title={currentPdf?.title || "PDF Viewer"}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  border: "none",
                  flex: 1
                }}
                loading="lazy"
              />
            </motion.div>
          )}

          {isMobile && selectedPdf && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderRadius: "12px",
                padding: "15px",
                marginTop: "15px",
                textAlign: "center",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <FaGraduationCap size={24} color="#6a5acd" />
              <p style={{
                margin: "10px 0 0",
                color: "#555",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}>
                For the best mobile experience, we recommend opening PDFs in a new tab.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}