import React from "react";

const CodeBlock = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Código copiado al portapapeles");
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#1e1e1e",
        color: "#dcdcdc",
        padding: "15px",
        borderRadius: "8px",
        fontFamily: "monospace",
        overflowX: "auto",
      }}
    >
      <pre style={{ margin: 0 }}>{code}</pre>
      <button
        onClick={copyToClipboard}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#f89200",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Copiar
      </button>
    </div>
  );
};

export default CodeBlock;