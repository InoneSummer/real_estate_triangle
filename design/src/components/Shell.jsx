/* global React */
const { useEffect, useState } = React;

function Shell({ step, region, persona, onJumpStep, children }) {
  const stepDefs = [
    { i: 1, label: "지역" },
    { i: 2, label: "페르소나" },
    { i: 3, label: "리포트" },
  ];

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("idong-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("idong-theme", theme);
    window.dispatchEvent(new Event("palettechange"));
  }, [theme]);

  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem("idong-palette");
    return ["editorial", "forest", "aubergine", "vintage"].includes(saved) ? saved : "aubergine";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
    localStorage.setItem("idong-palette", palette);
    window.dispatchEvent(new Event("palettechange"));
  }, [palette]);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-main">
            <div className="mark">내 마음속 부동산 이동지도</div>
            <div className="theme-toggle brand-toggle" role="group" aria-label="테마 전환">
              <button className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")} aria-label="라이트 모드" title="라이트">☀</button>
              <button className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")} aria-label="다크 모드" title="다크">☾</button>
            </div>
          </div>
          <div className="tag">갈 수 있을까? 그 동네 | 400만 한국인 페르소나로 보는 부동산 이동지도</div>
        </div>
        <nav className="topnav">
          <div className="steps" role="tablist" aria-label="Progress">
            {stepDefs.map((s, idx) => {
              const state = s.i === step ? "active" : s.i < step ? "done" : "";
              const clickable = s.i < step;
              return (
                <React.Fragment key={s.i}>
                  <button
                    className={`step-pill ${state}`}
                    onClick={() => clickable && onJumpStep(s.i)}
                    disabled={!clickable}
                    style={{ cursor: clickable ? "pointer" : "default" }}
                    aria-current={s.i === step ? "step" : undefined}
                  >
                    <span className="dot" />
                    <span>{String(s.i).padStart(2, "0")} / {s.label}</span>
                  </button>
                  {idx < stepDefs.length - 1 && <span className="step-sep" />}
                </React.Fragment>
              );
            })}
          </div>
          <span className="meta">2026.05</span>
        </nav>
      </header>
      <main className="page">
        {children}
      </main>
    </div>
  );
}

window.Shell = Shell;
