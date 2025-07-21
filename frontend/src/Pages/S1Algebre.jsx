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
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout
      const response = await fetch(`${API_BASE_URL}/api/pdf/list`, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      clearTimeout(timeoutId); // Clear timeout if fetch completes in time

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0 && !selectedPdf) {
          // Set initial selected PDF only if none is selected
          setSelectedPdf(data.pdfs[0].filename);
        } else if (data.pdfs.length === 0) {
          setSelectedPdf(""); // Clear if no PDFs
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
  }, [API_BASE_URL, selectedPdf]); // Added selectedPdf to dependencies

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
      link.download = filename; // Use original filename for download
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
    const match = lower.match(/ch\s?([ivx\d]+)/); // Matches "ch1", "ch 1", "chV", etc.
    if (match && match[1]) {
      const romanNumerals = {
        "1": "I",
        "2": "II",
        "3": "III",
        "4": "IV",
        "5": "V",
        "6": "VI",
        "7": "VII",
        "8": "VIII",
        "9": "IX",
        "10": "X",
      };
      // Convert single digits to Roman numerals if they exist in the map, otherwise use as is
      return `Chapter ${romanNumerals[match[1]] || match[1].toUpperCase()}`;
    }
    return lower.includes("course") ? "Course" : "Chapter";
  };

  // Base styles for all buttons
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
    justifyContent: "center", // Center content within button
  };

  const primaryButtonColors = {
    active: "#8a2be2", // Amethyst / Purple
    inactive: "#6a5acd", // Slate Blue
  };

  const actionButtonColors = {
    download: "#ff6b6b", // Red-Orange
    open: "#4ecdc4", // Turquoise
    refresh: "#1abc9c", // Emerald
  };

  // Merges base styles with specific background color
  const getButtonStyles = (bgColor, isActive = false) => ({
    ...baseButtonStyles,
    background: bgColor,
    ...(isActive && {
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      transform: "translateY(-2px)",
    }),
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      boxShadow: "none",
      transform: "none",
    },
  });

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f0f2f5", // Light gray background
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box", // Ensure padding is included in width
  };

  const contentAreaStyle = {
    width: "100%",
    maxWidth: "1200px", // Max width for the content
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  };

  const messageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 40px)", // Adjust for padding
    color: "#555",
    fontSize: "1.2rem",
    textAlign: "center",
    gap: "15px",
  };

  if (loading)
    return (
      <div style={messageStyle}>
        <MdAccessTime size={50} color="#6a5acd" />
        <p>Loading available documents...</p>
      </div>
    );

  if (error)
    return (
      <div style={messageStyle}>
        <MdErrorOutline size={50} color="#ff6b6b" />
        <p>{error}</p>
        <motion.button
          onClick={fetchPdfList}
          style={getButtonStyles(actionButtonColors.refresh)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdRefresh /> Try Again
        </motion.button>
      </div>
    );

  if (pdfFiles.length === 0)
    return (
      <div style={messageStyle}>
        <MdFolderOpen size={50} color="#4ecdc4" />
        <p>No documents found at the moment.</p>
        <motion.button
          onClick={fetchPdfList}
          style={getButtonStyles(actionButtonColors.refresh)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdRefresh /> Refresh List
        </motion.button>
      </div>
    );

  const currentPdf = pdfFiles.find((pdf) => pdf.filename === selectedPdf);

  return (
    <div style={containerStyle}>
      <div style={contentAreaStyle}>
        {/* PDF Selection Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
            justifyContent: isMobile ? "center" : "flex-start", // Center buttons on mobile
          }}
        >
          {pdfFiles.map((pdf) => (
            <motion.button
              key={pdf.filename}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98, boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
              onClick={() => setSelectedPdf(pdf.filename)}
              style={getButtonStyles(
                selectedPdf === pdf.filename
                  ? primaryButtonColors.active
                  : primaryButtonColors.inactive,
                selectedPdf === pdf.filename
              )}
            >
              <MdDescription /> {getChapterName(pdf.filename)}
            </motion.button>
          ))}
        </div>

        {/* Selected PDF Actions */}
        <div
          style={{
            background: "#f8f9fa", // Lighter background for action panel
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#333",
              fontSize: "1.4rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <MdOutlineLibraryBooks size={28} color="#8a2be2" />
            {currentPdf?.title || "No Document Selected"}
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: isMobile ? "center" : "flex-start", // Center actions on mobile
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadPdf(selectedPdf)}
              disabled={!selectedPdf}
              style={getButtonStyles(actionButtonColors.download)}
            >
              <MdFileDownload /> Download
            </motion.button>

            <motion.a
              href={getPdfUrl(selectedPdf)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={getButtonStyles(actionButtonColors.open)}
            >
              <MdLink /> Open in Tab
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchPdfList}
              style={getButtonStyles(actionButtonColors.refresh)}
            >
              <MdRefresh /> Refresh List
            </motion.button>
          </div>

          {/* PDF Viewer - hidden on mobile */}
          {!isMobile && selectedPdf && (
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                height: "650px", // Slightly increased height for better viewing
                marginTop: "20px",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <iframe
                src={getPdfUrl(selectedPdf)}
                title={currentPdf?.title || "PDF Viewer"}
                style={{ width: "100%", height: "100%", border: "none" }}
                loading="lazy" // Add lazy loading for iframes
              />
            </div>
          )}

          {isMobile && selectedPdf && (
            <p
              style={{
                textAlign: "center",
                color: "#666",
                marginTop: "15px",
                fontSize: "0.9rem",
              }}
            >
              On mobile, PDFs are best viewed by opening them in a new tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}