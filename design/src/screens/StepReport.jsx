/* global React */
const { useState, useEffect, useMemo, useRef } = React;

/* ---------- Mini map (C1) ---------- */
function MiniMap({ shapes, regionId, destinations, activeId, onPick }) {
  const origin = shapes.find(s => s.id === regionId);
  if (!origin) return null;
  const shellRef = useRef(null);
  const gestureRef = useRef({ pointers: new Map(), dragStart: null, lastTapAt: 0 });
  const suppressClickUntilRef = useRef(0);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });

  const DEST_REGION_ALIAS = {
    "합정": "mapo",
    "성수": "seongdong",
    "한남": "yongsan",
    "청담": "gangnam",
    "왕십리": "seongdong",
    "문정": "songpa",
    "대치": "gangnam",
    "압구정": "gangnam",
    "둔촌": "gangdong",
    "송파(헬리오시티)": "songpa",
    "잠실(엘리트)": "songpa",
    "서현": "gyeonggi-31023",
    "판교 백현": "gyeonggi-31023",
    "압구정·도곡": "gangnam",
    "광교중앙": "gyeonggi-31014",
    "분당 정자": "gyeonggi-31023",
    "서초·반포": "seocho",
    "원흥·삼송": "gyeonggi-31101",
    "마곡": "gangseo",
    "상암·DMC": "mapo",
    "송도 6공구": "incheon-23040",
    "반포·잠원": "seocho",
  };

  function norm(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[·•ㆍ()\-\s]/g, "")
      .replace(/[,"'`]/g, "");
  }

  function stripAdmin(value) {
    return norm(value).replace(/[시군구]/g, "");
  }

  const shapeById = new Map(shapes.map(shape => [shape.id, shape]));
  const shapeIndex = shapes.map(shape => ({
    shape,
    full: norm(shape.fullName || shape.name),
    short: norm(shape.name),
    bareFull: stripAdmin(shape.fullName || shape.name),
    bareShort: stripAdmin(shape.name),
  }));

  function resolveDestinationShape(name) {
    const aliased = DEST_REGION_ALIAS[name];
    if (aliased && shapeById.has(aliased)) {
      return shapeById.get(aliased);
    }

    const target = norm(name);
    const bare = stripAdmin(name);

    for (const entry of shapeIndex) {
      if (entry.full === target || entry.short === target) return entry.shape;
    }
    for (const entry of shapeIndex) {
      if (entry.bareFull === bare || entry.bareShort === bare) return entry.shape;
    }
    for (const entry of shapeIndex) {
      if (entry.full.includes(target) || target.includes(entry.short)) return entry.shape;
      if (entry.bareFull.includes(bare) || bare.includes(entry.bareShort)) return entry.shape;
    }
    return null;
  }

  function pos(dest, i) {
    if (dest && Array.isArray(dest.mapCoord) && dest.mapCoord.length === 2) {
      return dest.mapCoord;
    }
    const name = dest && dest.name ? dest.name : "";
    const resolved = resolveDestinationShape(name);
    if (resolved && typeof resolved.cx === "number" && typeof resolved.cy === "number") {
      return [resolved.cx, resolved.cy];
    }
    // Fallback only when the destination name cannot be resolved to a real region shape.
    return [origin.cx + (i - 1) * 50, origin.cy + (i % 2 ? 30 : -30)];
  }
  let pointsRaw = destinations.map((d, i) => ({ d, p: pos(d, i) }));

  function mapLabel(name, { short = false } = {}) {
    const raw = String(name || "").trim();
    if (!raw) return "";
    if (short) {
      const parts = raw.split(/\s+/).filter(Boolean);
      if (parts.length > 1) {
        const tail = parts[parts.length - 1];
        if (/[동리가면읍구군]$/.test(tail)) return tail;
      }
    }
    return raw
      .replace(/[(（].*?[)）]/g, "")
      .replace(/시\s+/g, "시 ")
      .trim();
  }

  // Separate near-overlapping points so the "triangle" reads visually.
  // Use a fixed minimum spacing in viewBox units; push each duplicate radially out from origin in role-determined directions.
  const ROLE_DIR = { peer: -1, up: 0, wish: 1 }; // angle bias
  const MIN_SEP = 22; // viewBox units
  const points = pointsRaw.map(({ d, p }, i) => {
    let np = [p[0], p[1]];
    // If too close to origin or another point, push outward
    const baseAngle = Math.atan2(np[1] - origin.cy, np[0] - origin.cx) || 0;
    const roleBias = (ROLE_DIR[d.role] ?? 0) * 0.5; // ~30°
    const ang = baseAngle + roleBias;
    const distFromOrigin = Math.hypot(np[0] - origin.cx, np[1] - origin.cy);
    if (distFromOrigin < MIN_SEP) {
      np = [origin.cx + Math.cos(ang) * MIN_SEP, origin.cy + Math.sin(ang) * MIN_SEP];
    }
    return { d, p: np };
  });
  // Now pairwise-separate: if two dests still within MIN_SEP, push them apart
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i].p, b = points[j].p;
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const dist = Math.hypot(dx, dy) || 0.001;
        if (dist < MIN_SEP) {
          const push = (MIN_SEP - dist) / 2 + 1;
          const ux = dx / dist, uy = dy / dist;
          a[0] -= ux * push; a[1] -= uy * push;
          b[0] += ux * push; b[1] += uy * push;
        }
      }
    }
  }

  // Auto-frame: tight viewBox around origin + dests so the "triangle" is visible
  const allX = [origin.cx, ...points.map(p => p.p[0])];
  const allY = [origin.cy, ...points.map(p => p.p[1])];
  let minX = Math.min(...allX), maxX = Math.max(...allX);
  let minY = Math.min(...allY), maxY = Math.max(...allY);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  // Tight bounding span — clustered groups (강동권 잠실 등) zoom in hard so the "triangle" is large
  const spanX = Math.max(maxX - minX, 30);
  const spanY = Math.max(maxY - minY, 30);
  // Padding: enough for labels around dots, but small relative to viewBox so points stay big
  const pad = 32;
  // Keep aspect close to 800/380 ≈ 2.1
  const targetAspect = 800 / 380;
  let vbW = Math.max(spanX + pad * 2, (spanY + pad * 2) * targetAspect);
  // Cap vbW so we don't over-zoom on extremely tight clusters (max ~6x zoom)
  vbW = Math.max(vbW, 130);
  let vbH = vbW / targetAspect;
  let vbX = cx - vbW / 2;
  let vbY = cy - vbH / 2;
  // Zoom factor relative to original 800-wide viewBox; scale dots/labels inversely
  const zoom = 800 / vbW;
  const dotR = 6 / Math.max(zoom, 1);
  const dotRActive = 9 / Math.max(zoom, 1);
  const originR = 6 / Math.max(zoom, 1);
  const ringR = 20 / Math.max(zoom, 1);
  const labOff = 14 / Math.max(zoom, 1);
  const labelFont = Math.max(3.8, 12 / Math.max(zoom, 1));
  const originFont = Math.max(4.2, 11.5 / Math.max(zoom, 1));
  const labelHalo = Math.max(1.6, 7 / Math.max(zoom, 1));
  const hasNorthConflict = points.some(({ p }) => p[1] < origin.cy && Math.abs(p[0] - origin.cx) < 34);
  const originLabelY = origin.cy + (hasNorthConflict ? labOff * 1.55 : -labOff * 1.15);

  // Label placement: push each dest label radially outward from the centroid, so 3 labels don't overlap
  function labelAnchor(p) {
    const dx = p[0] - cx, dy = p[1] - cy;
    const ax = dx > 4 ? "start" : dx < -4 ? "end" : "middle";
    return ax;
  }
  function labelDelta(p) {
    const dx = p[0] - cx, dy = p[1] - cy;
    const len = Math.max(1, Math.hypot(dx, dy));
    const ux = dx / len, uy = dy / len;
    const off = labOff * 1.2;
    // Bias vertical: above when north, below when south
    return [ux * off, uy * off + (uy < 0 ? -2 : 8) / Math.max(zoom, 1)];
  }

  function estimateLabelBounds(text, x, y, anchor, fontSize) {
    const width = Math.max(fontSize * 2.2, text.length * fontSize * 0.62);
    const height = fontSize * 1.35;
    let left = x;
    if (anchor === "middle") left = x - width / 2;
    if (anchor === "end") left = x - width;
    return {
      minX: left - labelHalo * 1.4,
      maxX: left + width + labelHalo * 1.4,
      minY: y - height - labelHalo * 1.4,
      maxY: y + labelHalo * 1.8,
    };
  }

  const labelBoxes = [];
  labelBoxes.push(
    estimateLabelBounds(
      mapLabel(origin.name, { short: true }),
      origin.cx,
      originLabelY,
      "middle",
      originFont
    )
  );
  points.forEach(({ d, p }) => {
    const [ldx, ldy] = labelDelta(p);
    const anchor = labelAnchor(p);
    labelBoxes.push(
      estimateLabelBounds(
        mapLabel(d.name, { short: true }),
        p[0] + ldx,
        p[1] + ldy,
        anchor,
        labelFont
      )
    );
  });

  minX = Math.min(minX, ...labelBoxes.map(box => box.minX));
  maxX = Math.max(maxX, ...labelBoxes.map(box => box.maxX));
  minY = Math.min(minY, ...labelBoxes.map(box => box.minY));
  maxY = Math.max(maxY, ...labelBoxes.map(box => box.maxY));

  const expandedCx = (minX + maxX) / 2;
  const expandedCy = (minY + maxY) / 2;
  const expandedSpanX = Math.max(maxX - minX, 48);
  const expandedSpanY = Math.max(maxY - minY, 40);
  vbW = Math.max(expandedSpanX + 16, (expandedSpanY + 16) * targetAspect, 130);
  vbH = vbW / targetAspect;
  vbX = expandedCx - vbW / 2;
  vbY = expandedCy - vbH / 2;

  function clampScale(scale) {
    return Math.max(1, Math.min(3.2, scale));
  }

  function clampView(nextScale, nextX, nextY) {
    const shell = shellRef.current;
    if (!shell) return { scale: clampScale(nextScale), x: nextX, y: nextY };
    const scale = clampScale(nextScale);
    if (scale <= 1.001) return { scale: 1, x: 0, y: 0 };
    const maxX = ((scale - 1) * shell.clientWidth) / 2;
    const maxY = ((scale - 1) * shell.clientHeight) / 2;
    return {
      scale,
      x: Math.max(-maxX, Math.min(maxX, nextX)),
      y: Math.max(-maxY, Math.min(maxY, nextY)),
    };
  }

  function resetView() {
    setView({ scale: 1, x: 0, y: 0 });
  }

  function handleWheel(event) {
    if (!shellRef.current) return;
    event.preventDefault();
    const rect = shellRef.current.getBoundingClientRect();
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    setView(prev => {
      const nextScale = clampScale(prev.scale * (event.deltaY < 0 ? 1.14 : 0.88));
      const ratio = nextScale / prev.scale;
      return clampView(nextScale, prev.x - px * (ratio - 1), prev.y - py * (ratio - 1));
    });
  }

  function handlePointerDown(event) {
    if (!shellRef.current) return;
    shellRef.current.setPointerCapture?.(event.pointerId);
    const g = gestureRef.current;
    g.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (g.pointers.size === 1) {
      g.dragStart = { x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y };
      const now = Date.now();
      if (now - g.lastTapAt < 280) {
        setView(prev => prev.scale > 1.05 ? { scale: 1, x: 0, y: 0 } : clampView(2, 0, 0));
        g.lastTapAt = 0;
      } else {
        g.lastTapAt = now;
      }
    }
  }

  function handlePointerMove(event) {
    const g = gestureRef.current;
    if (!g.pointers.has(event.pointerId)) return;
    g.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (g.pointers.size === 2) {
      const pts = [...g.pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (!g.pinchStart) {
        g.pinchStart = { dist, scale: view.scale };
      } else {
        const nextScale = clampScale(g.pinchStart.scale * (dist / g.pinchStart.dist));
        setView(prev => clampView(nextScale, prev.x, prev.y));
      }
      suppressClickUntilRef.current = Date.now() + 220;
      return;
    }
    if (g.pointers.size === 1 && view.scale > 1.001 && g.dragStart) {
      const dx = event.clientX - g.dragStart.x;
      const dy = event.clientY - g.dragStart.y;
      setView(prev => clampView(prev.scale, g.dragStart.viewX + dx, g.dragStart.viewY + dy));
      suppressClickUntilRef.current = Date.now() + 180;
    }
  }

  function handlePointerEnd(event) {
    const g = gestureRef.current;
    g.pointers.delete(event.pointerId);
    if (g.pointers.size < 2) g.pinchStart = null;
    if (!g.pointers.size) g.dragStart = null;
  }

  return (
    <div className="minimap-frame">
      <div
        ref={shellRef}
        className={`minimap-panzoom-shell ${view.scale > 1.01 ? "zoomed" : ""}`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <div
          className="minimap-panzoom-target"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <svg viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
            {shapes.map(s => (
              <path key={s.id} d={s.d} className={`mm-shape ${s.id === regionId ? "origin" : ""}`} />
            ))}
            {/* connecting lines */}
            {points.map(({ d, p }) => (
              <line key={d.id} x1={origin.cx} y1={origin.cy} x2={p[0]} y2={p[1]} className={`mm-line ${d.role}`} />
            ))}
            {/* origin pulse */}
            <circle cx={origin.cx} cy={origin.cy} r={ringR} className="mm-origin-ring" />
            <circle cx={origin.cx} cy={origin.cy} r={originR} className="mm-origin" />
            <text
              x={origin.cx}
              y={originLabelY}
              textAnchor="middle"
              className="mm-label origin"
              style={{ fontSize: `${originFont}px`, strokeWidth: `${labelHalo}px` }}
            >
              {mapLabel(origin.name, { short: true })}
            </text>
            {/* dest dots */}
            {points.map(({ d, p }) => {
              const active = d.id === activeId;
              const [ldx, ldy] = labelDelta(p);
              const anchor = labelAnchor(p);
              return (
                <g
                  key={d.id}
                  onClick={() => {
                    if (Date.now() < suppressClickUntilRef.current) return;
                    onPick(d.id);
                  }}
                  style={{cursor:"pointer"}}
                >
                  <circle cx={p[0]} cy={p[1]} r={active ? dotRActive : dotR} className={`mm-dot ${d.role} ${active ? "active" : ""}`} />
                  <text
                    x={p[0] + ldx}
                    y={p[1] + ldy}
                    textAnchor={anchor}
                    className={`mm-label ${active ? "active" : ""}`}
                    style={{ fontSize: `${labelFont}px`, strokeWidth: `${labelHalo}px` }}
                  >
                    {mapLabel(d.name, { short: true })}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        {view.scale > 1.01 && (
          <button className="minimap-zoom-reset" onClick={resetView} type="button">
            원래 크기
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Scatter / mobile explorer (C4) ---------- */
function DesireMobilityExplorer({ destinations, graphOnlyDestinations, activeId, onPick }) {
  const active = destinations.find(d => d.id === activeId) || destinations[0];
  const plotted = destinations.concat(graphOnlyDestinations || []);
  const [compact, setCompact] = useState(() => window.matchMedia && window.matchMedia("(max-width: 860px)").matches);
  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(max-width: 860px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  const W = compact ? 360 : 800;
  const H = compact ? 280 : 480;
  const P = compact ? 38 : 72;
  const MOBILITY_SPLIT = 50;
  const DESIRE_SPLIT = 62;
  const xScale = v => P + (v / 100) * (W - P * 2);
  const yScale = v => H - P - (v / 100) * (H - P * 2);
  const roleColor = role => {
    if (role === "peer") return "var(--c-peer)";
    if (role === "up") return "var(--c-up)";
    if (role === "down") return "var(--c-down)";
    return "var(--c-wish)";
  };

  function blurbFor(destination) {
    if (destination.role === "peer") return "지금 생활권을 크게 깨지 않고 옮길 수 있는 현실 후보";
    if (destination.role === "up") return "한 단계 더 올라가고 싶을 때 가장 먼저 보는 상향 시나리오";
    if (destination.role === "wish") return "당장 어렵더라도 계속 비교 기준으로 삼는 욕망의 좌표";
    if (destination.role === "down") return "버티기 위해 한 단계 낮춰 보는 현실 타협안";
    if (destination.metrics.mobility >= 70) return "지금도 충분히 갈 만한 현실 후보";
    if (destination.metrics.desire >= 85) return "욕망은 크지만 자금 간극이 큰 상향지";
    return "다음 사이클에서 다시 볼 가능성이 높은 후보";
  }

  function pointLabelLayout(destination) {
    const cx = xScale(destination.metrics.mobility);
    const cy = yScale(destination.metrics.desire);
    const isActive = destination.id === activeId;
    if (isActive) {
      const chipW = Math.max(94, destination.name.length * 17 + 24);
      let x = cx + 18;
      let y = cy - 18;
      let anchor = "start";
      if (cx + 18 + chipW > W - P) {
        x = cx - chipW - 6;
        anchor = "start";
      }
      if (destination.metrics.desire > 82) {
        y = cy - 8;
      }
      if (y < P) y = cy + 10;
      return { x, y, anchor, active: true };
    }

    if (destination.role === "wish") {
      const y = cy - 18 < P + 10 ? cy + 22 : cy - 18;
      return { x: cx, y, anchor: "middle", active: false };
    }
    if (destination.role === "up") {
      const x = cx + 16 + destination.name.length * 9 > W - P ? cx - 16 : cx + 16;
      const anc = x < cx ? "end" : "start";
      return { x, y: cy + 6, anchor: anc, active: false };
    }
    if (destination.role === "down") {
      return { x: cx - 14, y: cy + 18, anchor: "end", active: false };
    }
    return { x: cx - 16, y: cy - 10, anchor: "end", active: false };
  }

  return (
    <div className="scatter-block">
      <div className="scatter-head">
        <h4>선호도 × <em>이동 가능성</em></h4>
        <span className="mono">DESIRE / MOBILITY · 100 SCALE</span>
      </div>
      <div className="scatter-desktop">
        <svg className="scatter-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <rect x={P} y={P} width={W - P * 2} height={H - P * 2} className="scatter-plane" />
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} className="axis-line" />
          <line x1={P} y1={P} x2={P} y2={H - P} className="axis-line" />
          <line x1={xScale(MOBILITY_SPLIT)} y1={P} x2={xScale(MOBILITY_SPLIT)} y2={H - P} className="axis-mid" />
          <line x1={P} y1={yScale(DESIRE_SPLIT)} x2={W - P} y2={yScale(DESIRE_SPLIT)} className="axis-mid" />
          <text x={xScale(86)} y={yScale(92)} textAnchor="end" className="quad-label">상향 희망</text>
          <text x={xScale(12)} y={yScale(92)} textAnchor="start" className="quad-label">가고 싶은 곳</text>
          <text x={xScale(84)} y={yScale(22)} textAnchor="end" className="quad-label">현실 후보</text>
          <text x={xScale(12)} y={yScale(22)} textAnchor="start" className="quad-label">현실 타협</text>
          <text x={W - P} y={H - 26} textAnchor="end" className="axis-label">→ 이동 가능성</text>
          <text x={P + 6} y={P - 18} className="axis-label">↑ 선호도</text>
          {plotted.map(d => {
            const cx = xScale(d.metrics.mobility);
            const cy = yScale(d.metrics.desire);
            const isActive = d.id === activeId;
            const color = roleColor(d.role);
            const label = pointLabelLayout(d);
            return (
              <g key={d.id} onClick={() => !d.graphOnly && onPick(d.id)} style={{cursor:d.graphOnly ? "default" : "pointer", opacity:d.graphOnly ? 0.8 : 1}}>
                {isActive && !d.graphOnly && <circle cx={cx} cy={cy} r="40" fill={color} opacity="0.12" />}
                {d.graphOnly && <circle cx={cx} cy={cy} r="32" fill={color} opacity="0.07" />}
                <circle cx={cx} cy={cy} r={isActive ? 15 : 11} className="pt-shadow" opacity={isActive ? "0.22" : "0.10"} fill={color} />
                <circle
                  className="pt"
                  cx={cx}
                  cy={cy}
                  r={d.graphOnly ? 8 : (isActive ? 12 : 9)}
                  fill={color}
                  stroke="var(--bg)"
                  strokeWidth={d.graphOnly ? 2 : (isActive ? 4 : 3)}
                />
                {isActive && !d.graphOnly ? (
                  <g className="scatter-chip active">
                    {(() => { const w = Math.max(94, d.name.length * 17 + 24); return (
                      <>
                        <rect x={label.x} y={label.y} width={w} height={30} rx={15} fill="var(--ink)" stroke="var(--rule)" />
                        <text x={label.x + 12} y={label.y + 20} textAnchor={label.anchor} className="pt-name active">{d.name}</text>
                      </>
                    ); })()}
                  </g>
                ) : (
                  <text x={label.x} y={label.y} textAnchor={label.anchor} className="pt-name passive">{d.name}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="scatter-mobile">
        <div className="dm-tabs" role="tablist" aria-label="목적지 비교">
          {destinations.map(d => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                className={`dm-tab ${isActive ? "active" : ""} ${d.role}`}
                onClick={() => onPick(d.id)}
                role="tab"
                aria-selected={isActive}
              >
                <span className="dm-tab-role">{d.roleKr}</span>
                <span className="dm-tab-name">{d.name}</span>
              </button>
            );
          })}
        </div>

        <div className={`dm-active-card ${active.role}`}>
          <div className="dm-active-head">
            <div>
              <span className="dm-active-kicker">{active.roleLabel}</span>
              <div className="dm-active-name">{active.name}</div>
            </div>
            <div className="dm-active-score">{active.score}<span>/100</span></div>
          </div>
          <p className="dm-active-copy">{blurbFor(active)}</p>
          <div className="dm-active-bars" aria-hidden>
            <div className="dm-active-metric">
              <span className="dm-active-label">선호도</span>
              <div className="dm-active-track">
                <div className="dm-active-fill desire" style={{height: `${active.metrics.desire}%`}} />
              </div>
              <span className="dm-active-value">{active.metrics.desire}</span>
            </div>
            <div className="dm-active-metric">
              <span className="dm-active-label">이동 가능성</span>
              <div className="dm-active-track">
                <div className="dm-active-fill mobility" style={{height: `${active.metrics.mobility}%`}} />
              </div>
              <span className="dm-active-value">{active.metrics.mobility}</span>
            </div>
          </div>
        </div>

        <div className="dm-list">
          {destinations.map(d => {
            const isActive = d.id === activeId;
            return (
              <button key={d.id} className={`dm-row ${isActive ? "active" : ""}`} onClick={() => onPick(d.id)}>
                <div className="dm-row-title">
                  <span className={`dm-row-dot ${d.role}`} />
                  <span>{d.name}</span>
                </div>
                <div className="dm-row-tracks">
                  <div className="dm-row-track">
                    <div className="dm-row-fill desire" style={{width: `${d.metrics.desire}%`}} />
                  </div>
                  <div className="dm-row-track">
                    <div className="dm-row-fill mobility" style={{width: `${d.metrics.mobility}%`}} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Price gap vertical bars (C5) ---------- */
function PriceGapBars({ region, active }) {
  // Use price-per-㎡ values; fall back to derived if missing
  function parsePsm(s) {
    if (!s) return 0;
    const m = s.match(/([\d,.]+)/);
    if (!m) return 0;
    const num = parseFloat(m[1].replace(/,/g, ""));
    if (s.includes("억")) return num * 10000;
    return num; // 만원/㎡
  }
  const originPsm = (() => {
    const explicit = parsePsm(region.pricePsm);
    if (explicit > 0) return explicit;
    const m = region.avgPrice.match(/([\d.]+)/);
    const billions = m ? parseFloat(m[1]) : 10;
    return Math.round(billions * 10000 / 99); // ~99㎡ for 30평
  })();
  const destPsm = parsePsm(active.metrics.pricePsm) || originPsm * 1.2;
  const max = Math.max(originPsm, destPsm) * 1.15;
  const oh = Math.max(8, Math.min(92, (originPsm / max) * 100));
  const dh = Math.max(8, Math.min(92, (destPsm / max) * 100));
  const baselineLine = oh;

  return (
    <div className="pricegap-block">
      <div className="pg-col pg-col-bars">
        <div className="pg-head">
          <span className="pg-lab">평단가 · 만원/㎡</span>
          <span className="pg-legend"><span className="sw sw-origin" /> 지금 사는 곳 <span className="sw sw-dest" /> 후보지</span>
        </div>
        <div className="pg-vchart" aria-hidden>
          <div className="pg-vbars">
            <div className="pg-vlimit" style={{bottom: `${baselineLine}%`}}>
              <span className="pg-vlimit-line" />
              <span className="pg-vlimit-label">현재 평단가 기준선</span>
            </div>
            <div className="pg-vcol">
              <span className="pg-vvalue">{originPsm.toLocaleString()}</span>
              <div className="pg-vtrack">
                <div className="pg-vfill is-origin" style={{height: `${oh}%`}} />
              </div>
              <span className="pg-vname">{region.name}</span>
              <span className="pg-vmeta">기준</span>
            </div>
            <div className="pg-vcol">
              <span className="pg-vvalue">{destPsm.toLocaleString()}</span>
              <div className="pg-vtrack">
                <div className="pg-vfill is-dest" style={{height: `${dh}%`}} />
              </div>
              <span className="pg-vname">{active.name}</span>
              <span className="pg-vmeta">{active.metrics.priceGap.value}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pg-col pg-col-info">
        <span className="pg-lab">가격 차이</span>
        <div className="pg-val" style={{color:"var(--terracotta)"}}>{active.metrics.priceGap.value} <span className="unit">{active.metrics.priceGap.pct}%</span></div>
        <p className="pg-desc">
          {region.name} 평균 매매가 대비 <strong>{active.name}</strong>의 가격 차이입니다. 점선은 <strong>현재 거주지의 평단가 기준선</strong>입니다.
        </p>
      </div>
    </div>
  );
}

/* ---------- Metric tile ---------- */
function Metric({ lab, v, max, fill, micro }) {
  const pct = Math.round((v / max) * 100);
  return (
    <div className="metric">
      <span className="lab">{lab}</span>
      <div className="row">
        <span className="v">{v}</span>
        <span className="delta">/ {max}</span>
      </div>
      <div className="bar"><div className={`bar-fill ${fill}`} style={{width: `${pct}%`}} /></div>
      <div className="micro">{micro}</div>
    </div>
  );
}

function ReverseAudiencePanel({ targetName, reverseAudience }) {
  if (!reverseAudience) return null;

  const roles = ["peer", "up", "wish"].map(key => reverseAudience.roles[key]).filter(Boolean);

  return (
    <section className="reverse-audience">
      <div className="reverse-head">
        <div>
          <span className="eyebrow">Who Wants This Place</span>
          <h3><em>{targetName}</em>을(를) 원하는 사람들</h3>
        </div>
        <p className="reverse-copy">
          같은 동네라도 어떤 사람에게는 현실 후보이고, 어떤 사람에게는 상향지이거나 욕망의 목적지입니다.
        </p>
      </div>

      <div className="reverse-grid">
        {roles.map(role => (
          <div key={role.label} className={`reverse-role reverse-role-${role.labelKr.replace(/\s+/g, "-")}`}>
            <div className="reverse-role-head">
              <span className="reverse-role-kicker">{role.label}</span>
              <h4>{role.labelKr}</h4>
              <p>{role.copy}</p>
              {role.fallbackFrom && (
                <div className="reverse-role-note">
                  {role.fallbackNote || (
                    <>직접 집계가 적어 <strong>{role.fallbackFrom}</strong> 생활권까지 넓혀 봤습니다.</>
                  )}
                </div>
              )}
              <div className="reverse-role-total">{role.total}개 시나리오</div>
            </div>

            <div className="reverse-list">
              {role.personaList.slice(0, 4).map(persona => (
                <div key={persona.id} className="reverse-persona">
                  <div className="reverse-persona-main">
                    <div className="reverse-persona-id">
                      <span className="reverse-persona-emoji">{persona.emoji}</span>
                      <div>
                        <div className="reverse-persona-name">{persona.name}</div>
                        <div className="reverse-persona-tagline">{persona.tagline}</div>
                      </div>
                    </div>
                    <div className="reverse-persona-score">
                      <strong>{persona.share}%</strong>
                      <span>{persona.count}회</span>
                    </div>
                  </div>
                  {!!persona.topOrigins.length && (
                    <div className="reverse-origin-row">
                      <span className="reverse-origin-lab">자주 출발하는 곳</span>
                      <div className="reverse-origin-chips">
                        {persona.topOrigins.map(origin => (
                          <span key={origin.id} className="reverse-origin-chip">
                            {origin.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Main ---------- */
function StepReport({ region, persona, report, onBack, onRestart, onOpenAbout }) {
  const data = window.__APP_DATA__;
  const [activeId, setActiveId] = useState(report.destinations[0].id);
  const active = report.destinations.find(d => d.id === activeId);
  const graphOnlyDestinations = useMemo(() => {
    const explicit = report.graphOnlyDestinations || [];
    if (explicit.some(d => d.role === "down")) return explicit;
    if (!data.buildGenericReport) return explicit;
    const genericFallback = data.buildGenericReport(region, persona);
    const fallbackDown = (genericFallback.graphOnlyDestinations || []).find(d => d.role === "down");
    if (!fallbackDown) return explicit;
    return [fallbackDown].concat(explicit);
  }, [data, report, region, persona]);
  const reverseAudience = useMemo(() => {
    if (!active) return null;
    return data.getReverseAudienceForTarget ? data.getReverseAudienceForTarget(active.name) : null;
  }, [data, active]);

  useEffect(() => {
    setActiveId(report.destinations[0].id);
  }, [report]);

  return (
    <section className="report page-enter">
      <header className="report-masthead">
        <div>
          <div className="vol">분석 리포트</div>
          <h1>
            <em>{persona.name}</em>이(가)<br />
            다음에 살 법한 세 동네
          </h1>
          <p className="lede">
            {region.name} {persona.name} 페르소나의 자산·생활 데이터를 기반으로,
            <em style={{fontStyle:"italic", color:"var(--terracotta)"}}> 현실 후보 · 한 단계 위 · 가고 싶은 곳</em>까지 세 가지 시나리오를 함께 봅니다.
          </p>
        </div>
        <div className="report-id">
          <div className="row">
            <span>출발</span>
            <span className="pill"><span className="em">📍</span><span className="lab">{region.name}</span></span>
          </div>
          <div className="row">
            <span>페르소나</span>
            <span className="pill"><span className="em">{persona.emoji}</span><span className="lab">{persona.name}</span></span>
          </div>
          <div className="row">
            <span>2026.05.03 · KST</span>
          </div>
        </div>
      </header>

      <div className="report-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Three Destinations</span>
            <h2>가장 위에 놓인 <em>세 개의 점</em></h2>
          </div>
          <span className="mono">CLICK / TAP ↓</span>
        </div>

        {/* C1 — Mini map */}
        <MiniMap
          shapes={data.SEOUL_SHAPES}
          regionId={region.id}
          destinations={report.destinations}
          activeId={activeId}
          onPick={setActiveId}
        />

        <div className="dests" role="tablist">
          {report.destinations.map((d, i) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                className={`dest ${isActive ? "active" : ""}`}
                onClick={() => setActiveId(d.id)}
                role="tab"
                aria-selected={isActive}
              >
                <span className={`d-role ${d.role}`}><span className="dot" />{d.roleLabel} · {d.roleKr}</span>
                <div className="d-name">{d.name}</div>
                <div className="d-cat">{d.category}</div>
                <div className="d-desc">{d.desc}</div>
                <div className="d-score">
                  <div>
                    <div className="d-score-num">{d.score}<span className="denom">/100</span></div>
                    <div className="d-score-lab">Composite · 종합 적합도</div>
                  </div>
                  <div style={{flex:1, marginLeft:18}}>
                    <div className="d-bar">
                      <div className="d-bar-fill" style={{width: `${d.score}%`}} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAIL */}
        <div className="detail detail-fade" key={active.id}>
          <aside className="detail-key">
            <span className="label">Active Destination</span>
            <div className="num-mark">{active.score}<span className="denom">/100</span></div>
            <div>
              <span className="label" style={{display:"block", marginBottom:6}}>{active.roleLabel} · {active.roleKr}</span>
              <div className="name-big"><em>{active.name}</em></div>
            </div>
            <div className="gloss">
              <div className="gloss-q">"</div>
              {active.narrative.pull.q}
              <div className="mono" style={{marginTop:12}}>— {active.narrative.pull.cite}</div>
            </div>
          </aside>

          <div className="detail-body">
            <div className="metric-grid">
              <Metric lab="선호도 · Preference" v={active.metrics.desire} max={100}
                fill={active.metrics.desire >= 80 ? "" : "coral"}
                micro="이 페르소나가 이 동네에 두는 가중치" />
              <Metric lab="이동 가능성 · Mobility" v={active.metrics.mobility} max={100}
                fill="olive"
                micro="자본·소득·라이프 단계를 고려한 실현 확률" />
              <Metric lab="정책 모빌리티 · Policy" v={active.metrics.policy} max={100}
                fill="gold"
                micro="규제·세제·금융정책의 우호도" />
              <div className="metric">
                <span className="lab">평단가 (전용 ㎡)</span>
                <div className="row">
                  <span className="v">{active.metrics.pricePsm}</span>
                  <span className="delta">LTV {active.metrics.ltv}</span>
                </div>
                <div className="micro">현 거주지 대비 가격 차는 아래 그래프에서 확인</div>
              </div>

              {/* C5 spans both columns */}
              <PriceGapBars region={region} active={active} />

              {/* C4 spans both columns */}
              <DesireMobilityExplorer
                destinations={report.destinations}
                graphOnlyDestinations={graphOnlyDestinations}
                activeId={activeId}
                onPick={setActiveId}
              />
            </div>

            <div className="narrative">
              <h3 dangerouslySetInnerHTML={{__html: active.narrative.title}} />
              {active.narrative.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{__html: p}} />
              ))}
            </div>

            <div className="quote-pull">
              <div className="qmark">"</div>
              <div>
                <blockquote>{active.narrative.pull.q}</blockquote>
                <cite>{active.narrative.pull.cite} · {persona.name}</cite>
              </div>
            </div>

            <ReverseAudiencePanel targetName={active.name} reverseAudience={reverseAudience} />
          </div>
        </div>
      </div>

      <div className="report-foot">
        <button className="btn-ghost" onClick={onBack}>← 페르소나 다시 고르기</button>
        <button className="report-about-link" onClick={onOpenAbout}>About Project</button>
        <button className="btn-ghost" onClick={onRestart} style={{justifySelf:"end"}}>처음부터 다시 ↻</button>
      </div>
    </section>
  );
}

window.StepReport = StepReport;
