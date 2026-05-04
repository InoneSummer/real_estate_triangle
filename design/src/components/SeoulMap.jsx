/* global React */
const { useState, useRef, useEffect } = React;

const DETACHED_IDS = new Set(["incheon-23320"]);
const COMPLEX_SPLIT_SELECTION_IDS = new Set([
  "gyeonggi-hs-41591",
  "gyeonggi-hs-41593",
  "gyeonggi-hs-41595",
  "gyeonggi-hs-41597",
]);
const REAL_PRICE_MAP = (window.__REAL_PRICE_HINTS__ && window.__REAL_PRICE_HINTS__.values) || {};

// ── Synthetic price table for the whole 수도권 (단위: 억) ──
// real REGIONS data takes priority; this fills in the rest so the whole
// map can be rendered as a continuous choropleth.
const SYNTH_PRICES = {
  // 서울
  "gangnam":15.7, "gangdong":12.3, "gangbuk":7.8, "gangseo":10.1, "gwanak":8.6,
  "gwangjin":12.4, "guro":7.9, "geumcheon":7.2, "nowon":7.6, "dobong":7.3,
  "dongdaemun":9.2, "dongjak":12.0, "mapo":13.8, "seodaemun":10.6, "seocho":24.8,
  "seongdong":16.9, "seongbuk":10.4, "songpa":21.4, "yangcheon":12.1, "yeongdeungpo":11.5,
  "yongsan":22.6, "eunpyeong":8.1, "jongno":11.2, "jung":9.8, "jungnang":7.4,
  // 경기 (id 기반)
  "gyeonggi-31010":11.8, // 수원 장안
  "gyeonggi-31011":12.1, // 수원 권선
  "gyeonggi-31012":11.4, // 수원 팔달
  "gyeonggi-31014":8.4,  // 수원 영통 (real)
  "gyeonggi-31020":9.8,  // 성남 수정
  "gyeonggi-31021":9.5,  // 성남 중원
  "gyeonggi-31023":16.2, // 분당 (real)
  "gyeonggi-31040":7.9,  // 의정부
  "gyeonggi-31050":11.1, // 안양 만안
  "gyeonggi-31051":12.4, // 안양 동안
  "gyeonggi-31060":7.4,  // 부천 (deprecated split)
  "gyeonggi-31061":7.4,  "gyeonggi-31062":7.6, "gyeonggi-31063":7.5,
  "gyeonggi-31080":7.2,  // 평택
  "gyeonggi-31090":6.4,  // 동두천
  "gyeonggi-31100":11.3, // 안산 상록
  "gyeonggi-31101":7.6,  // 고양 덕양 (real)
  "gyeonggi-31102":11.2, // 고양 일산동
  "gyeonggi-31103":12.0, // 고양 일산서
  "gyeonggi-31110":6.1,  // 과천 (실제는 더 비쌈; placeholder)
  "gyeonggi-31111":18.4, // 과천
  "gyeonggi-31120":7.3,  // 구리
  "gyeonggi-31140":5.8,  // 오산
  "gyeonggi-31160":11.4, // 군포
  "gyeonggi-31170":13.0, // 의왕
  "gyeonggi-31180":13.2, // 하남
  "gyeonggi-31190":8.7,  // 용인 처인
  "gyeonggi-31191":12.6, // 용인 기흥
  "gyeonggi-31192":15.4, // 용인 수지
  // 인천
  "incheon-23010":6.8,   // 중
  "incheon-23020":5.4,   // 동
  "incheon-23030":7.2,   // 남(미추홀)
  "incheon-23040":6.9,   // 연수 (real)
  "incheon-23050":7.4,   // 남동
  "incheon-23060":6.5,   // 부평
  "incheon-23070":6.2,   // 계양
  "incheon-23080":7.0,   // 서
  "incheon-23310":4.4,   // 강화
  "incheon-23320":3.4,// 옹진
  // 읍면동 splits
  "gyeonggi-pt-0110": 6.8,
  "gyeonggi-pt-0120": 7.3,
  "gyeonggi-pt-0130": 6.9,
  "gyeonggi-pt-0310": 6.4,
  "gyeonggi-pt-0320": 5.9,
  "gyeonggi-pt-0330": 6.5,
  "gyeonggi-pt-0340": 6,
  "gyeonggi-pt-0140": 6.4,
  "gyeonggi-pt-0370": 6.7,
  "gyeonggi-pt-d0": 8.2,
  "gyeonggi-pt-d1": 7.2,
  "gyeonggi-pt-d2": 7.3,
  "gyeonggi-hs-41591": 6.4,
  "gyeonggi-hs-41593": 7.8,
  "gyeonggi-hs-41595": 9.2,
  "gyeonggi-hs-41597": 12.6,
  "gyeonggi-ny-0110": 6,
  "gyeonggi-ny-0120": 5.6,
  "gyeonggi-ny-0130": 6.1,
  "gyeonggi-ny-0140": 5.7,
  "gyeonggi-ny-0150": 5.2,
  "gyeonggi-ny-0310": 5.6,
  "gyeonggi-ny-0160": 5.8,
  "gyeonggi-ny-0340": 5.3,
  "gyeonggi-ny-0350": 4.8,
  "gyeonggi-ny-d0": 8.2,
  "gyeonggi-ny-d1": 6.7,
  "gyeonggi-ny-d2": 6.7,
  "gyeonggi-pj-0110": 7,
  "gyeonggi-pj-0120": 6.5,
  "gyeonggi-pj-0130": 7.1,
  "gyeonggi-pj-0150": 6.2,
  "gyeonggi-pj-0310": 6.6,
  "gyeonggi-pj-0320": 6.1,
  "gyeonggi-pj-0350": 5.8,
  "gyeonggi-pj-0360": 6.3,
  "gyeonggi-pj-0370": 5.9,
  "gyeonggi-pj-0390": 6,
  "gyeonggi-pj-d0": 9.4,
  "gyeonggi-pj-d1": 8.8,
  "gyeonggi-pj-d2": 7.5,
  "gyeonggi-gp-0110": 7.1,
  "gyeonggi-gp-0120": 7.7,
  "gyeonggi-gp-0130": 7.2,
  "gyeonggi-gp-0340": 6.4,
  "gyeonggi-gp-0350": 6.9,
  "gyeonggi-gp-0360": 6.5,
  "gyeonggi-gp-d0": 9.2,
  "gyeonggi-gp-d1": 8,
  "gyeonggi-gp-d2": 8,
  "gyeonggi-gj-0120": 4.8,
  "gyeonggi-gj-0140": 4.9,
  "gyeonggi-gj-0340": 4.5,
  "gyeonggi-gj-0350": 4,
  "gyeonggi-gj-0360": 4.6,
  "gyeonggi-gj-0380": 4.7,
  "gyeonggi-gj-d0": 5,
  "gyeonggi-gj-d1": 5.1,
  "gyeonggi-gj-d2": 5.1,
  "gyeonggi-yj-0110": 4.5,
  "gyeonggi-yj-0310": 4.1,
  "gyeonggi-yj-0320": 3.6,
  "gyeonggi-yj-0330": 4.2,
  "gyeonggi-yj-0340": 3.8,
  "gyeonggi-yj-d0": 5.5,
  "gyeonggi-yj-d1": 5.6,
  "gyeonggi-yj-d2": 4.6,
  "gyeonggi-pc-0110": 3,
  "gyeonggi-pc-0310": 2.6,
  "gyeonggi-pc-0320": 3.1,
  "gyeonggi-pc-0330": 2.7,
  "gyeonggi-pc-0340": 3.3,
  "gyeonggi-pc-0350": 2.8,
  "gyeonggi-pc-0360": 3.4,
  "gyeonggi-pc-0370": 2.9,
  "gyeonggi-pc-0380": 3.5,
  "gyeonggi-pc-0390": 3,
  "gyeonggi-pc-0400": 3.1,
  "gyeonggi-pc-0410": 2.6,
  "gyeonggi-pc-0510": 4,
  "gyeonggi-pc-0520": 4.6,
  "gyeonggi-yj2-0110": 3.7,
  "gyeonggi-yj2-0310": 2.3,
  "gyeonggi-yj2-0390": 2.7,
  "gyeonggi-yj2-0330": 2.4,
  "gyeonggi-yj2-0340": 3,
  "gyeonggi-yj2-0350": 2.5,
  "gyeonggi-yj2-0360": 3.1,
  "gyeonggi-yj2-0370": 2.6,
  "gyeonggi-yj2-0380": 3.2,
  "gyeonggi-yj2-0510": 3.7,
  "gyeonggi-yj2-0520": 4.3,
  "gyeonggi-yj2-0530": 3.8,
  "gyeonggi-ic-0110": 4.3,
  "gyeonggi-ic-0120": 4.8,
  "gyeonggi-ic-0310": 3.9,
  "gyeonggi-ic-0320": 4.4,
  "gyeonggi-ic-0330": 4,
  "gyeonggi-ic-0340": 3.5,
  "gyeonggi-ic-0350": 4.1,
  "gyeonggi-ic-0360": 3.6,
  "gyeonggi-ic-0370": 4.2,
  "gyeonggi-ic-0380": 3.7,
  "gyeonggi-ic-0510": 5.3,
  "gyeonggi-ic-0520": 4.8,
  "gyeonggi-ic-0530": 5.4,
  "gyeonggi-ic-0540": 4.9,
  "gyeonggi-as-0110": 5.9,
  "gyeonggi-as-0310": 5.5,
  "gyeonggi-as-0320": 5,
  "gyeonggi-as-0330": 5.6,
  "gyeonggi-as-0340": 5.1,
  "gyeonggi-as-0350": 5.7,
  "gyeonggi-as-0360": 5.2,
  "gyeonggi-as-0380": 5.3,
  "gyeonggi-as-0390": 5.9,
  "gyeonggi-as-0400": 5,
  "gyeonggi-as-0410": 5.5,
  "gyeonggi-as-0420": 5.1,
  "gyeonggi-as-0510": 6.9,
  "gyeonggi-as-0520": 6.4,
  "gyeonggi-as-0530": 7,
  "gyeonggi-sh-d0": 12.3,
  "gyeonggi-sh-d1": 12.4,
  "gyeonggi-sh-d2": 12.4,
  "gyeonggi-sh-d3": 12.5,
  "gyeonggi-sh-d4": 6.8,
  "gyeonggi-yc-0110": 3.3,
  "gyeonggi-yc-0120": 2.8,
  "gyeonggi-yc-0310": 2.9,
  "gyeonggi-yc-0320": 2.4,
  "gyeonggi-yc-0340": 2.5,
  "gyeonggi-yc-0350": 2.1,
  "gyeonggi-yc-0360": 2.6,
  "gyeonggi-yc-0370": 2.2,
  "gyeonggi-yc-0380": 2.7,
  "gyeonggi-yc-0330": 2,
  "gyeonggi-gp2-0110": 3.2,
  "gyeonggi-gp2-0310": 2.8,
  "gyeonggi-gp2-0320": 2.3,
  "gyeonggi-gp2-0330": 2.9,
  "gyeonggi-gp2-0360": 2.6,
  "gyeonggi-gp2-0350": 3,
  "gyeonggi-yp-0110": 3,
  "gyeonggi-yp-0310": 2.6,
  "gyeonggi-yp-0320": 3.1,
  "gyeonggi-yp-0330": 2.7,
  "gyeonggi-yp-0340": 3.3,
  "gyeonggi-yp-0350": 2.8,
  "gyeonggi-yp-0360": 3.4,
  "gyeonggi-yp-0370": 2.9,
  "gyeonggi-yp-0380": 3.5,
  "gyeonggi-yp-0390": 3,
  "gyeonggi-yp-0400": 3.1,
  "gyeonggi-yp-0410": 2.6,
};

