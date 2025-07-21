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
      if (!response.ok) throw new Error("Failed to load PDF list");
      const data = await response.json();
      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0) setSelectedPdf(data.pdfs[0].filename);
      } else {
        setPdfFiles([]);
        setSelectedPdf("");
      }
    } catch (err) {
      setError("Could not load PDFs. " + err.message);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchPdfList();
  }, [fetchPdfList]);

  const getPdfUrl = (filename) =>
    filename ? `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}` : "";

  const downloadPdf = async (filename) => {
    if (!filename) return alert("No PDF selected");
    try {
      const response = await fetch(getPdfUrl(filename), {
        method: "GET",
        headers: { Accept: "application/pdf" },
      });
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
        "1": "I",
        "2": "II",
        "3": "III",
        "4": "IV",
        "5": "V",
      };
      return `Chapter ${romanNumerals[match[1]] || match[1].toUpperCase()}`;
    }
    return lower.includes("course") ? "Course" : "Chapter";
  };

  const getButtonStyle = (color) => ({
    padding: "12px 24px",
    borderRadius: "16px",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    border: "none",
    background: color,
    color: "#fff",
    transition: "transform 0.2s ease-in-out",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  });

  const containerStyle = {
    minHeight: "100vh",
    background: "#ffffff",
    padding: "40px 20px",
    fontFamily: "Inter, sans-serif",
  };

  if (loading)
    return (
      <div style={containerStyle}>
        <MdAccessTime size={48} />
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div style={containerStyle}>
        <MdErrorOutline size={48} />
        <p>{error}</p>
      </div>
    );

  if (pdfFiles.length === 0)
    return (
      <div style={containerStyle}>
        <MdFolderOpen size={48} />
        <p>No content found</p>
      </div>
    );

  const currentPdf = pdfFiles.find((pdf) => pdf.filename === selectedPdf);

  return (
    <div style={containerStyle}>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {pdfFiles.map((pdf) => (
          <motion.button
            key={pdf.filename}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={getButtonStyle(
              selectedPdf === pdf.filename ? "#e94057" : "#7b2ff7"
            )}
            onClick={() => setSelectedPdf(pdf.filename)}
          >
            <MdDescription /> {getChapterName(pdf.filename)}
          </motion.button>
        ))}
      </div>

      {/* Content Card */}
      <div
        style={{
          background: "#f9f9f9",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <MdOutlineLibraryBooks size={24} />
          {currentPdf?.title || "Select a Chapter"}
        </h3>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadPdf(selectedPdf)}
            disabled={!selectedPdf}
            style={getButtonStyle("#ff9f43")}
          >
            <MdFileDownload /> Download
          </motion.button>

          <motion.a
            href={getPdfUrl(selectedPdf)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={getButtonStyle("#00d2d3")}
          >
            <MdLink /> Open in New Tab
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchPdfList}
            style={getButtonStyle("#5f27cd")}
          >
            <MdRefresh /> Refresh
          </motion.button>
        </div>

        {/* PDF Viewer */}
        {selectedPdf && (
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              height: "600px",
            }}
          >
            <iframe
              src={getPdfUrl(selectedPdf)}
              title={currentPdf?.title}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
