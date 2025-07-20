import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css, ThemeProvider } from "styled-components"; // Import styled and ThemeProvider

// --- 1. Define your Theme (for consistency) ---
const theme = {
  colors: {
    primary: "#667eea", // Purple-blue for main actions/branding
    secondary: "#764ba2", // Deeper purple for gradients
    textPrimary: "#334155", // Darker text for headings
    textSecondary: "#64748b", // Lighter text for paragraphs
    background: "#f8fafc", // Light background
    white: "white",
    success: "#22c55e", // Green for success/positive actions
    warning: "#f59e0b", // Orange for warnings
    error: "#ef4444", // Red for errors
    border: "#e2e8f0", // Light border color
    infoBg: "#f0f9ff", // Light blue for info boxes
    infoBorder: "#bae6fd",
    infoText: "#0369a1",
    buttonHover: "#5a6ad1", // Slightly darker primary for hover
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "14px",
  },
  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(102, 126, 234, 0.3)",
    lg: "0 6px 16px rgba(102, 126, 234, 0.4)", // For hover
  },
  fontSize: {
    sm: "0.9rem",
    md: "1rem",
    lg: "1.1rem",
    xl: "1.2rem",
    title: "clamp(1.8rem, 4vw, 2.5rem)",
    largeIcon: "3rem",
  },
  transitions: {
    ease: "all 0.3s ease",
    fast: "all 0.2s ease",
  },
};

// --- 2. Styled Components Definitions ---

const PageContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  background: rgba(102, 126, 234, 0.08);
  border: 2px solid rgba(102, 126, 234, 0.15);
  transition: ${theme.transitions.ease};

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.title};
  font-weight: 900;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${theme.spacing.md} 0;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.lg};
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 20px; /* Slightly different padding */
  border-radius: ${theme.borderRadius.md};
  border: none;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transitions.ease};
  min-width: 140px;

  ${(props) =>
    props.$isActive // Use transient prop for boolean
      ? css`
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
        `
      : css`
          background: ${theme.colors.white};
          color: ${theme.colors.textSecondary};
          box-shadow: ${theme.shadows.sm};
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          }
        `}
`;

const PdfCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${theme.colors.border};
  min-height: 800px;
  display: flex;
  flex-direction: column; /* Ensure content flows vertically */
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.border};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const ControlsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  min-width: 200px;
`;

const ControlsRight = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: none;
  background: ${(props) => props.$bgColor || theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-size: ${theme.fontSize.sm};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    filter: none;
    transform: none;
    box-shadow: none;
  }
`;

const StyledIframeContainer = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  flex-grow: 1; /* Allows iframe to take available space */
  position: relative;
  min-height: clamp(600px, 80vh, 800px); /* Keep minimum height */
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%; /* Fill the container */
  border: none;
`;

const FallbackMessage = styled.div`
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textSecondary};
  background: ${theme.colors.background};

  h3 {
    color: ${theme.colors.textPrimary};
    margin-bottom: ${theme.spacing.md};
  }
`;

const DebugInfo = styled.div`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.infoBg};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.infoBorder};
  font-size: 0.8rem;
  color: ${theme.colors.infoText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const MessageContainer = styled.div`
  text-align: center;
  margin-top: 100px; /* Centered vertically */
`;

const StatusIcon = styled.div`
  font-size: ${theme.fontSize.largeIcon};
  margin-bottom: ${theme.spacing.lg};
