export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <h1
        style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: "clamp(10px, 2.5vw, 5rem)",
          fontWeight: 900,
          fontStyle: "italic",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          margin: "0",
          background:
            "linear-gradient(90deg, #FF0000 0%, #FFD700 50%, #00FF00 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(2px 2px 0px #000)",
          transform: "skewX(-10deg)",
          whiteSpace: "nowrap",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        Super Cabuloso Mega Hiper Super Tunado Site
      </h1>
    </div>
  );
}
