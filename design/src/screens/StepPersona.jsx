/* global React */

// Editorial silhouette portraits — abstract, color-keyed per persona role
const PALETTES = [
  { bg:"#E8DCC2", fg:"#5C6B3A", accent:"#C49A2C" }, // olive
  { bg:"#EAD9C8", fg:"#B8703F", accent:"#6E4A2A" }, // terracotta
  { bg:"#DBDED0", fg:"#3F4A28", accent:"#8A9A60" }, // forest
  { bg:"#EFD7B8", fg:"#6E4A2A", accent:"#C49A2C" }, // umber
  { bg:"#E2D6CB", fg:"#6F4F5C", accent:"#B8703F" }, // plum
  { bg:"#F0E1B5", fg:"#5C6B3A", accent:"#B8703F" }, // wheat
];

function PortraitEmoji({ idx, emoji }) {
  const p = PALETTES[idx % PALETTES.length];
  return (
    <div className="pc-portrait-emoji" style={{background:p.bg}}>
      <span className="glyph" role="img" aria-hidden>{emoji}</span>
    </div>
  );
}

function StepPersona({ region, personas, selectedPersona, onSelect, onNext, onBack }) {
  const sel = personas.find(p => p.id === selectedPersona);
  return (
    <section className="persona-page page-enter">
      <header className="persona-head">
        <div>
          <span className="eyebrow">Step 02 · 페르소나</span>
          <h1>
            <em>{region.name}</em>에 사는 서로 다른 사람들.<br />
            본인과 가장 닮은 한 사람을 골라주세요.
          </h1>
        </div>
        <div className="ctx">
          <span className="pin">{region.name} · {region.nameEn}</span>
          <span>{personas.length}개 페르소나</span>
        </div>
      </header>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:20}}>
        <span className="eyebrow">생활 패턴이 비슷한 카드를 한 장 골라주세요</span>
        <span className="mono">{personas.length} CASES</span>
      </div>

      <div className="persona-grid stagger" role="radiogroup" aria-label="페르소나">
        {personas.map((p, i) => {
          const isSel = selectedPersona === p.id;
          const dim = selectedPersona && !isSel;
          // desire meter — derive from index for variety (mock data hook)
          const desireLevel = (i % 4) + 2; // 2..5
          return (
            <button
              key={p.id}
              className={`persona-card ${isSel ? "selected" : ""} ${dim ? "dim" : ""}`}
              onClick={() => onSelect(p.id)}
              role="radio"
              aria-checked={isSel}
            >
              <span className="pc-num">CASE · {String(i + 1).padStart(2, "0")}</span>
              <div className="pc-portrait" aria-hidden>
                <PortraitEmoji idx={i} emoji={p.emoji} />
              </div>
              <div className="pc-name">{p.name}</div>
              <div className="pc-line">"{p.tagline}"</div>
              <div className="pc-quote">{p.quote}</div>
              <div className="pc-tags">
                {p.tags.map(t => <span className="pc-tag" key={t}>{t}</span>)}
              </div>
              <div className="pc-meter" aria-label="이동 의향">
                <span className="lab">이동 의향 강도</span>
                <span className="segs">
                  {[0,1,2,3,4].map(k => (
                    <span key={k} className={`seg ${k < desireLevel ? "on" : ""}`} />
                  ))}
                </span>
              </div>
              <span className="pc-check" aria-hidden />
            </button>
          );
        })}
      </div>

      <div className="persona-foot">
        <span className="selected-readout">
          {sel ? (
            <React.Fragment>선택됨 · <em>{sel.name}</em> <span style={{color:"var(--ink-4)"}}>— {sel.tagline}</span></React.Fragment>
          ) : (
            <span style={{color:"var(--ink-4)", fontStyle:"italic"}}>아직 선택된 페르소나가 없습니다.</span>
          )}
        </span>
        <div style={{display:"flex", gap:18, alignItems:"center"}}>
          <button className="btn-ghost" onClick={onBack}>← 지역 다시 고르기</button>
          <button className={`btn-primary ${sel ? "" : "disabled"}`} disabled={!sel} onClick={() => sel && onNext()}>
            리포트 열기 <span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

window.StepPersona = StepPersona;