`;

const StatusText = styled.div`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
`;

// --- Your React Component (with Styled Components in place) ---
export default function S1Algebre() {
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isDevelopment ? "http://localhost:5000" : ""; // Use relative path for production if backend is on same domain

  useEffect(() => {
    fetchPdfList();
  }, []);

  const fetchPdfList = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/pdf/list`, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Erreur serveur: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.pdfs)) {
        setPdfFiles(data.pdfs);
        if (data.pdfs.length > 0) {
          setSelectedPdf(data.pdfs[0].filename);
        }
      } else {
        throw new Error("Format de réponse invalide du serveur");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Délai d'attente dépassé. Vérifiez votre connexion.");
      } else if (err.message.includes("fetch")) {
        setError(
          "Impossible de se connecter au serveur. Vérifiez que le serveur est démarré."
        );
      } else {
        setError(`Erreur: ${err.message}`);
      }
      console.error("Error fetching PDFs:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPdfUrl = (filename) => {
    if (!filename) return "";
    return `${API_BASE_URL}/pdfs/${encodeURIComponent(filename)}`;
  };

  const downloadPdf = async (filename) => {
    if (!filename) return;

    try {
      const url = getPdfUrl(filename);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Impossible de télécharger le fichier");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download error:", err);
      alert("Erreur lors du téléchargement du fichier");
    }
  };

  const getChapterName = (filename) => {
    if (!filename) return "Chapitre";

    const lower = filename.toLowerCase();
    if (lower.includes("ch i") || lower.includes("ch 1") || lower.includes("chapitre 1")) {
      return "Chapitre I";
    } else if (lower.includes("ch ii") || lower.includes("ch 2") || lower.includes("chapitre 2")) {
      return "Chapitre II";
    } else if (lower.includes("ch iii") || lower.includes("ch 3") || lower.includes("chapitre 3")) {
      return "Chapitre III";
    } else if (lower.includes("ch iv") || lower.includes("ch 4") || lower.includes("chapitre 4")) {
      return "Chapitre IV";
    }
    return "Chapitre";
  };

  const currentPdf = pdfFiles.find((pdf) => pdf.filename === selectedPdf);

  if (loading) {
    return (
      <PageContainer>
        <MessageContainer>
          <StatusIcon>🔄</StatusIcon>
          <StatusText>Chargement des cours...</StatusText>
        </MessageContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <MessageContainer>
          <StatusIcon style={{ color: theme.colors.error }}>⚠️</StatusIcon>
          <StatusText style={{ color: theme.colors.error }}>{error}</StatusText>
          <PrimaryButton onClick={fetchPdfList}>🔄 Réessayer</PrimaryButton>
        </MessageContainer>
      </PageContainer>
    );
  }

  if (pdfFiles.length === 0) {
    return (
      <PageContainer>
        <MessageContainer>
          <StatusIcon>📂</StatusIcon>
          <StatusText>Aucun PDF trouvé</StatusText>
          <PrimaryButton onClick={fetchPdfList}>🔄 Actualiser</PrimaryButton>
        </MessageContainer>
      </PageContainer>
    );
  }

  return (
    <ThemeProvider theme={theme}> {/* Wrap your component with ThemeProvider */}
      <PageContainer>
        <Header>
          <BackButton to="/s1">← Retour aux cours</BackButton>
          <Title>🔢 Algèbre Linéaire</Title>
          <Subtitle>Cours de Mathématiques - Semestre 1</Subtitle>
        </Header>

        <TabContainer>
          {pdfFiles.map((pdf) => (
            <TabButton
              key={pdf.filename}
              $isActive={selectedPdf === pdf.filename} // Pass as transient prop
              onClick={() => setSelectedPdf(pdf.filename)}
              title={pdf.title}
            >
              📄 {getChapterName(pdf.filename)}
            </TabButton>
          ))}
        </TabContainer>

        <PdfCard>
          <Controls>
            <ControlsLeft>
              <h3 style={{ color: theme.colors.textPrimary, fontSize: theme.fontSize.xl, margin: 0 }}>
                📖 {currentPdf?.title || "Sélectionnez un chapitre"}
              </h3>
              {currentPdf && (
                <p style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm, margin: 0 }}>
                  Taille: {Math.round(currentPdf.size / 1024)} KB • Modifié:{" "}
                  {new Date(currentPdf.lastModified).toLocaleDateString("fr-FR")}
                </p>
              )}
            </ControlsLeft>

            <ControlsRight>
              <PrimaryButton
                onClick={() => downloadPdf(selectedPdf)}
                title="Télécharger le PDF"
                disabled={!selectedPdf}
              >
                📥 Télécharger
              </PrimaryButton>

              <PrimaryButton
                as="a" // Render as an anchor tag
                href={selectedPdf ? getPdfUrl(selectedPdf) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                $bgColor={selectedPdf ? theme.colors.success : "#94a3b8"}
                disabled={!selectedPdf}
                title="Ouvrir dans un nouvel onglet"
              >
                🔗 Nouvel onglet
              </PrimaryButton>

              <PrimaryButton
                onClick={fetchPdfList}
                $bgColor={theme.colors.warning}
                title="Actualiser la liste"
              >
                🔄 Actualiser
              </PrimaryButton>
            </ControlsRight>
          </Controls>

          {selectedPdf && (
            <StyledIframeContainer>
              <StyledIframe
                src={getPdfUrl(selectedPdf)}
                title={`PDF: ${currentPdf?.title}`}
                onError={(e) => {
                  console.error("PDF loading error:", e);
                }}
              >
                <FallbackMessage>
                  <h3>Navigateur non compatible</h3>
                  <p>Votre navigateur ne supporte pas l'affichage des PDFs.</p>
                  <PrimaryButton
                    as="a"
                    href={getPdfUrl(selectedPdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 Ouvrir le PDF
                  </PrimaryButton>
                </FallbackMessage>
              </StyledIframe>
            </StyledIframeContainer>
          )}
        </PdfCard>

        {isDevelopment && (
          <DebugInfo>
            <div>
              <strong>🌐 Serveur:</strong> {API_BASE_URL || "same origin"} •
              <strong> PDFs trouvés:</strong> {pdfFiles.length} •
              <strong> Sélectionné:</strong> {selectedPdf || "Aucun"}
            </div>
          </DebugInfo>
        )}
      </PageContainer>
    </ThemeProvider>
  );
}