function priceForShape(shape, regionMap) {
  // Real region data wins
  const reg = regionMap[shape.id];
  if (reg && reg.avgPrice) {
    const m = reg.avgPrice.match(/([\d.]+)/);
    if (m) return parseFloat(m[1]);
  }
  const real = REAL_PRICE_MAP[shape.id];
  if (real && Number.isFinite(real.avgPriceEok)) return real.avgPriceEok;
  if (SYNTH_PRICES[shape.id] != null) return SYNTH_PRICES[shape.id];
  return shape.region === "seoul" ? 11 : shape.region === "incheon" ? 6.5 : 7.5;
}

function colorFor(score, max) {
  const t = Math.max(0, Math.min(1, score / max));
  // read from CSS vars so palette switching just works
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const stops = [
    [0.00, parseRGB(cs.getPropertyValue('--map-c0').trim() || '#C8D2E8')],
    [0.25, parseRGB(cs.getPropertyValue('--map-c1').trim() || '#5064A8')],
    [0.50, parseRGB(cs.getPropertyValue('--map-c2').trim() || '#B4645A')],
    [0.75, parseRGB(cs.getPropertyValue('--map-c3').trim() || '#D88232')],
    [1.00, parseRGB(cs.getPropertyValue('--map-c4').trim() || '#942626')],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const k = (t - t0) / (t1 - t0);
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * k);
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * k);
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * k);
      return `rgb(${r},${g},${b})`;
    }
  }
  const last = stops[stops.length - 1][1];
  return `rgb(${last[0]},${last[1]},${last[2]})`;
}
function parseRGB(hex) {
  const h = hex.replace('#','').trim();
  if (h.length !== 6) return [80, 80, 80];
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function pathBounds(d) {
  const nums = d.match(/-?\d+(?:\.\d+)?/g);
  if (!nums || nums.length < 2) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i + 1]);
    if (Number.isNaN(x) || Number.isNaN(y)) continue;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  if (!Number.isFinite(minX)) return null;
  return { minX, maxX, minY, maxY };
}

