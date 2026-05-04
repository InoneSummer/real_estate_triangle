/* global React */
const { useEffect, useRef, useState } = React;

function StepRegion({ regions, shapes, selectedRegion, onSelect, onNext }) {
  const sel = regions.find(r => r.id === selectedRegion);
  const [hoveredId, setHoveredId] = useState(null);
  const selectionCardRef = useRef(null);

  useEffect(() => {
    if (!sel || !selectionCardRef.current) return;
    const raf = window.requestAnimationFrame(() => {
      selectionCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [sel]);

  return (
    <section className="region page-enter">
      <div className="region-stage">
        {/* TOP — hero copy strip */}
        <header className="region-top">
          <div className="region-top-l">
            <span className="eyebrow">Step 01 · 지금 사는 곳</span>
            <h1 className="region-headline">나랑 같은 동네에 사는 사람들은 <em>어디로 가고 싶어할까?</em></h1>
            <p className="region-sub">
              같은 동네에 사는 사람들이 다음으로 이사 가는 세 곳을 보여드립니다. 먼저, 지금 사는 지역을 지도에서 골라주세요.
            </p>
          </div>
        </header>

        {/* BIG MAP only */}
        <div className="region-grid one">
          <div className="region-map-wrap big">
            <SeoulMap
              shapes={shapes}
              regions={regions}
              selectedId={selectedRegion}
              onSelect={onSelect}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              footerHint={`분석가능 지역 ${regions.filter(r=>r.available).length}곳`}
            />
          </div>
        </div>

        <div className="region-selection-zone" ref={selectionCardRef} aria-live="polite">
          {sel ? (
            <div className="region-selection-card" key={sel.id}>
              <div className="region-selection-copy">
                <span className="region-selection-kicker">Selected Region</span>
                <div className="region-selection-head">
                  <span className="region-selection-name">{sel.name}</span>
                  <span className="region-selection-en">{sel.nameEn}</span>
                </div>
                <p className="region-selection-blurb">{sel.blurb}</p>
              </div>
              <div className="region-selection-metrics">
                <div className="region-selection-row">
                  <span className="k">평균 매매가</span>
                  <span className="v num">{sel.avgPrice}<span className="d">{sel.deltaY}</span></span>
                </div>
                <div className="region-selection-row">
                  <span className="k">키워드</span>
                  <span className="v keyword-list">
                    {sel.keywords.map((keyword, index) => (
                      <span key={`${sel.id}-${keyword}-${index}`} className="keyword-chip">{keyword}</span>
                    ))}
                  </span>
                </div>
                <button
                  className="btn-primary region-selection-cta"
                  onClick={() => sel && onNext()}
                >
                  {sel.name} 페르소나 보기 <span className="arr">→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="region-selection-empty">
              <span className="region-selection-kicker">아직 미선택</span>
              <p>지도에서 보고싶은 지역을 선택해주세요 !</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

window.StepRegion = StepRegion;
