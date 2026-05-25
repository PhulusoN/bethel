import { useState, useRef } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THEMES — edit colours here
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const themes = {
  light: {
    bg:           "#f5f4f0",
    surface:      "#ffffff",
    border:       "#e0ddd7",
    text:         "#1a1a18",
    textMuted:    "#8a8880",
    accent:       "#2563eb",
    accentHover:  "#1d4ed8",
    accentText:   "#ffffff",
    accentSubtle: "#eff6ff",
    iconBg:       "#f0eeea",
    danger:       "#dc2626",
    dangerBg:     "#fef2f2",
    dangerBorder: "#fecaca",
    success:      "#16a34a",
  },
  dark: {
    bg:           "#111110",
    surface:      "#1c1c1a",
    border:       "#2e2e2c",
    text:         "#e8e6e1",
    textMuted:    "#6b6a66",
    accent:       "#3b82f6",
    accentHover:  "#2563eb",
    accentText:   "#ffffff",
    accentSubtle: "#1e3a5f",
    iconBg:       "#2a2a28",
    danger:       "#f87171",
    dangerBg:     "#2d1515",
    dangerBorder: "#5a2020",
    success:      "#4ade80",
  },
};

const shared = {
  radius:   "8px",
  fontSans: "'Instrument Sans', sans-serif",
  fontMono: "'Inconsolata', monospace",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SVG ICONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const IconUpload = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconClipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="4" rx="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>
  </svg>
);
const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconBoth = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconReset = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function isValidFile(file) {
  if (!file) return { ok: false, msg: "No file selected." };
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowed.includes(file.type))
    return { ok: false, msg: "Please upload a .jpg, .png or .webp image." };
  return { ok: true, msg: "" };
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}
function saveAsText(text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "extracted.txt"; a.click();
  URL.revokeObjectURL(url);
}
async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function OCRApp() {
  const [mode, setMode]                   = useState("light");
  const [file, setFile]                   = useState(null);
  const [preview, setPreview]             = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [status, setStatus]               = useState("idle");
  const [error, setError]                 = useState("");
  const [outputChoice, setOutputChoice]   = useState(null);
  const [copied, setCopied]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [dragging, setDragging]           = useState(false);
  const fileInputRef = useRef(null);

  const t = { ...themes[mode], ...shared }; // active theme

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile); setStatus("idle"); setExtractedText("");
    setError(""); setOutputChoice(null); setCopied(false); setSaved(false);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const extractText = async () => {
    const v = isValidFile(file);
    if (!v.ok) { setError(v.msg); setStatus("error"); return; }
    setStatus("loading"); setError(""); setExtractedText(""); setOutputChoice(null);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: file.type, data: base64 } },
            { type: "text", text: "Extract ALL the text from this image exactly as it appears. Output only the raw text, no explanations, no markdown, no commentary. Just the plain text." }
          ]}]
        })
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text?.trim();
      if (!text) { setError("No text found. Try a clearer image."); setStatus("error"); return; }
      setExtractedText(text); setStatus("done");
    } catch (err) {
      setError("Something went wrong: " + err.message); setStatus("error");
    }
  };

  const handleReset = () => {
    setFile(null); setPreview(null); setExtractedText("");
    setStatus("idle"); setError(""); setOutputChoice(null);
    setCopied(false); setSaved(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOutput = async (choice) => {
    setOutputChoice(choice);
    if (choice === "copy" || choice === "both") {
      await copyToClipboard(extractedText);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
    if (choice === "txt" || choice === "both") {
      saveAsText(extractedText);
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    }
  };

  // ── inline styles built from active theme ──
  const s = {
    page:      { minHeight: "100vh", background: t.bg, fontFamily: t.fontSans, color: t.text, padding: "0 0 60px" },
    inner:     { maxWidth: "680px", margin: "0 auto", padding: "0 20px" },
    header:    { padding: "28px 0 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    appName:   { fontSize: "18px", fontWeight: "600", letterSpacing: "-0.01em", marginBottom: "2px" },
    appSub:    { fontSize: "13px", color: t.textMuted, fontFamily: t.fontMono },

    toggleBtn: {
      padding: "7px 10px", borderRadius: t.radius,
      border: `1px solid ${t.border}`, background: t.surface,
      color: t.textMuted, cursor: "pointer",
      display: "flex", alignItems: "center", gap: "6px",
      fontSize: "12px", fontFamily: t.fontSans, transition: "all .15s",
    },

    dropzone:  {
      border: `1.5px dashed ${dragging ? t.accent : t.border}`,
      borderRadius: t.radius, padding: "44px 24px", textAlign: "center",
      cursor: "pointer", background: dragging ? t.accentSubtle : t.surface,
      transition: "all .15s", position: "relative", marginBottom: "12px",
      color: dragging ? t.accent : t.textMuted,
    },
    dropInput:    { position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" },
    dropIconWrap: { marginBottom: "12px", display: "flex", justifyContent: "center" },
    dropTitle:    { fontSize: "15px", fontWeight: "600", color: t.text, marginBottom: "4px" },
    dropSub:      { fontSize: "13px", fontFamily: t.fontMono },

    fileBar:  { display: "flex", alignItems: "center", gap: "8px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: "9px 14px", marginBottom: "12px", fontSize: "13px", fontFamily: t.fontMono, color: t.textMuted },
    fileDot:  { width: "6px", height: "6px", borderRadius: "50%", background: t.success, flexShrink: 0 },

    actionRow:    { display: "flex", gap: "8px", marginBottom: "20px" },
    btnPrimary:   { flex: 1, padding: "10px 20px", borderRadius: t.radius, border: "none", background: t.accent, color: t.accentText, fontSize: "14px", fontWeight: "600", fontFamily: t.fontSans, cursor: "pointer", transition: "background .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
    btnSecondary: { padding: "10px 16px", borderRadius: t.radius, border: `1px solid ${t.border}`, background: t.surface, color: t.textMuted, fontSize: "13px", fontWeight: "500", fontFamily: t.fontSans, cursor: "pointer", transition: "all .15s", display: "flex", alignItems: "center", gap: "6px" },
    spinner:      { width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${t.accentText}`, borderTopColor: "transparent", animation: "spin .7s linear infinite", flexShrink: 0 },

    errorBox:   { background: t.dangerBg, border: `1px solid ${t.dangerBorder}`, borderRadius: t.radius, padding: "11px 14px", fontSize: "13px", color: t.danger, marginBottom: "20px", fontFamily: t.fontMono },
    previewImg: { width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: t.radius, border: `1px solid ${t.border}`, marginBottom: "20px", background: t.surface },
    sectionLabel: { fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: ".06em", color: t.textMuted, fontFamily: t.fontMono, marginBottom: "8px" },
    textarea:   { width: "100%", minHeight: "240px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: "14px", fontFamily: t.fontMono, fontSize: "13px", lineHeight: "1.7", color: t.text, resize: "vertical", outline: "none", marginBottom: "16px", transition: "border-color .15s" },

    outputPanel:  { border: `1px solid ${t.border}`, borderRadius: t.radius, background: t.surface, overflow: "hidden" },
    outputGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" },

    optBtn: (active, last) => ({
      padding: "18px 12px", border: "none",
      borderRight: last ? "none" : `1px solid ${t.border}`,
      background: active ? t.accentSubtle : t.surface,
      cursor: "pointer", transition: "background .15s",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      fontFamily: t.fontSans,
    }),
    optIconWrap: (active) => ({
      width: "36px", height: "36px", borderRadius: "50%",
      background: active ? t.accent : t.iconBg,
      color: active ? t.accentText : t.textMuted,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all .15s",
    }),
    optLabel: (active) => ({ fontSize: "13px", fontWeight: "600", color: active ? t.accent : t.text }),
    optSub:   { fontSize: "11px", color: t.textMuted, fontFamily: t.fontMono },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inconsolata:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        button:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div style={s.page}>
        <div style={s.inner}>

          {/* header */}
          <header style={s.header}>
            <div>
              <div style={s.appName}>Image to Text</div>
              <div style={s.appSub}>Upload an image — extract the text</div>
            </div>
            {/* dark mode toggle */}
            <button style={s.toggleBtn} onClick={() => setMode(mode === "light" ? "dark" : "light")}>
              {mode === "light" ? <IconMoon /> : <IconSun />}
              {mode === "light" ? "Dark" : "Light"}
            </button>
          </header>

          {/* dropzone */}
          <div
            style={s.dropzone}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" style={s.dropInput} onChange={(e) => handleFile(e.target.files[0])} />
            <div style={s.dropIconWrap}><IconUpload /></div>
            <div style={s.dropTitle}>Drop image here or click to browse</div>
            <div style={s.dropSub}>.jpg &nbsp;.png &nbsp;.webp</div>
          </div>

          {/* file bar */}
          {file && (
            <div style={s.fileBar}>
              <div style={s.fileDot} />
              <IconFile />
              <span style={{ color: t.text }}>{file.name}</span>
              <span>({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}

          {/* convert + reset */}
          <div style={s.actionRow}>
            <button style={s.btnPrimary} disabled={!file || status === "loading"} onClick={extractText}>
              {status === "loading" ? <><span style={s.spinner} /> Extracting...</> : "Convert"}
            </button>
            <button style={s.btnSecondary} onClick={handleReset}>
              <IconReset /> Reset
            </button>
          </div>

          {/* error */}
          {status === "error" && <div style={s.errorBox}>⚠ {error}</div>}

          {/* preview */}
          {preview && status === "done" && <img src={preview} alt="uploaded" style={s.previewImg} />}

          {/* result */}
          {status === "done" && (
            <>
              <div style={s.sectionLabel}>Extracted Text</div>
              <textarea style={s.textarea} value={extractedText} onChange={(e) => setExtractedText(e.target.value)} />

              <div style={s.sectionLabel}>What do you want to do with the text?</div>
              <div style={s.outputPanel}>
                <div style={s.outputGrid}>

                  <button style={s.optBtn(outputChoice === "copy", false)} onClick={() => handleOutput("copy")}>
                    <div style={s.optIconWrap(outputChoice === "copy")}>
                      {copied && outputChoice === "copy" ? <IconCheck /> : <IconClipboard />}
                    </div>
                    <span style={s.optLabel(outputChoice === "copy")}>{copied && outputChoice === "copy" ? "Copied!" : "Copy"}</span>
                    <span style={s.optSub}>to clipboard</span>
                  </button>

                  <button style={s.optBtn(outputChoice === "txt", false)} onClick={() => handleOutput("txt")}>
                    <div style={s.optIconWrap(outputChoice === "txt")}>
                      {saved && outputChoice === "txt" ? <IconCheck /> : <IconDownload />}
                    </div>
                    <span style={s.optLabel(outputChoice === "txt")}>{saved && outputChoice === "txt" ? "Saved!" : "Save"}</span>
                    <span style={s.optSub}>as .txt file</span>
                  </button>

                  <button style={s.optBtn(outputChoice === "both", true)} onClick={() => handleOutput("both")}>
                    <div style={s.optIconWrap(outputChoice === "both")}>
                      {(copied || saved) && outputChoice === "both" ? <IconCheck /> : <IconBoth />}
                    </div>
                    <span style={s.optLabel(outputChoice === "both")}>{(copied || saved) && outputChoice === "both" ? "Done!" : "Both"}</span>
                    <span style={s.optSub}>copy + save</span>
                  </button>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}