function aggregateBounds(shapes, fallback) {
  const boxes = shapes
    .map(shape => pathBounds(shape.d))
    .filter(Boolean);
  if (!boxes.length) return fallback;
  return boxes.reduce((acc, box) => ({
    minX: Math.min(acc.minX, box.minX),
    maxX: Math.max(acc.maxX, box.maxX),
    minY: Math.min(acc.minY, box.minY),
    maxY: Math.max(acc.maxY, box.maxY),
  }));
}

function boundsToViewBox(bounds, padding) {
  const minX = Math.max(0, bounds.minX - padding);
  const minY = Math.max(0, bounds.minY - padding);
  const width = bounds.maxX - bounds.minX + padding * 2;
  const height = bounds.maxY - bounds.minY + padding * 2;
  return `${minX} ${minY} ${width} ${height}`;
}

function SeoulMap({ shapes, regions, selectedId, onSelect, hoveredId, onHover, footerHint = null }) {
  // re-render on palette/theme change so inline-fill colors update
  const [, forceRender] = useState(0);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  useEffect(() => {
    const h = () => forceRender(x => x + 1);
    window.addEventListener("palettechange", h);
    return () => window.removeEventListener("palettechange", h);
  }, []);
  const targetIds = new Set(shapes.map(shape => shape.id));
  const featuredIds = new Set(regions.filter(r => r.featured).map(r => r.id));
  const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));
  const mainShapes = shapes.filter(shape => !DETACHED_IDS.has(shape.id));
  const detachedShapes = shapes.filter(shape => DETACHED_IDS.has(shape.id));
  // Compute scores for ALL shapes (not just available regions)
  const allScores = shapes.map(s => priceForShape(s, regionMap));
  const maxScore = Math.max(...allScores, 22);
  const [tt, setTt] = useState(null); // {x, y, region, available}
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const gestureRef = useRef({ pointers: new Map(), lastTapAt: 0, tapCandidate: false });
  const suppressClickUntilRef = useRef(0);
  const mainViewBox = boundsToViewBox(
    aggregateBounds(mainShapes, { minX: 430, maxX: 780, minY: 150, maxY: 430 }),
    24
  );
  const detachedViewBox = boundsToViewBox(
    aggregateBounds(detachedShapes, { minX: 20, maxX: 470, minY: 175, maxY: 390 }),
    12
  );
  const [mainMinX, mainMinY, mainWidth, mainHeight] = mainViewBox.split(" ").map(Number);
  const footerY = mainMinY + mainHeight - 10;
  const headerY = mainMinY + 16;

  function canUseGestures() {
    return window.innerWidth <= 980 || window.matchMedia("(pointer: coarse)").matches;
  }

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

  function updateView(updater) {
    setView(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return clampView(next.scale, next.x, next.y);
    });
  }

  useEffect(() => {
    const handleResize = () => setView(prev => clampView(prev.scale, prev.x, prev.y));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleEnter(shape, evt) {
    const rect = evt.currentTarget.getBoundingClientRect();
    const reg = regionMap[shape.id];
    const synthPrice = priceForShape(shape, regionMap);
    setTt({
      x: rect.left + rect.width / 2,
      y: rect.top,
      shape,
      region: reg,
      synthPrice,
      available: targetIds.has(shape.id),
    });
    if (onHover) onHover(shape.id);
  }
  function handleLeave() {
    setTt(null);
    if (onHover) onHover(null);
  }

  function getLocalPoint(evt) {
    const shell = shellRef.current;
    if (!shell) return { x: 0, y: 0 };
    const rect = shell.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function handlePointerDown(evt) {
    if (!canUseGestures()) return;
    const shell = shellRef.current;
    if (!shell) return;
    shell.setPointerCapture?.(evt.pointerId);
    const g = gestureRef.current;
    const local = getLocalPoint(evt);
    g.pointers.set(evt.pointerId, local);
    g.tapCandidate = true;

    if (g.pointers.size === 1) {
      g.mode = "pan";
      g.start = { x: evt.clientX, y: evt.clientY };
      g.startView = { ...view };
    } else if (g.pointers.size === 2) {
      const pts = Array.from(g.pointers.values());
      g.mode = "pinch";
      g.startDist = distance(pts[0], pts[1]);
      g.startScale = view.scale;
      g.startView = { ...view };
      g.startMid = midpoint(pts[0], pts[1]);
      const cx = shell.clientWidth / 2;
      const cy = shell.clientHeight / 2;
      g.anchor = {
        x: (g.startMid.x - cx - view.x) / view.scale,
        y: (g.startMid.y - cy - view.y) / view.scale,
      };
    }
  }

  function handlePointerMove(evt) {
    if (!canUseGestures()) return;
    const g = gestureRef.current;
    if (!g.pointers.has(evt.pointerId)) return;
    g.pointers.set(evt.pointerId, getLocalPoint(evt));

    if (g.mode === "pinch" && g.pointers.size >= 2) {
      evt.preventDefault();
      const shell = shellRef.current;
      const pts = Array.from(g.pointers.values());
      const dist = distance(pts[0], pts[1]);
      const mid = midpoint(pts[0], pts[1]);
      const nextScale = clampScale((g.startScale || 1) * (dist / Math.max(1, g.startDist || 1)));
      const cx = shell.clientWidth / 2;
      const cy = shell.clientHeight / 2;
      updateView({
        scale: nextScale,
        x: mid.x - cx - g.anchor.x * nextScale,
        y: mid.y - cy - g.anchor.y * nextScale,
      });
      suppressClickUntilRef.current = Date.now() + 300;
      g.tapCandidate = false;
      return;
    }

    if (g.mode === "pan" && g.pointers.size === 1 && view.scale > 1.01) {
      evt.preventDefault();
      const dx = evt.clientX - g.start.x;
      const dy = evt.clientY - g.start.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) g.tapCandidate = false;
      updateView({
        scale: g.startView.scale,
        x: g.startView.x + dx,
        y: g.startView.y + dy,
      });
      suppressClickUntilRef.current = Date.now() + 220;
    }
  }

  function handlePointerEnd(evt) {
    if (!canUseGestures()) return;
    const shell = shellRef.current;
    shell?.releasePointerCapture?.(evt.pointerId);
    const g = gestureRef.current;
    g.pointers.delete(evt.pointerId);

    if (g.mode === "pan" && g.tapCandidate) {
      const now = Date.now();
      if (now - g.lastTapAt < 280) {
        const local = getLocalPoint(evt);
        const nextScale = view.scale > 1.4 ? 1 : 2;
        if (nextScale === 1) {
          resetView();
        } else if (shell) {
          const cx = shell.clientWidth / 2;
          const cy = shell.clientHeight / 2;
          const anchorX = (local.x - cx - view.x) / view.scale;
          const anchorY = (local.y - cy - view.y) / view.scale;
          updateView({
            scale: nextScale,
            x: local.x - cx - anchorX * nextScale,
            y: local.y - cy - anchorY * nextScale,
          });
        }
        suppressClickUntilRef.current = now + 250;
      }
      g.lastTapAt = now;
    }

    if (g.pointers.size === 1) {
      const remaining = Array.from(g.pointers.values())[0];
      g.mode = "pan";
      g.start = { x: remaining.x, y: remaining.y };
      g.startView = { ...view };
      g.tapCandidate = false;
    } else if (g.pointers.size === 0) {
      g.mode = null;
      g.tapCandidate = false;
    }
  }

    return (
    <div ref={wrapRef} style={{position:"relative", width:"100%", display:"flex", justifyContent:"center"}}>
      <div
        ref={shellRef}
        className={`map-panzoom-shell ${view.scale > 1.01 ? "zoomed" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <div
          className="map-panzoom-target"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <svg className="map-svg" viewBox={mainViewBox} role="img" aria-label="수도권 시·군·구 지도">

            {mainShapes.map(shape => {
              const isTarget = targetIds.has(shape.id);
              const isSelected = selectedId === shape.id;
              const useOutlineSelection = COMPLEX_SPLIT_SELECTION_IDS.has(shape.id);
              const isHovered = hoveredId === shape.id;
              const score = priceForShape(shape, regionMap);
              const fill = colorFor(score, maxScore);
              const cls = `region-shape ${isTarget ? "target" : "background"} ${isSelected ? (useOutlineSelection ? "selected-outline" : "selected") : ""} ${isHovered ? "hover" : ""}`;
              return (
                <g key={shape.id}>
                  <path
                    d={shape.d}
                    className={cls}
                    style={{ fill: !(isSelected && !useOutlineSelection) ? fill : undefined, cursor: isTarget ? "pointer" : "default" }}
                    onClick={() => {
                      if (Date.now() < suppressClickUntilRef.current) return;
                      if (isTarget) onSelect(shape.id);
                    }}
                    onMouseEnter={(e) => handleEnter(shape, e)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTt(prev => prev ? { ...prev, x: e.clientX, y: rect.top } : prev);
                    }}
                    onMouseLeave={handleLeave}
                  />
                  {isSelected && useOutlineSelection && Number.isFinite(shape.cx) && Number.isFinite(shape.cy) && (
                    <g className="region-selected-marker">
                      <circle className="region-selected-marker-halo" cx={shape.cx} cy={shape.cy} r="10" />
                      <circle className="region-selected-marker-dot" cx={shape.cx} cy={shape.cy} r="4.25" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        {view.scale > 1.01 && (
          <button type="button" className="map-zoom-reset" onClick={resetView}>
            지도 원래 크기
          </button>
        )}
      </div>

      {detachedShapes.length > 0 && (
        <button
          type="button"
          className={`map-detached-inset ${selectedId === detachedShapes[0].id ? "selected" : ""}`}
          aria-label="옹진군"
          onClick={() => onSelect(detachedShapes[0].id)}
        >
          <div className="map-detached-head">
            <span className="map-detached-name">옹진군</span>
          </div>
          <svg className="map-detached-svg" viewBox={detachedViewBox} role="img" aria-label="옹진군 섬 inset">
            {detachedShapes.map(shape => {
              const score = priceForShape(shape, regionMap);
              const fill = colorFor(score, maxScore);
              const isSelected = selectedId === shape.id;
              return (
                <path
                  key={shape.id}
                  d={shape.d}
                  className={`region-shape detached ${isSelected ? "selected" : ""}`}
                  style={{ fill: !isSelected ? fill : undefined, cursor: "pointer" }}
                  onClick={() => onSelect(shape.id)}
                  onMouseEnter={(e) => handleEnter(shape, e)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTt(prev => prev ? { ...prev, x: e.clientX, y: rect.top } : prev);
                  }}
                  onMouseLeave={handleLeave}
                />
              );
            })}
          </svg>
        </button>
      )}

      <div className="map-bottom-row" aria-hidden>
        <div className="map-legend">
          <div className="lg-title">평균 매매가 (억)</div>
          <div className="lg-bar">
            <i style={{background:colorFor(0, 25)}} />
            <i style={{background:colorFor(6, 25)}} />
            <i style={{background:colorFor(12, 25)}} />
            <i style={{background:colorFor(18, 25)}} />
            <i style={{background:colorFor(25, 25)}} />
          </div>
          <div className="lg-scale"><span>3억</span><span>12억</span><span>25억+</span></div>
        </div>
        {footerHint ? <div className="map-foot-hint">{footerHint}</div> : null}
      </div>

      {/* Floating tooltip */}
      {tt && (
        <div
          className={`map-tooltip on ${tt.available ? "" : "unavail"}`}
          style={{ left: tt.x, top: tt.y }}
        >
          <div className="tt-name"><em>{tt.region ? tt.region.name : tt.shape.fullName || tt.shape.name}</em></div>
          <div className="tt-row">
            <span>Avg.</span>
            <span className="v">{tt.region ? tt.region.avgPrice : `${tt.synthPrice.toFixed(1)}억`}</span>
          </div>
          {tt.region && <div className="tt-row"><span>YoY</span><span className="v">{tt.region.deltaY}</span></div>}
          {tt.region && <div className="tt-blurb">{tt.region.keywords.join(" · ")}</div>}
          <div className="tt-status">{tt.available ? "분석 가능" : "준비 중"}</div>
        </div>
      )}
    </div>
  );
}

window.SeoulMap = SeoulMap;
