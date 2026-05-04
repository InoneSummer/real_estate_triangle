/* global window */
// Mock data for 이동지도 — 서울/수도권 페르소나 분석

const SEEDED_REGIONS = [
  // ── 서울 ──
  { id: "mapo", group: "seoul", name: "마포구", nameEn: "Mapo", available: true,
    avgPrice: "13.8억", deltaY: "+4.2%",
    keywords: ["미디어", "출판", "젊은 직장인"],
    blurb: "출판·미디어·콘텐츠 산업이 만든 실용적 도시. 합정·연남·망원의 라이프스타일 벨트." },
  { id: "songpa", group: "seoul", name: "송파구", nameEn: "Songpa", available: true,
    avgPrice: "21.4억", deltaY: "+6.7%",
    keywords: ["대단지", "학군", "잠실 트라이앵글"],
    blurb: "잠실 트라이앵글이 만들어내는 가족 단위 도시. 학군과 인프라의 안정 자산." },
  { id: "seongdong", group: "seoul", name: "성동구", nameEn: "Seongdong", available: true,
    avgPrice: "16.9억", deltaY: "+8.1%",
    keywords: ["성수", "한강", "신흥"],
    blurb: "성수가 끌어올린 신흥 자산권. 한강과 산업 유산이 만든 도시 텍스처." },
  { id: "gangdong", group: "seoul", name: "강동구", nameEn: "Gangdong", available: true,
    avgPrice: "12.3억", deltaY: "+3.4%",
    keywords: ["고덕", "둔촌", "재건축"],
    blurb: "재건축 사이클이 만든 다음 챕터. 가족 회복형 매수자의 권역." },

  // ── 경기 ──
  { id: "gyeonggi-31023", group: "gyeonggi", name: "성남시 분당구", nameEn: "Bundang", available: true,
    avgPrice: "16.2억", deltaY: "+5.0%",
    keywords: ["판교", "테크", "1기 신도시"],
    blurb: "판교 테크밸리가 만든 신중산층 도시. 1기 신도시 재건축의 새 출발선." },
  { id: "gyeonggi-31014", group: "gyeonggi", name: "수원시 영통구", nameEn: "Yeongtong", available: true,
    avgPrice: "8.4억", deltaY: "+2.1%",
    keywords: ["광교", "삼성", "직주근접"],
    blurb: "광교의 학군과 삼성 직주근접이 받쳐주는 안정형 매수권." },
  { id: "gyeonggi-31101", group: "gyeonggi", name: "고양시 덕양구", nameEn: "Deogyang", available: true,
    avgPrice: "7.6억", deltaY: "+1.4%",
    keywords: ["창릉", "GTX-A", "실거주"],
    blurb: "GTX-A와 창릉 신도시가 동시에 진행되는 서울 서북부의 다음 페이지." },

  // ── 인천 ──
  { id: "incheon-23040", group: "incheon", name: "연수구", nameEn: "Yeonsu", available: true,
    avgPrice: "6.9억", deltaY: "+1.8%",
    keywords: ["송도", "국제도시", "GTX-B"],
    blurb: "송도 국제도시와 GTX-B 가 다시 그리는 해안형 신도시 자산권." },
];

// Build SEOUL_SHAPES from prebuilt path file (Seoul + Incheon + Gyeonggi).
const ALL_PATHS = (window.__SEOUL_PATHS__ || []).map(p => ({
  id: p.id,
  name: p.shortName || p.name,
  fullName: p.name,
  region: p.region,
  d: p.d,
  cx: p.cx,
  cy: p.cy,
}));
const SEOUL_SHAPES = ALL_PATHS;

const SEEDED_REGION_MAP = Object.fromEntries(SEEDED_REGIONS.map(region => [region.id, region]));
const REAL_PRICE_DATA = (window.__REAL_PRICE_HINTS__ && window.__REAL_PRICE_HINTS__.values) || {};

const LEGACY_PRICE_HINTS = {
  gangnam: 24.2, gangdong: 12.3, gangbuk: 7.8, gangseo: 10.1, gwanak: 8.6,
  gwangjin: 12.4, guro: 7.9, geumcheon: 7.2, nowon: 7.6, dobong: 7.3,
  dongdaemun: 9.2, dongjak: 12.0, mapo: 13.8, seodaemun: 10.6, seocho: 24.8,
  seongdong: 16.9, seongbuk: 10.4, songpa: 21.4, yangcheon: 12.1, yeongdeungpo: 11.5,
  yongsan: 22.6, eunpyeong: 8.1, jongno: 11.2, jung: 9.8, jungnang: 7.4,
  "gyeonggi-31010": 11.8, "gyeonggi-31011": 12.1, "gyeonggi-31012": 11.4, "gyeonggi-31014": 8.4,
  "gyeonggi-31020": 9.8, "gyeonggi-31021": 9.5, "gyeonggi-31023": 16.2, "gyeonggi-31040": 7.9,
  "gyeonggi-31050": 11.1, "gyeonggi-31051": 12.4, "gyeonggi-31060": 7.4, "gyeonggi-31061": 7.4,
  "gyeonggi-31062": 7.6, "gyeonggi-31063": 7.5, "gyeonggi-31080": 6.4,
  "gyeonggi-31090": 6.4, "gyeonggi-31100": 11.3, "gyeonggi-31101": 7.6, "gyeonggi-31102": 11.2,
  "gyeonggi-31103": 12.0, "gyeonggi-31110": 6.1, "gyeonggi-31111": 18.4, "gyeonggi-31120": 7.3, "gyeonggi-31140": 5.8, "gyeonggi-31160": 11.4,
  "gyeonggi-31170": 13.0, "gyeonggi-31180": 13.2, "gyeonggi-31190": 8.7, "gyeonggi-31191": 12.6,
  "gyeonggi-31192": 15.4,
  "incheon-23010": 6.8, "incheon-23020": 5.4, "incheon-23030": 7.2, "incheon-23040": 6.9,
  "incheon-23050": 7.4, "incheon-23060": 6.5, "incheon-23070": 6.2, "incheon-23080": 7.0,
  "incheon-23310": 4.4, "incheon-23320": 3.4,
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

const GROUP_META = {
  seoul: {
    tag: ["서울권", "직주근접", "압축된 생활권"],
    blurb: "서울 안에서 생활 반경과 자산 위계가 빠르게 갈리는 대표 권역.",
  },
  gyeonggi: {
    tag: ["수도권 외곽", "확장형 실거주", "노선 의존"],
    blurb: "GTX·재건축·대단지 수요가 섞이면서 자산 격차가 빠르게 벌어지는 수도권 확장 권역.",
  },
  incheon: {
    tag: ["해안권", "신도시", "노선 기대"],
    blurb: "국제도시와 구도심이 함께 움직이며 가격 방향이 나뉘는 해안형 생활권.",
  },
};

function realPriceEntry(id) {
  return REAL_PRICE_DATA[id] || null;
}

function syntheticPriceForId(id, group) {
  const real = realPriceEntry(id);
  if (real && Number.isFinite(real.avgPriceEok)) return real.avgPriceEok;
  if (LEGACY_PRICE_HINTS[id] != null) return LEGACY_PRICE_HINTS[id];
  return group === "seoul" ? 11.0 : group === "incheon" ? 6.5 : 7.5;
}

function syntheticDelta(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) >>> 0;
  const raw = (((h % 60) - 10) / 10).toFixed(1);
  return `${Number(raw) >= 0 ? "+" : ""}${raw}%`;
}

function regionToken(name) {
  return String(name || "")
    .split(" ")[0]
    .replace(/(시|군|구)$/, "");
}

function regionLabelKeywords(shape) {
  const meta = GROUP_META[shape.region] || GROUP_META.gyeonggi;
  if (/구$/.test(shape.name)) return [shape.name.replace(/구$/, ""), ...meta.tag.slice(0, 2)];
  if (/시$/.test(shape.name)) return [shape.name.replace(/시$/, ""), "시 단위", meta.tag[1]];
  if (/군$/.test(shape.name)) return [shape.name.replace(/군$/, ""), "군 단위", meta.tag[2]];
  return meta.tag;
}

function regionBlurb(shape) {
  const meta = GROUP_META[shape.region] || GROUP_META.gyeonggi;
  const coarse = shape.name.includes("시") && !shape.name.includes("구")
    ? "현재 시 단위 경계 기준으로 먼저 보여주고 있습니다."
    : "";
  return `${shape.fullName || shape.name}는 ${meta.blurb} ${coarse}`.trim();
}

const REGIONS = ALL_PATHS.map(shape => {
  const seeded = SEEDED_REGION_MAP[shape.id];
  const real = realPriceEntry(shape.id);
  if (seeded) {
    return {
      ...seeded,
      featured: true,
      available: true,
      avgPrice: real && real.avgPriceLabel ? real.avgPriceLabel : seeded.avgPrice,
      deltaY: real && real.deltaLabel ? real.deltaLabel : seeded.deltaY,
      pricePsm: real && real.pricePsmLabel ? real.pricePsmLabel : seeded.pricePsm,
      priceSource: real && real.source ? real.source : "seeded",
      priceSampleCount: real && Number.isFinite(real.sampleCount) ? real.sampleCount : null,
    };
  }
  const price = syntheticPriceForId(shape.id, shape.region);
  return {
    id: shape.id,
    group: shape.region,
    name: shape.fullName || shape.name,
    nameEn: shape.name,
    available: true,
    featured: false,
    avgPrice: real && real.avgPriceLabel ? real.avgPriceLabel : `${price.toFixed(1)}억`,
    deltaY: real && real.deltaLabel ? real.deltaLabel : syntheticDelta(shape.id),
    pricePsm: real && real.pricePsmLabel ? real.pricePsmLabel : "—",
    priceSource: real && real.source ? real.source : "legacy",
    priceSampleCount: real && Number.isFinite(real.sampleCount) ? real.sampleCount : null,
    keywords: regionLabelKeywords(shape),
    blurb: regionBlurb(shape),
  };
});

const REGION_BY_ID = Object.fromEntries(REGIONS.map(region => [region.id, region]));

/* ============================================================
   PERSONAS — distinct per region
   ============================================================ */
const PERSONAS = {
  __generic: [
    { id:"steady_family", emoji:"🏡", name:"실거주 중심 가족", tagline:"동선과 학군을 먼저 본다",
      quote:"너무 멀리 가지 않으면서도 한 단계 나아가고 싶어요.",
      tags:["가족", "실거주", "안정 선호"] },
    { id:"upward_worker", emoji:"💼", name:"상향 이동 직장인", tagline:"출퇴근과 자산을 같이 계산한다",
      quote:"통근이 줄고 자산이 오르면 제일 좋죠.",
      tags:["직장인", "갈아타기", "노선 민감"] },
    { id:"first_home", emoji:"🔑", name:"첫 매수 준비층", tagline:"서울과 수도권의 경계를 고민한다",
      quote:"지금 살 수 있는 곳과 나중에 가고 싶은 곳이 달라요.",
      tags:["첫 매수", "예산 제한", "확장 탐색"] },
    { id:"upgrade_owner", emoji:"📈", name:"갈아타기 보유자", tagline:"현재 집을 발판으로 다음 위계를 본다",
      quote:"지금 집을 잘 팔아야 다음 집이 보입니다.",
      tags:["보유자", "상향 이동", "가격 민감"] },
    { id:"lifestyle_dink", emoji:"🍷", name:"라이프스타일 DINK", tagline:"생활 밀도와 도시 감도를 중시한다",
      quote:"집값만 맞는 곳보다, 내가 살아질 동네가 더 중요해요.",
      tags:["DINK", "도시 취향", "선호도 우선"] },
    { id:"retiring_senior", emoji:"🌅", name:"은퇴 전후 다운사이저", tagline:"넓은 집을 팔고 작은 집에서 현금을 쥔다",
      quote:"평수 줄이면 노후 자금이 남아요. 그게 진짜 전략이죠.",
      tags:["55세+", "다운사이징", "현금 확보"] },
    { id:"return_local", emoji:"🧳", name:"귀향형 재정착자", tagline:"서울 생활을 접고 돌아온 사람",
      quote:"오래 살았던 동네로 돌아오니까 물가가 달라요.",
      tags:["귀향", "재정착", "생활비 절감"] },
    { id:"young_investor", emoji:"🎯", name:"소액 투자형 청년", tagline:"실거주보다 수익률을 먼저 계산한다",
      quote:"월세 받으면서 전세로 사는 게 지금은 맞아요.",
      tags:["20대 후반", "소액 투자", "갭투자 탐색"] },
  ],
  // 마포: 미디어/출판/콘텐츠 도시 — 5명
  mapo: [
    { id:"publisher", emoji:"📚", name:"출판사 13년차 PM", tagline:"인쇄소와 카페 사이에서 흔들린다",
      quote:"아이가 초등학교에 들어가면, 이 동네에서 더 살 수 있을까.",
      tags:["38세","맞벌이","전세→매수"] },
    { id:"studio", emoji:"🎬", name:"영상 스튜디오 대표", tagline:"성수가 부럽지만, 합정의 골목이 좋다",
      quote:"스튜디오를 옮기면 사람이 안 와요.",
      tags:["41세","1인 법인","월세 60만"] },
    { id:"designer", emoji:"✏️", name:"프리랜스 그래픽 디자이너", tagline:"동네에서 일하고 동네에서 마신다",
      quote:"여기 떠나면, 나라는 사람이 좀 흐려질 것 같아.",
      tags:["33세","1인","월세→전세"] },
    { id:"couple", emoji:"🍷", name:"DINK 부부", tagline:"도시의 밀도를 자산처럼 쓴다",
      quote:"주말마다 한남 가는 게 좀 지겨워졌어.",
      tags:["35·36세","2인","갭투자 검토"] },
    { id:"founder", emoji:"🥂", name:"초기 단계 파운더", tagline:"투자유치만 되면 한남으로 갈 사람",
      quote:"다음 라운드 끝나면, 바로 강 건너야지.",
      tags:["32세","Pre-A","지분 매도 후 매수"] },
    { id:"single-mom", emoji:"🛡️", name:"혼자 키우는 워킹맘", tagline:"학교·병원·어린이집 동선이 곧 생존",
      quote:"이 동네가 안전하고 모든 게 걸어서 되니까 버틸 수 있어요.",
      tags:["39세","자녀 1","전세 갱신"] },
    { id:"night-worker", emoji:"🌙", name:"야간 교대 간호사", tagline:"출퇴근 20분이 삶의 전부",
      quote:"밤번 끝나고 택시비가 아까워서 근처로 왔어요.",
      tags:["31세","3교대","병원 도보 통근"] },
    { id:"retiree-return", emoji:"🎣", name:"은퇴 후 도심 복귀", tagline:"세종시 갔다가 다시 서울로",
      quote:"병원이랑 문화생활은 결국 서울이더라고.",
      tags:["62세","연금 생활","소형 매수"] },
  ],
  // 송파: 대단지·학군·가족형 — 8명
  songpa: [
    { id:"jamsil-mom", emoji:"📐", name:"잠실 학부모", tagline:"학원가 반경 800m 안에서 모든 게 끝난다",
      quote:"이 동네 떠나면 아이 학원 동선이 다 깨져요.",
      tags:["44세","자녀 2","리센츠 입주 7년"] },
    { id:"asiad-dad", emoji:"🏟️", name:"아시아드 거주 14년", tagline:"이사 한 번으로 평수만 늘리고 싶다",
      quote:"단지를 바꾸는 게 아니라 평수를 바꾸고 싶어요.",
      tags:["49세","외벌이","대형 평형 검토"] },
    { id:"newcomer", emoji:"🚚", name:"강북에서 막 넘어온 부부", tagline:"잠실 인프라에 적응 중",
      quote:"여긴 도시가 다른 게 아니라 시간이 다른 것 같아요.",
      tags:["38·39세","자녀 1","갈아타기 1차 완료"] },
    { id:"finance", emoji:"📊", name:"여의도 출퇴근 자산가", tagline:"강남 안 가도 충분하다고 믿는다",
      quote:"강남 가격 주고 강남 안 살 이유가 있죠.",
      tags:["46세","자산운용업","대형 평형"] },
    { id:"olympic", emoji:"🏊", name:"올림픽선수기자촌 출신", tagline:"재건축이 끝나면 돌아올 사람",
      quote:"여긴 다음 사이클까지 들고 갈 자산이에요.",
      tags:["52세","자녀 2 출가","재건축 대기"] },
    { id:"upgrader", emoji:"🛗", name:"분당에서 갈아탄 임원", tagline:"마지막 한 번의 이사",
      quote:"이걸로 진짜 끝이라고 생각하고 들어왔어요.",
      tags:["55세","대기업 임원","엔드게임 매수"] },
    { id:"foreign-spouse", emoji:"🌐", name:"외국인 배우자 가족", tagline:"국제학교와 영어 환경이 기준",
      quote:"잠실은 외국인 커뮤니티가 있어서 아내가 편해해요.",
      tags:["42세","주재원 출신","자녀 2"] },
    { id:"single-senior", emoji:"🏥", name:"독거 시니어", tagline:"병원 한 블록, 마트 두 블록",
      quote:"아파서 누우면 119가 5분 안에 와야 해요.",
      tags:["68세","독거","소형 전세"] },
  ],
  // 성동: 신흥/한강/크리에이티브 — 8명
  seongdong: [
    { id:"seongsu-pm", emoji:"☕", name:"성수동 브랜드 PM", tagline:"카페와 사옥 사이에서 산다",
      quote:"여기서 사는 거랑 일하는 거랑 분리가 잘 안 돼요.",
      tags:["34세","DINK","서울숲 전세"] },
    { id:"trinity-mom", emoji:"🎻", name:"트리니티 학군 학부모", tagline:"옥수에서 시작해 한남을 본다",
      quote:"학교는 여기, 그 다음은 강 건너편을 봐요.",
      tags:["41세","자녀 2","트리니티 진학"] },
    { id:"ip-lawyer", emoji:"⚖️", name:"성수 사옥 출퇴근 변호사", tagline:"강북에 발을 디딘 강남 클라이언트",
      quote:"클라이언트 절반은 한강 남쪽에 있어요.",
      tags:["39세","외벌이","아크로 검토"] },
    { id:"f&b-owner", emoji:"🍽️", name:"F&B 오너", tagline:"성수에서 만들고 한남에서 판다",
      quote:"임대료가 매장보다 집이 더 무서워요.",
      tags:["43세","2호점 운영","강 건너 매수 욕망"] },
    { id:"dink", emoji:"🚲", name:"옥수 DINK", tagline:"한강이 곧 거실인 부부",
      quote:"이 야경을 다른 데서 다시 살 수 있을까.",
      tags:["37·36세","2인","아파트 갈아타기"] },
    { id:"teacher", emoji:"📖", name:"중학교 교사", tagline:"전근 걱정 없이 한 곳에 눌러앉고 싶다",
      quote:"전근이 서울 안이면 괜찮은데, 경기 가면 끝이에요.",
      tags:["36세","공무원","전세→매수 전환"] },
    { id:"foreigner-studio", emoji:"🎨", name:"외국인 아티스트", tagline:"성수의 작업실이 비자의 이유",
      quote:"이 동네를 떠나면 한국에 있을 이유가 줄어요.",
      tags:["29세","E-7 비자","성수 작업실"] },
    { id:"delivery-rider", emoji:"🛵", name:"배달 플랫폼 라이더", tagline:"구역이 곧 월급이다",
      quote:"왕십리 반경 3km가 제 사무실이에요.",
      tags:["27세","플랫폼 노동","원룸 월세"] },
  ],
  // 강동: 재건축 사이클·가족 회복형 — 8명
  gangdong: [
    { id:"godeok-newbuild", emoji:"🏗️", name:"고덕 신축 5년차", tagline:"신축의 단맛을 본 가족",
      quote:"신축을 한 번 살아보면 다시 못 가요.",
      tags:["43세","자녀 1","고덕 그라시움"] },
    { id:"dunchon-old", emoji:"🌳", name:"둔촌 30년 거주", tagline:"올림픽파크포레온이 인생의 마무리",
      quote:"여기서 결혼하고 여기서 손주 봤어요.",
      tags:["61세","은퇴 직전","입주 대기"] },
    { id:"return-mom", emoji:"🥡", name:"강남에서 돌아온 워킹맘", tagline:"가성비와 평수의 절충안",
      quote:"강남 30평이냐 여기 40평이냐, 여기를 골랐어요.",
      tags:["40세","맞벌이","갈아타기 2차"] },
    { id:"dual-income", emoji:"🚇", name:"9호선 의존형 직장인 부부", tagline:"강남까지 30분이면 됐다",
      quote:"이 동선이 깨지면 우리 둘 다 무너져요.",
      tags:["35·34세","DINK","둔촌 전세"] },
    { id:"investor", emoji:"📈", name:"재건축 투자자", tagline:"사이클을 두 번째 타는 매수자",
      quote:"이번엔 거주 안 합니다. 사이클만 봐요.",
      tags:["48세","다주택자","갭투자"] },
    { id:"grandma-care", emoji:"👵", name:"손주 돌봄 조부모", tagline:"딸네 옆에서 출퇴근하듯 육아한다",
      quote:"손주 어린이집 데려다주려면 걸어서 10분 안이어야 해요.",
      tags:["64세","은퇴","소형 전세"] },
    { id:"commute-couple", emoji:"🚆", name:"서울 출퇴근 신혼", tagline:"강동이 첫 집의 마지노선",
      quote:"5호선 끝이라도 서울 안이면 됐어요.",
      tags:["30·29세","맞벌이","첫 매수"] },
    { id:"pet-family", emoji:"🐕", name:"반려견 중심 가족", tagline:"공원과 산책로가 평수보다 중요하다",
      quote:"대형견 키우려면 일층이나 마당이 있어야 하는데, 여긴 하남 가기도 좋아요.",
      tags:["37세","자녀 없음","동물 3마리"] },
  ],
  // 분당: 판교 테크 + 1기 신도시 재건축 — 8명
  "gyeonggi-31023": [
    { id:"pangyo-eng", emoji:"💻", name:"판교 7년차 시니어 엔지니어", tagline:"분당에 산다는 자부심",
      quote:"강남 가는 거 아니면 여기 끝까지 살아요.",
      tags:["38세","외벌이","서현 전세"] },
    { id:"bundang-mom", emoji:"🎒", name:"분당 학부모", tagline:"학원가가 자산이다",
      quote:"학원가가 사라지면 분당이 분당이 아니에요.",
      tags:["45세","자녀 2","수내동"] },
    { id:"redevelop", emoji:"🏚️", name:"이매동 재건축 대기자", tagline:"30년 아파트의 다음 30년",
      quote:"우리 단지가 1번 타자가 됐으면 좋겠어요.",
      tags:["57세","외벌이","재건축 1차"] },
    { id:"founder-bundang", emoji:"🚀", name:"스타트업 파운더", tagline:"강남 안 가도 되는 사람",
      quote:"투자자도 판교에 와서 만나요, 이젠.",
      tags:["36세","Series B","판교역세권"] },
    { id:"return-yongin", emoji:"🚙", name:"용인에서 갈아탄 가족", tagline:"한 번 더 위로",
      quote:"용인은 차고 분당은 도시예요.",
      tags:["41세","자녀 2","정자동 매수"] },
    { id:"cafe-nomad", emoji:"☕", name:"카페 노마드 프리랜서", tagline:"판교 카페가 사무실이다",
      quote:"분당 카페 와이파이가 강남보다 빠르고 자리가 넓어요.",
      tags:["31세","IT 프리랜서","전세 원룸"] },
    { id:"hagwon-teacher", emoji:"🧮", name:"학원 강사 겸 원장", tagline:"학원가 생태계 안에서 산다",
      quote:"수내역 반경 500m가 제 시장이에요.",
      tags:["47세","수학학원","수내동 자가"] },
    { id:"dual-city", emoji:"🔄", name:"서울-분당 이중생활자", tagline:"평일은 서울, 주말은 분당",
      quote:"아이는 분당에서 키우고 나는 서울에서 벌어요.",
      tags:["44세","맞벌이","두 집 유지"] },
  ],
  // 영통: 광교 + 삼성 직주근접 — 8명
  "gyeonggi-31014": [
    { id:"samsung-eng", emoji:"🔬", name:"삼성 R&D 연구원", tagline:"회사가 도시를 결정한다",
      quote:"매탄에서 광교로, 광교에서 어디로 갈까요.",
      tags:["35세","연구직","광교 매수"] },
    { id:"gwanggyo-mom", emoji:"🌷", name:"광교 학부모", tagline:"호수공원이 학군의 일부다",
      quote:"여기 학교가 강남보다 나아요, 진짜로.",
      tags:["42세","자녀 2","광교중앙"] },
    { id:"bundang-want", emoji:"🛣️", name:"분당을 보는 영통 거주자", tagline:"한 칸 더 위로",
      quote:"여기서 더 가려면 결국 분당이에요.",
      tags:["39세","맞벌이","갈아타기 검토"] },
    { id:"med-prof", emoji:"🩺", name:"수원 종합병원 의사", tagline:"광교의 안정성에 묶여 있다",
      quote:"병원 옆에 살아야 해서, 여기서 멀리 못 가요.",
      tags:["44세","외벌이","대형 평형"] },
    { id:"first-buy", emoji:"🔑", name:"첫 매수 부부", tagline:"광교가 첫 정착지",
      quote:"여기가 우리한테 첫 진짜 집이에요.",
      tags:["33·32세","DINK","입주 1년"] },
    { id:"ajumma-trader", emoji:"📱", name:"주식·부동산 겸업 주부", tagline:"HTS와 부동산 앱을 동시에 본다",
      quote:"주식은 단타, 부동산은 장타. 둘 다 해야 살아요.",
      tags:["48세","자녀 1","광교 자가"] },
    { id:"factory-commute", emoji:"🏭", name:"수원 산단 출퇴근자", tagline:"공장과 아파트 사이 20분",
      quote:"회사가 산단이라 영통 아니면 화성이에요.",
      tags:["36세","제조업","매탄동 전세"] },
    { id:"overseas-return", emoji:"✈️", name:"해외 주재 복귀 가족", tagline:"광교가 한국판 교외 느낌",
      quote:"미국 서버브 느낌이 나서 적응이 빨랐어요.",
      tags:["43세","대기업 복귀","자녀 2"] },
  ],
  // 덕양: GTX-A·창릉 — 8명
  "gyeonggi-31101": [
    { id:"gtx-commuter", emoji:"🚄", name:"GTX-A 베타 통근자", tagline:"30분이면 강남이다",
      quote:"이 한 노선이 우리 집값을 바꿨어요.",
      tags:["37세","서울 강남 출근","원흥 매수"] },
    { id:"changneung", emoji:"🏘️", name:"창릉 청약 당첨자", tagline:"3기 신도시의 첫 입주민",
      quote:"여기가 5년 뒤에 어떻게 변할지 진짜 궁금해요.",
      tags:["34·33세","자녀 1","2027 입주"] },
    { id:"return-paju", emoji:"🚌", name:"파주에서 회귀한 가족", tagline:"서울에 다시 가까워지고 싶은",
      quote:"애 학교가 진짜 큰 문제예요.",
      tags:["40세","자녀 2","갈아타기"] },
    { id:"ilsan-want", emoji:"🌉", name:"일산을 부러워하는 덕양 거주자", tagline:"한강을 더 가까이",
      quote:"같은 고양시인데 동네 위계가 달라요.",
      tags:["46세","외벌이","갈아타기 2차"] },
    { id:"first-house", emoji:"🪴", name:"첫 내 집 마련 부부", tagline:"서울이 너무 멀었던",
      quote:"서울은 못 사고, 서울 옆을 골랐어요.",
      tags:["31·30세","DINK","원당 매수"] },
    { id:"kintex-worker", emoji:"🎪", name:"킨텍스 전시 기획자", tagline:"일산·고양이 직장이자 생활권",
      quote:"전시 시즌엔 새벽에 출근하니까 걸어서 갈 수 있어야 해요.",
      tags:["35세","계약직","삼송 전세"] },
    { id:"multi-gen", emoji:"🏠", name:"3대 동거 가족", tagline:"부모님과 같은 단지에 산다",
      quote:"같은 아파트 다른 동에 부모님이 계세요.",
      tags:["40세","자녀 1","부모 동거"] },
    { id:"uber-driver", emoji:"🚗", name:"플랫폼 택시 기사", tagline:"서울 접근성이 수입을 결정한다",
      quote:"자유로 타고 20분이면 서울이에요. 그게 생명줄이죠.",
      tags:["52세","자영업","자가 보유"] },
  ],
  // 인천 연수: 송도 국제도시 — 8명
  "incheon-23040": [
    { id:"songdo-bio", emoji:"🧬", name:"송도 바이오 직장인", tagline:"회사 옆에 사는 자부심",
      quote:"여긴 회사 끝나면 바로 집이에요.",
      tags:["33세","바이오 회사","송도 6공구"] },
    { id:"songdo-mom", emoji:"🍃", name:"국제학교 학부모", tagline:"한국 안의 외국 같은 동네",
      quote:"여기서는 서울을 일부러 갈 일이 별로 없어요.",
      tags:["41세","자녀 2","채드윅"] },
    { id:"gtx-b", emoji:"🚞", name:"GTX-B 대기자", tagline:"노선 하나에 인생을 건다",
      quote:"GTX-B가 진짜 뚫리면 여긴 다른 도시가 돼요.",
      tags:["38세","서울 출근","연수 2년차"] },
    { id:"yeonsu-old", emoji:"🏖️", name:"연수 구도심 30년", tagline:"송도를 옆에서 본 사람",
      quote:"우리 동네가 송도 덕에 같이 올라갔어요.",
      tags:["55세","외벌이","연수동"] },
    { id:"first-young", emoji:"🌊", name:"첫 매수 청년 부부", tagline:"바다가 보이는 첫 집",
      quote:"이 가격에 이 뷰는 서울엔 없잖아요.",
      tags:["32·31세","DINK","송도 1공구"] },
    { id:"airport-crew", emoji:"✈️", name:"인천공항 승무원", tagline:"공항버스 한 방에 출근 끝",
      quote:"새벽 픽업이 집 앞이라 여기 아니면 못 살아요.",
      tags:["29세","항공사","송도 전세"] },
    { id:"trade-worker", emoji:"🚢", name:"무역회사 물류 담당", tagline:"항만과 오피스의 중간 지점",
      quote:"인천항도 가깝고 서울 본사도 한 시간이에요.",
      tags:["37세","중견기업","연수동 자가"] },
    { id:"retired-couple", emoji:"🌺", name:"해안 은퇴 부부", tagline:"바다 보이는 노후가 꿈",
      quote:"서울에서 30년 살았으니, 이제 바다 보면서 살래요.",
      tags:["61·59세","은퇴","송도 소형 매수"] },
  ],
};

function parsePriceEok(region) {
  const n = parseFloat(String(region.avgPrice || "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : syntheticPriceForId(region.id, region.group);
}

function genericPersonaProfile(region) {
  const price = parsePriceEok(region);
  const name = region.name || "";

  if (/옹진|강화/.test(name)) return "incheon_island";
  if (region.group === "incheon") {
    if (/연수|송도/.test(name) || price >= 6.8) return "incheon_newtown";
    return "incheon_mixed";
  }
  if (region.group === "seoul") {
    return price >= 11.5 ? "seoul_core" : "seoul_edge";
  }
  if (/군$|읍|면/.test(name)) return "gyeonggi_rural";
  if (price >= 10.5) return "gyeonggi_core";
  if (price >= 7.0) return "gyeonggi_commuter";
  return "gyeonggi_value";
}

function genericPersonaFlavor(region, profile) {
  const name = region.name || "";
  if (profile === "incheon_island") return "incheon_island";
  if (region.group === "seoul") return profile;
  if (region.group === "incheon") {
    if (/송도|연수|청라|검단|영종/.test(name)) return "incheon_newtown_plus";
    return "incheon_oldtown";
  }
  if (/성남|분당|수지|판교|정자|서현|영통|광교|과천/.test(name)) return "gyeonggi_tech";
  if (/고양|덕양|일산|파주|남양주|구리|하남|김포|의정부|양주|광명|부천/.test(name)) return "gyeonggi_gtx";
  if (/화성|평택|오산|안산|시흥|이천|안성|처인/.test(name)) return "gyeonggi_industrial";
  if (/군$|읍|면|양평|가평|여주|연천|포천/.test(name)) return "gyeonggi_county";
  return profile;
}

function genericPeerTerritory(region, flavor) {
  const name = region.name || "";
  if (region.group === "seoul") {
    if (/강남|서초|송파|강동/.test(name)) return "seoul_southeast";
    if (/마포|영등포|강서|양천|구로|금천/.test(name)) return "seoul_west";
    if (/성동|광진|동대문|중랑|강북|노원|도봉|성북/.test(name)) return "seoul_east_north";
    if (/종로|중구|용산|서대문|은평|관악|동작/.test(name)) return "seoul_central";
    return "seoul";
  }

  if (region.group === "incheon") {
    if (/옹진|강화/.test(name)) return "incheon_island";
    if (/영종|중구/.test(name)) return "incheon_airport";
    if (/송도|연수/.test(name)) return "incheon_songdo";
    if (/청라|검단|서구/.test(name)) return "incheon_newtown";
    return "incheon_oldtown";
  }

  if (flavor === "gyeonggi_tech") {
    if (/성남|분당|판교|정자|서현|수지/.test(name)) return "tech_bundang";
    if (/광교|영통|과천/.test(name)) return "tech_south";
    return "tech";
  }

  if (flavor === "gyeonggi_gtx") {
    if (/남양주|구리|하남/.test(name)) return "gtx_east";
    if (/고양|파주|김포/.test(name)) return "gtx_west";
    if (/의정부|양주|동두천/.test(name)) return "gtx_north";
    if (/광명|부천/.test(name)) return "gtx_southwest";
    return "gtx";
  }

  if (flavor === "gyeonggi_industrial") {
    if (/평택|오산|화성/.test(name)) return "industrial_southwest";
    if (/안산|시흥/.test(name)) return "industrial_west";
    if (/이천|안성|처인/.test(name)) return "industrial_inland";
    return "industrial";
  }

  if (flavor === "gyeonggi_county") {
    if (/남양주|양평|가평|광주/.test(name)) return "county_river_east";
    if (/연천|포천|양주/.test(name)) return "county_north";
    if (/여주|이천/.test(name)) return "county_southeast";
    return "county";
  }

  return flavor || region.group;
}

const GENERIC_PERSONA_VARIANTS = {
  seoul_core: {
    steady_family: {
      emoji:"🧭", name:"생활권 고수 가족", tagline:"학교와 돌봄을 유지한 채 한 칸만 올린다",
      quote:"서울 안에서 선은 넘지 않되, 아이한테 더 나은 단지를 주고 싶어요.",
      tags:["가족","실거주","학군","생활권 유지"],
    },
    upward_worker: {
      emoji:"💼", name:"직주근접 상향 직장인", tagline:"출근 10분과 자산 격차를 함께 계산한다",
      quote:"회사와 가까워지는 동시에, 지금보다 한 단계 위의 주소를 원해요.",
      tags:["직장인","출퇴근","갈아타기","노선 민감"],
    },
    first_home: {
      emoji:"🗝️", name:"서울 잔류 첫 매수층", tagline:"서울 밖으로 나가기 전 마지막 계산을 한다",
      quote:"서울을 포기할지 말지, 지금이 그 경계선 같아요.",
      tags:["첫 매수","예산 제한","신혼","서울 잔류"],
    },
    upgrade_owner: {
      emoji:"📈", name:"브랜드 단지 상향 보유자", tagline:"현재 집을 발판으로 다음 위계를 본다",
      quote:"지금 집을 잘 팔아야, 결국 가고 싶던 라인에 닿아요.",
      tags:["보유자","갈아타기","상향 이동","가격 민감"],
    },
    lifestyle_dink: {
      emoji:"🍸", name:"도시감도 DINK", tagline:"가격보다 동네의 분위기와 속도를 본다",
      quote:"집값이 아니라, 내가 어떤 사람으로 살아질지가 중요해요.",
      tags:["DINK","라이프","도시 감","선호도 우선"],
    },
    retiring_senior: {
      emoji:"🌆", name:"도심 잔류 다운사이저", tagline:"멀리 가지 않고 평수만 줄여 현금을 만든다",
      quote:"서울은 남기고 싶고, 관리비와 평수는 줄이고 싶어요.",
      tags:["시니어","다운사이징","현금 확보","노후"],
    },
    return_local: {
      emoji:"🪃", name:"도심 복귀 재정착자", tagline:"외곽 생활을 접고 다시 서울 생활권을 찾는다",
      quote:"다시 돌아오려 보니, 예전보다 서울이 훨씬 비싸졌어요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📊", name:"소형 진입 투자 청년", tagline:"작게 들어가서 다음 사이클을 노린다",
      quote:"지금은 작게 들어가도, 서울 안이면 다음 기회가 보여요.",
      tags:["청년","소액 투자","수익","갭투자 탐색"],
    },
  },
  seoul_edge: {
    steady_family: {
      emoji:"🏫", name:"학군-동선 맞벌이 가족", tagline:"서울 안에서 아이와 출근을 동시에 지킨다",
      quote:"멀리 나가면 아이 일정이 깨지고, 남으면 집이 좁아져요.",
      tags:["가족","실거주","학군","맞벌이"],
    },
    upward_worker: {
      emoji:"🚇", name:"노선 민감 직장인", tagline:"환승 한 번을 줄이기 위해 이사를 계산한다",
      quote:"출근 15분이 줄면, 내가 사는 도시가 달라져요.",
      tags:["직장인","출퇴근","직주","노선 민감"],
    },
    first_home: {
      emoji:"🔑", name:"서울 끝선 첫 매수층", tagline:"서울과 수도권의 경계에서 첫 집을 고른다",
      quote:"서울 주소를 지킬 수 있을 때 들어가야 한다고 생각해요.",
      tags:["첫 매수","예산 제한","청년","첫 집"],
    },
    upgrade_owner: {
      emoji:"🏢", name:"단지 상향 보유자", tagline:"동네는 유지하고 단지의 격을 올린다",
      quote:"생활권은 익숙한데, 단지는 한 단계 더 가고 싶어요.",
      tags:["갈아타기","보유자","상향 이동","가격 민감"],
    },
    lifestyle_dink: {
      emoji:"🎧", name:"생활밀도 DINK", tagline:"강북과 강서 사이에서 취향을 고른다",
      quote:"조용한 동네보다, 내가 자주 나가는 동네에 가깝고 싶어요.",
      tags:["DINK","라이프","취향","도시 감"],
    },
    retiring_senior: {
      emoji:"🌿", name:"서울 생활 유지 시니어", tagline:"병원과 지하철 가까운 곳으로 작게 옮긴다",
      quote:"서울을 벗어나면 편할 줄 알았는데, 병원 생각하면 또 아니에요.",
      tags:["은퇴","시니어","다운사이징","의료 접근"],
    },
    return_local: {
      emoji:"🧳", name:"서울 재정착 가족", tagline:"수도권 바깥 생활을 접고 다시 서울로 붙는다",
      quote:"다시 서울 가까이 오고 싶지만, 예전처럼 중심부는 어렵죠.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"🎯", name:"역세권 베팅 청년", tagline:"작은 예산으로 다음 상승 구간을 노린다",
      quote:"지금 싸게 사는 것보다, 다음에 덜 후회할 곳이 중요해요.",
      tags:["청년","소액 투자","수익","역세권"],
    },
  },
  gyeonggi_core: {
    steady_family: {
      emoji:"🏘️", name:"신도시 정착 가족", tagline:"학군과 브랜드 단지를 함께 본다",
      quote:"서울만 아니면 된다는 말이, 이제는 틀린 것 같아요.",
      tags:["가족","실거주","학군","신도시"],
    },
    upward_worker: {
      emoji:"🧑‍💻", name:"판교-강남 출근층", tagline:"서울 대신 광역 생활권에서 상향 이동을 본다",
      quote:"서울 주소보다 중요한 건, 내 동선이 더 좋아지는 거예요.",
      tags:["직장인","출퇴근","직주근접","갈아타기"],
    },
    first_home: {
      emoji:"🪴", name:"광역권 첫 집 부부", tagline:"서울을 포기하는 대신 생활 수준을 지킨다",
      quote:"서울 대신 이 동네를 택한 만큼, 첫 집의 만족도는 높아야 해요.",
      tags:["첫 매수","신혼","예산 제한","실거주"],
    },
    upgrade_owner: {
      emoji:"📦", name:"생활권 상향 보유자", tagline:"분당·광교·과천 같은 다음 위계를 본다",
      quote:"이 동네도 나쁘지 않지만, 다음엔 조금 더 상징적인 곳을 보고 있어요.",
      tags:["보유자","갈아타기","상향 이동","자산 위계"],
    },
    lifestyle_dink: {
      emoji:"☕", name:"광역생활 DINK", tagline:"서울만큼 붐비지 않으면서 감도 있는 곳을 찾는다",
      quote:"꼭 서울이 아니어도, 세련된 생활권은 분명히 있거든요.",
      tags:["DINK","라이프","취향","생활 밀도"],
    },
    retiring_senior: {
      emoji:"🚶", name:"인프라 중심 다운사이저", tagline:"병원과 공원을 기준으로 다음 집을 고른다",
      quote:"멀리 가고 싶진 않고, 걷기 좋은 인프라가 제일 중요해요.",
      tags:["은퇴","시니어","다운사이징","의료 접근"],
    },
    return_local: {
      emoji:"🏠", name:"광역권 복귀형", tagline:"서울에서 밀려난 게 아니라 다시 생활권을 정리한다",
      quote:"돌아온다는 건 후퇴가 아니라, 생활비와 삶을 다시 맞추는 거예요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📱", name:"호재 추적 투자 청년", tagline:"GTX와 재건축이 만나는 곳을 찾는다",
      quote:"교통 하나 바뀌면 자산 곡선이 아예 달라져요.",
      tags:["청년","소액 투자","GTX","수익"],
    },
  },
  gyeonggi_commuter: {
    steady_family: {
      emoji:"🚌", name:"통근형 실거주 가족", tagline:"서울 접근성과 학교를 동시에 맞춘다",
      quote:"회사와 학교 사이에서, 이 동네가 가장 덜 무너지는 선택이에요.",
      tags:["가족","실거주","학군","통근"],
    },
    upward_worker: {
      emoji:"🚄", name:"GTX 대기 직장인", tagline:"노선 하나가 내 다음 집을 바꾼다고 믿는다",
      quote:"지금은 멀어도, 노선이 열리면 완전히 다른 동네가 돼요.",
      tags:["직장인","출퇴근","GTX","상향 이동"],
    },
    first_home: {
      emoji:"🔑", name:"실속형 첫 매수층", tagline:"서울과 가격 차이를 계산하며 첫 집을 고른다",
      quote:"조금 멀어도, 첫 집은 결국 감당 가능한 곳이어야 하니까요.",
      tags:["첫 매수","예산 제한","신혼","확장 탐색"],
    },
    upgrade_owner: {
      emoji:"📦", name:"동네 안 갈아타기 보유자", tagline:"같은 축에서 한 칸 위를 노린다",
      quote:"멀리 가지 말고, 같은 생활권에서 조금 더 좋은 단지로 가고 싶어요.",
      tags:["보유자","갈아타기","상향 이동","생활권 유지"],
    },
    lifestyle_dink: {
      emoji:"🍷", name:"신도시 감도 DINK", tagline:"차로 움직이는 생활권 안에서 취향을 찾는다",
      quote:"서울만큼 촘촘하진 않아도, 내 생활 패턴에 맞는 곳은 있어요.",
      tags:["DINK","라이프","생활 밀도","취향"],
    },
    retiring_senior: {
      emoji:"🌅", name:"현금 확보 다운사이저", tagline:"넓은 집을 정리하고 관리 쉬운 집으로 간다",
      quote:"평수보다 관리비가 먼저 보이는 시기가 왔어요.",
      tags:["은퇴","다운사이징","현금 확보","노후"],
    },
    return_local: {
      emoji:"🧳", name:"수도권 복귀형", tagline:"서울 밖에 남되 익숙한 생활권으로 되돌아온다",
      quote:"다시 돌아와도, 예전보다 선택지가 훨씬 좁아졌어요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"🎯", name:"교통호재 베팅 청년", tagline:"아직 덜 오른 축을 찾는다",
      quote:"사람들이 다 안 볼 때 들어가는 게 제일 중요해요.",
      tags:["청년","소액 투자","교통 호재","수익"],
    },
  },
  gyeonggi_value: {
    steady_family: {
      emoji:"🏡", name:"가성비 실거주 가족", tagline:"무리하지 않고 넓이와 학교를 함께 본다",
      quote:"서울까지 욕심내면 안 되고, 그래도 아이 키우기 좋아야 해요.",
      tags:["가족","실거주","학군","안정 선호"],
    },
    upward_worker: {
      emoji:"🛣️", name:"장거리 출퇴근 직장인", tagline:"시간을 줄이기 위해 상향 이동을 고민한다",
      quote:"출근길이 너무 길어지면, 결국 집을 바꿔야 하더라고요.",
      tags:["직장인","출퇴근","갈아타기","직주근접"],
    },
    first_home: {
      emoji:"🪙", name:"예산 우선 첫 매수층", tagline:"무조건 감당 가능한 첫 집을 고른다",
      quote:"첫 집이 완벽할 수는 없지만, 적어도 버틸 수는 있어야 해요.",
      tags:["첫 매수","예산 제한","첫 집","실속"],
    },
    upgrade_owner: {
      emoji:"📈", name:"현실 상향 보유자", tagline:"서울보다 같은 축의 상위 도시를 먼저 본다",
      quote:"무리하게 점프하기보다, 한 칸씩 올라가는 쪽이 맞아요.",
      tags:["보유자","갈아타기","상향 이동","가격 민감"],
    },
    lifestyle_dink: {
      emoji:"🎨", name:"지역내 감도 탐색 DINK", tagline:"서울 대신 지역 안에서 취향이 맞는 곳을 찾는다",
      quote:"꼭 중심부가 아니어도, 나답게 살 수 있는 동네는 있거든요.",
      tags:["DINK","라이프","취향","생활권 탐색"],
    },
    retiring_senior: {
      emoji:"🌾", name:"소형 정착 다운사이저", tagline:"관리 쉬운 집과 병원 접근성을 우선한다",
      quote:"이제는 넓은 집보다 편하게 사는 집이 먼저예요.",
      tags:["은퇴","시니어","다운사이징","의료 접근"],
    },
    return_local: {
      emoji:"↩️", name:"생활비 절감 복귀형", tagline:"지출을 줄이며 익숙한 지역으로 돌아온다",
      quote:"결국 버틸 수 있는 동네로 돌아오는 것도 전략이에요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📉", name:"저가 진입 투자 청년", tagline:"작게 들어가서 사이클을 기다린다",
      quote:"비싼 데 못 들어가도, 아직 덜 오른 데는 남아 있어요.",
      tags:["청년","소액 투자","저가 진입","수익"],
    },
  },
  gyeonggi_rural: {
    steady_family: {
      emoji:"🚗", name:"차 중심 정착 가족", tagline:"학교와 병원을 차로 연결해 산다",
      quote:"도시는 멀어도, 아이 키우기만 괜찮으면 남을 수 있어요.",
      tags:["가족","실거주","학군","차 생활"],
    },
    upward_worker: {
      emoji:"🛣️", name:"광역 통근 직장인", tagline:"도로와 환승거점이 곧 집값이다",
      quote:"출퇴근이 길어도, 갈아탈 만한 다음 거점은 늘 찾게 돼요.",
      tags:["직장인","출퇴근","광역 통근","거점 이동"],
    },
    first_home: {
      emoji:"🔰", name:"정착형 첫 집 부부", tagline:"넓이와 비용을 먼저 보고 시작한다",
      quote:"서울은 아니어도, 첫 집은 오래 버틸 수 있어야 해요.",
      tags:["첫 매수","예산 제한","첫 집","정착"],
    },
    upgrade_owner: {
      emoji:"📦", name:"읍내 상향 보유자", tagline:"더 큰 도시보다 더 나은 거점을 찾는다",
      quote:"멀리 점프하기보다, 일단 더 나은 생활권으로 옮기고 싶어요.",
      tags:["보유자","갈아타기","상향 이동","생활권 이동"],
    },
    lifestyle_dink: {
      emoji:"🌲", name:"저밀도 취향 DINK", tagline:"복잡함보다 여유 있는 동네를 선호한다",
      quote:"도시의 속도보다, 내가 편한 리듬이 먼저예요.",
      tags:["DINK","라이프","저밀도","취향"],
    },
    retiring_senior: {
      emoji:"🪴", name:"전원형 다운사이저", tagline:"도시와 너무 멀지 않은 조용한 곳을 찾는다",
      quote:"의료 접근은 챙기되, 남은 시간은 조금 더 조용했으면 해요.",
      tags:["은퇴","시니어","다운사이징","노후"],
    },
    return_local: {
      emoji:"🏞️", name:"고향 복귀 정착자", tagline:"원래 살던 축으로 되돌아와 생활비를 맞춘다",
      quote:"결국 오래 버틸 수 있는 건 익숙한 생활권이더라고요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📍", name:"거점 선점 투자 청년", tagline:"사람들이 뒤늦게 보는 생활거점을 먼저 찾는다",
      quote:"큰 상승장은 아니어도, 먼저 선점할 만한 자리들은 보여요.",
      tags:["청년","소액 투자","거점 선점","수익"],
    },
  },
  incheon_newtown: {
    steady_family: {
      emoji:"🌊", name:"신도시 실거주 가족", tagline:"학군과 바다 전망보다 생활 안정이 먼저다",
      quote:"새 동네의 장점은 누리되, 학교와 통근이 무너지면 안 돼요.",
      tags:["가족","실거주","학군","신도시"],
    },
    upward_worker: {
      emoji:"🚅", name:"서울 연결 직장인", tagline:"송도와 서울 사이 시간을 계속 계산한다",
      quote:"도시는 좋지만, 결국 서울과 얼마나 이어지느냐가 중요해요.",
      tags:["직장인","출퇴근","GTX","노선 민감"],
    },
    first_home: {
      emoji:"🏙️", name:"신도시 첫 집 부부", tagline:"서울 대신 쾌적함과 첫 자산을 고른다",
      quote:"첫 집이라면, 답답하지 않은 환경도 무시 못 하겠더라고요.",
      tags:["첫 매수","신혼","예산 제한","첫 집"],
    },
    upgrade_owner: {
      emoji:"📈", name:"해안권 상향 보유자", tagline:"송도 안에서 한 단계 위 단지를 본다",
      quote:"같은 도시 안에서도 단지마다 위계가 확실히 갈려요.",
      tags:["보유자","갈아타기","상향 이동","단지 위계"],
    },
    lifestyle_dink: {
      emoji:"🥂", name:"국제도시 DINK", tagline:"쾌적함과 도시 이미지를 함께 산다",
      quote:"서울처럼 빽빽하진 않아도, 나한텐 이 리듬이 더 맞아요.",
      tags:["DINK","라이프","도시 감","국제도시"],
    },
    retiring_senior: {
      emoji:"🌅", name:"해안형 다운사이저", tagline:"서울 대신 바다와 의료 접근성을 함께 본다",
      quote:"은퇴 후엔 바다를 가까이 두고 싶지만, 병원도 멀면 안 돼요.",
      tags:["은퇴","시니어","다운사이징","의료 접근"],
    },
    return_local: {
      emoji:"🧳", name:"인천 복귀 재정착자", tagline:"서울 생활을 정리하고 다시 인천으로 붙는다",
      quote:"서울에서 빠져나오더라도, 너무 낡은 생활권으로는 가고 싶지 않아요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📡", name:"노선 기대 투자 청년", tagline:"GTX와 국제도시 스토리에 베팅한다",
      quote:"실현 전 기대감이 가격을 먼저 움직일 때가 있거든요.",
      tags:["청년","소액 투자","GTX","수익"],
    },
  },
  incheon_mixed: {
    steady_family: {
      emoji:"🏠", name:"구도심 정착 가족", tagline:"생활비와 학교를 맞추는 현실형 가족",
      quote:"새 아파트보다, 버틸 수 있는 생활비가 더 현실적이에요.",
      tags:["가족","실거주","학군","안정 선호"],
    },
    upward_worker: {
      emoji:"🚘", name:"서울 접근 직장인", tagline:"서울 출근선에 얼마나 붙을 수 있는지 본다",
      quote:"서울까지 한 시간 안에 들어가야 다음 집도 보이죠.",
      tags:["직장인","출퇴근","서울 접근","갈아타기"],
    },
    first_home: {
      emoji:"🔑", name:"실속 첫 매수층", tagline:"인천 안에서 가장 합리적인 첫 집을 찾는다",
      quote:"화려하진 않아도, 첫 집은 감당 가능한 쪽이 맞아요.",
      tags:["첫 매수","예산 제한","첫 집","실속"],
    },
    upgrade_owner: {
      emoji:"📦", name:"신도시 상향 보유자", tagline:"구도심에서 신도시나 서울 가까운 축을 본다",
      quote:"같은 인천이라도, 다음엔 좀 더 새 도시로 가고 싶어요.",
      tags:["보유자","갈아타기","상향 이동","신도시"],
    },
    lifestyle_dink: {
      emoji:"🍜", name:"동네 취향 DINK", tagline:"서울 대신 지역 안에서 분위기 맞는 곳을 찾는다",
      quote:"멀리 안 가도, 우리한테 맞는 생활권은 따로 있더라고요.",
      tags:["DINK","라이프","취향","생활권 탐색"],
    },
    retiring_senior: {
      emoji:"🌿", name:"생활비 절약 다운사이저", tagline:"현금흐름과 병원 거리를 같이 본다",
      quote:"노후엔 집의 상징성보다, 병원과 생활비가 더 크게 보여요.",
      tags:["은퇴","시니어","다운사이징","생활비 절감"],
    },
    return_local: {
      emoji:"↩️", name:"인천 회귀형", tagline:"비용을 줄이며 익숙한 생활권으로 돌아온다",
      quote:"결국 손에 익은 도시로 돌아오는 것도 나쁜 선택은 아니에요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"🎯", name:"저평가 베팅 청년", tagline:"송도 옆 구도심의 간극을 본다",
      quote:"사람들이 덜 보는 곳에서 차이를 먹는 게 제 전략이에요.",
      tags:["청년","소액 투자","저평가","수익"],
    },
  },
  incheon_island: {
    steady_family: {
      emoji:"⛴️", name:"섬-본토 왕복 가족", tagline:"배와 차 시간표까지 계산해 산다",
      quote:"학교와 병원이 멀수록, 이사는 더 신중해질 수밖에 없어요.",
      tags:["가족","실거주","학군","왕복 생활"],
    },
    upward_worker: {
      emoji:"🧭", name:"본토 거점 직장인", tagline:"섬을 떠나 본토 거점으로 붙고 싶다",
      quote:"결국 다음 집은 인천 본토나 서울 접근선일 가능성이 커요.",
      tags:["직장인","출퇴근","거점 이동","복귀"],
    },
    first_home: {
      emoji:"🪵", name:"저비용 첫 정착층", tagline:"비용을 아끼되 생활 가능선을 본다",
      quote:"싸다는 이유만으론 안 되고, 버틸 수 있는 생활권이어야 해요.",
      tags:["첫 매수","예산 제한","정착","실속"],
    },
    upgrade_owner: {
      emoji:"🧱", name:"본토 상향 보유자", tagline:"섬 안이 아니라 본토 쪽 다음 집을 생각한다",
      quote:"다음 집은 같은 섬이 아니라, 연결이 더 나은 쪽이어야 해요.",
      tags:["보유자","갈아타기","상향 이동","본토 이동"],
    },
    lifestyle_dink: {
      emoji:"🌊", name:"저밀도 취향 DINK", tagline:"도시 속도보다 풍경과 밀도를 우선한다",
      quote:"불편함이 있어도, 이 풍경과 간격은 다른 데서 못 구해요.",
      tags:["DINK","라이프","저밀도","취향"],
    },
    retiring_senior: {
      emoji:"🪁", name:"조용한 노후 지향층", tagline:"병원은 가깝게, 생활 속도는 느리게 가져간다",
      quote:"고요함은 좋지만, 의료와 장보기는 계속 고민이에요.",
      tags:["은퇴","시니어","다운사이징","노후"],
    },
    return_local: {
      emoji:"🏝️", name:"섬 복귀 정착자", tagline:"도시를 떠나 익숙한 생활권으로 다시 온다",
      quote:"결국 불편해도 익숙한 생활권으로 돌아오는 사람도 있어요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      emoji:"📍", name:"본토 거점 탐색 청년", tagline:"투자보다 생활 연결이 되는 본토 거점을 먼저 본다",
      quote:"섬 안에서 간극을 먹겠다는 것보다, 다음 생활 거점을 어디로 잡을지가 더 현실적이에요.",
      tags:["청년","본토 이동","거점 탐색","실수요"],
    },
  },
};

const GENERIC_PERSONA_FLAVOR_OVERRIDES = {
  gyeonggi_tech: {
    steady_family: {
      name:"테크벨트 정착 가족",
      tagline:"판교·분당·광교 축 안에서 학군과 브랜드를 같이 본다",
      quote:"서울보다 중요한 건, 이 생활권 안에서 얼마나 위로 갈 수 있느냐예요.",
      tags:["가족","실거주","학군","테크벨트"],
    },
    upward_worker: {
      name:"판교-강남 출근층",
      tagline:"회사와 자산 위계를 동시에 끌어올릴 다음 축을 본다",
      quote:"강남까지 더 가까워지거나, 판교 안에서 더 좋은 자리로 가고 싶어요.",
      tags:["직장인","출퇴근","판교","상향 이동"],
    },
    first_home: {
      name:"테크벨트 첫 집 부부",
      tagline:"서울 대신 분당·광교급 생활권에 첫 집을 둔다",
      quote:"첫 집이라도 생활권 수준은 포기하고 싶지 않아요.",
      tags:["첫 매수","신혼","실거주","테크벨트"],
    },
    upgrade_owner: {
      name:"분당권 상향 보유자",
      tagline:"광교에서 정자, 수지에서 판교 같은 다음 위계를 본다",
      quote:"같은 축 안에서도 어디로 한 단계 올라갈지 계속 계산하게 돼요.",
      tags:["보유자","갈아타기","분당권","자산 위계"],
    },
    lifestyle_dink: {
      name:"신도시 감도 DINK",
      tagline:"서울만큼 복잡하지 않으면서 세련된 생활권을 고른다",
      quote:"서울의 과밀함 대신, 잘 설계된 신도시의 리듬이 더 맞아요.",
      tags:["DINK","라이프","신도시","생활 감도"],
    },
    retiring_senior: {
      name:"신도시 인프라 다운사이저",
      tagline:"병원·공원·백화점이 한 권역에 있는 곳으로 줄여 간다",
      quote:"먼 데 말고, 잘 갖춰진 신도시 안에서 작게 옮기고 싶어요.",
      tags:["은퇴","시니어","다운사이징","인프라"],
    },
    return_local: {
      name:"신도시 복귀형",
      tagline:"서울 밖으로 나갔다가 다시 더 정돈된 수도권 생활권으로 온다",
      quote:"되돌아오더라도 예전보다 잘 갖춰진 쪽으로 들어오고 싶어요.",
      tags:["귀향","재정착","복귀","신도시"],
    },
    young_investor: {
      name:"테크축 투자 청년",
      tagline:"판교-광교-과천 축의 다음 가격 점프를 찾는다",
      quote:"교통보다도 직장 수요가 가격을 오래 끌고 가는 축이 있다고 봐요.",
      tags:["청년","소액 투자","테크축","수익"],
    },
  },
  gyeonggi_gtx: {
    steady_family: {
      name:"GTX 생활권 가족",
      tagline:"서울 접근성과 아이 동선을 동시에 맞추려는 가족",
      quote:"서울에 꼭 살지 않아도, 30분대 접근만 되면 충분하다고 봐요.",
      tags:["가족","실거주","GTX","통근"],
    },
    upward_worker: {
      name:"GTX 통근 직장인",
      tagline:"노선 하나가 다음 집의 위계를 바꾼다고 믿는다",
      quote:"같은 경기도라도, GTX가 닿는 축은 완전히 다르게 보여요.",
      tags:["직장인","출퇴근","GTX","직주근접"],
    },
    first_home: {
      name:"노선축 첫 집 부부",
      tagline:"서울 주소 대신 환승시간이 짧은 첫 집을 고른다",
      quote:"첫 집은 서울이 아니라도, 철도 축은 놓치고 싶지 않아요.",
      tags:["첫 매수","신혼","노선축","실거주"],
    },
    upgrade_owner: {
      name:"환승축 갈아타기 보유자",
      tagline:"같은 광역축 안에서 더 좋은 환승 거점으로 이동한다",
      quote:"멀리 점프하기보다, 같은 축에서 더 좋은 역세권으로 옮기는 게 맞아요.",
      tags:["보유자","갈아타기","역세권","상향 이동"],
    },
    lifestyle_dink: {
      name:"역세권 생활 DINK",
      tagline:"서울 대신 환승 좋은 생활권의 밀도를 즐긴다",
      quote:"도시의 감도도 중요하지만, 결국 집 앞 역이 삶의 리듬을 바꾸죠.",
      tags:["DINK","라이프","역세권","취향"],
    },
    retiring_senior: {
      name:"서울근접 다운사이저",
      tagline:"병원·자녀 접근성은 유지한 채 관리 쉬운 집으로 줄인다",
      quote:"서울은 아니어도, 자녀가 오가기 편한 선은 지키고 싶어요.",
      tags:["은퇴","시니어","다운사이징","서울 접근"],
    },
    return_local: {
      name:"광역축 복귀형",
      tagline:"서울 바깥에 남되 다시 교통 좋은 축으로 돌아온다",
      quote:"복귀라고 해도, 예전보다 더 좋은 노선 위로 붙는 게 중요해요.",
      tags:["귀향","재정착","복귀","GTX"],
    },
    young_investor: {
      name:"노선 선점 투자청년",
      tagline:"GTX와 환승 호재가 만나는 지점을 먼저 잡는다",
      quote:"지금은 조용해도 노선이 열리면 가장 먼저 움직일 동네들이 있어요.",
      tags:["청년","소액 투자","GTX","역세권"],
    },
  },
  gyeonggi_industrial: {
    steady_family: {
      name:"산단 배후 정착 가족",
      tagline:"직장과 생활비를 같이 맞추며 정착하는 가족",
      quote:"출근 가능한 범위 안에서 아이 키우기 괜찮은 곳을 고르는 게 먼저예요.",
      tags:["가족","실거주","산단 배후","정착"],
    },
    upward_worker: {
      name:"산단-서울 이중통근층",
      tagline:"공장과 본사 사이를 오가며 다음 거점을 계산한다",
      quote:"회사는 여기인데, 다음 집은 조금 더 서울에 가까워지고 싶어요.",
      tags:["직장인","출퇴근","산단","상향 이동"],
    },
    first_home: {
      name:"확장도시 첫 집 부부",
      tagline:"택지 확장과 생활비 사이에서 첫 집을 고른다",
      quote:"새 도시로 커지는 곳이면 첫 집도 조금은 기대를 걸어볼 수 있죠.",
      tags:["첫 매수","신혼","택지지구","실거주"],
    },
    upgrade_owner: {
      name:"신도시 갈아타기 보유자",
      tagline:"산단 배후에서 더 새롭고 큰 생활권으로 옮긴다",
      quote:"같은 도시 안에서도 새 택지와 구축의 격차가 꽤 크더라고요.",
      tags:["보유자","갈아타기","신도시","자산 위계"],
    },
    lifestyle_dink: {
      name:"차생활 기반 DINK",
      tagline:"도보보다 주차와 차 이동 동선이 더 중요한 커플",
      quote:"우리한텐 지하철보다 차가 더 중요해서, 생활권 기준이 다 달라요.",
      tags:["DINK","라이프","차생활","취향"],
    },
    retiring_senior: {
      name:"생활비 중심 다운사이저",
      tagline:"평수보다 유지비와 병원 거리부터 다시 계산한다",
      quote:"이제는 넓은 집보다 관리 쉬운 집과 생활비가 더 크게 보여요.",
      tags:["은퇴","시니어","다운사이징","생활비"],
    },
    return_local: {
      name:"산단권 복귀형",
      tagline:"외곽으로 밀려나기보다 익숙한 산업도시 축으로 돌아온다",
      quote:"멀리 갔다 와도 결국 생활비 맞는 산업도시 축으로 되돌아오게 돼요.",
      tags:["귀향","재정착","복귀","산업도시"],
    },
    young_investor: {
      name:"택지호재 추적 청년",
      tagline:"공업도시 안의 신도시 확장 구간을 노린다",
      quote:"산단 옆 신도시나 택지지구는 생각보다 가격 반응이 빠르더라고요.",
      tags:["청년","소액 투자","택지지구","수익"],
    },
  },
  gyeonggi_county: {
    steady_family: {
      name:"전원 정착 가족",
      tagline:"도시에서 한 걸음 떨어져 비용과 밀도를 동시에 낮춘다",
      quote:"도시의 속도를 조금 내려도, 아이 키우기와 생활비가 맞으면 괜찮아요.",
      tags:["가족","실거주","전원","정착"],
    },
    upward_worker: {
      name:"거점 왕복 직장인",
      tagline:"시내 거점과 외곽 집 사이를 오가며 버틴다",
      quote:"매일 멀어도, 다음엔 조금 더 가까운 거점으로 가고 싶다는 생각은 늘 해요.",
      tags:["직장인","출퇴근","거점 이동","외곽"],
    },
    first_home: {
      name:"저비용 첫 집 부부",
      tagline:"넓이와 비용을 우선해 첫 집의 버티는 힘을 본다",
      quote:"처음부터 완벽한 동네는 아니어도, 오래 버틸 수 있는 집이면 괜찮아요.",
      tags:["첫 매수","신혼","실속","정착"],
    },
    upgrade_owner: {
      name:"생활권 회복 보유자",
      tagline:"더 큰 도시보다 더 나은 읍내 거점을 먼저 찾는다",
      quote:"서울 점프보다는 일단 생활이 편한 거점으로 가는 게 먼저예요.",
      tags:["보유자","갈아타기","거점 이동","생활권"],
    },
    lifestyle_dink: {
      name:"저밀도 선호 DINK",
      tagline:"복잡함보다 풍경과 여유 있는 리듬을 고른다",
      quote:"우리한텐 도심의 밀도보다 덜 부딪히는 생활 속도가 더 중요해요.",
      tags:["DINK","라이프","저밀도","취향"],
    },
    retiring_senior: {
      name:"조용한 노후 다운사이저",
      tagline:"도시를 완전히 떠나지 않으면서도 더 고요한 축을 찾는다",
      quote:"병원은 접근 가능해야 하지만, 남은 시간은 조금 더 조용했으면 좋겠어요.",
      tags:["은퇴","시니어","다운사이징","노후"],
    },
    return_local: {
      name:"생활권 회귀형",
      tagline:"결국 오래 버틸 수 있는 익숙한 축으로 돌아온다",
      quote:"멀리 돌고 돌아도 생활비와 익숙함이 맞는 동네로 돌아오게 되더라고요.",
      tags:["귀향","재정착","복귀","생활비 절감"],
    },
    young_investor: {
      name:"거점 탐색 투자청년",
      tagline:"사람들이 늦게 알아보는 외곽 거점을 먼저 본다",
      quote:"대형 상승장은 아니어도, 먼저 선점해둘 만한 자리들이 보여요.",
      tags:["청년","소액 투자","거점 선점","수익"],
    },
  },
  incheon_newtown_plus: {
    steady_family: {
      name:"국제도시 정착 가족",
      tagline:"쾌적함과 학교 환경을 함께 보는 신도시 가족",
      quote:"서울처럼 빽빽하진 않아도, 아이 키우기 좋은 도시의 완성도가 중요해요.",
      tags:["가족","실거주","국제도시","신도시"],
    },
    upward_worker: {
      name:"서울 연결 직장인",
      tagline:"송도·청라에서 서울 접근성이 더 나아질 다음 축을 본다",
      quote:"이 도시의 쾌적함은 좋지만, 결국 서울과 얼마나 빨리 이어지느냐가 중요해요.",
      tags:["직장인","출퇴근","서울 연결","노선 민감"],
    },
    first_home: {
      name:"국제도시 첫 집 부부",
      tagline:"서울 대신 바다와 신도시 인프라를 택한 첫 집",
      quote:"첫 집이라면 답답한 서울 외곽보다 쾌적한 신도시가 더 낫다고 느껴요.",
      tags:["첫 매수","신혼","국제도시","실거주"],
    },
    upgrade_owner: {
      name:"해안권 상향 보유자",
      tagline:"같은 해안 생활권 안에서 한 단계 위 단지를 본다",
      quote:"같은 도시 안에서도 송도, 청라, 영종의 위계가 다르게 느껴져요.",
      tags:["보유자","갈아타기","해안권","자산 위계"],
    },
    lifestyle_dink: {
      name:"워터프런트 DINK",
      tagline:"도시 감도보다 쾌적함과 수변 생활권을 더 높게 본다",
      quote:"서울의 밀도 대신 수변 도시의 여백과 이미지를 사는 느낌이 좋아요.",
      tags:["DINK","라이프","수변","국제도시"],
    },
    retiring_senior: {
      name:"해안 인프라 다운사이저",
      tagline:"바다와 병원 접근성을 같이 놓고 다음 집을 고른다",
      quote:"은퇴 후엔 풍경도 중요하지만, 병원과 장보기 동선도 포기할 수 없어요.",
      tags:["은퇴","시니어","다운사이징","해안권"],
    },
    return_local: {
      name:"인천 신도시 복귀형",
      tagline:"서울 생활을 접고도 너무 낡지 않은 생활권으로 돌아온다",
      quote:"복귀라 해도 예전 구도심이 아니라 더 새롭고 정돈된 인천으로 오고 싶어요.",
      tags:["귀향","재정착","복귀","신도시"],
    },
    young_investor: {
      name:"국제도시 호재 청년",
      tagline:"GTX·공항·신도시 스토리가 만나는 곳에 베팅한다",
      quote:"이런 도시들은 기대감이 먼저 움직일 때 가격 곡선이 더 가파르게 나와요.",
      tags:["청년","소액 투자","국제도시","수익"],
    },
  },
  incheon_oldtown: {
    steady_family: {
      name:"구도심 버팀 가족",
      tagline:"생활비와 학교를 맞추며 도시 안에서 버티는 가족",
      quote:"새 아파트보다 중요한 건 지금 생활을 무너뜨리지 않는 비용선이에요.",
      tags:["가족","실거주","구도심","안정 선호"],
    },
    upward_worker: {
      name:"서울 인접 직장인",
      tagline:"인천 안에서도 서울에 더 붙는 축을 찾는다",
      quote:"다음 집은 같은 인천이라도 서울 접근선이 더 좋아졌으면 해요.",
      tags:["직장인","출퇴근","서울 접근","갈아타기"],
    },
    first_home: {
      name:"실속 첫 집 가족",
      tagline:"인천 안에서 가장 현실적인 첫 집을 고른다",
      quote:"화려하지 않아도 괜찮아요. 첫 집은 감당 가능해야 오래 갑니다.",
      tags:["첫 매수","실속","구도심","첫 집"],
    },
    upgrade_owner: {
      name:"신도시 상향 보유자",
      tagline:"구도심에서 더 새롭고 상징적인 축으로 갈아타려 한다",
      quote:"같은 인천이라도 다음엔 좀 더 새 도시의 기분이 나는 곳을 보고 있어요.",
      tags:["보유자","갈아타기","신도시","상향 이동"],
    },
    lifestyle_dink: {
      name:"동네 감도 DINK",
      tagline:"서울 대신 지역 안에서 분위기 맞는 생활권을 찾는다",
      quote:"멀리 가지 않아도, 우리 취향에 맞는 동네는 이 도시 안에 있다고 봐요.",
      tags:["DINK","라이프","취향","생활권 탐색"],
    },
    retiring_senior: {
      name:"현금흐름 다운사이저",
      tagline:"상징성보다 병원과 생활비를 먼저 계산한다",
      quote:"노후엔 집의 체면보다 매달 빠져나가는 비용이 더 크게 보이더라고요.",
      tags:["은퇴","시니어","다운사이징","생활비"],
    },
    return_local: {
      name:"인천 생활권 회귀형",
      tagline:"멀리 돌고 돌아도 결국 익숙한 도시로 되돌아온다",
      quote:"결국은 생활비와 손에 익은 도시 구조가 맞는 데로 돌아오게 돼요.",
      tags:["귀향","재정착","복귀","생활권"],
    },
    young_investor: {
      name:"간극 베팅 투자청년",
      tagline:"송도 옆 구도심처럼 가격 간극이 큰 곳을 먼저 본다",
      quote:"같은 도시 안의 격차가 클수록, 다음에 메워질 자리도 보인다고 생각해요.",
      tags:["청년","소액 투자","저평가","수익"],
    },
  },
};

function genericPersonaRegionToken(region, flavor) {
  const name = region.name || "";
  if (flavor === "gyeonggi_tech") {
    if (/성남|분당|판교|정자|서현/.test(name)) return "판교·분당축";
    if (/수지/.test(name)) return "수지·분당축";
    if (/영통|광교/.test(name)) return "광교·영통축";
    if (/과천/.test(name)) return "과천축";
    return "테크벨트";
  }
  if (flavor === "gyeonggi_gtx") {
    if (/고양|덕양|일산|파주/.test(name)) return "서북 GTX축";
    if (/남양주|구리|하남/.test(name)) return "동북 GTX축";
    if (/김포|부천|광명/.test(name)) return "서남 연결축";
    if (/의정부|양주/.test(name)) return "북부 통근축";
    return "광역 통근축";
  }
  if (flavor === "gyeonggi_industrial") {
    if (/평택|화성/.test(name)) return "평택·화성";
    if (/안산|시흥/.test(name)) return "안산·시흥";
    if (/이천|안성/.test(name)) return "이천·안성";
    if (/오산/.test(name)) return "오산권";
    if (/처인/.test(name)) return "용인 남부";
    return "산단 배후권";
  }
  if (flavor === "gyeonggi_county") {
    if (/양평/.test(name)) return "양평권";
    if (/가평/.test(name)) return "가평권";
    if (/여주/.test(name)) return "여주권";
    if (/연천/.test(name)) return "연천권";
    if (/포천/.test(name)) return "포천권";
    return name.replace(/\s+/g, "");
  }
  if (flavor === "incheon_newtown_plus") {
    if (/송도|연수/.test(name)) return "송도권";
    if (/청라/.test(name)) return "청라권";
    if (/검단/.test(name)) return "검단권";
    if (/영종/.test(name)) return "영종권";
    return "인천 신도시";
  }
  if (flavor === "incheon_oldtown") {
    if (/중구|동구|미추홀/.test(name)) return "인천 구도심";
    if (/부평|계양|남동/.test(name)) return "인천 생활권";
    return name.replace(/\s+/g, "");
  }
  return "";
}

function applyRegionalPersonaName(name, region, flavor) {
  const token = genericPersonaRegionToken(region, flavor);
  if (!token) return name;
  return `${name} (${token})`;
}

function personaRegionDisplay(region) {
  var raw = (region.name || "").trim();
  raw = raw.replace(/^([가-힣]+)시(?=[가-힣]+구)/, "");
  raw = raw.replace(/^인천광역시\s*/, "");
  raw = raw.replace(/^서울특별시\s*/, "");
  raw = raw.replace(/^경기도\s*/, "");
  return raw;
}

function genericPersonaContextSpec(region, flavor) {
  var name = region.name || "";
  if (region.group === "seoul") {
    if (flavor === "seoul_core") return { key: "seoul_core", role: "서울 코어", tag: "서울 코어" };
    if (/종로|중구|용산/.test(name)) return { key: "seoul_cbd", role: "도심", tag: "도심권" };
    if (/강서|양천|영등포|구로|금천|관악/.test(name)) return { key: "seoul_west", role: "서남권", tag: "서남 생활권" };
    return { key: "seoul_north", role: "서울 외곽", tag: "서울 생활권" };
  }
  if (flavor === "gyeonggi_tech") {
    if (/성남|분당|판교|정자|서현|수지/.test(name)) return { key: "tech_bundang", role: "분당·판교", tag: "테크벨트" };
    if (/과천/.test(name)) return { key: "tech_gwacheon", role: "과천", tag: "준강남 생활권" };
    if (/영통|광교/.test(name)) return { key: "tech_gwanggyo", role: "광교·영통", tag: "테크벨트" };
    return { key: "tech_belt", role: "테크벨트", tag: "테크벨트" };
  }
  if (/수원시(장안|권선|팔달)/.test(name)) return { key: "gyeonggi_suwon", role: "수원권", tag: "수원 생활권" };
  if (flavor === "gyeonggi_gtx") {
    if (/고양|일산|덕양|파주|김포/.test(name)) return { key: "gtx_west", role: "서북 GTX", tag: "GTX 축" };
    return { key: "gtx_east", role: "동북 GTX", tag: "GTX 축" };
  }
  if (flavor === "gyeonggi_industrial") {
    if (/평택|화성|오산|안산|시흥/.test(name)) return { key: "industrial_west", role: "산단 확장", tag: "산단 배후권" };
    return { key: "industrial_east", role: "택지 확장", tag: "산단 배후권" };
  }
  if (flavor === "gyeonggi_county") {
    if (/양평|가평/.test(name)) return { key: "county_river", role: "전원 생활", tag: "전원권" };
    return { key: "county_plain", role: "생활 거점", tag: "외곽 거점" };
  }
  if (region.group === "incheon") {
    if (/연수|송도/.test(name)) return { key: "incheon_songdo", role: "국제도시", tag: "송도권" };
    if (/청라|검단|영종|서구/.test(name)) return { key: "incheon_newtown", role: "신도시", tag: "인천 신도시" };
    if (/중구/.test(name)) return { key: "incheon_airport", role: "공항 연결", tag: "공항권" };
    return { key: "incheon_oldtown", role: "구도심", tag: "인천 생활권" };
  }
  return { key: flavor, role: genericPersonaRegionToken(region, flavor) || "생활권", tag: genericPersonaRegionToken(region, flavor) || "생활권" };
}

function contextualPersonaCopy(id, region, spec) {
  var role = spec.role;
  var tag = spec.tag;
  var byId = {
    steady_family: {
      name:
        spec.key === "seoul_core" ? "코어 생활권 방어 가족" :
        spec.key === "seoul_cbd" ? "도심 버팀 가족" :
        spec.key === "seoul_west" ? "공항선 생활 가족" :
        spec.key === "seoul_north" ? "서울 외곽 정착 가족" :
        spec.key === "gyeonggi_suwon" ? "수원 정착 가족" :
        spec.key === "tech_bundang" ? "분당 학군 정착 가족" :
        spec.key === "tech_gwacheon" ? "과천 학군·환경 정착 가족" :
        spec.key === "tech_gwanggyo" ? "광교 호수공원 가족" :
        spec.key === "gtx_west" ? "GTX 서북권 가족" :
        spec.key === "gtx_east" ? "GTX 동북권 가족" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "산단 배후 정착 가족" :
        spec.key === "county_river" || spec.key === "county_plain" ? "전원 정착 가족" :
        spec.key === "incheon_songdo" ? "국제도시 정착 가족" :
        spec.key === "incheon_newtown" ? "신도시 실거주 가족" :
        spec.key === "incheon_oldtown" ? "구도심 버팀 가족" :
        spec.key === "incheon_airport" ? "공항 연결 가족" :
        "생활권 정착 가족",
      tagline:
        spec.key === "seoul_core" ? "서울 안에서도 더 쉽게 내려놓기 어려운 핵심 생활권을 지킨다" :
        spec.key === "seoul_cbd" ? "학교·돌봄·출근을 도심 반경 안에서 함께 지킨다" :
        spec.key === "seoul_west" ? "공항·여의도·마곡 동선을 무너뜨리지 않는 가족" :
        spec.key === "seoul_north" ? "생활비와 학군을 같이 방어하며 서울 안에 남는다" :
        spec.key === "gyeonggi_suwon" ? "수원 도심권 안에서 학교와 생활비를 함께 맞춘다" :
        spec.key === "tech_bundang" ? "분당·판교 축 안에서 학군과 브랜드 단지를 같이 본다" :
        spec.key === "tech_gwacheon" ? "강남 접근성과 저밀도 주거 환경을 함께 지키려 한다" :
        spec.key === "tech_gwanggyo" ? "광교·영통 축 안에서 학군과 호수공원 인프라를 같이 본다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "서울 접근성과 아이 동선을 동시에 계산하는 가족" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "직장과 생활비를 같이 맞추며 버틸 다음 집을 본다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "넓이와 비용, 학교를 동시에 맞추는 외곽 정착형 가족" :
        spec.key === "incheon_songdo" ? "쾌적함과 학교 환경을 함께 챙기는 국제도시 가족" :
        spec.key === "incheon_newtown" ? "새 동네의 인프라와 서울 접근성을 함께 보는 신도시 가족" :
        spec.key === "incheon_oldtown" ? "생활비와 학교를 함께 맞추며 도시 안에서 버티는 구도심 가족" :
        spec.key === "incheon_airport" ? "공항·본토 연결을 고려해 생활권을 고르는 가족" :
        "생활비와 학교를 같이 맞추며 지금 지역 안에 정착한다",
      quote: region.name + "에 살다 보니, 다음 집도 결국 생활권을 크게 깨지 않는 쪽으로 보게 돼요.",
      tags: ["가족", tag],
    },
    upward_worker: {
      name:
        spec.key === "seoul_core" ? "강남 코어 갈아타기 직장인" :
        spec.key === "seoul_cbd" ? "환승 최적화 직장인" :
        spec.key === "seoul_west" ? "마곡-여의도 출근층" :
        spec.key === "seoul_north" ? "환승 민감 직장인" :
        spec.key === "gyeonggi_suwon" ? "수원-판교 통근층" :
        spec.key === "tech_bundang" ? "판교 8년차 엔지니어" :
        spec.key === "tech_gwacheon" ? "강남권 출퇴근 전문직" :
        spec.key === "tech_gwanggyo" ? "광교-강남 통근층" :
        spec.key === "gtx_west" ? "GTX-A 통근층" :
        spec.key === "gtx_east" ? "동북권 광역 통근층" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "산단-서울 이중통근층" :
        spec.key === "county_river" || spec.key === "county_plain" ? "거점 왕복 직장인" :
        spec.key === "incheon_songdo" ? "송도-서울 통근층" :
        spec.key === "incheon_newtown" ? "서울 연결 직장인" :
        spec.key === "incheon_oldtown" ? "서울 접근 직장인" :
        spec.key === "incheon_airport" ? "공항선 통근층" :
        "광역 통근 직장인",
      tagline:
        spec.key === "seoul_core" ? "출근 동선보다도 서울 코어 안의 다음 위계를 더 자주 계산한다" :
        spec.key === "seoul_cbd" ? "환승 한 번을 줄이고 도심의 위계를 올리는 직장인" :
        spec.key === "seoul_west" ? "여의도·마곡·강남 동선을 더 좋게 만들고 싶어 한다" :
        spec.key === "seoul_north" ? "서울 외곽에서 더 중심 쪽으로 붙는 출근 동선을 계산한다" :
        spec.key === "gyeonggi_suwon" ? "수원에서 판교·강남 쪽으로 더 나은 출근선을 노린다" :
        spec.key === "tech_bundang" ? "판교·강남 축 안에서 집과 회사 거리를 동시에 줄인다" :
        spec.key === "tech_gwacheon" ? "과천의 쾌적함을 유지하되 강남·서초 접근성을 더 촘촘히 계산한다" :
        spec.key === "tech_gwanggyo" ? "광교·영통에서 분당이나 강남 쪽 상향 동선을 계산한다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "GTX와 환승축 하나가 다음 집의 위계를 바꾼다고 믿는다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "산단과 서울 본사 사이에서 더 나은 거점을 찾는다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "멀더라도 다음엔 조금 더 도시 거점에 붙고 싶어 한다" :
        spec.key === "incheon_songdo" ? "국제도시의 쾌적함은 유지하되 서울 연결성은 더 높이고 싶다" :
        spec.key === "incheon_newtown" ? "신도시에서 서울에 더 빨리 닿는 축으로 옮기고 싶어 한다" :
        spec.key === "incheon_oldtown" ? "인천 안에서도 서울 쪽으로 더 붙는 출근 거점을 찾는다" :
        spec.key === "incheon_airport" ? "공항과 서울 사이에서 더 균형 잡힌 거점을 찾는다" :
        "지금보다 더 나은 출근 동선과 생활권 상향을 함께 본다",
      quote: region.name + "에서 출퇴근하다 보면, 다음 집은 결국 동선이 더 나아지는 곳을 먼저 보게 돼요.",
      tags: ["직장인", tag],
    },
    first_home: {
      name:
        spec.key === "seoul_core" ? "서울 코어 잔류 실수요자" :
        spec.key === "seoul_cbd" ? "중심지 첫 집 부부" :
        spec.key === "seoul_west" ? "서남권 첫 집 부부" :
        spec.key === "seoul_north" ? "서울 잔류 첫 집층" :
        spec.key === "gyeonggi_suwon" ? "수원 첫 집 부부" :
        spec.key === "tech_bundang" ? "분당권 첫 집 부부" :
        spec.key === "tech_gwacheon" ? "과천 진입 준비 부부" :
        spec.key === "tech_gwanggyo" ? "광교 첫 집 부부" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "노선축 첫 집 부부" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "확장도시 첫 집 부부" :
        spec.key === "county_river" || spec.key === "county_plain" ? "저비용 첫 집 부부" :
        spec.key === "incheon_songdo" ? "국제도시 첫 집 부부" :
        spec.key === "incheon_newtown" ? "신도시 첫 집 부부" :
        spec.key === "incheon_oldtown" ? "실속 첫 집 가족" :
        spec.key === "incheon_airport" ? "공항권 첫 집 실수요자" :
        "현실형 첫 집 부부",
      tagline:
        spec.key === "seoul_core" ? "서울 코어 안에서 다음 사이클까지 버틸 첫 집의 선을 찾는다" :
        spec.key === "seoul_cbd" ? "서울 중심부를 완전히 놓기 전 마지막 계산을 한다" :
        spec.key === "seoul_west" ? "서울 주소와 예산선 사이에서 가장 덜 후회할 첫 집을 고른다" :
        spec.key === "seoul_north" ? "서울 안에 남되 감당 가능한 첫 집의 선을 찾는다" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 첫 집의 버티는 힘을 먼저 본다" :
        spec.key === "tech_bundang" || spec.key === "tech_gwanggyo" ? "서울 대신 테크벨트급 생활권에 첫 집을 둔다" :
        spec.key === "tech_gwacheon" ? "서울 코어 바깥의 준강남 생활권에 첫 진입선을 둔다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "서울보다 환승시간이 짧은 첫 집을 고른다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "택지 확장과 생활비를 동시에 보고 첫 집을 정한다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "넓이와 비용을 먼저 보고 오래 버틸 첫 집을 선택한다" :
        spec.key === "incheon_songdo" ? "서울 대신 쾌적한 국제도시에 첫 집을 두는 선택을 한다" :
        spec.key === "incheon_newtown" ? "새 도시의 인프라와 비용선 사이에서 첫 집을 고른다" :
        spec.key === "incheon_oldtown" ? "인천 안에서 가장 실속 있고 오래 버틸 첫 집을 찾는다" :
        spec.key === "incheon_airport" ? "생활 가능선과 연결성을 동시에 보는 첫 집 실수요자" :
        "예산과 생활 수준을 같이 보며 첫 집의 현실선을 찾는다",
      quote: "첫 집은 완벽할 수 없지만, " + region.name + "에서 시작하면 최소한 지금 삶을 버틸 수 있을 것 같아요.",
      tags: ["첫 매수", tag],
    },
    upgrade_owner: {
      name:
        spec.key === "seoul_core" ? "브랜드 단지 상향 보유자" :
        spec.key === "seoul_cbd" ? "도심 갈아타기 보유자" :
        spec.key === "seoul_west" ? "서남권 상향 보유자" :
        spec.key === "seoul_north" ? "생활권 상향 보유자" :
        spec.key === "gyeonggi_suwon" ? "수원권 갈아타기 보유자" :
        spec.key === "tech_bundang" ? "정자-판교 갈아타기 보유자" :
        spec.key === "tech_gwacheon" ? "과천-서초 갈아타기 보유자" :
        spec.key === "tech_gwanggyo" ? "광교-분당 상향 보유자" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "환승축 갈아타기 보유자" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "신도시 갈아타기 보유자" :
        spec.key === "county_river" || spec.key === "county_plain" ? "생활권 회복 보유자" :
        spec.key === "incheon_songdo" ? "해안권 상향 보유자" :
        spec.key === "incheon_newtown" ? "신도시 상향 보유자" :
        spec.key === "incheon_oldtown" ? "구도심 갈아타기 보유자" :
        spec.key === "incheon_airport" ? "본토 상향 보유자" :
        "현실 상향 보유자",
      tagline:
        spec.key === "seoul_core" ? "서울 코어 안에서 브랜드와 단지의 위계를 한 단계 더 올린다" :
        spec.key === "seoul_cbd" ? "도심 안에서 단지와 주소의 위계를 한 칸 더 올린다" :
        spec.key === "seoul_west" ? "마곡·여의도 축처럼 더 상징적인 서남권으로 갈아타려 한다" :
        spec.key === "seoul_north" ? "같은 서울 축 안에서 더 좋은 단지와 더 나은 역세권을 본다" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 더 새롭고 더 나은 생활권으로 갈아탄다" :
        spec.key === "tech_bundang" ? "분당·판교 축 안에서 다음 위계를 노린다" :
        spec.key === "tech_gwacheon" ? "과천을 발판으로 서초·강남 코어까지의 상향 가능성을 본다" :
        spec.key === "tech_gwanggyo" ? "광교에서 분당, 영통에서 강남 쪽으로 한 단계 더 본다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "같은 광역축 안에서 더 좋은 환승 거점으로 올라간다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "산단 배후에서 더 새롭고 더 큰 생활권으로 갈아탄다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "큰 점프보다는 먼저 생활이 편한 거점으로 이동한다" :
        spec.key === "incheon_songdo" ? "같은 해안권 안에서 더 위계 있는 단지로 갈아타려 한다" :
        spec.key === "incheon_newtown" ? "신도시 안에서 더 상징적인 축으로 올라가고 싶어 한다" :
        spec.key === "incheon_oldtown" ? "구도심에서 더 새롭고 상징적인 인천 축으로 올라가고 싶어 한다" :
        spec.key === "incheon_airport" ? "공항권에서 본토 쪽 더 나은 생활권까지 함께 본다" :
        "현재 집을 발판으로 더 나은 생활권 위계를 본다",
      quote: "지금 집을 잘 정리해야 " + region.name + " 다음 단계로 넘어갈 수 있다고 느껴요.",
      tags: ["보유자", tag],
    },
    lifestyle_dink: {
      name:
        spec.key === "seoul_core" ? "코어 라이프 DINK" :
        spec.key === "seoul_cbd" ? "시티라이프 DINK" :
        spec.key === "seoul_west" ? "생활밀도 DINK" :
        spec.key === "seoul_north" ? "도시 경계 DINK" :
        spec.key === "gyeonggi_suwon" ? "수원 생활 DINK" :
        spec.key === "tech_bundang" ? "판교 생활 DINK" :
        spec.key === "tech_gwacheon" ? "과천 숲세권 DINK" :
        spec.key === "tech_gwanggyo" ? "광교 생활 DINK" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "역세권 생활 DINK" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "차생활 기반 DINK" :
        spec.key === "county_river" || spec.key === "county_plain" ? "저밀도 선호 DINK" :
        spec.key === "incheon_songdo" ? "워터프런트 DINK" :
        spec.key === "incheon_newtown" ? "신도시 생활 DINK" :
        spec.key === "incheon_oldtown" ? "동네 감도 DINK" :
        spec.key === "incheon_airport" ? "공항권 생활 DINK" :
        "생활권 감도 DINK",
      tagline:
        spec.key === "seoul_core" ? "가격보다도 서울 코어 안에서 어떤 결의 동네에 살지 더 따진다" :
        spec.key === "seoul_cbd" ? "도심의 밀도와 리듬을 포기하지 않는 커플" :
        spec.key === "seoul_west" ? "공항·여의도·마곡 사이의 생활 밀도를 즐기는 커플" :
        spec.key === "seoul_north" ? "서울 외곽 안에서 취향 맞는 생활권을 찾는 커플" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 서울보다 느슨한 리듬을 즐기는 커플" :
        spec.key === "tech_bundang" || spec.key === "tech_gwanggyo" ? "테크벨트 안에서 과밀하지 않은 감도를 찾는 커플" :
        spec.key === "tech_gwacheon" ? "서울과 붙어 있으면서도 더 조용한 생활 리듬을 찾는 커플" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "환승 좋은 생활권 안에서 취향을 찾는 커플" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "차생활 중심의 리듬에 맞춰 동네를 고르는 커플" :
        spec.key === "county_river" || spec.key === "county_plain" ? "복잡함보다 저밀도와 여유를 먼저 고르는 커플" :
        spec.key === "incheon_songdo" ? "워터프런트와 국제도시 이미지에 끌리는 커플" :
        spec.key === "incheon_newtown" ? "새 동네의 쾌적함과 취향을 같이 사는 커플" :
        spec.key === "incheon_oldtown" ? "인천 안에서 지역 분위기와 생활비 균형을 같이 보는 커플" :
        spec.key === "incheon_airport" ? "바다와 공항권의 속도 사이에서 리듬을 고르는 커플" :
        "가격보다 내가 살아질 동네의 분위기를 더 중요하게 본다",
      quote: region.name + "에서 사는 건, 집값보다 내가 어떤 리듬으로 살지 먼저 정하는 일 같아요.",
      tags: ["DINK", tag],
    },
    retiring_senior: {
      name:
        spec.key === "seoul_core" ? "코어 생활권 다운사이저" :
        spec.key === "seoul_cbd" ? "도심 잔류 다운사이저" :
        spec.key === "seoul_west" ? "서울근접 다운사이저" :
        spec.key === "seoul_north" ? "서울 생활 유지 시니어" :
        spec.key === "gyeonggi_suwon" ? "수원권 다운사이저" :
        spec.key === "tech_bundang" ? "분당 인프라 다운사이저" :
        spec.key === "tech_gwacheon" ? "과천 생활권 다운사이저" :
        spec.key === "tech_gwanggyo" ? "신도시 인프라 다운사이저" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "서울근접 다운사이저" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "생활비 중심 다운사이저" :
        spec.key === "county_river" || spec.key === "county_plain" ? "조용한 노후 다운사이저" :
        spec.key === "incheon_songdo" ? "해안 인프라 다운사이저" :
        spec.key === "incheon_newtown" ? "신도시 다운사이저" :
        spec.key === "incheon_oldtown" ? "현금흐름 다운사이저" :
        spec.key === "incheon_airport" ? "공항권 생활 다운사이저" :
        "인프라 중심 다운사이저",
      tagline:
        spec.key === "seoul_core" ? "서울 코어를 떠나지 않되 관리비와 평수는 줄이고 싶어 한다" :
        spec.key === "seoul_cbd" ? "도심을 떠나지 않되 평수와 관리비를 줄인다" :
        spec.key === "seoul_west" ? "서울 근접성은 유지한 채 의료와 비용을 다시 계산한다" :
        spec.key === "seoul_north" ? "병원·지하철 접근성을 지키며 작게 옮긴다" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 병원과 백화점 인프라를 먼저 본다" :
        spec.key === "tech_bundang" || spec.key === "tech_gwanggyo" ? "잘 갖춰진 신도시 안에서 작게 줄여 간다" :
        spec.key === "tech_gwacheon" ? "강남권 의료·자녀 접근성을 유지하며 조용한 주거로 줄여 간다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "서울 접근성과 자녀 접근성을 함께 지키려 한다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "평수보다 유지비와 병원 거리를 먼저 계산한다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "더 고요한 노후 축을 찾되 의료 접근은 놓치지 않는다" :
        spec.key === "incheon_songdo" ? "바다와 의료 인프라를 같이 챙기며 작게 옮긴다" :
        spec.key === "incheon_newtown" ? "신도시의 편한 인프라 안에서 노후 생활을 다시 고른다" :
        spec.key === "incheon_oldtown" ? "의료 접근성과 생활비를 함께 보며 작게 옮긴다" :
        spec.key === "incheon_airport" ? "공항권의 속도보다 병원과 장보기 동선을 먼저 본다" :
        "집의 체면보다 관리 쉬운 생활 구조를 더 중요하게 본다",
      quote: "이제는 " + region.name + "에서 얼마나 오래 편하게 버틸 수 있는지가 더 중요해 보여요.",
      tags: ["시니어", tag],
    },
    return_local: {
      name:
        spec.key === "seoul_core" ? "서울 코어 복귀형" :
        spec.key === "seoul_cbd" ? "도심 복귀형" :
        spec.key === "seoul_west" ? "서남권 복귀형" :
        spec.key === "seoul_north" ? "서울 재진입 복귀형" :
        spec.key === "gyeonggi_suwon" ? "수원권 복귀형" :
        spec.key === "tech_bundang" ? "테크벨트 복귀형" :
        spec.key === "tech_gwacheon" ? "과천 생활권 복귀형" :
        spec.key === "tech_gwanggyo" ? "광역 신도시 복귀형" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "광역축 복귀형" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "산단권 복귀형" :
        spec.key === "county_river" || spec.key === "county_plain" ? "생활권 회귀형" :
        spec.key === "incheon_songdo" ? "인천 신도시 복귀형" :
        spec.key === "incheon_newtown" ? "인천 복귀형" :
        spec.key === "incheon_oldtown" ? "인천 생활권 회귀형" :
        spec.key === "incheon_airport" ? "공항권 복귀형" :
        "광역권 복귀형",
      tagline:
        spec.key === "seoul_core" ? "서울 코어 밖으로 밀려나기보다 다시 핵심 생활권으로 붙고 싶어 한다" :
        spec.key === "seoul_cbd" ? "외곽 생활을 접고 다시 도심 생활권으로 붙는다" :
        spec.key === "seoul_west" ? "서울 서남권 안에서 익숙한 축으로 되돌아오려 한다" :
        spec.key === "seoul_north" ? "서울 밖으로 밀려났다가 다시 서울 외곽권으로 복귀한다" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 익숙한 도시 리듬으로 되돌아온다" :
        spec.key === "tech_bundang" || spec.key === "tech_gwanggyo" ? "서울 밖에서도 더 정돈된 생활권으로 다시 들어온다" :
        spec.key === "tech_gwacheon" ? "서울을 완전히 떠나지 않는 감각으로 과천 생활권에 다시 붙는다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "서울 바깥에 남되 교통 좋은 축으로 복귀한다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "익숙한 산업도시 축으로 다시 생활을 맞춘다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "멀리 돌고 돌아도 결국 익숙한 거점으로 되돌아온다" :
        spec.key === "incheon_songdo" ? "서울을 접고도 너무 낡지 않은 인천 신도시로 되돌아온다" :
        spec.key === "incheon_newtown" ? "복귀라 해도 더 정돈된 인천 신도시 축을 고른다" :
        spec.key === "incheon_oldtown" ? "멀리 돌아도 결국 익숙한 인천 생활권으로 다시 붙는다" :
        spec.key === "incheon_airport" ? "공항과 본토를 잇는 익숙한 생활권으로 돌아온다" :
        "후퇴라기보다, 생활비와 리듬을 다시 맞추는 복귀를 선택한다",
      quote: region.name + "으로 돌아온다는 건, 후퇴가 아니라 다시 버틸 수 있는 생활권을 찾는 일 같아요.",
      tags: ["복귀", tag],
    },
    young_investor: {
      name:
        spec.key === "seoul_core" ? "코어 입지 베팅 청년" :
        spec.key === "seoul_cbd" ? "도심 간극 투자청년" :
        spec.key === "seoul_west" ? "서남권 역세권 베팅 청년" :
        spec.key === "seoul_north" ? "역세권 틈새 투자청년" :
        spec.key === "gyeonggi_suwon" ? "수원 생활권 투자청년" :
        spec.key === "tech_bundang" ? "판교축 투자청년" :
        spec.key === "tech_gwacheon" ? "과천 진입권 실수요자" :
        spec.key === "tech_gwanggyo" ? "광교축 투자청년" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "GTX 선점 투자청년" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "택지호재 추적 청년" :
        spec.key === "county_river" || spec.key === "county_plain" ? "거점 탐색 투자청년" :
        spec.key === "incheon_songdo" ? "국제도시 호재 청년" :
        spec.key === "incheon_newtown" ? "노선 기대 투자청년" :
        spec.key === "incheon_oldtown" ? "간극 베팅 투자청년" :
        spec.key === "incheon_airport" ? "공항권 투자청년" :
        "호재 추적 투자청년",
      tagline:
        spec.key === "seoul_core" ? "서울 코어 안의 다음 자산 위계와 가격 간극을 먼저 본다" :
        spec.key === "seoul_cbd" ? "도심 안의 가격 간극과 다음 사이클을 먼저 본다" :
        spec.key === "seoul_west" ? "마곡·여의도 축의 다음 가격 반응을 노린다" :
        spec.key === "seoul_north" ? "서울 외곽 안에서 덜 오른 역세권을 먼저 본다" :
        spec.key === "gyeonggi_suwon" ? "수원권 안에서 다음 생활권 상향 구간을 노린다" :
        spec.key === "tech_bundang" || spec.key === "tech_gwanggyo" ? "테크벨트 안의 다음 가격 점프를 찾는다" :
        spec.key === "tech_gwacheon" ? "투기보다 과천 안에 남을 수 있는 진입 가능성을 먼저 본다" :
        spec.key === "gtx_west" || spec.key === "gtx_east" ? "GTX와 환승 호재가 만나는 지점을 먼저 잡는다" :
        spec.key === "industrial_west" || spec.key === "industrial_east" ? "택지 확장과 산단 수요가 만나는 곳에 베팅한다" :
        spec.key === "county_river" || spec.key === "county_plain" ? "사람들이 늦게 보는 외곽 거점을 먼저 본다" :
        spec.key === "incheon_songdo" ? "국제도시 스토리와 교통 기대감이 만나는 곳에 베팅한다" :
        spec.key === "incheon_newtown" ? "청라·검단·영종처럼 기대감이 먼저 움직이는 축을 본다" :
        spec.key === "incheon_oldtown" ? "인천 안의 신구 생활권 간 가격 간극을 먼저 본다" :
        spec.key === "incheon_airport" ? "공항권과 본토 연결의 가격 차이를 먼저 본다" :
        "실거주보다도 다음 가격 곡선이 먼저 꺾일 자리를 찾는다",
      quote: region.name + " 안에서도 사람들이 늦게 보기 시작하는 가격 차이를 먼저 보고 들어가고 싶어요.",
      tags: ["청년", tag],
    },
  };
  return byId[id] || null;
}

const REGIONAL_PERSONA_OVERRIDES = {
  gangnam: {
    steady_family: {
      name: "대치 학군 유지 가족",
      tagline: "사교육 반경을 벗어나지 않고 평형과 단지 위계를 다시 계산한다",
      quote: "강남 안에서도 어느 학군 라인에 붙어 있느냐가 결국 다음 집을 바꾸더라고요.",
      tags: ["가족", "학군", "대치", "실거주"],
    },
    upward_worker: {
      name: "테헤란로 10년차 매니저",
      tagline: "직장과 주소, 자산 위계를 동시에 잃지 않는 코어 이동을 본다",
      quote: "출근은 이미 코어라서, 다음 집은 같은 강남 안에서 어느 격으로 옮길지가 문제예요.",
      tags: ["직장인", "테헤란로", "갈아타기", "코어"],
    },
    first_home: {
      name: "가족 보조 진입 부부",
      tagline: "완전한 자력보다 지원 자금과 대출을 섞어 코어 진입의 문을 계산한다",
      quote: "강남 첫 집은 독립적인 첫 집이라기보다, 집안 자원을 어떻게 묶느냐의 문제에 가까워요.",
      tags: ["첫 매수", "가족 보조", "실수요", "진입"],
    },
    upgrade_owner: {
      name: "압구정·대치 갈아타기 보유자",
      tagline: "같은 강남 안에서도 단지, 학군, 재건축의 마지막 위계를 다시 잰다",
      quote: "강남 안에 있다는 사실보다, 강남 안의 어느 라인에 있느냐가 더 중요해졌어요.",
      tags: ["보유자", "압구정", "대치", "상향"],
    },
    lifestyle_dink: {
      name: "청담 라이프 DINK",
      tagline: "집값보다 동네의 신호와 소비 동선, 일상의 결을 더 민감하게 본다",
      quote: "강남에서도 어디서 시간을 보내는지가 결국 내가 누구처럼 사는지를 정해요.",
      tags: ["DINK", "청담", "라이프스타일", "취향"],
    },
    retiring_senior: {
      name: "강남 자산 정리 시니어",
      tagline: "코어 주소는 지키되 관리가 쉬운 평형으로 옮기며 현금흐름을 다시 만든다",
      quote: "이제는 더 넓은 집보다, 강남 안에서 얼마나 편하게 오래 버틸 수 있는지가 중요해요.",
      tags: ["시니어", "다운사이징", "자산 정리", "강남"],
    },
    return_local: {
      name: "강남 복귀 전문직",
      tagline: "한 번 코어를 떠났다가도 결국 생활 반경과 네트워크를 다시 강남으로 붙인다",
      quote: "밖에 나가 보니 생활은 쉬워졌는데, 결국 일과 인맥은 다시 강남으로 끌어당기더라고요.",
      tags: ["복귀", "전문직", "강남", "재정착"],
    },
    young_investor: {
      name: "진입권 선점 실수요자",
      tagline: "단기 차익보다 언젠가 강남 안에 남을 수 있는 진입권 자체를 자산처럼 본다",
      quote: "강남에선 투자라기보다, 나중에라도 남아 있을 자격을 미리 사는 느낌이 더 커요.",
      tags: ["실수요", "진입권", "장기 보유", "자산"],
    },
  },
  seocho: {
    steady_family: {
      name: "반포 학군 방어 가족",
      tagline: "학군과 대단지, 한강 접근을 함께 놓치지 않는 쪽으로 다시 계산한다",
      quote: "서초에선 학교 하나보다도 어떤 단지 라인에 붙어 있느냐가 더 오래 갑니다.",
      tags: ["가족", "반포", "학군", "실거주"],
    },
    upward_worker: {
      name: "법조타운 핵심 직장인",
      tagline: "직주근접보다도 서초 안의 코어 생활 반경을 유지할 수 있는지 먼저 본다",
      quote: "출근은 이미 가깝고, 그다음부터는 어느 주소가 내 생활의 격을 지켜주느냐가 문제예요.",
      tags: ["직장인", "서초", "코어", "갈아타기"],
    },
    first_home: {
      name: "서초 진입 준비 부부",
      tagline: "현금과 대출, 가족 자원을 모두 묶어 코어 첫 진입선을 계산한다",
      quote: "서초 첫 집은 보통 신혼의 문제라기보다, 집안 전체 자산 구조의 문제에 가까워요.",
      tags: ["첫 매수", "코어 진입", "신혼", "지원 자금"],
    },
    upgrade_owner: {
      name: "반포·잠원 갈아타기 보유자",
      tagline: "같은 서초 안에서도 한강 변과 학군의 위계를 다시 고른다",
      quote: "서초 안에 오래 살수록, 그냥 서초가 아니라 어느 반포·잠원 라인인지가 중요해져요.",
      tags: ["보유자", "반포", "잠원", "상향"],
    },
    lifestyle_dink: {
      name: "서래-반포 생활 DINK",
      tagline: "동네의 소비 리듬과 강남권 생활권을 함께 즐길 수 있는 자리를 찾는다",
      quote: "서초는 조용해 보여도, 어디서 먹고 운동하고 시간을 보내느냐가 다르게 읽히는 동네예요.",
      tags: ["DINK", "서래", "반포", "라이프스타일"],
    },
    retiring_senior: {
      name: "서초 코어 축소 시니어",
      tagline: "강남권 주소는 유지한 채 관리가 쉬운 주거로 줄여 가는 은퇴층",
      quote: "멀리 나가면 편할 것 같지만, 결국 병원과 자녀 반경을 생각하면 서초 안이 제일 편해요.",
      tags: ["시니어", "다운사이징", "서초", "의료 접근"],
    },
    return_local: {
      name: "반포 복귀형 전문직",
      tagline: "외곽으로 나갔다가도 결국 교육과 네트워크 때문에 서초권으로 되돌아온다",
      quote: "한 번 나가 본 사람일수록, 돌아올 때 왜 다시 서초를 고르는지 더 분명해져요.",
      tags: ["복귀", "전문직", "반포", "재정착"],
    },
    young_investor: {
      name: "서초 진입 대기 실수요자",
      tagline: "코어 안의 소형이나 구축이라도 먼저 잡아 두려는 장기 진입형 수요",
      quote: "서초에서는 투자보다도, 언젠가 눌러앉을 수 있는 발판을 먼저 사두는 느낌이 강해요.",
      tags: ["실수요", "장기 진입", "소형", "구축"],
    },
  },
  yongsan: {
    steady_family: {
      name: "한남 인접 정착 가족",
      tagline: "서울 코어 접근성과 국제학교·한강 동선을 함께 본다",
      quote: "용산은 결국 집 크기보다 어느 언덕, 어느 라인에 붙어 있느냐가 더 크게 남아요.",
      tags: ["가족", "한남", "용산", "실거주"],
    },
    upward_worker: {
      name: "국제업무권 직장인",
      tagline: "도심과 강남을 모두 닿을 수 있는 중간 코어를 놓치지 않으려 한다",
      quote: "용산은 한쪽 직장에 붙는 동네가 아니라, 두 개의 도심을 동시에 쓰는 동네 같아요.",
      tags: ["직장인", "용산", "국제업무", "직주근접"],
    },
    first_home: {
      name: "한강 북단 첫 진입 부부",
      tagline: "서울 중심축을 버리지 않으면서도 감당 가능한 첫 진입선을 찾는다",
      quote: "용산 첫 집은 강남보다 덜 비싸 보여도, 실제로는 훨씬 더 복합적인 계산이 필요해요.",
      tags: ["첫 매수", "용산", "서울 코어", "실수요"],
    },
    upgrade_owner: {
      name: "한남·용산 갈아타기 보유자",
      tagline: "국제업무, 재개발, 한강 축이 만나는 다음 위계를 계산한다",
      quote: "용산은 지금보다 한 칸만 올라가도, 생활과 자산의 신호가 전혀 다르게 읽히더라고요.",
      tags: ["보유자", "한남", "재개발", "상향"],
    },
    lifestyle_dink: {
      name: "한남-해방촌 라이프 DINK",
      tagline: "생활의 결, 취향 소비, 도시의 밀도를 동시에 고르는 커플",
      quote: "용산에서는 집을 고르는 게 아니라, 어떤 도시 장면 안에 살지 고르는 느낌이 들어요.",
      tags: ["DINK", "한남", "해방촌", "라이프스타일"],
    },
    retiring_senior: {
      name: "용산 자산 정리 시니어",
      tagline: "코어 주소는 지키되 너무 큰 평형은 줄이고 현금흐름을 다시 짠다",
      quote: "용산은 떠나기 어려운 동네라기보다, 작게 남는 방식이 더 중요한 동네예요.",
      tags: ["시니어", "다운사이징", "용산", "한강"],
    },
    return_local: {
      name: "용산 복귀 전문직",
      tagline: "외곽 생활을 접고 다시 서울 코어의 중간 지점으로 붙는다",
      quote: "돌아와 보니 용산이 가장 비싼 게 아니라, 제일 대체하기 어려운 자리였어요.",
      tags: ["복귀", "전문직", "용산", "재정착"],
    },
    young_investor: {
      name: "재개발 축 선점 실수요자",
      tagline: "단기 차익보다도 용산 재편 축에 미리 발을 올려두려는 수요",
      quote: "용산은 당장 버는 투자보다, 앞으로 어디가 중심이 될지에 미리 올라타는 쪽에 가까워요.",
      tags: ["실수요", "재개발", "용산", "장기"],
    },
  },
  songpa: {
    steady_family: {
      name: "잠실 학군 방어 가족",
      tagline: "대단지와 학군, 생활 인프라를 함께 놓치지 않는 방향으로 움직인다",
      quote: "송파는 학군 하나만이 아니라 단지와 병원, 쇼핑몰까지 묶인 생활권 전체를 옮기는 일이에요.",
      tags: ["가족", "잠실", "학군", "대단지"],
    },
    upward_worker: {
      name: "잠실-문정 직장인",
      tagline: "강남 접근성과 송파 안의 주거 안정성을 동시에 보려 한다",
      quote: "송파에서는 강남으로 가는 시간보다, 송파 안에서 어디에 사느냐가 출근만큼 중요해요.",
      tags: ["직장인", "송파", "문정", "출퇴근"],
    },
    first_home: {
      name: "송파 첫 진입 부부",
      tagline: "서울 안에서 가족 생활을 바로 시작할 수 있는 첫 집을 찾는다",
      quote: "송파 첫 집은 나중에 갈아타기 위한 시작이기도 하지만, 처음부터 완성형 가족 도시를 산다는 의미도 있어요.",
      tags: ["첫 매수", "송파", "신혼", "실거주"],
    },
    upgrade_owner: {
      name: "잠실·오륜 갈아타기 보유자",
      tagline: "같은 송파 안에서도 단지와 학군의 마지막 위계를 따진다",
      quote: "송파 안에 있을수록, 결국은 같은 송파 안의 어느 단지인지가 가장 크게 남아요.",
      tags: ["보유자", "잠실", "오륜", "상향"],
    },
    lifestyle_dink: {
      name: "석촌호수 라이프 DINK",
      tagline: "대단지의 안정감 속에서도 산책·운동·소비 동선의 감도를 놓치지 않는다",
      quote: "송파는 가족 도시 같지만, 생각보다 둘이서 살기 좋은 리듬도 분명한 동네예요.",
      tags: ["DINK", "석촌호수", "라이프스타일", "송파"],
    },
    retiring_senior: {
      name: "송파 대단지 다운사이저",
      tagline: "익숙한 가족 도시를 떠나지 않고 관리 쉬운 평형으로 줄여 간다",
      quote: "자녀가 떠나고 나면 송파를 떠나는 게 아니라, 송파 안에서 작아지는 쪽이 더 자연스럽더라고요.",
      tags: ["시니어", "송파", "다운사이징", "대단지"],
    },
    return_local: {
      name: "송파 복귀 가족",
      tagline: "아이 교육과 가족 지원 반경 때문에 다시 송파 생활권으로 붙는다",
      quote: "멀리 나가 보니 결국 아이랑 부모님을 같이 볼 수 있는 반경이 송파였다는 걸 알게 돼요.",
      tags: ["복귀", "가족", "송파", "재정착"],
    },
    young_investor: {
      name: "문정·가락 진입 수요자",
      tagline: "잠실 정점보다 송파 안의 다음 파급 축을 더 먼저 보는 실수요형 청년",
      quote: "송파에서는 제일 비싼 곳을 쫓기보다, 다음으로 끌어올려질 라인을 먼저 보는 게 더 현실적이에요.",
      tags: ["청년", "실수요", "문정", "가락"],
    },
  },
  seongdong: {
    steady_family: {
      name: "옥수-응봉 정착 가족",
      tagline: "한강 접근과 교육 반경, 성동의 생활 인프라를 함께 지키려 한다",
      quote: "성동은 힙함보다도 의외로 가족이 오래 버티기 좋은 구조가 더 강하게 남는 동네예요.",
      tags: ["가족", "옥수", "응봉", "실거주"],
    },
    upward_worker: {
      name: "성수 사옥 출근층",
      tagline: "사무실과 동네의 감도가 맞아떨어지는 쪽으로 한 칸씩 올라간다",
      quote: "성동에선 출근이 편한 것보다, 내가 일하는 분위기와 사는 분위기가 맞는 게 더 크게 작동해요.",
      tags: ["직장인", "성수", "직주근접", "콘텐츠"],
    },
    first_home: {
      name: "왕십리 첫 진입 부부",
      tagline: "서울 코어와 한강 라인을 놓치지 않으면서 현실적인 첫 진입선을 찾는다",
      quote: "성동 첫 집은 비싼 편이지만, 그래도 이후 갈아타기까지 생각하면 이 축을 놓치기 어렵더라고요.",
      tags: ["첫 매수", "왕십리", "성동", "실수요"],
    },
    upgrade_owner: {
      name: "성수·옥수 갈아타기 보유자",
      tagline: "같은 성동 안에서도 한강 라인과 신흥 상징축의 차이를 계산한다",
      quote: "성동은 구 안에서의 이동만으로도 자산 위계가 꽤 크게 바뀌는 동네예요.",
      tags: ["보유자", "성수", "옥수", "상향"],
    },
    lifestyle_dink: {
      name: "성수 라이프 DINK",
      tagline: "집값보다도 성수권의 감도와 소비 반경, 한강 라이프를 먼저 본다",
      quote: "성동은 결국 집을 사는 게 아니라, 어떤 라이프 장면 안에 살지 정하는 일에 가까워요.",
      tags: ["DINK", "성수", "라이프스타일", "취향"],
    },
    retiring_senior: {
      name: "한강변 축소 시니어",
      tagline: "강을 보되 평형은 줄이고, 도심 접근성은 놓치지 않는 쪽으로 움직인다",
      quote: "성동에선 완전히 떠나기보다, 강을 보면서도 관리 쉬운 쪽으로 줄여 가는 선택이 더 자연스럽죠.",
      tags: ["시니어", "한강", "다운사이징", "성동"],
    },
    return_local: {
      name: "성수권 복귀 직장인",
      tagline: "다른 동네를 돌아도 결국 일과 취향이 겹치는 성동 축으로 되돌아온다",
      quote: "성수권은 비싸도, 한 번 맞아 본 사람은 다시 비슷한 감도를 찾게 되는 동네 같아요.",
      tags: ["복귀", "직장인", "성동", "재정착"],
    },
    young_investor: {
      name: "성수 옆 간극 수요자",
      tagline: "정점인 성수보다 그 옆에서 같이 끌려 올라갈 라인을 더 먼저 본다",
      quote: "성동에서의 투자는 꼭 성수 한복판이 아니라, 성수가 퍼져 나가는 옆 선을 보는 일일 때가 많아요.",
      tags: ["청년", "성수", "간극", "실수요"],
    },
  },
  mapo: {
    steady_family: {
      name: "상암-연남 생활 가족",
      tagline: "학군보다도 직장과 문화 생활, 돌봄 반경을 함께 유지하는 쪽을 택한다",
      quote: "마포에서 가족이 산다는 건 조용한 동네보다도, 일과 생활을 동시에 굴릴 수 있는 반경을 지키는 일이에요.",
      tags: ["가족", "상암", "연남", "실거주"],
    },
    upward_worker: {
      name: "출판사 13년차 PM",
      tagline: "합정·공덕·여의도 사이에서 출근 동선과 주소의 격을 같이 본다",
      quote: "마포에 오래 있으면 서울 다른 동네보다도, 마포 안의 어느 축에 붙어 있느냐가 더 중요해져요.",
      tags: ["직장인", "출판", "PM", "마포"],
    },
    first_home: {
      name: "마포 잔류 첫 매수층",
      tagline: "서울 안에서 취향과 생활 반경을 포기하지 않는 첫 집을 찾는다",
      quote: "마포 첫 집은 돈의 문제이기도 하지만, 내가 어떤 일상 안에 남고 싶은지의 문제이기도 해요.",
      tags: ["첫 매수", "마포", "실수요", "취향"],
    },
    upgrade_owner: {
      name: "합정·공덕 갈아타기 보유자",
      tagline: "마포 안에서 더 새롭고 더 상징적인 생활 축으로 한 칸씩 옮긴다",
      quote: "마포에서는 같은 구 안의 이동도 생각보다 큰 갈아타기로 읽힐 때가 많아요.",
      tags: ["보유자", "합정", "공덕", "상향"],
    },
    lifestyle_dink: {
      name: "연남-합정 라이프 DINK",
      tagline: "집값보다 취향 소비와 도시의 리듬이 먼저 작동하는 커플",
      quote: "마포는 결국 면적이 아니라, 어떤 밤과 어떤 주말을 살고 싶은지가 더 중요해지는 동네예요.",
      tags: ["DINK", "연남", "합정", "라이프스타일"],
    },
    retiring_senior: {
      name: "마포 생활 축소 시니어",
      tagline: "서울 안에서 문화와 병원 접근을 유지한 채 관리 쉬운 집으로 줄여 간다",
      quote: "마포는 젊은 동네 같지만, 오래 살수록 도심 접근성과 병원 반경 때문에 떠나기 어렵기도 해요.",
      tags: ["시니어", "마포", "다운사이징", "도심 접근"],
    },
    return_local: {
      name: "마포 복귀 실무자",
      tagline: "한동안 외곽에 있다가도 결국 일과 인간관계가 남아 있는 마포권으로 돌아온다",
      quote: "마포는 비싸도 다시 돌아오고 싶어지는 이유가 분명한 동네예요. 일하는 방식 자체가 거기 묶여 있거든요.",
      tags: ["복귀", "마포", "재정착", "실무자"],
    },
    young_investor: {
      name: "홍대권 소형 수요자",
      tagline: "완전한 투자보다 홍대·합정 축 근처에 작은 자리라도 먼저 발을 올려두려 한다",
      quote: "마포에선 순수 투자보다도, 언젠가 눌러앉을 수 있는 가능성을 먼저 사두는 사람이 많아요.",
      tags: ["청년", "홍대권", "소형", "실수요"],
    },
  },
};

const GENERIC_PERSONA_ROLE_SETS = {
  seoul_core: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
    "retiring_senior",
  ],
  seoul_edge: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
    "young_investor",
  ],
  gyeonggi_tech: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
    "young_investor",
  ],
  gyeonggi_gtx: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "young_investor",
  ],
  gyeonggi_industrial: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "young_investor",
  ],
  gyeonggi_commuter: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
  ],
  gyeonggi_county: [
    "steady_family",
    "upward_worker",
    "first_home",
    "retiring_senior",
    "return_local",
  ],
  gyeonggi_rural: [
    "steady_family",
    "upward_worker",
    "first_home",
    "retiring_senior",
    "return_local",
  ],
  incheon_newtown_plus: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
    "retiring_senior",
  ],
  incheon_newtown: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
  ],
  incheon_oldtown: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "retiring_senior",
  ],
  incheon_mixed: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "retiring_senior",
  ],
  incheon_island: [
    "steady_family",
    "upward_worker",
    "first_home",
    "lifestyle_dink",
    "return_local",
  ],
  default: [
    "steady_family",
    "upward_worker",
    "first_home",
    "upgrade_owner",
    "lifestyle_dink",
  ],
};

function genericPersonaRoleIds(profile, flavor, spec) {
  if (spec && spec.key === "tech_gwacheon") {
    return [
      "steady_family",
      "upward_worker",
      "first_home",
      "upgrade_owner",
      "retiring_senior",
    ];
  }
  return GENERIC_PERSONA_ROLE_SETS[flavor] || GENERIC_PERSONA_ROLE_SETS[profile] || GENERIC_PERSONA_ROLE_SETS.default;
}

function buildGenericPersonas(region) {
  var profile = genericPersonaProfile(region);
  var variant = GENERIC_PERSONA_VARIANTS[profile] || GENERIC_PERSONA_VARIANTS.gyeonggi_commuter;
  var flavor = genericPersonaFlavor(region, profile);
  var flavorVariant = GENERIC_PERSONA_FLAVOR_OVERRIDES[flavor] || null;
  var contextSpec = genericPersonaContextSpec(region, flavor);
  var regionalOverrides = REGIONAL_PERSONA_OVERRIDES[region.id] || null;
  var roleLookup = new Set(genericPersonaRoleIds(profile, flavor, contextSpec));
  return PERSONAS.__generic.filter(function(base){
    return roleLookup.has(base.id);
  }).map(function(base){
    var o = variant[base.id] || {};
    var f = flavorVariant && flavorVariant[base.id] ? flavorVariant[base.id] : {};
    var c = contextualPersonaCopy(base.id, region, contextSpec) || {};
    var r = regionalOverrides && regionalOverrides[base.id] ? regionalOverrides[base.id] : {};
    if (profile === "incheon_island" && o.name) {
      c = {};
    }
    return {
      id: base.id,
      emoji: r.emoji || f.emoji || o.emoji || base.emoji,
      name: r.name || c.name || f.name || o.name || base.name,
      tagline: r.tagline || c.tagline || f.tagline || o.tagline || base.tagline,
      quote: r.quote || c.quote || f.quote || o.quote || base.quote,
      tags: (r.tags || c.tags || []).concat(f.tags || o.tags || base.tags),
    };
  });
}

/* ============================================================
   REPORTS — distinct destinations + narratives per (region, persona)
   Helper to factor out boilerplate.
   ============================================================ */
function dest(role, name, category, score, desc, metrics, narrative, extra) {
  const labels = {
    peer: { roleLabel:"PEER VIEW", roleKr:"현실 후보" },
    up:   { roleLabel:"UPWARD STEP", roleKr:"갈 법한 상향지" },
    down: { roleLabel:"DOWN SHIFT", roleKr:"현실 타협" },
    wish: { roleLabel:"WISH REACHABLE", roleKr:"가보고 싶은 곳" },
    wishcore: { roleLabel:"WISH CORE", roleKr:"핵심 욕망" },
  };
  return { id: name, role, ...labels[role], name, category, score, desc, metrics, narrative, ...(extra || {}) };
}

const REPORTS = {
  /* ─────────────── 마포 ─────────────── */
  mapo: {
    publisher: { destinations: [
      dest("peer","합정","현재 동네 안의 다음 자리",78,
        "지금의 생활 반경을 거의 그대로 유지하면서 한 칸 위로 올라가는 가장 현실적인 선택지.",
        { desire:64, mobility:72, policy:81, priceGap:{value:"+1.4억",pct:11,dir:"up"}, pricePsm:"5,820만/㎡", ltv:"안정", timeline:"6–12개월", commute:"−4분" },
        { title:"<em>익숙함</em>의 이름으로 한 칸 더",
          paragraphs:[
            "<span class='hl'>합정은 마포구 안에서의 미세한 상승</span>이다. 직장과 동선, 금요일 밤의 술집, 토요일 아침의 빵집까지 모두 유지된다. 페르소나의 의사결정에서 리스크가 가장 낮은 후보.",
            "다만 합정의 신축 평형은 마포 중심부 구축과 가격 분리가 시작되는 지점이다. 1.4억의 격차는 LTV 한도 안에서 흡수 가능하지만, 자녀 학령기 진입과 동시에 결심해야 한다." ],
          pull:{ q:"한 정거장만 옮기는 일이, 가장 어려운 일일 수도 있다.", cite:"에디터 노트 · 합정" } }),
      dest("up","성수","동시대 자산의 다음 챕터",86,
        "마포의 미디어 DNA가 자연스럽게 다음 단계로 흘러가는 자리. 한강을 건너지 않고도 도시의 격을 한 단계 올린다.",
        { desire:88, mobility:54, policy:62, priceGap:{value:"+5.2억",pct:38,dir:"up"}, pricePsm:"7,940만/㎡", ltv:"압박", timeline:"18–36개월", commute:"+11분" },
        { title:"<em>가능성</em>의 이름으로 강을 따라 동쪽",
          paragraphs:[
            "성수는 마포 페르소나가 가장 자주 떠올리는 단어다. 같은 한강 라인, 같은 크리에이티브 산업, 그러나 <span class='hl'>한 단계 위의 가격대와 한 단계 위의 사회적 신호</span>.",
            "이동가능성 점수는 중간(54). 자기자본 격차는 분명하지만, 24–36개월 내 자산 재편 시 가장 자연스러운 동선." ],
          pull:{ q:"성수는 마포의 다음 페이지처럼 읽힌다.", cite:"에디터 노트 · 성수" } }),
      dest("wish","한남","끝까지 가보고 싶은 동네",94,
        "지금 당장의 현실적 선택은 아니지만, 의사결정의 가장 깊은 곳에서 작동하는 좌표. 가격이 아니라 정체성이 기준이 되는 자리.",
        { desire:97, mobility:22, policy:41, priceGap:{value:"+18.6억",pct:135,dir:"up"}, pricePsm:"1.34억/㎡", ltv:"불가", timeline:"60개월+", commute:"+18분" },
        { title:"<em>끝까지 가보고 싶은</em> 동네",
          paragraphs:[
            "한남은 자산 데이터에서 가장 멀리 있는 점이지만, 욕망 점수에서는 가장 가깝다. <span class='hl'>가격이 아니라 정체성이 기준이 되는 자리</span>.",
            "이동가능성 22점. 단순 매수 시나리오로는 도달이 어렵다. 다만 다른 두 후보를 평가할 때 보이지 않는 기준점으로 작동한다. 한남은 결과가 아니라 좌표다." ],
          pull:{ q:"갈 수 없는 동네가, 갈 수 있는 동네의 가격을 결정한다.", cite:"에디터 노트 · 한남" } }),
    ]},
  },

  /* ─────────────── 송파 ─────────────── */
  songpa: {
    "jamsil-mom": { destinations: [
      dest("peer","문정","학원 동선을 깨지 않는 한 칸",74,
        "잠실 학원가를 그대로 유지하면서 단지 평수만 키울 수 있는 자리. 같은 송파 안에서 움직이는 가장 보수적인 선택.",
        { desire:62, mobility:78, policy:74, priceGap:{value:"+0.9억",pct:6,dir:"up"}, pricePsm:"6,100만/㎡", ltv:"안정", timeline:"6–9개월", commute:"−2분" },
        { title:"<em>학원 동선</em>은 깨지 않는다",
          paragraphs:[
            "<span class='hl'>잠실에서 문정으로의 이동은 송파 안에서의 미세 조정</span>이다. 학원가는 그대로, 단지 노후도와 평수만 다음 단계로 옮긴다.",
            "송파 안에서 가족 단위 매수자가 가장 합리적으로 선택하는 경로. 자녀 학령기와 매수 사이클이 일치할 때 실행 확률이 가장 높다." ],
          pull:{ q:"학원가 반경을 유지한 채로 평수만 늘린다.", cite:"에디터 노트 · 문정" } }),
      dest("up","대치","학군의 본진으로 건너가는 일",89,
        "송파 학부모가 가장 자주 호명하는 다음 좌표. 같은 자녀를 두고도 학군의 격이 한 단계 올라가는 자리.",
        { desire:91, mobility:48, policy:53, priceGap:{value:"+8.4억",pct:42,dir:"up"}, pricePsm:"9,180만/㎡", ltv:"압박", timeline:"18–30개월", commute:"+7분" },
        { title:"<em>학군의 본진</em>으로",
          paragraphs:[
            "송파 학부모에게 대치는 가까운 듯 멀다. 한 정거장 차이지만 <span class='hl'>학군의 위계와 가격의 위계가 동시에 다른</span> 동네.",
            "이동가능성 48점. 자녀 입시 사이클과 학군 진입 타이밍이 맞물려야 실행된다. 잘못된 타이밍의 매수는 자녀에게도 가족에게도 손해." ],
          pull:{ q:"같은 자녀에게 다른 학군을 주는 일.", cite:"에디터 노트 · 대치" } }),
      dest("wish","압구정","마지막으로 한 번 더 올라간다",95,
        "학군과 자산의 마지막 페이지. 송파 학부모의 의사결정 깊은 곳에 놓인 좌표.",
        { desire:96, mobility:18, policy:36, priceGap:{value:"+22.3억",pct:138,dir:"up"}, pricePsm:"1.52억/㎡", ltv:"불가", timeline:"60개월+", commute:"+12분" },
        { title:"<em>마지막 한 번</em>의 매수",
          paragraphs:[
            "압구정은 송파 학부모의 의사결정 가장 깊은 곳에 놓인 좌표. <span class='hl'>학군이 끝난 뒤에도 자산으로 남는 자리</span>.",
            "이동가능성 18점. 단순 매수로는 불가. 자산 정리·증여·재건축 사이클 모두를 고려해야 도달 가능한 지점." ],
          pull:{ q:"학군이 끝나도 남는 자리가, 자산이 된다.", cite:"에디터 노트 · 압구정" } }),
    ]},
  },

  /* ─────────────── 성동 ─────────────── */
  seongdong: {
    "seongsu-pm": { destinations: [
      dest("peer","왕십리","일과 거주의 균형이 유지되는 자리",76,
        "성수 사옥 출퇴근을 그대로 유지하면서 가격 부담만 한 단계 낮추는 동선. 성동 안에서 움직이는 가장 안정적인 후보.",
        { desire:60, mobility:81, policy:78, priceGap:{value:"−0.6억",pct:-4,dir:"down"}, pricePsm:"6,420만/㎡", ltv:"여유", timeline:"3–9개월", commute:"+3분" },
        { title:"<em>도시의 코어</em>로 한 발",
          paragraphs:[
            "왕십리는 성수의 사옥 라인을 유지하면서 가격은 살짝 내려가는 자리. <span class='hl'>일과 집의 거리가 거의 그대로</span>인 채로 자산 구조만 바꾸는 후보.",
            "성수 거주자가 가장 자주 검토하는 백업 옵션. 직주근접을 잃지 않는 선에서 자기자본의 여유를 만든다." ],
          pull:{ q:"움직이는 게 아니라, 다시 자리를 잡는 일.", cite:"에디터 노트 · 왕십리" } }),
      dest("up","한남","강 건너로의 한 칸",90,
        "성수에서 한강을 건너 강남쪽 동선을 잡는 가장 자연스러운 다음 페이지.",
        { desire:92, mobility:38, policy:48, priceGap:{value:"+11.8억",pct:78,dir:"up"}, pricePsm:"1.18억/㎡", ltv:"압박", timeline:"30–48개월", commute:"+9분" },
        { title:"<em>강 건너의 거실</em>",
          paragraphs:[
            "성수 페르소나에게 한남은 가장 자주 호명되는 다음 좌표. <span class='hl'>같은 한강 라인이지만 강의 다른 쪽</span>이라는 사실이 만드는 사회적 격차.",
            "이동가능성 38점. 자기자본 격차가 크고, 사옥과 거주의 분리가 본격화되는 시점." ],
          pull:{ q:"한강을 매일 건너는 일이 곧 정체성이 된다.", cite:"에디터 노트 · 한남" } }),
      dest("wish","청담","끝까지 가본다면",94,
        "성수의 라이프스타일을 가장 비슷한 밀도로 받아주면서 가격은 가장 멀리 있는 좌표.",
        { desire:95, mobility:20, policy:34, priceGap:{value:"+19.2억",pct:128,dir:"up"}, pricePsm:"1.46억/㎡", ltv:"불가", timeline:"60개월+", commute:"+13분" },
        { title:"<em>가장 비슷한 밀도</em>의 가장 먼 자리",
          paragraphs:[
            "청담은 성수의 카페·갤러리·패션 밀도를 거의 그대로 받지만, <span class='hl'>가격은 한참 떨어져 있다</span>. 라이프스타일은 같지만 자산은 다르다.",
            "이동가능성 20점. 매수 시나리오는 거의 불가에 가깝고, 욕망의 좌표로 더 자주 작동한다." ],
          pull:{ q:"비슷한 풍경의 가장 먼 가격.", cite:"에디터 노트 · 청담" } }),
    ]},
  },

  /* ─────────────── 강동 ─────────────── */
  gangdong: {
    "godeok-newbuild": { destinations: [
      dest("peer","둔촌","같은 권역의 신축 두 번째",80,
        "고덕에서 둔촌(올림픽파크포레온)으로의 이동은 같은 강동권 안의 신축 갈아타기. 9호선 동선을 유지하면서 단지의 격만 한 단계 올린다.",
        { desire:72, mobility:74, policy:71, priceGap:{value:"+2.8억",pct:18,dir:"up"}, pricePsm:"5,640만/㎡", ltv:"안정", timeline:"9–18개월", commute:"−2분" },
        { title:"<em>신축 다음의 신축</em>",
          paragraphs:[
            "고덕 신축의 단맛을 본 가족에게 둔촌은 자연스러운 다음 페이지. <span class='hl'>같은 권역, 같은 9호선, 그러나 다른 단지의 무게</span>.",
            "강동 안에서 일어나는 가장 빈번한 갈아타기 시나리오. 자녀 학령기와 사이클이 맞물릴 때 실행 확률이 가장 높다." ],
          pull:{ q:"신축은 한 번 살면 다시 못 돌아간다.", cite:"에디터 노트 · 둔촌" } }),
      dest("up","송파(헬리오시티)","대단지의 다음 위계로",84,
        "강동의 신축 가족이 가장 자주 그리는 다음 자리. 9호선 라인을 그대로 두고 송파권으로 한 단계 올라간다.",
        { desire:86, mobility:52, policy:58, priceGap:{value:"+6.4억",pct:38,dir:"up"}, pricePsm:"7,180만/㎡", ltv:"압박", timeline:"24–36개월", commute:"+5분" },
        { title:"<em>송파의 무게</em>를 시도한다",
          paragraphs:[
            "강동 신축 가족에게 헬리오시티는 같은 노선 위의 다른 위계. <span class='hl'>같은 9호선이지만 학군과 인프라의 무게가 다르다</span>.",
            "이동가능성 52점. 24–36개월 내 자산 재편이 가능한 가족에게 가장 현실적인 상향 후보." ],
          pull:{ q:"같은 노선 위에 다른 위계가 있다.", cite:"에디터 노트 · 헬리오시티" } }),
      dest("wish","잠실(엘리트)","다음 사이클의 마지막 매수",92,
        "강동 신축 가족의 의사결정 가장 깊은 곳에 놓인 좌표. 학군과 자산의 마지막 매수.",
        { desire:93, mobility:24, policy:42, priceGap:{value:"+14.6억",pct:88,dir:"up"}, pricePsm:"1.04억/㎡", ltv:"불가", timeline:"48개월+", commute:"+8분" },
        { title:"<em>마지막 매수</em>로서의 잠실",
          paragraphs:[
            "잠실 엘·리·트는 강동 가족이 다음 사이클의 마지막 매수 후보로 자주 호명한다. <span class='hl'>학군과 자산이 동시에 끝나는 자리</span>.",
            "이동가능성 24점. 자기자본만으로는 어렵고, 강동 자산 전부를 정리하는 시나리오에서 가능." ],
          pull:{ q:"한 번 더 위로, 그리고 마지막으로.", cite:"에디터 노트 · 잠실" } }),
    ]},
  },

  /* ─────────────── 분당 ─────────────── */
  "gyeonggi-31023": {
    "pangyo-eng": { destinations: [
      dest("peer","서현","분당 안의 미세 조정",75,
        "정자에서 서현으로의 이동은 분당 안에서의 작은 상향. 학원가와 판교 출근 동선을 모두 유지한다.",
        { desire:64, mobility:80, policy:73, priceGap:{value:"+1.1억",pct:9,dir:"up"}, pricePsm:"5,140만/㎡", ltv:"안정", timeline:"6–12개월", commute:"+2분" },
        { title:"<em>분당 안</em>에서의 한 칸",
          paragraphs:[
            "서현은 판교 통근과 학원가를 유지하면서 단지 노후도와 평수만 한 단계 옮기는 자리. <span class='hl'>분당 페르소나의 가장 보수적인 갈아타기</span>.",
            "재건축 사이클이 본격화되기 전, 신축 비중이 높은 단지로 미리 자리를 잡는 시나리오." ],
          pull:{ q:"분당을 떠나지 않고도 한 칸 위로.", cite:"에디터 노트 · 서현" } }),
      dest("up","판교 백현","테크의 본진으로",87,
        "판교역 도보권. 회사와 집의 거리를 분 단위로 줄이는 자리.",
        { desire:90, mobility:46, policy:58, priceGap:{value:"+6.8억",pct:42,dir:"up"}, pricePsm:"8,940만/㎡", ltv:"압박", timeline:"18–30개월", commute:"−18분" },
        { title:"<em>회사 옆에 산다</em>",
          paragraphs:[
            "백현은 판교 엔지니어가 가장 자주 호명하는 다음 좌표. <span class='hl'>회사와 집의 거리가 분 단위로 좁혀지는</span> 동네.",
            "자기자본 격차는 크지만, 통근 비용과 시간 가치를 함께 계산하면 실행 가능 구간." ],
          pull:{ q:"통근이 없는 도시에 들어간다.", cite:"에디터 노트 · 백현" } }),
      dest("wish","압구정·도곡","강남으로의 도약",93,
        "분당 페르소나가 마지막에 그리는 좌표. 가격이 아니라 격이 기준이 되는 자리.",
        { desire:94, mobility:22, policy:38, priceGap:{value:"+17.4억",pct:108,dir:"up"}, pricePsm:"1.48억/㎡", ltv:"불가", timeline:"60개월+", commute:"+22분" },
        { title:"<em>강남으로의 도약</em>",
          paragraphs:[
            "분당이 끝나는 자리에서 강남이 시작된다. <span class='hl'>분당의 가족형 안정감이 끝나고, 도곡·압구정의 학군과 자산이 시작되는 좌표</span>.",
            "이동가능성 22점. 자녀 학령기와 자산 정리 사이클이 동시에 맞아야 가능." ],
          pull:{ q:"가격이 아니라 격이 기준이 되는 자리.", cite:"에디터 노트 · 강남" } }),
    ]},
  },

  /* ─────────────── 영통(광교) ─────────────── */
  "gyeonggi-31014": {
    "samsung-eng": { destinations: [
      dest("peer","광교중앙","호수공원 옆 신축",74,
        "매탄에서 광교중앙으로의 이동. 회사 통근 동선은 그대로, 단지의 격만 한 단계 위로.",
        { desire:66, mobility:79, policy:75, priceGap:{value:"+0.8억",pct:9,dir:"up"}, pricePsm:"3,940만/㎡", ltv:"여유", timeline:"6–12개월", commute:"+1분" },
        { title:"<em>호수공원 옆</em>의 신축",
          paragraphs:[
            "광교중앙은 영통 페르소나의 가장 빈번한 다음 자리. <span class='hl'>같은 통근, 같은 학군, 새로운 단지</span>.",
            "삼성 R&D 직장인의 매수 패턴 중 가장 빈도가 높은 시나리오. 자기자본 부담이 가장 작다." ],
          pull:{ q:"통근을 바꾸지 않고 단지를 바꾼다.", cite:"에디터 노트 · 광교중앙" } }),
      dest("up","분당 정자","한 칸 위의 도시로",83,
        "영통에서 분당 정자로의 이동. 같은 경부 라인이지만 도시의 위계가 한 단계 다르다.",
        { desire:84, mobility:50, policy:60, priceGap:{value:"+5.6억",pct:62,dir:"up"}, pricePsm:"6,720만/㎡", ltv:"압박", timeline:"24–36개월", commute:"+11분" },
        { title:"<em>분당 위계</em>로의 진입",
          paragraphs:[
            "정자는 영통 페르소나가 가장 자주 그리는 상향 좌표. <span class='hl'>같은 경부 라인, 다른 도시 위계</span>.",
            "삼성 R&D 출퇴근을 유지하면서도 분당 학군과 인프라로 진입하는 가장 자연스러운 동선." ],
          pull:{ q:"같은 라인 위에 다른 도시가 있다.", cite:"에디터 노트 · 정자" } }),
      dest("wish","서초·반포","경부 라인의 끝",91,
        "영통 페르소나의 욕망 좌표. 자녀 입시 사이클과 함께 가장 자주 호명되는 종착지.",
        { desire:93, mobility:18, policy:36, priceGap:{value:"+22.8억",pct:198,dir:"up"}, pricePsm:"1.62억/㎡", ltv:"불가", timeline:"60개월+", commute:"+34분" },
        { title:"<em>경부 라인의 끝</em>",
          paragraphs:[
            "반포는 영통 페르소나에게 같은 노선의 끝점이지만 가격은 다른 차원. <span class='hl'>학군과 자산의 마지막 페이지</span>.",
            "이동가능성 18점. 자산 정리·증여·재건축 사이클을 모두 고려해야 가능." ],
          pull:{ q:"같은 노선의 끝, 다른 차원의 가격.", cite:"에디터 노트 · 반포" } }),
    ]},
  },

  /* ─────────────── 덕양(GTX-A·창릉) ─────────────── */
  "gyeonggi-31101": {
    "gtx-commuter": { destinations: [
      dest("peer","원흥·삼송","GTX-A 효과의 다음 단지",73,
        "덕양 안에서 GTX-A 노선 효과를 유지하면서 단지만 한 단계 신축으로 옮긴다.",
        { desire:62, mobility:80, policy:76, priceGap:{value:"+0.5억",pct:7,dir:"up"}, pricePsm:"3,280만/㎡", ltv:"여유", timeline:"6–12개월", commute:"+1분" },
        { title:"<em>같은 노선</em>의 다음 단지",
          paragraphs:[
            "삼송·원흥은 GTX-A 통근자가 가장 자주 검토하는 다음 자리. <span class='hl'>노선은 그대로, 단지만 신축</span>.",
            "GTX-A 노선이 본격 운행되며 가격 분화가 진행 중. 24개월 내 매수 시 자산 가치 재평가 가능성." ],
          pull:{ q:"같은 노선이 시간을 두 번 만든다.", cite:"에디터 노트 · 삼송" } }),
      dest("up","마곡","GTX의 끝, 강서의 시작",81,
        "GTX-A 종점이자 9호선·5호선이 만나는 자리. 서울 입성을 가장 합리적으로 만드는 동선.",
        { desire:84, mobility:54, policy:62, priceGap:{value:"+4.2억",pct:54,dir:"up"}, pricePsm:"5,120만/㎡", ltv:"압박", timeline:"24–36개월", commute:"−12분" },
        { title:"<em>서울 입성</em>의 합리적 동선",
          paragraphs:[
            "마곡은 GTX-A 통근자가 자녀 입학 시점에 가장 자주 호명하는 다음 자리. <span class='hl'>경기에서 서울로 건너가는 가장 합리적인 가격대</span>.",
            "자기자본 격차는 분명하지만, 자녀 학령기와 GTX 정착 효과가 맞물리면 실행 확률이 급격히 올라간다." ],
          pull:{ q:"경기에서 서울로, 가장 짧은 점프.", cite:"에디터 노트 · 마곡" } }),
      dest("wish","상암·DMC","미디어 도시의 자리",88,
        "덕양 페르소나가 한강 라인 안쪽에서 가장 자주 그리는 욕망 좌표. 한강을 가까이 둔 서울 서북부의 다음 자리.",
        { desire:90, mobility:30, policy:48, priceGap:{value:"+8.6억",pct:112,dir:"up"}, pricePsm:"7,820만/㎡", ltv:"불가", timeline:"48개월+", commute:"−8분" },
        { title:"<em>한강 안쪽</em>으로",
          paragraphs:[
            "상암은 덕양 페르소나에게 한강 라인 안쪽의 자리. <span class='hl'>같은 서북부지만 한강을 끼고 있다는 사실</span>이 만드는 위계 차이.",
            "이동가능성 30점. 자기자본 격차와 자녀 학령기, 두 변수가 동시에 풀려야 가능한 좌표." ],
          pull:{ q:"같은 서북부, 다른 한강.", cite:"에디터 노트 · 상암" } }),
    ]},
  },

  /* ─────────────── 인천 연수(송도) ─────────────── */
  "incheon-23040": {
    "songdo-bio": { destinations: [
      dest("peer","송도 6공구","바이오 본진의 신축",72,
        "송도 안에서의 미세 조정. 같은 회사 통근, 새로운 단지.",
        { desire:60, mobility:82, policy:78, priceGap:{value:"+0.6억",pct:9,dir:"up"}, pricePsm:"3,180만/㎡", ltv:"여유", timeline:"3–9개월", commute:"+0분" },
        { title:"<em>같은 도시</em>의 새 단지",
          paragraphs:[
            "송도 6공구는 송도 거주자의 가장 자연스러운 다음 자리. <span class='hl'>회사·학교·생활권 모두 그대로</span>, 단지의 격만 한 단계 위.",
            "송도 안에서의 갈아타기는 자기자본 부담이 가장 낮고, 송도 외부로 나가지 않으려는 페르소나의 강한 선호와 일치한다." ],
          pull:{ q:"송도 안에 있어야 송도가 산다.", cite:"에디터 노트 · 6공구" } }),
      dest("up","마곡","서울 입성, 가장 짧은 거리",82,
        "GTX-B의 미래와 9호선의 현재가 만나는 자리. 송도 페르소나의 가장 빈번한 서울 입성 후보.",
        { desire:85, mobility:48, policy:56, priceGap:{value:"+5.4억",pct:78,dir:"up"}, pricePsm:"5,120만/㎡", ltv:"압박", timeline:"30–48개월", commute:"−24분" },
        { title:"<em>서울 입성</em>의 첫 자리",
          paragraphs:[
            "마곡은 송도 페르소나가 서울로 건너오는 첫 자리로 자주 호명한다. <span class='hl'>같은 9호선, 같은 직주근접 구조</span>를 받으면서 도시의 격은 다르다.",
            "이동가능성 48점. GTX-B 정착 시점과 자녀 학령기가 동시에 풀려야 실행." ],
          pull:{ q:"송도가 끝나는 자리에서 서울이 시작된다.", cite:"에디터 노트 · 마곡" } }),
      dest("wish","반포·잠원","끝까지 간다면",90,
        "송도 페르소나의 욕망 좌표. 같은 한강이지만 한참 안쪽으로 들어간 자리.",
        { desire:92, mobility:14, policy:32, priceGap:{value:"+24.6억",pct:286,dir:"up"}, pricePsm:"1.62억/㎡", ltv:"불가", timeline:"60개월+", commute:"+38분" },
        { title:"<em>같은 한강</em>의 다른 좌표",
          paragraphs:[
            "반포는 송도 페르소나에게 같은 한강이지만 다른 좌표. <span class='hl'>송도가 만드는 안정과 반포가 만드는 위계는 다른 차원의 자산</span>.",
            "이동가능성 14점. 자산 정리만으로는 어렵고, 자녀 입시·증여·자산 재편이 모두 동시에 작동해야 가능." ],
          pull:{ q:"같은 강, 다른 차원의 가격.", cite:"에디터 노트 · 반포" } }),
    ]},
  },
};

/* Generic builder: persona-trait-aware destination selection.
   Reads persona tags/tagline to detect school, commute, invest, downsize,
   lifestyle, first-buy signals and weights candidates accordingly. */
function buildGenericReport(region, persona) {
  const peerPulls = [
    "가까운 곳에서 시작하는 선택이 의외로 가장 멀리 간다. 생활 리듬을 망치지 않기 때문이다.",
    "한 정거장만 옮기는 일은 작아 보여도, 실제로는 가장 많은 계산이 들어가는 이동이다.",
    "같은 동네에서의 갈아타기는 화려하지 않지만 가장 정직한 매수에 가깝다.",
    "익숙함의 이름으로 한 칸 더 올라가는 선택은, 의외로 가장 높은 실행 확률을 가진다.",
    "통근을 바꾸지 않고 단지를 바꾸는 순간, 삶의 체감은 가격표보다 먼저 달라진다.",
    "가까운 자리는 늘 당연해서 늦게 보이지만, 실거주자는 결국 그 거리의 힘을 가장 오래 기억한다.",
    "멀리 뛰는 선택보다 지금 가진 생활권을 지키는 선택이 실제로는 더 비싼 결심일 때가 많다.",
    "현실 후보는 욕망이 약해서가 아니라, 이미 가진 생활 구조를 망치지 않는다는 점에서 강하다.",
  ];
  const upPulls = [
    "같은 노선에 있어도 위계는 전혀 다를 수 있다. 상향지는 그 작은 차이를 가장 비싸게 만든다.",
    "도시의 격이 한 단계 바뀌는 자리는 늘 멀리 있지 않다. 대개는 한 정거장 안쪽에 숨어 있다.",
    "다음 챕터는 갑자기 시작되지 않는다. 지금 생활권 바로 옆에서 먼저 모습을 드러낸다.",
    "같은 라인 위에 다른 도시가 있다는 감각이, 대부분의 상향 이동을 만든다.",
    "한 칸 위로 올라가는 일은 한 칸의 문제가 아니다. 자산, 통근, 체면이 동시에 다시 계산된다.",
    "가까운 격차가 가장 비싸다. 멀리 있는 꿈보다 옆 동네의 위계 차이가 더 자주 사람을 흔든다.",
    "상향지는 단지 더 비싼 곳이 아니라, 지금의 삶을 유지한 채 다른 신호를 얹을 수 있는 자리다.",
    "지금 살던 축을 버리지 않고도 한 단계 더 올라갈 수 있다는 확신이 생길 때, 사람들은 실제로 움직인다.",
  ];
  const wishPulls = [
    "갈 수 없는 동네가 오히려 갈 수 있는 동네의 가격과 감각을 결정한다. 욕망의 기준점이기 때문이다.",
    "여기서는 가격보다 정체성이 먼저 계산된다. 그 동네 이름이 스스로의 좌표처럼 작동한다.",
    "도달하지 않은 좌표가 모든 의사결정을 비춘다. 지금 사는 집도 결국 그 먼 점과의 거리로 읽히기 시작한다.",
    "닿지 않는 동네의 이름은 단순한 후보가 아니라, 매개자를 통해 이미 욕망된 상징처럼 남는다.",
    "끝까지 가본다면 거기에서 다시 시작될 것 같은 자리. 그래서 더 오래 마음속에 남는다.",
    "같은 강을 두고도 전혀 다른 차원의 가격이 생기는 이유는, 강이 아니라 상징의 밀도가 다르기 때문이다.",
    "위시 목적지는 매수 가능한 후보라기보다, 다른 모든 선택을 평가하게 만드는 보이지 않는 자에 가깝다.",
    "사람들은 늘 가장 비싼 곳을 욕망하는 게 아니라, 이미 누군가가 욕망하고 있는 자리를 욕망한다.",
  ];
  const downPulls = [
    "갈 수는 있지만 가고 싶지는 않은 선택도 있다. 현실 타협은 늘 계산보다 감정이 먼저 흔들린다.",
    "버티기 위해 내려가는 일도 결국 이동이다. 다만 그 이동은 꿈보다 유지비를 먼저 묻는다.",
    "현실적인 선택은 종종 마음을 거슬러 올라온다. 그래서 더 늦게 인정되고 더 오래 망설여진다.",
    "좋아서가 아니라 버틸 수 있어서 보는 동네. 그렇다고 해서 그 선택이 가볍다는 뜻은 아니다.",
    "현실 타협은 실패의 언어가 아니라, 지금 가진 리듬을 지키기 위한 비용 조정의 언어에 가깝다.",
    "내려가는 선택은 보통 숫자에서 시작하지만, 실제 결정은 체면과 리듬을 어디까지 내려놓을 수 있는지에서 갈린다.",
  ];
  var seed = (region.id + ":" + persona.id).split("").reduce(function(a,c){return a*31 + c.charCodeAt(0)|0}, 0);
  var pick = function(arr, off) { return arr[Math.abs(seed + off) % arr.length]; };

  // ── 1. Persona trait detection ──
  var sig = [persona.name, persona.tagline].concat(persona.tags || []).join(" ");
  var is_ = {
    school:   /학군|학원|자녀|학부모|아이|교육|초등|손주|돌봄/.test(sig),
    commute:  /직장인|출퇴근|통근|사옥|회사|직주|교대|출근|근접|산단|연구|R&D/.test(sig),
    invest:   /투자|갭투자|다주택|재건축|수익|사이클|소액/.test(sig),
    upgrade:  /갈아타기|보유자|상향 이동|위계|다음 집/.test(sig),
    downsize: /은퇴|다운|연금|소형|독거|시니어|노후/.test(sig),
    lifestyle:/DINK|취향|라이프|프리랜|카페|아티스트|도시 감|반려/.test(sig),
    firstBuy: /첫 매수|첫매수|예산|청년|신혼|첫 집/.test(sig),
    returnLocal: /귀향|재정착|복귀|돌아온|돌아오/.test(sig),
  };

  var wishTrait = is_.school ? "school"
    : is_.invest ? "invest"
    : is_.lifestyle ? "lifestyle"
    : is_.commute ? "commute"
    : is_.returnLocal ? "returnLocal"
    : is_.upgrade ? "upgrade"
    : is_.downsize ? "downsize"
    : is_.firstBuy ? "firstBuy"
    : "default";

  // ── 2. Area trait magnets (regex on id + name) ──
  var SCHOOL   = /gangnam|seocho|songpa|yangcheon|nowon|gyeonggi-31023|대치|목동|중계|분당|수내|잠실|서초|반포|도곡|학군/;
  var COMMUTE  = /gangnam|seocho|yeongdeungpo|mapo|seongdong|guro|^jung$|jongno|강남|여의도|판교|성수|마곡|구로디지털|테헤란/;
  var LIFESTYLE= /seongdong|mapo|yongsan|성수|합정|연남|한남|이태원|용산|청담|망원|홍대/;
  var INVEST   = /gangdong|둔촌|고덕|동탄|송도|광교|위례|창릉|신도시|3기/;

  var MICRO_WISH_CANDIDATES = [
    { id:"micro-hannam", name:"한남동", shortName:"한남동", parent:"yongsan", parentRegion:"seoul", price:27.5, dx:8, dy:-8,
      magnets:{ lifestyle:9, commute:5, school:3, invest:3, upgrade:4, default:4 } },
    { id:"micro-cheongdam", name:"청담동", shortName:"청담동", parent:"gangnam", parentRegion:"seoul", price:29.8, dx:20, dy:6,
      magnets:{ lifestyle:9, commute:6, school:3, invest:4, upgrade:5, default:4 } },
    { id:"micro-apgujeong", name:"압구정동", shortName:"압구정동", parent:"gangnam", parentRegion:"seoul", price:31.2, dx:14, dy:-4,
      magnets:{ lifestyle:6, commute:4, school:7, invest:5, upgrade:6, default:4 } },
    { id:"micro-daechi", name:"대치동", shortName:"대치동", parent:"gangnam", parentRegion:"seoul", price:28.4, dx:10, dy:16,
      magnets:{ school:10, commute:5, invest:3, upgrade:5, default:3 } },
    { id:"micro-banpo", name:"반포동", shortName:"반포동", parent:"seocho", parentRegion:"seoul", price:30.6, dx:8, dy:8,
      magnets:{ school:9, commute:5, invest:4, upgrade:6, default:4 } },
    { id:"micro-jamwon", name:"잠원동", shortName:"잠원동", parent:"seocho", parentRegion:"seoul", price:27.8, dx:4, dy:-6,
      magnets:{ school:7, lifestyle:4, commute:4, upgrade:5, default:3 } },
    { id:"micro-banpojamwon", name:"반포·잠원", shortName:"반포·잠원", parent:"seocho", parentRegion:"seoul", price:29.4, dx:6, dy:2,
      magnets:{ school:8, lifestyle:4, commute:4, upgrade:6, default:4 } },
    { id:"micro-seongsu", name:"성수동", shortName:"성수동", parent:"seongdong", parentRegion:"seoul", price:20.2, dx:10, dy:2,
      magnets:{ lifestyle:10, commute:7, upgrade:5, default:4 } },
    { id:"micro-hapjeong", name:"합정동", shortName:"합정동", parent:"mapo", parentRegion:"seoul", price:18.6, dx:-8, dy:0,
      magnets:{ lifestyle:9, commute:6, upgrade:4, default:4 } },
    { id:"micro-yeouido", name:"여의도동", shortName:"여의도동", parent:"yeongdeungpo", parentRegion:"seoul", price:21.8, dx:-2, dy:-10,
      magnets:{ commute:10, invest:4, upgrade:4, default:4 } },
    { id:"micro-mokdong", name:"목동", shortName:"목동", parent:"yangcheon", parentRegion:"seoul", price:17.2, dx:-12, dy:-4,
      magnets:{ school:10, commute:3, downsize:3, default:3 } },
    { id:"micro-junggye", name:"중계동", shortName:"중계동", parent:"nowon", parentRegion:"seoul", price:13.2, dx:10, dy:-10,
      magnets:{ school:8, default:2 } },
    { id:"micro-jeongja", name:"정자동", shortName:"정자동", parent:"gyeonggi-31023", parentRegion:"gyeonggi", price:18.4, dx:0, dy:-8,
      magnets:{ commute:6, school:7, upgrade:7, downsize:5, returnLocal:4, default:4 } },
    { id:"micro-seohyeon", name:"서현동", shortName:"서현동", parent:"gyeonggi-31023", parentRegion:"gyeonggi", price:16.7, dx:8, dy:6,
      magnets:{ school:8, commute:4, upgrade:5, default:4 } },
    { id:"micro-baekhyeon", name:"백현동", shortName:"백현동", parent:"gyeonggi-31023", parentRegion:"gyeonggi", price:20.5, dx:-8, dy:-2,
      magnets:{ commute:7, lifestyle:4, upgrade:6, default:4 } },
    { id:"micro-pangyo", name:"판교동", shortName:"판교동", parent:"gyeonggi-31023", parentRegion:"gyeonggi", price:19.4, dx:-12, dy:10,
      magnets:{ commute:8, school:6, upgrade:6, invest:3, default:4 } },
    { id:"micro-gwanggyo", name:"광교중앙", shortName:"광교중앙", parent:"gyeonggi-31014", parentRegion:"gyeonggi", price:10.1, dx:10, dy:-4,
      magnets:{ school:6, commute:5, invest:4, upgrade:5, downsize:4, returnLocal:4, default:4 } },
    { id:"micro-songdo", name:"송도국제도시", shortName:"송도국제도시", parent:"incheon-23040", parentRegion:"incheon", price:9.2, dx:10, dy:-2,
      magnets:{ invest:7, commute:4, school:4, downsize:3, returnLocal:5, default:4 } },
  ];
  var WISH_CORE_MICRO_IDS = {
    "micro-hannam": true,
    "micro-cheongdam": true,
    "micro-apgujeong": true,
    "micro-daechi": true,
    "micro-banpo": true,
    "micro-jamwon": true,
    "micro-banpojamwon": true,
    "micro-seongsu": true,
    "micro-hapjeong": true,
    "micro-yeouido": true,
  };

  var WISH_PROFILES = {
    school: {
      target: 1.62, min: 1.12, max: 2.35, aspMin: 1.22, closeBias: 2.4, sameGroup: 0.8, seoulBias: 0.8,
      magnets: [
        { re: /songpa|잠실|오륜|방이/, w: 9 },
        { re: /gyeonggi-31023|분당|정자|수내|서현|판교/, w: 8 },
        { re: /gangnam|대치|도곡/, w: 8 },
        { re: /seocho|반포|잠원|서초/, w: 8 },
        { re: /yangcheon|목동/, w: 6 },
        { re: /gyeonggi-31014|광교|영통/, w: 5 },
        { re: /nowon|중계|상계/, w: 2 },
        { re: /incheon-23040|송도/, w: 3 },
      ],
    },
    commute: {
      target: 1.52, min: 1.12, max: 2.15, aspMin: 1.18, closeBias: 2.8, sameGroup: 0.4, seoulBias: 2.1,
      magnets: [
        { re: /gangnam|테헤란|역삼|삼성|대치/, w: 10 },
        { re: /yeongdeungpo|여의도/, w: 9 },
        { re: /seongdong|성수|왕십리/, w: 8 },
        { re: /mapo|상암|공덕|합정/, w: 8 },
        { re: /yongsan|용산/, w: 7 },
        { re: /gyeonggi-31023|판교|분당/, w: 7 },
        { re: /gangseo|마곡/, w: 6 },
        { re: /guro|구로디지털|금천/, w: 4 },
        { re: /gyeonggi-31014|광교|영통/, w: 5 },
        { re: /jongno|jung|종로|중구/, w: 4 },
      ],
    },
    invest: {
      target: 1.72, min: 1.12, max: 2.6, aspMin: 1.12, closeBias: 1.4, sameGroup: 0.3, seoulBias: 0.3,
      magnets: [
        { re: /gangdong|둔촌|고덕/, w: 9 },
        { re: /songpa|문정|잠실/, w: 7 },
        { re: /gyeonggi-31101|창릉|삼송|원흥|덕양/, w: 8 },
        { re: /incheon-23040|송도/, w: 8 },
        { re: /gyeonggi-31014|광교|영통/, w: 6 },
        { re: /gyeonggi-31023|판교|분당/, w: 5 },
        { re: /gyeonggi-31192|용인시기흥|기흥/, w: 6 },
        { re: /gyeonggi-31193|용인시수지|수지/, w: 5 },
        { re: /gyeonggi-31111|과천/, w: 6 },
        { re: /신도시|3기/, w: 5 },
      ],
    },
    lifestyle: {
      target: 1.62, min: 1.18, max: 2.3, aspMin: 1.2, closeBias: 1.8, sameGroup: 0.3, seoulBias: 2.0,
      magnets: [
        { re: /mapo|합정|망원|연남|상암/, w: 9 },
        { re: /seongdong|성수|왕십리/, w: 9 },
        { re: /yongsan|한남|이태원|용산/, w: 8 },
        { re: /gangnam|청담|압구정/, w: 6 },
        { re: /jongno|서촌|북촌|을지로/, w: 6 },
        { re: /gangseo|마곡/, w: 5 },
        { re: /gwangjin|광진|건대/, w: 5 },
      ],
    },
    firstBuy: {
      target: 1.3, min: 1.0, max: 1.7, aspMin: 1.06, closeBias: 2.6, sameGroup: 1.1, seoulBias: 0.5,
      magnets: [
        { re: /gangseo|마곡/, w: 8 },
        { re: /guro|구로|금천/, w: 7 },
        { re: /eunpyeong|은평/, w: 7 },
        { re: /gyeonggi-31101|창릉|삼송|원흥|덕양/, w: 7 },
        { re: /incheon-23040|송도/, w: 6 },
        { re: /gyeonggi-31014|광교|영통/, w: 6 },
        { re: /gyeonggi-31023|분당|판교/, w: 4 },
        { re: /songpa|문정/, w: 4 },
      ],
    },
    downsize: {
      target: 0.98, min: 0.82, max: 1.22, aspMin: 0.88, closeBias: 2.5, sameGroup: 1.1, seoulBias: 0.1,
      magnets: [
        { re: /gyeonggi-31023|분당|정자|수내/, w: 8 },
        { re: /yangcheon|목동/, w: 7 },
        { re: /songpa|잠실|오금/, w: 7 },
        { re: /incheon-23040|송도/, w: 4 },
        { re: /gyeonggi-31014|광교|영통/, w: 6 },
        { re: /dongjak|동작/, w: 6 },
      ],
    },
    default: {
      target: 1.52, min: 1.08, max: 2.15, aspMin: 1.15, closeBias: 2.0, sameGroup: 0.4, seoulBias: 0.9,
      magnets: [
        { re: /mapo|seongdong|songpa|gangdong|gangnam|yeongdeungpo|gyeonggi-31023|gyeonggi-31014|incheon-23040/, w: 5 },
      ],
    },
    upgrade: {
      target: 1.58, min: 1.12, max: 2.25, aspMin: 1.18, closeBias: 2.1, sameGroup: 0.5, seoulBias: 1.0,
      magnets: [
        { re: /songpa|잠실|문정/, w: 8 },
        { re: /gangdong|고덕|둔촌/, w: 7 },
        { re: /seongdong|성수/, w: 7 },
        { re: /mapo|합정|상암/, w: 6 },
        { re: /yeongdeungpo|여의도/, w: 6 },
        { re: /gyeonggi-31023|분당|판교|정자|수내/, w: 7 },
        { re: /gyeonggi-31014|광교|영통/, w: 5 },
        { re: /gangnam|대치|도곡/, w: 5 },
        { re: /seocho|반포|잠원|서초/, w: 4 },
      ],
    },
    returnLocal: {
      target: 0.98, min: 0.82, max: 1.22, aspMin: 0.88, closeBias: 2.4, sameGroup: 1.4, seoulBias: 0,
      magnets: [
        { re: /incheon-23040|송도/, w: 4 },
        { re: /gyeonggi-31023|분당|정자|수내/, w: 5 },
        { re: /gyeonggi-31014|광교|영통/, w: 5 },
        { re: /yangcheon|목동/, w: 4 },
      ],
    },
  };

  function profileMagnetScore(profile, n) {
    var s = n.id + " " + n.name;
    return (profile.magnets || []).reduce(function(total, item){
      return total + (item.re.test(s) ? item.w : 0);
    }, 0);
  }

  function microMagnetScore(n) {
    var map = n.microMagnets || {};
    return map[wishTrait] || map.default || 0;
  }

  function priceFitScore(ratio, profile) {
    var width = Math.max(0.2, (profile.max - profile.min) * 0.5);
    var fit = 1 - Math.abs(ratio - profile.target) / width;
    var score = fit * 6;
    if (ratio >= profile.min && ratio <= profile.max) score += 2;
    if (ratio > profile.max) score -= (ratio - profile.max) * 9;
    if (ratio < profile.min) score -= (profile.min - ratio) * 5;
    return score;
  }

  function wishAspirationFloor(trait) {
    if (trait === "invest") return 1.12;
    if (trait === "upgrade") return 1.14;
    if (trait === "school") return 1.12;
    if (trait === "commute") return 1.1;
    if (trait === "firstBuy") return 1.06;
    if (trait === "lifestyle") return 1.04;
    if (trait === "downsize" || trait === "returnLocal") return 0.96;
    return 1.08;
  }

  function wishAspirationPenalty(n, ratio, upCandidate) {
    var minRatio = wishAspirationFloor(wishTrait);
    var penalty = 0;
    if (ratio < minRatio) {
      penalty += (minRatio - ratio) * 28 + 4;
    }
    if (upCandidate && (wishTrait === "invest" || wishTrait === "upgrade" || wishTrait === "school" || wishTrait === "commute")) {
      if (n.price < upCandidate.price * 0.9) penalty += 8;
      else if (n.price < upCandidate.price) penalty += 4;
    }
    return penalty;
  }

  var CORE_ASSET_PROFILES = {
    school:      { target: 2.05, min: 1.45, max: 3.4 },
    commute:     { target: 1.95, min: 1.4,  max: 3.1 },
    invest:      { target: 2.2,  min: 1.3,  max: 3.8 },
    upgrade:     { target: 2.25, min: 1.55, max: 3.6 },
    lifestyle:   { target: 2.1,  min: 1.45, max: 3.1 },
    firstBuy:    { target: 2.0,  min: 1.35, max: 3.0 },
    downsize:    { target: 1.75, min: 1.2,  max: 2.8 },
    returnLocal: { target: 1.7,  min: 1.2,  max: 2.7 },
    default:     { target: 2.05, min: 1.4,  max: 3.1 },
  };

  var CORE_ABSOLUTE_PRICE_BASE = {
    school: 24.5,
    commute: 22.5,
    invest: 25.5,
    upgrade: 25,
    lifestyle: 22.5,
    firstBuy: 23,
    downsize: 23,
    returnLocal: 22.5,
    default: 22.5,
  };

  function coreAssetScore(ratio) {
    var profile = CORE_ASSET_PROFILES[wishTrait] || CORE_ASSET_PROFILES.default;
    var width = Math.max(0.25, (profile.max - profile.min) * 0.42);
    var fit = 1 - Math.abs(ratio - profile.target) / width;
    var score = fit * 10;
    if (ratio >= profile.min && ratio <= profile.max) score += 3;
    if (ratio < profile.min) score -= (profile.min - ratio) * 14;
    if (ratio > profile.max) score -= (ratio - profile.max) * 8;
    return score;
  }

  function coreAbsoluteAssetScore(price) {
    var base = CORE_ABSOLUTE_PRICE_BASE[wishTrait] || CORE_ABSOLUTE_PRICE_BASE.default;
    var score = (price - base) * 1.15;
    if (price >= 30) score += 4;
    else if (price >= 26) score += 2.2;
    else if (price >= 22) score += 1.2;
    if (price < 20) score -= 4.5;
    if (price < 18) score -= 2.5;
    return Math.max(-14, Math.min(14, score));
  }

  function coreLandmarkBonus(n, ratio) {
    var s = n.id + " " + n.name;
    var bonus = 0;
    if (/압구정|청담|반포|잠원|한남|대치/.test(s)) bonus += 8;
    else if (/성수|여의도/.test(s)) bonus += 4;
    else if (/합정/.test(s)) bonus += 1.5;
    if (ratio >= 1.7) bonus += 2.5;
    if (ratio >= 2.1) bonus += 2;
    return bonus;
  }

  function coreTraitPlaceBonus(n) {
    var s = n.id + " " + n.name;
    if (wishTrait === "school") {
      if (/대치|반포|잠원|압구정/.test(s)) return 8;
      if (/한남|청담/.test(s)) return 3;
      if (/합정/.test(s)) return -8;
      if (/성수|여의도/.test(s)) return -2;
      return 0;
    }
    if (wishTrait === "commute") {
      if (/여의도|성수|한남/.test(s)) return 7;
      if (/대치|청담|압구정|반포|잠원/.test(s)) return 4.5;
      if (/합정/.test(s)) return -6;
      return 0;
    }
    if (wishTrait === "invest") {
      if (/압구정|청담|반포|잠원|여의도/.test(s)) return 7;
      if (/한남|성수|대치/.test(s)) return 4.5;
      if (/합정/.test(s)) return -7;
      return 0;
    }
    if (wishTrait === "upgrade") {
      if (/압구정|반포|잠원/.test(s)) return 10;
      if (/대치|한남/.test(s)) return 8.5;
      if (/청담/.test(s)) return 6;
      if (/여의도/.test(s)) return 3.5;
      if (/성수/.test(s)) return -3.5;
      if (/합정/.test(s)) return -6;
      return 0;
    }
    if (wishTrait === "lifestyle") {
      if (/한남|성수|청담/.test(s)) return 7;
      if (/압구정|반포|잠원/.test(s)) return 4;
      if (/합정/.test(s)) return 1.5;
      return 0;
    }
    if (wishTrait === "firstBuy" || wishTrait === "downsize" || wishTrait === "returnLocal" || wishTrait === "default") {
      if (/반포|잠원|압구정/.test(s)) return 9;
      if (/한남|대치/.test(s)) return 7.5;
      if (/청담/.test(s)) return 4.5;
      if (/여의도/.test(s)) return 2.5;
      if (/성수/.test(s)) return -4;
      if (/합정/.test(s)) return -15;
      return 0;
    }
    return 0;
  }

  function aspirationFloorPenalty(ratio, profile) {
    if (!profile.aspMin || ratio >= profile.aspMin) return 0;
    return (profile.aspMin - ratio) * 12;
  }

  function luxuryPenalty(n, ratio) {
    var s = n.id + " " + n.name;
    var ultra = /gangnam|seocho|yongsan|반포|압구정|청담|잠원|대치/.test(s);
    if (!ultra) return 0;
    if (wishTrait === "invest" || wishTrait === "lifestyle") return 0;
    if (wishTrait === "school" && ratio <= 2.05) return 0;
    if (wishTrait === "commute" && ratio <= 1.95) return 0;
    if (wishTrait === "default" && ratio <= 1.8) return 0;
    if (wishTrait === "firstBuy" && ratio <= 1.45) return 0;
    return ratio > 1.8 ? (ratio - 1.8) * 6 + 1.5 : 0;
  }

  function remotePenalty(n) {
    var name = n.name || "";
    if (wishTrait === "returnLocal") return 0;
    if (wishTrait === "downsize") {
      if (/옹진|강화/.test(name)) return 6;
      if (/군$/.test(name)) return 3;
      if (/[읍면]$/.test(name)) return 2;
      return 0;
    }
    if (/옹진|강화/.test(name)) return 15;
    if (/군$/.test(name)) return 9;
    if (/[읍면]$/.test(name)) return 7;
    return 0;
  }

  function corridorBonus(n) {
    if (!originShape) return 0;
    var s = n.id + " " + n.name;
    var westOrigin = region.group === "incheon" || originShape.cx < 560;
    var eastOrigin = originShape.cx > 620;
    var bonus = 0;

    if (wishTrait === "school") {
      if (westOrigin && /yangcheon|목동|gangseo|마곡|incheon-23040|송도|gyeonggi-31101|덕양/.test(s)) bonus += 2.8;
      if (eastOrigin && /songpa|잠실|gangnam|seocho|gyeonggi-31023|분당|gyeonggi-31014|광교/.test(s)) bonus += 2.8;
    }

    if (wishTrait === "commute") {
      if (westOrigin && /yeongdeungpo|여의도|mapo|공덕|gangseo|마곡|guro|구로/.test(s)) bonus += 2.2;
      if (eastOrigin && /gangnam|seongdong|성수|songpa|잠실|gyeonggi-31023|판교|gyeonggi-31014|광교/.test(s)) bonus += 2.2;
    }

    if (wishTrait === "lifestyle") {
      if (westOrigin && /mapo|합정|망원|연남|yongsan|한남/.test(s)) bonus += 1.8;
      if (eastOrigin && /seongdong|성수|gangnam|청담|압구정/.test(s)) bonus += 1.8;
    }

    return bonus;
  }

  function wishMediationScore(n, ratio) {
    var s = n.id + " " + n.name;
    var profileMagnet = profileMagnetScore(wishProfile, n);
    var microMagnet = microMagnetScore(n);
    var landmark = coreLandmarkBonus(n, ratio);
    var traitBonus = coreTraitPlaceBonus(n);
    var absoluteAsset = Math.max(0, coreAbsoluteAssetScore(n.price) * 0.45);
    var symbolicAddressBonus = /gangnam|seocho|songpa|seongdong|yongsan|yeongdeungpo|mapo|한남|청담|압구정|반포|잠원|대치|성수|여의도|합정/.test(s) ? 1.8 : 0;
    return (profileMagnet * 1.15) + (microMagnet * 1.25) + landmark + (traitBonus * 0.9) + absoluteAsset + symbolicAddressBonus;
  }

  function wishNeedsToOutrankUp(n, ratio, upCandidate) {
    if (!upCandidate || !upCandidate.price) return true;
    var mediation = wishMediationScore(n, ratio);
    var minRatioOverUp = (wishTrait === "downsize" || wishTrait === "returnLocal") ? 1.02 : 1.08;
    if (n.price >= upCandidate.price * minRatioOverUp) return true;
    if (mediation >= ((wishTrait === "downsize" || wishTrait === "returnLocal") ? 15 : 18) && n.price >= upCandidate.price * 0.98) return true;
    return false;
  }

  function centralSeoulBusinessBonus(n) {
    if (!originShape || region.group !== "seoul") return 0;
    var s = n.id + " " + n.name;
    var centralOrigin = /jongno|jung|yongsan|seodaemun|dongdaemun|seongbuk|eunpyeong|mapo/.test(region.id);
    if (!centralOrigin) return 0;

    var bonus = 0;
    if (wishTrait === "commute" || wishTrait === "upgrade") {
      if (/gangnam|대치|도곡|yeongdeungpo|여의도|seongdong|성수|yongsan|한남/.test(s)) bonus += 4.5;
      if (/seocho|반포|잠원/.test(s)) bonus += 2.5;
      if (/yangcheon|목동|gyeonggi-31023|정자|서현|판교|gyeonggi-31014|광교/.test(s)) bonus -= 3.5;
    }
    if (wishTrait === "upgrade") {
      if (/gangnam|대치|도곡|seocho|반포|잠원|seongdong|성수|yeongdeungpo|여의도/.test(s)) bonus += 3.5;
      if (/gyeonggi-31023|정자|서현|판교|gyeonggi-31014|광교/.test(s)) bonus -= 5.5;
    }
    return bonus;
  }

  function urbanStatusTier(entity) {
    var s = ((entity && entity.id) || "") + " " + ((entity && entity.name) || "");
    var group = (entity && (entity.region || entity.group)) || "";
    var flavor = (entity && entity.flavor) || "";

    if (/gangnam|seocho|반포|잠원|압구정|청담|대치/.test(s)) return 5.6;
    if (/yongsan|한남/.test(s)) return 5.2;
    if (/songpa|잠실|seongdong|성수|yeongdeungpo|여의도|mapo|합정/.test(s)) return 4.6;
    if (/yangcheon|목동|gangdong|둔촌|고덕|jongno|종로|^jung$|중구/.test(s)) return 4.0;
    if (/gyeonggi-31111|과천|gyeonggi-31023|판교|분당|정자|서현/.test(s)) return 3.8;
    if (/gyeonggi-31014|광교|영통|gyeonggi-31191|기흥|gyeonggi-31192|수지/.test(s)) return 3.4;
    if (/gangseo|마곡|guro|구로|gyeonggi-31101|덕양|삼송|원흥|창릉/.test(s)) return 3.2;
    if (group === "seoul") return 3.3;
    if (group === "gyeonggi" && flavor === "gyeonggi_tech") return 3.1;
    if (group === "incheon" && /송도|연수/.test(s)) return 3.0;
    if (group === "gyeonggi") return 2.6;
    if (group === "incheon") return 2.4;
    return 2.0;
  }

  function upTargetRatio() {
    if (originFlavor === "seoul_core") return 1.16;
    if (originFlavor === "seoul_edge") return 1.24;
    if (originFlavor === "gyeonggi_tech") return 1.28;
    if (originFlavor === "gyeonggi_gtx") return 1.34;
    if (originFlavor === "gyeonggi_industrial") return 1.32;
    if (originFlavor === "incheon_newtown_plus" || originFlavor === "incheon_oldtown") return 1.3;
    return 1.3;
  }

  function upContextAllows(n) {
    var s = n.id + " " + n.name;
    if (originFlavor === "seoul_core") {
      return n.region === "seoul" && urbanStatusTier(n) >= originUrbanTier - 0.45;
    }
    if (originFlavor === "seoul_edge") {
      if (n.region === "seoul") return true;
      if (/gyeonggi-31023|분당|판교|정자|서현|gyeonggi-31111|과천/.test(s)) {
        return wishTrait === "commute" || wishTrait === "upgrade" || wishTrait === "firstBuy";
      }
      return false;
    }
    if (originFlavor === "gyeonggi_tech") {
      if (/gyeonggi-31023|분당|판교|정자|서현|gyeonggi-31111|과천|gyeonggi-31014|광교|영통|gyeonggi-31191|기흥|gyeonggi-31192|수지/.test(s)) {
        return true;
      }
      if (/gangnam|seocho|songpa|seongdong|yeongdeungpo|yongsan|강남|서초|송파|성수|여의도|한남|반포|잠원|대치/.test(s)) {
        return wishTrait === "commute" || wishTrait === "upgrade" || wishTrait === "invest";
      }
      return false;
    }
    return true;
  }

  function upContextBonus(n, ratio) {
    var s = n.id + " " + n.name;
    var bonus = 0;
    if (originFlavor === "seoul_core") {
      if (/gangnam|seocho|반포|잠원|압구정|청담|대치/.test(s)) bonus += 10;
      else if (/songpa|잠실|seongdong|성수|yongsan|한남|yeongdeungpo|여의도/.test(s)) bonus += 7;
      else if (/mapo|합정/.test(s)) bonus += 3;
      if (n.region !== "seoul") bonus -= 16;
      if (ratio < 1.0) bonus -= 8;
    } else if (originFlavor === "seoul_edge") {
      if (/gangnam|seocho|songpa|seongdong|yongsan|mapo|yeongdeungpo|강남|서초|송파|성수|한남|여의도|합정|반포|잠원|대치/.test(s)) bonus += 7.5;
      if (/gyeonggi-31023|분당|판교|정자|서현|gyeonggi-31111|과천/.test(s) && (wishTrait === "commute" || wishTrait === "upgrade" || wishTrait === "firstBuy")) bonus += 5;
      if (n.region !== "seoul" && !/gyeonggi-31023|분당|판교|정자|서현|gyeonggi-31111|과천/.test(s)) bonus -= 10;
    } else if (originFlavor === "gyeonggi_tech") {
      if (/gyeonggi-31023|분당|판교|정자|서현|gyeonggi-31111|과천/.test(s)) bonus += 9.5;
      else if (/gyeonggi-31014|광교|영통|gyeonggi-31191|기흥|gyeonggi-31192|수지/.test(s)) bonus += 6.5;
      if (/gangnam|seocho|songpa|seongdong|yeongdeungpo|yongsan|강남|서초|송파|성수|여의도|한남|반포|잠원|대치/.test(s)) {
        bonus += (wishTrait === "commute" || wishTrait === "upgrade" || wishTrait === "invest") ? 5.5 : 2.5;
      }
      if (/guro|구로|gangseo|마곡|gyeonggi-31101|덕양|삼송|원흥|창릉|industrial|안산|시흥|평택|화성/.test(s)) bonus -= 7;
    }
    return bonus;
  }

  function originMicroAxisBonus(n) {
    var s = n.id + " " + n.name;
    if (region.id === "yongsan") {
      if (/한남/.test(s)) return 18;
      if (/반포|잠원|청담|압구정/.test(s)) return 8.5;
      if (/대치|도곡|강남/.test(s)) return 5.5;
      if (/성수|여의도/.test(s)) return 4;
      return 0;
    }
    if (region.id === "seongdong") {
      if (/성수/.test(s)) return 18;
      if (/한남/.test(s)) return 9;
      if (/압구정|청담/.test(s)) return 8;
      if (/반포|잠원|대치|강남/.test(s)) return 5.5;
      if (/여의도/.test(s)) return 2.5;
      return 0;
    }
    return 0;
  }

  // ── 3. Affinity scorer ──
  var originShape = ALL_PATHS.find(function(s){ return s.id === region.id; });
  var originPrice = syntheticPriceForId(region.id, region.group);
  var originFlavor = genericPersonaFlavor(region, genericPersonaProfile(region));
  var originTerritory = genericPeerTerritory(region, originFlavor);
  var originToken = regionToken(region.name);
  var originUrbanTier = urbanStatusTier({ id: region.id, name: region.name, group: region.group, flavor: originFlavor });
  var wishProfile = WISH_PROFILES[wishTrait] || WISH_PROFILES.default;

  function affinity(n) {
    var s = n.id + " " + n.name;
    var b = 0;
    if (is_.school   && SCHOOL.test(s))    b += 4;
    if (is_.commute  && COMMUTE.test(s))   b += 4;
    if (is_.lifestyle && LIFESTYLE.test(s)) b += 4;
    if (is_.invest   && INVEST.test(s))    b += 4;
    if (is_.commute  && n.region === "seoul") b += 1;
    if (is_.downsize) {
      if (n.price < originPrice) b += 3;
      if (n.price < originPrice * 0.7) b += 2;
    }
    if (is_.firstBuy) {
      if (n.price < 8) b += 2;
      if (n.price <= originPrice * 1.1) b += 1;
    }
    return b;
  }

  // ── 4. Build scored neighbors ──
  var neighbors = ALL_PATHS
    .filter(function(s){ return s.id !== region.id && s.cx != null && originShape && originShape.cx != null; })
    .map(function(s){
      var dx = s.cx - originShape.cx, dy = s.cy - originShape.cy;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var price = syntheticPriceForId(s.id, s.region);
      var regionMeta = REGION_BY_ID[s.id];
      return {
        id: s.id,
        name: s.fullName || s.name,
        shortName: s.name,
        dist: dist,
        price: price,
        region: s.region,
        token: regionToken(s.fullName || s.name),
        flavor: regionMeta ? genericPersonaFlavor(regionMeta, genericPersonaProfile(regionMeta)) : s.region,
        territory: regionMeta ? genericPeerTerritory(regionMeta, genericPersonaFlavor(regionMeta, genericPersonaProfile(regionMeta))) : s.region,
      };
    });
  // Add affinity & combined score (higher is better)
  neighbors.forEach(function(n){
    n.aff = affinity(n);
    // Normalize distance: 0..1 where 0 = farthest. Invert so closer = higher score.
    n.distScore = 1 / (1 + n.dist / 50);
  });

  var sameGroup = neighbors.filter(function(n){ return n.region === region.group; });

  // ── 5. PEER — same group, similar price, persona-affinity weighted ──
  var peerPool = sameGroup.filter(function(n){ return Math.abs(n.price - originPrice) / originPrice < 0.35; });
  if (is_.downsize) {
    // Downsizer peer: cheaper same-group areas
    peerPool = sameGroup.filter(function(n){ return n.price < originPrice && n.price > originPrice * 0.5; });
    if (!peerPool.length) peerPool = sameGroup.filter(function(n){ return n.price <= originPrice; });
  }
  var sameTerritoryPool = peerPool.filter(function(n){
    return n.territory === originTerritory;
  });
  var sameTerritoryWidePool = sameGroup.filter(function(n){
    return n.territory === originTerritory &&
      Math.abs(n.price - originPrice) / Math.max(originPrice, 0.1) < 0.45;
  });
  var localFlavorPool = peerPool.filter(function(n){
    return n.flavor === originFlavor || n.token === originToken;
  });
  if (sameTerritoryPool.length >= 2) peerPool = sameTerritoryPool;
  else if (sameTerritoryWidePool.length >= 2) peerPool = sameTerritoryWidePool;
  else if (localFlavorPool.length >= 3) peerPool = localFlavorPool;

  peerPool.forEach(function(n){
    var priceGap = Math.abs(n.price - originPrice) / Math.max(originPrice, 0.1);
    var priceCloseness = Math.max(0, 1 - (priceGap / 0.35));
    var sameTerritoryBonus = n.territory === originTerritory ? 6.4 : 0;
    var sameFlavorBonus = n.flavor === originFlavor ? 4.2 : 0;
    var sameTokenBonus = n.token === originToken ? 4.8 : 0;
    var corridorLift = corridorBonus(n) * 0.45;
    var farPenalty = n.dist > 75 ? ((n.dist - 75) / 14) : 0;
    var crossFlavorPenalty = n.flavor !== originFlavor && n.dist > 50 ? 3.8 : 0;
    var crossTerritoryPenalty = n.territory !== originTerritory && n.dist > 40 ? 5.5 : 0;
    var investDriftPenalty = is_.invest && n.territory !== originTerritory ? 4 : 0;
    n.peerScore =
      (priceCloseness * 8.5) +
      (n.distScore * 7.5) +
      sameTerritoryBonus +
      sameFlavorBonus +
      sameTokenBonus +
      (n.aff * 0.9) +
      corridorLift -
      farPenalty -
      crossFlavorPenalty -
      crossTerritoryPenalty -
      investDriftPenalty;
  });
  peerPool.sort(function(a,b){ return (b.peerScore - a.peerScore) || (b.aff - a.aff) || (a.dist - b.dist); });
  var peerCand = peerPool[0] || sameGroup[0] || neighbors.sort(function(a,b){return a.dist-b.dist;})[0];

  // ── 5.5. DOWN — cheaper fallback, graph-only "reality compromise" ──
  var downPool = sameGroup.filter(function(n){
    return n.id !== peerCand.id &&
      n.price < originPrice * 0.96 &&
      n.price > originPrice * 0.5;
  });
  if (!downPool.length) {
    downPool = neighbors.filter(function(n){
      return n.id !== peerCand.id &&
        n.price < originPrice * 0.96 &&
        n.price > originPrice * 0.45;
    });
  }
  downPool.forEach(function(n){
    var relief = Math.max(0, (originPrice - n.price) / originPrice);
    var sameGroupBonus = n.region === region.group ? 2.5 : 0;
    n.downScore = (relief * 11) + (n.distScore * 4) + (n.aff * 0.7) + sameGroupBonus;
  });
  downPool.sort(function(a,b){ return (b.downScore - a.downScore) || (a.dist - b.dist); });
  var downCand = downPool[0] || null;

  // ── 6. UP — higher price, persona-affinity weighted, not same as peer ──
  var upMin = is_.downsize ? 0.9 : 1.15;
  var upMax = is_.downsize ? 1.3 : 2.0;
  if (originFlavor === "seoul_core") {
    upMin = 0.95;
    upMax = 1.45;
  } else if (originFlavor === "seoul_edge") {
    upMin = 1.08;
    upMax = 1.8;
  } else if (originFlavor === "gyeonggi_tech") {
    upMin = 1.08;
    upMax = 1.7;
  }
  var upPool = neighbors
    .filter(function(n){
      return n.id !== peerCand.id &&
        n.price > originPrice * upMin &&
        n.price < originPrice * upMax &&
        upContextAllows(n);
    })
    .slice(0, 30); // limit to 30 nearest
  if (originFlavor === "seoul_core") {
    upPool = upPool.filter(function(n){
      return n.region === "seoul" &&
        urbanStatusTier(n) >= originUrbanTier - 0.45 &&
        n.price >= originPrice * 0.92;
    });
  }
  upPool.forEach(function(n){
    var ratio = n.price / Math.max(originPrice, 0.1);
    var priceFit = Math.max(-6, 1 - Math.abs(ratio - upTargetRatio()) / 0.42);
    var tierGap = urbanStatusTier(n) - originUrbanTier;
    var sameTerritoryBonus = n.territory === originTerritory ? 2.4 : 0;
    var seoulLift = n.region === "seoul" && region.group !== "seoul" ? 3.8 : 0;
    var seoulCorePenalty = originFlavor === "seoul_core" && n.region !== "seoul" ? 9.0 : 0;
    var seoulEdgePenalty = originFlavor === "seoul_edge" && n.region !== "seoul" ? 3.5 : 0;
    var demotionPenalty = tierGap <= -0.1 ? Math.abs(tierGap + 0.1) * 10.5 : 0;
    var weakLiftPenalty = tierGap < 0.18 ? (0.18 - tierGap) * 9 : 0;
    var farPenalty = n.dist > 75 ? ((n.dist - 75) / 18) : 0;
    var contextBonus = upContextBonus(n, ratio);
    var magnetLift = profileMagnetScore(wishProfile, n) * 0.65;
    n.upScore =
      (n.aff * 1.9) +
      (n.distScore * 5.2) +
      (priceFit * 8.4) +
      (tierGap * 8.6) +
      magnetLift +
      contextBonus +
      sameTerritoryBonus +
      seoulLift -
      seoulCorePenalty -
      seoulEdgePenalty -
      demotionPenalty -
      weakLiftPenalty -
      farPenalty;
  });
  upPool.sort(function(a,b){ return (b.upScore - a.upScore) || (b.aff - a.aff) || (a.dist - b.dist); });
  if (!upPool.length && originFlavor === "seoul_core") {
    upPool = neighbors
      .filter(function(n){
        return n.id !== peerCand.id &&
          n.region === "seoul" &&
          urbanStatusTier(n) >= originUrbanTier - 0.55 &&
          n.price >= originPrice * 0.88;
      })
      .slice(0, 24);
    upPool.forEach(function(n){
      var ratio = n.price / Math.max(originPrice, 0.1);
      var tierGap = urbanStatusTier(n) - originUrbanTier;
      n.upScore =
        (n.aff * 1.7) +
        (n.distScore * 4.8) +
        (tierGap * 10.5) +
        (centralSeoulBusinessBonus(n) * 0.7) +
        (corridorBonus(n) * 0.4);
    });
    upPool.sort(function(a,b){ return (b.upScore - a.upScore) || (a.dist - b.dist); });
  }
  var upCand = upPool[0]
    || neighbors.filter(function(n){ return n.id !== peerCand.id; }).sort(function(a,b){return a.dist-b.dist;})[0]
    || neighbors[1];

  // ── 7. WISH — aspirational, persona weighted, wider radius ──
  var microCandidates = MICRO_WISH_CANDIDATES.map(function(item){
    var parent = ALL_PATHS.find(function(s){ return s.id === item.parent; });
    if (!parent || parent.cx == null || parent.cy == null) return null;
    var cx = parent.cx + (item.dx || 0);
    var cy = parent.cy + (item.dy || 0);
    var dx = cx - originShape.cx, dy = cy - originShape.cy;
    return {
      id: item.id,
      name: item.name,
      shortName: item.shortName || item.name,
      dist: Math.sqrt(dx*dx + dy*dy),
      price: item.price,
      region: item.parentRegion || parent.region,
      parentId: item.parent,
      parentName: parent.fullName || parent.name,
      mapRef: item.parent,
      mapCoord: [cx, cy],
      microMagnets: item.magnets || {},
      wishTier: WISH_CORE_MICRO_IDS[item.id] ? "core" : "reachable",
      aff: 0,
    };
  }).filter(Boolean);

  if ((originFlavor === "seoul_core" && upCand && (upCand.price < originPrice || upCand.region !== "seoul")) || region.id === "yongsan" || region.id === "seongdong") {
    var microUpPool = microCandidates.filter(function(n){
      var allowSameParent =
        (region.id === "yongsan" && /한남/.test(n.name)) ||
        (region.id === "seongdong" && /성수/.test(n.name));
      return (n.parentId !== region.id || allowSameParent) &&
        n.price > originPrice * (allowSameParent ? 0.98 : 1.05) &&
        n.price < originPrice * 1.58;
    });
    if (region.id === "yongsan") {
      microUpPool = microUpPool.filter(function(n){
        return /한남|반포|잠원|청담|압구정|대치|성수/.test(n.name);
      });
    }
    if (region.id === "seongdong") {
      microUpPool = microUpPool.filter(function(n){
        return /성수|한남|청담|압구정|반포|잠원|대치/.test(n.name);
      });
    }
    microUpPool.forEach(function(n){
      var ratio = n.price / Math.max(originPrice, 0.1);
      var magnet = profileMagnetScore(wishProfile, n) + microMagnetScore(n);
      var tierGap = urbanStatusTier(n) - originUrbanTier;
      var priceFit = Math.max(-5, 1 - Math.abs(ratio - 1.22) / 0.28);
      n.upMicroScore =
        (magnet * 2.1) +
        (tierGap * 8.8) +
        (priceFit * 7.5) +
        (coreLandmarkBonus(n, ratio) * 0.8) +
        originMicroAxisBonus(n) +
        (coreTraitPlaceBonus(n) * 0.55);
    });
    microUpPool.sort(function(a,b){
      return (b.upMicroScore - a.upMicroScore) || (b.price - a.price) || (a.dist - b.dist);
    });
    if (microUpPool.length) upCand = microUpPool[0];
  }

  var wishPool = neighbors.slice(0, 60)
    .filter(function(n){
      return n.id !== peerCand.id &&
        n.id !== upCand.id &&
        n.id !== "incheon-23320" &&
        n.id !== "incheon-23310" &&
        n.id !== "incheon-23020";
    })
    .concat(microCandidates);

  wishPool.forEach(function(n){
    var ratio = n.price / originPrice;
    var magnet = profileMagnetScore(wishProfile, n) + microMagnetScore(n);
    var distanceScore = Math.max(-4, wishProfile.closeBias - (n.dist / 45));
    var sameGroupBonus = n.region === region.group ? wishProfile.sameGroup : 0;
    var seoulBonus = n.region === "seoul" ? wishProfile.seoulBias : 0;
    var outerPenalty = ratio > wishProfile.max ? (ratio - wishProfile.max) * 2.2 : 0;
    var weakMagnetPenalty = magnet > 0 ? 0 : (wishTrait === "default" ? 2.5 : 6.5);
    n.wishScore =
      (magnet * 2.15) +
      (n.aff * 2.2) +
      priceFitScore(ratio, wishProfile) +
      distanceScore +
      sameGroupBonus +
      corridorBonus(n) +
      centralSeoulBusinessBonus(n) +
      seoulBonus -
      wishAspirationPenalty(n, ratio, upCand) -
      aspirationFloorPenalty(ratio, wishProfile) -
      outerPenalty -
      weakMagnetPenalty -
      remotePenalty(n) -
      luxuryPenalty(n, ratio);
    n.wishMediation = wishMediationScore(n, ratio);
  });

  var wishReachablePool = wishPool.filter(function(n){
    var ratio = n.price / originPrice;
    return n.wishTier !== "core" && wishNeedsToOutrankUp(n, ratio, upCand);
  });
  if (!wishReachablePool.length) {
    wishReachablePool = wishPool.filter(function(n){
      var upFloor = upCand && upCand.price ? upCand.price * 0.98 : originPrice * 1.08;
      return n.wishTier !== "core" && n.price >= Math.max(originPrice * 1.05, upFloor);
    });
  }
  if (!wishReachablePool.length && originFlavor === "seoul_core") {
    wishReachablePool = wishPool.filter(function(n){
      var upFloor = upCand && upCand.price ? upCand.price * 1.02 : originPrice * 1.08;
      return n.wishMediation >= 14 && n.price >= Math.max(originPrice * 1.02, upFloor);
    });
  }
  if (!wishReachablePool.length && originFlavor === "seoul_core") {
    wishReachablePool = wishPool.filter(function(n){
      var upFloor = upCand && upCand.price ? upCand.price * 1.05 : originPrice * 1.12;
      return n.wishTier === "core" &&
        n.price >= Math.max(originPrice * 1.08, upFloor) &&
        n.wishMediation >= 15;
    });
  }
  if (!wishReachablePool.length) {
    wishReachablePool = wishPool.filter(function(n){
      return n.wishTier !== "core" && n.price >= originPrice * 1.02;
    });
  }
  if (!wishReachablePool.length && originFlavor !== "seoul_core") {
    wishReachablePool = wishPool.filter(function(n){
      return n.wishTier !== "core";
    });
  }

  wishReachablePool.sort(function(a,b){
    var upPrice = upCand && upCand.price ? upCand.price : originPrice;
    var aPremium = Math.max(0, (a.price - upPrice) / Math.max(upPrice, 0.1));
    var bPremium = Math.max(0, (b.price - upPrice) / Math.max(upPrice, 0.1));
    var aReachableScore = a.wishScore + (a.wishMediation * 1.55) + (aPremium * 6.5);
    var bReachableScore = b.wishScore + (b.wishMediation * 1.55) + (bPremium * 6.5);
    return (bReachableScore - aReachableScore) || (b.wishMediation - a.wishMediation) || (b.aff - a.aff) || (a.dist - b.dist);
  });

  var wishFallbackCand = microCandidates.find(function(n){ return n.name === "청담동"; })
    || microCandidates.find(function(n){ return n.name === "대치동"; })
    || neighbors.find(function(n){ return n.id === "gangnam"; })
    || { name: "청담동", shortName: "청담동", price: 29.8, dist: 100, mapRef: "gangnam", parentId: "gangnam", parentName: "강남구" };
  var wishCand = wishReachablePool[0] || wishFallbackCand;

  var wishCorePool = wishPool.filter(function(n){
    return n.wishTier === "core";
  });
  wishCorePool.forEach(function(n){
    var ratio = n.price / originPrice;
    n.wishCoreScore =
      (microMagnetScore(n) * 1.0) +
      (profileMagnetScore(wishProfile, n) * 0.95) +
      (n.aff * 0.45) +
      coreAssetScore(ratio) +
      coreAbsoluteAssetScore(n.price) +
      coreLandmarkBonus(n, ratio) +
      coreTraitPlaceBonus(n) +
      (n.region === "seoul" ? 2 : 0) +
      corridorBonus(n) -
      remotePenalty(n) * 0.3;
  });
  wishCorePool.sort(function(a,b){
    return (b.wishCoreScore - a.wishCoreScore) || (b.wishScore - a.wishScore) || (a.dist - b.dist);
  });
  var wishCoreCand = wishCorePool[0] || wishCand;

  // ── 8. Trait-aware narrative fragments ──
  var traitAxis = is_.school ? "학군과 교육 동선"
    : is_.commute ? "출퇴근 동선과 직주근접"
    : is_.invest ? "투자 수익률과 자산 사이클"
    : is_.downsize ? "생활 인프라와 의료 접근성"
    : is_.lifestyle ? "생활 밀도와 도시 감도"
    : is_.firstBuy ? "진입 가능한 가격대와 성장 잠재력"
    : "생활권과 자산 위계";

  var peerNarr = is_.school
      ? "학원가 반경과 통학 동선을 유지하면서 단지의 격만 한 단계 올리는 선택."
    : is_.commute
      ? "출퇴근 동선을 거의 그대로 유지하면서 주거 환경만 한 단계 올리는 후보."
    : is_.invest
      ? "비슷한 투자 프로파일과 사이클 위치를 가진 인접 권역."
    : is_.downsize
      ? "평수를 줄이고 현금 여유를 만들면서도 생활 인프라를 유지하는 자리."
    : is_.lifestyle
      ? "동네의 감도와 생활 밀도를 유지하면서 단지만 바꾸는 선택."
    : is_.firstBuy
      ? "예산 안에서 가장 현실적인 첫 매수 후보."
    : "생활권을 거의 유지하는 가장 보수적인 시나리오.";

  var upNarr = is_.school
      ? "학군과 생활권을 함께 끌어올리는 한 단계 위의 상향지."
    : is_.commute
      ? "직장과 더 가까워지면서 도시의 격이 한 단계 달라지는 자리."
    : is_.invest
      ? "다음 사이클에서 더 큰 수익을 기대할 수 있는 후보."
    : is_.downsize
      ? "비슷한 가격이지만 의료와 생활 인프라가 더 나은 자리."
    : is_.invest
      ? "자산 재편 시 가장 자연스러운 동선."
    : "같은 생활권이지만 도시의 격이 한 단계 달라지는 자리.";

  // ── 9. Metrics ──
  var peerPrice = peerCand.price, upPrice = upCand.price, wishPrice = wishCand.price;
  var downPrice = downCand ? downCand.price : null;
  var gapStr = function(p) { var g = p - originPrice; return (g >= 0 ? "+" : "") + g.toFixed(1) + "억"; };
  var gapPct = function(p) { return Math.round(((p - originPrice) / originPrice) * 100); };
  var ltvLabel = function(pct) { return pct <= 15 ? "안정" : pct <= 60 ? "압박" : "불가"; };
  var timeline = function(pct) { return pct <= 15 ? "6-12개월" : pct <= 60 ? "24-36개월" : "60개월+"; };
  var commute = function(d) { return d ? "+" + Math.round(d / 3) + "분" : "~0분"; };
  var psmFromPrice = function(price) {
    return Math.round((price * 10000) / 99).toLocaleString() + "만/㎡";
  };
  var psmLabelForCandidate = function(candidate) {
    if (!candidate) return "—";
    var exact = realPriceEntry(candidate.id);
    if (exact && exact.pricePsmLabel && exact.pricePsmLabel !== "—") return exact.pricePsmLabel;
    if (candidate.mapCoord && candidate.parentId && Number.isFinite(candidate.price)) {
      return psmFromPrice(candidate.price);
    }
    if (candidate.parentId) {
      var parent = realPriceEntry(candidate.parentId);
      if (parent && parent.pricePsmLabel && parent.pricePsmLabel !== "—") return parent.pricePsmLabel;
    }
    return psmFromPrice(candidate.price);
  };
  var mapMetaForCandidate = function(candidate) {
    if (!candidate) return {};
    if (candidate.mapCoord && candidate.mapCoord.length === 2) {
      return {
        mapRef: candidate.mapRef || candidate.parentId || candidate.id,
        mapCoord: candidate.mapCoord,
        parentId: candidate.parentId || null,
        parentName: candidate.parentName || null,
      };
    }
    var exactShape = ALL_PATHS.find(function(s){ return s.id === candidate.id; });
    if (exactShape && exactShape.cx != null && exactShape.cy != null) {
      return {
        mapRef: candidate.id,
        mapCoord: [exactShape.cx, exactShape.cy],
        parentId: null,
        parentName: null,
      };
    }
    if (candidate.parentId) {
      var parentShape = ALL_PATHS.find(function(s){ return s.id === candidate.parentId; });
      if (parentShape && parentShape.cx != null && parentShape.cy != null) {
        return {
          mapRef: candidate.parentId,
          mapCoord: [parentShape.cx, parentShape.cy],
          parentId: candidate.parentId,
          parentName: candidate.parentName || parentShape.fullName || parentShape.name || null,
        };
      }
    }
    return {};
  };
  var pGap = gapPct(peerPrice), uGap = gapPct(upPrice), wGap = gapPct(wishPrice);
  var dGap = downPrice != null ? gapPct(downPrice) : 0;
  var peerMobility = Math.max(50, Math.min(90, 85 - Math.abs(pGap)));
  var upMobility = Math.max(25, Math.min(60, 65 - Math.abs(uGap) / 2));
  var downMobility = downCand
    ? Math.max(18, Math.min(46,
        44 - Math.abs(dGap) / 3 - Math.min(10, downCand.dist / 16) + (downCand.region === region.group ? 3 : 0)
      ))
    : 0;
  var wishMobility = Math.max(10, Math.min(30, 35 - Math.abs(wGap) / 5));
  var corePrice = wishCoreCand.price;
  var cGap = gapPct(corePrice);
  var wishCoreMobility = Math.max(6, Math.min(22, 26 - Math.abs(cGap) / 7));
  var downDesire = downCand
    ? Math.max(18, Math.min(44,
        36 + Math.min(6, Math.max(0, downCand.aff - 1) * 1.5) - Math.abs(dGap) / 5 + (downCand.region === region.group ? 2 : 0)
      ))
    : 0;

  var rn = region.name;
  var pn = peerCand.shortName || peerCand.name;
  var dn = downCand ? (downCand.shortName || downCand.name) : "";
  var un = upCand.shortName || upCand.name;
  var wn = wishCand.shortName || wishCand.name;
  var wcn = wishCoreCand.shortName || wishCoreCand.name;

  // ── 10. Category labels ──
  var peerCat = is_.downsize ? "평수를 줄이는 현실 후보"
    : is_.invest ? "비슷한 투자 프로파일"
    : "현재 권역 안의 다음 자리";
  var upCat = is_.school ? "한 단계 위의 상향지"
    : is_.commute ? "직장에 더 가까운 다음 자리"
    : is_.invest ? "다음 사이클의 후보"
    : is_.downsize ? "같은 가격, 더 나은 인프라"
    : "동시대 자산의 다음 챕터";

  var downNarr = is_.school
      ? "학군과 생활 반경을 조금 내려놓는 대신 예산 압박을 줄이는 선택."
    : is_.commute
      ? "직주근접이나 도시 위계를 일부 포기하고 월 부담을 낮추는 후보."
    : is_.invest
      ? "수익률보다 현금흐름을 먼저 챙기기 위해 한 단계 낮춰 보는 자리."
    : is_.downsize
      ? "오히려 더 자연스러운 축소 이동이지만, 정체성 면에선 내려간다고 느껴질 수 있는 선택."
    : is_.lifestyle
      ? "좋아하는 도시 감도는 덜하지만, 당장 버틸 수 있는 비용선 안쪽의 후보."
    : is_.firstBuy
      ? "꿈의 좌표보다 먼저 손에 잡히는 가격대를 택하는 선택."
    : "비용과 유지 가능성을 위해 한 단계 낮춰 보는 현실적 타협안.";

  var graphOnly = [];
  var peerMapMeta = mapMetaForCandidate(peerCand);
  var upMapMeta = mapMetaForCandidate(upCand);
  var wishMapMeta = mapMetaForCandidate(wishCand);
  var wishCoreMapMeta = mapMetaForCandidate(wishCoreCand);
  var downMapMeta = mapMetaForCandidate(downCand);
  if (downCand) {
    graphOnly.push(
      dest("down", downCand.name, "현실 타협으로 내려가는 선택", 52 + (seed & 9),
        persona.name + "이(가) 비용과 유지 가능성을 위해 한 단계 낮춰 보는 후보.",
        { desire: downDesire, mobility: downMobility, policy: 54 + (seed % 14),
          priceGap:{ value: gapStr(downPrice), pct: Math.abs(dGap), dir: "down" },
          pricePsm: psmLabelForCandidate(downCand), ltv: ltvLabel(Math.abs(dGap)), timeline: timeline(Math.abs(dGap)),
          commute: commute(downCand.dist) },
        { title:"<em>현실 타협</em>으로 보는 " + dn,
          paragraphs:[
            "<span class='hl'>" + rn + "에서 " + dn + "으로의 이동</span>은 " + downNarr,
            "가격은 낮아지지만, 그만큼 정체성이나 생활 리듬을 내려놓는 느낌이 커서 실제 실행 저항도 함께 존재한다." ],
          pull:{ q: pick(downPulls, 1), cite:"에디터 노트 · " + dn } },
        { mapRef: downMapMeta.mapRef, mapCoord: downMapMeta.mapCoord, graphOnly: true, parentId: downMapMeta.parentId, parentName: downMapMeta.parentName })
    );
  }

  return {
    destinations: [
      dest("peer", peerCand.name, peerCat, 68 + (seed & 15),
        persona.name + "의 " + traitAxis + "을 유지하면서 옮기는 가장 보수적인 후보.",
        { desire: 55 + (seed & 15), mobility: peerMobility, policy: 65 + (seed % 20),
          priceGap:{ value: gapStr(peerPrice), pct: Math.abs(pGap), dir: pGap >= 0 ? "up" : "down" },
          pricePsm: psmLabelForCandidate(peerCand), ltv: ltvLabel(Math.abs(pGap)), timeline: timeline(Math.abs(pGap)),
          commute: commute(peerCand.dist) },
        { title:"<em>" + pn + "</em>으로의 한 칸",
          paragraphs:[
            "<span class='hl'>" + rn + "에서 " + pn + "으로의 이동</span>은 " + peerNarr,
            "인접 권역이기에 " + traitAxis + "이 깨지지 않는다. 실거주 리스크가 가장 낮은 후보." ],
          pull:{ q: pick(peerPulls, 0), cite:"에디터 노트 · " + pn } },
        { mapRef: peerMapMeta.mapRef, mapCoord: peerMapMeta.mapCoord, parentId: peerMapMeta.parentId, parentName: peerMapMeta.parentName }),
      dest("up", upCand.name, upCat, 78 + (seed & 11),
        persona.name + "이 자주 호명하는 한 단계 위의 자리. " + upNarr,
        { desire: 78 + (seed & 15), mobility: upMobility, policy: 50 + (seed % 18),
          priceGap:{ value: gapStr(upPrice), pct: Math.abs(uGap), dir: uGap >= 0 ? "up" : "down" },
          pricePsm: psmLabelForCandidate(upCand), ltv: ltvLabel(Math.abs(uGap)), timeline: timeline(Math.abs(uGap)),
          commute: commute(upCand.dist) },
        { title:"<em>한 단계 위</em>, " + un,
          paragraphs:[
            "이 페르소나가 가장 자주 그리는 다음 좌표. <span class='hl'>" + un + "은 " + rn + "과 " + traitAxis + "은 공유하지만 위계가 다르다</span>.",
            "자기자본 격차(" + gapStr(upPrice) + ")는 분명하지만 24-36개월 내 자산 재편이 가능한 페르소나에게 실행 확률이 가장 높다." ],
          pull:{ q: pick(upPulls, 1), cite:"에디터 노트 · " + un } },
        { mapRef: upMapMeta.mapRef, mapCoord: upMapMeta.mapCoord, parentId: upMapMeta.parentId, parentName: upMapMeta.parentName }),
      dest("wish", wishCand.name, "끝까지 가보고 싶은 동네", 90 + (seed & 7),
        "이 페르소나가 마음속 가장 멀리 두는 동네. " + wn + "은 가격이 아니라 정체성이 기준이 되는 자리.",
        { desire: 90 + (seed & 7), mobility: wishMobility, policy: 30 + (seed % 16),
          priceGap:{ value: gapStr(wishPrice), pct: Math.abs(wGap), dir: wGap >= 0 ? "up" : "down" },
          pricePsm: psmLabelForCandidate(wishCand), ltv: ltvLabel(Math.abs(wGap)), timeline: timeline(Math.abs(wGap)),
          commute: commute(wishCand.dist) },
        { title:"<em>도달하고 싶은</em> " + wn,
          paragraphs:[
            wn + "은 자산 데이터에서 가장 멀리 있지만, 욕망 점수에서는 가장 가깝다. <span class='hl'>가격이 아니라 정체성이 기준</span>.",
            "이동가능성 " + wishMobility + "점. 단순 매수로는 어렵지만, 다른 두 후보를 평가하는 보이지 않는 기준점으로 작동한다." ],
          pull:{ q: pick(wishPulls, 2), cite:"에디터 노트 · " + wn } },
        { mapRef: wishMapMeta.mapRef, mapCoord: wishMapMeta.mapCoord, parentId: wishMapMeta.parentId, parentName: wishMapMeta.parentName }),
    ],
    graphOnlyDestinations: graphOnly.concat(wishCoreCand && wishCoreCand.name !== wishCand.name ? [
      dest("wishcore", wishCoreCand.name, "카드 밖에 있는 핵심 욕망", 96 + (seed & 3),
        "실제로 당장 선택되진 않지만, 이 페르소나가 끝내 마음속 기준으로 삼는 좌표.",
        { desire: 95 + (seed & 4), mobility: wishCoreMobility, policy: 26 + (seed % 10),
          priceGap:{ value: gapStr(corePrice), pct: Math.abs(cGap), dir: cGap >= 0 ? "up" : "down" },
          pricePsm: psmLabelForCandidate(wishCoreCand), ltv: ltvLabel(Math.abs(cGap)), timeline: timeline(Math.abs(cGap)),
          commute: commute(wishCoreCand.dist) },
        { title:"<em>그래프 밖으로 밀리지 않는</em> 핵심 욕망",
          paragraphs:[
            wcn + "은 카드 세 장 안에는 못 들어오지만, 이 페르소나가 계속 비교 기준으로 삼는 상징 좌표다.",
            "즉시 이동 후보라기보다, 다른 후보 둘의 높낮이를 재는 보이지 않는 자다." ],
          pull:{ q: pick(wishPulls, 3), cite:"에디터 노트 · " + wcn } },
        { mapRef: wishCoreMapMeta.mapRef, mapCoord: wishCoreMapMeta.mapCoord, graphOnly: true, parentId: wishCoreMapMeta.parentId, parentName: wishCoreMapMeta.parentName }),
    ] : []),
  };
}

function reverseTargetKey(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[·•ㆍ()\-\s]/g, "")
    .replace(/[,"'`]/g, "")
    .replace(/(시|군|구)$/g, "");
}

let REVERSE_AUDIENCE_CACHE = null;
let REVERSE_AUDIENCE_REGION_CACHE = null;
var REVERSE_ROLE_MIN_TOTAL = 5;
var REVERSE_ROLE_WISH_MIN_TOTAL = 3;
var REVERSE_AUDIENCE_PARENT_ALIASES = {
  "합정": "mapo",
  "성수": "seongdong",
  "한남": "yongsan",
  "청담": "gangnam",
  "압구정": "gangnam",
  "대치": "gangnam",
  "둔촌": "gangdong",
  "문정": "songpa",
  "송파(헬리오시티)": "songpa",
  "잠실(엘리트)": "songpa",
  "왕십리": "seongdong",
  "마곡": "gangseo",
  "반포·잠원": "seocho",
  "서초·반포": "seocho",
  "압구정·도곡": "gangnam",
  "상암·DMC": "mapo",
  "원흥·삼송": "gyeonggi-31101",
  "송도 6공구": "incheon-23040",
  "분당 정자": "gyeonggi-31023",
  "판교 백현": "gyeonggi-31023",
  "서현": "gyeonggi-31023",
  "광교중앙": "gyeonggi-31014",
  "송도국제도시": "incheon-23040",
};

function findParentRegionForReverseTarget(dest) {
  if (dest.parentId) {
    return REGIONS.find(function(region) { return region.id === dest.parentId; }) || null;
  }
  if (dest.mapRef) {
    var mapRegion = REGIONS.find(function(region) { return region.id === dest.mapRef; });
    if (mapRegion) return mapRegion;
  }
  var alias = REVERSE_AUDIENCE_PARENT_ALIASES[dest.name];
  if (alias) {
    return REGIONS.find(function(region) { return region.id === alias; }) || null;
  }
  var exact = REGIONS.find(function(region) {
    return reverseTargetKey(region.name) === reverseTargetKey(dest.name);
  });
  return exact || null;
}

function cloneReverseRoleBucket(bucket) {
  return {
    label: bucket.label,
    labelKr: bucket.labelKr,
    copy: bucket.copy,
    total: bucket.total,
    personaList: (bucket.personaList || []).map(function(persona) {
      return {
        id: persona.id,
        name: persona.name,
        emoji: persona.emoji,
        tagline: persona.tagline,
        count: persona.count,
        share: persona.share,
        topOrigins: (persona.topOrigins || []).map(function(origin) {
          return { id: origin.id, name: origin.name, count: origin.count };
        }),
      };
    }),
    originList: (bucket.originList || []).map(function(origin) {
      return { id: origin.id, name: origin.name, count: origin.count };
    }),
    fallbackFrom: bucket.fallbackFrom || null,
    fallbackNote: bucket.fallbackNote || null,
  };
}

function cloneReverseAudienceTarget(target) {
  return {
    key: target.key,
    targetName: target.targetName,
    parentId: target.parentId || null,
    parentName: target.parentName || null,
    roles: {
      peer: cloneReverseRoleBucket(target.roles.peer),
      up: cloneReverseRoleBucket(target.roles.up),
      wish: cloneReverseRoleBucket(target.roles.wish),
    },
  };
}

function mergeRoleIntoAggregate(aggregate, bucket) {
  aggregate.total += bucket.total || 0;

  (bucket.personaList || []).forEach(function(persona) {
    if (!aggregate.personas[persona.id]) {
      aggregate.personas[persona.id] = {
        id: persona.id,
        name: persona.name,
        emoji: persona.emoji,
        tagline: persona.tagline,
        count: 0,
        origins: {},
      };
    }
    aggregate.personas[persona.id].count += persona.count || 0;
    (persona.topOrigins || []).forEach(function(origin) {
      if (!origin || !origin.id) return;
      if (!aggregate.personas[persona.id].origins[origin.id]) {
        aggregate.personas[persona.id].origins[origin.id] = {
          id: origin.id,
          name: origin.name,
          count: 0,
        };
      }
      aggregate.personas[persona.id].origins[origin.id].count += origin.count || 0;
    });
  });

  (bucket.originList || []).forEach(function(origin) {
    if (!aggregate.origins[origin.id]) {
      aggregate.origins[origin.id] = { id: origin.id, name: origin.name, count: 0 };
    }
    aggregate.origins[origin.id].count += origin.count || 0;
  });
}

function finalizeAggregateRole(role, aggregate) {
  return {
    label: role.label,
    labelKr: role.labelKr,
    copy: role.copy,
    total: aggregate.total,
    personaList: Object.values(aggregate.personas)
      .map(function(persona) {
        var topOrigins = Object.values(persona.origins)
          .sort(function(a, b) { return b.count - a.count; })
          .slice(0, 3);
        return {
          id: persona.id,
          name: persona.name,
          emoji: persona.emoji,
          tagline: persona.tagline,
          count: persona.count,
          share: aggregate.total ? Math.round((persona.count / aggregate.total) * 100) : 0,
          topOrigins: topOrigins,
        };
      })
      .sort(function(a, b) {
        return (b.count - a.count) || a.name.localeCompare(b.name, "ko");
      }),
    originList: Object.values(aggregate.origins)
      .sort(function(a, b) { return b.count - a.count; }),
    fallbackFrom: null,
    fallbackNote: null,
  };
}

function buildCombinedReverseRoleBucket(roleMeta, buckets) {
  var aggregate = { total: 0, personas: {}, origins: {} };
  (buckets || []).forEach(function(bucket) {
    if (!bucket || !bucket.total) return;
    mergeRoleIntoAggregate(aggregate, bucket);
  });
  return finalizeAggregateRole(roleMeta, aggregate);
}

function buildReverseAudienceRegionIndex() {
  if (REVERSE_AUDIENCE_REGION_CACHE) return REVERSE_AUDIENCE_REGION_CACHE;

  var direct = buildReverseAudienceIndex();
  var roleMeta = {
    peer: { label: "PEER VIEW", labelKr: "현실 후보", copy: "이 동네를 지금의 대체재처럼 보는 사람들" },
    up: { label: "UPWARD STEP", labelKr: "갈 법한 상향지", copy: "다음 한 칸 위의 자리로 여기는 사람들" },
    wish: { label: "WISH REACHABLE", labelKr: "가보고 싶은 곳", copy: "마음속 가장 멀리 두는 사람들" },
  };

  var regionIndex = {};

  Object.values(direct).forEach(function(target) {
    if (!target.parentId) return;
    if (!regionIndex[target.parentId]) {
      regionIndex[target.parentId] = {
        regionId: target.parentId,
        regionName: target.parentName || target.targetName,
        roles: {
          peer: { total: 0, personas: {}, origins: {} },
          up: { total: 0, personas: {}, origins: {} },
          wish: { total: 0, personas: {}, origins: {} },
        },
      };
    }

    ["peer", "up", "wish"].forEach(function(roleKey) {
      mergeRoleIntoAggregate(regionIndex[target.parentId].roles[roleKey], target.roles[roleKey]);
    });
  });

  Object.values(regionIndex).forEach(function(regionBucket) {
    regionBucket.roles = {
      peer: finalizeAggregateRole(roleMeta.peer, regionBucket.roles.peer),
      up: finalizeAggregateRole(roleMeta.up, regionBucket.roles.up),
      wish: finalizeAggregateRole(roleMeta.wish, regionBucket.roles.wish),
    };
  });

  REVERSE_AUDIENCE_REGION_CACHE = regionIndex;
  return REVERSE_AUDIENCE_REGION_CACHE;
}

function buildReverseAudienceIndex() {
  if (REVERSE_AUDIENCE_CACHE) return REVERSE_AUDIENCE_CACHE;

  var roleMeta = {
    peer: { label: "PEER VIEW", labelKr: "현실 후보", copy: "이 동네를 지금의 대체재처럼 보는 사람들" },
    up: { label: "UPWARD STEP", labelKr: "갈 법한 상향지", copy: "다음 한 칸 위의 자리로 여기는 사람들" },
    wish: { label: "WISH REACHABLE", labelKr: "가보고 싶은 곳", copy: "마음속 가장 멀리 두는 사람들" },
  };

  var index = {};

  function personasForRegion(region) {
    var list = PERSONAS[region.id];
    if (list && list.length) return list;
    return buildGenericPersonas(region);
  }

  function reportFor(region, persona) {
    var custom = REPORTS[region.id] && REPORTS[region.id][persona.id];
    return custom || buildGenericReport(region, persona);
  }

  function touchTarget(dest) {
    var key = reverseTargetKey(dest.name);
    var parentRegion = findParentRegionForReverseTarget(dest);
    if (!index[key]) {
      index[key] = {
        key: key,
        targetName: dest.name,
        parentId: parentRegion ? parentRegion.id : (dest.parentId || null),
        parentName: parentRegion ? parentRegion.name : (dest.parentName || null),
        roles: {
          peer: { ...roleMeta.peer, total: 0, personas: {}, origins: {} },
          up: { ...roleMeta.up, total: 0, personas: {}, origins: {} },
          wish: { ...roleMeta.wish, total: 0, personas: {}, origins: {} },
        },
      };
    }
    if (!index[key].parentId && parentRegion) {
      index[key].parentId = parentRegion.id;
      index[key].parentName = parentRegion.name;
    }
    return index[key];
  }

  REGIONS.forEach(function(region) {
    personasForRegion(region).forEach(function(persona) {
      var report = reportFor(region, persona);
      (report.destinations || []).forEach(function(dest) {
        if (!dest || !dest.role || !roleMeta[dest.role]) return;
        var target = touchTarget(dest);
        var roleBucket = target.roles[dest.role];
        var personaKey = persona.id;
        var originKey = region.id;

        roleBucket.total += 1;

        if (!roleBucket.personas[personaKey]) {
          roleBucket.personas[personaKey] = {
            id: persona.id,
            name: persona.name,
            emoji: persona.emoji,
            tagline: persona.tagline,
            count: 0,
            origins: {},
          };
        }
        roleBucket.personas[personaKey].count += 1;
        roleBucket.personas[personaKey].origins[originKey] = (roleBucket.personas[personaKey].origins[originKey] || 0) + 1;

        roleBucket.origins[originKey] = roleBucket.origins[originKey] || { id: region.id, name: region.name, count: 0 };
        roleBucket.origins[originKey].count += 1;
      });
    });
  });

  Object.keys(index).forEach(function(key) {
    var target = index[key];
    Object.keys(target.roles).forEach(function(role) {
      var bucket = target.roles[role];
      bucket.personaList = Object.values(bucket.personas)
        .map(function(persona) {
          var topOrigins = Object.entries(persona.origins)
            .map(function(entry) {
              var originId = entry[0];
              var count = entry[1];
              var region = REGIONS.find(function(r) { return r.id === originId; });
              return region ? { id: originId, name: region.name, count: count } : null;
            })
            .filter(Boolean)
            .sort(function(a, b) { return b.count - a.count; })
            .slice(0, 3);
          return {
            id: persona.id,
            name: persona.name,
            emoji: persona.emoji,
            tagline: persona.tagline,
            count: persona.count,
            share: bucket.total ? Math.round((persona.count / bucket.total) * 100) : 0,
            topOrigins: topOrigins,
          };
        })
        .sort(function(a, b) {
          return (b.count - a.count) || a.name.localeCompare(b.name, "ko");
        });
      bucket.originList = Object.values(bucket.origins)
        .sort(function(a, b) { return b.count - a.count; });
      delete bucket.personas;
      delete bucket.origins;
    });
  });

  REVERSE_AUDIENCE_CACHE = index;
  return REVERSE_AUDIENCE_CACHE;
}

function getReverseAudienceForTarget(name) {
  var index = buildReverseAudienceIndex();
  var key = reverseTargetKey(name);
  var exact = index[key];
  if (!exact) return null;

  var target = cloneReverseAudienceTarget(exact);
  if (!exact.parentId) return target;

  var parentRegion = REGIONS.find(function(region) { return region.id === exact.parentId; });
  var regionIndex = buildReverseAudienceRegionIndex();
  var regionBucket = regionIndex[exact.parentId] || null;
  var roleMeta = {
    peer: { label: "PEER VIEW", labelKr: "현실 후보", copy: "이 동네를 지금의 대체재처럼 보는 사람들" },
    up: { label: "UPWARD STEP", labelKr: "갈 법한 상향지", copy: "다음 한 칸 위의 자리로 여기는 사람들" },
    wish: { label: "WISH REACHABLE", labelKr: "가보고 싶은 곳", copy: "마음속 가장 멀리 두는 사람들" },
  };
  if (!parentRegion && !regionBucket) {
    ["peer", "up", "wish"].forEach(function(role) {
      var minTotal = role === "wish" ? REVERSE_ROLE_WISH_MIN_TOTAL : REVERSE_ROLE_MIN_TOTAL;
      if (target.roles[role].total >= minTotal) return;
      var exactCombined = buildCombinedReverseRoleBucket(roleMeta[role], [exact.roles.peer, exact.roles.up, exact.roles.wish]);
      if (exactCombined.total > 0) {
        target.roles[role] = cloneReverseRoleBucket(exactCombined);
        target.roles[role].fallbackFrom = exact.targetName;
        target.roles[role].fallbackNote = exact.targetName + "에서 이 역할 집계가 적어, 다른 역할로 등장한 기록까지 함께 봤습니다.";
        target.roles[role].copy = exact.targetName + "이(가) 다른 역할에서 등장한 기록까지 함께 본 결과입니다.";
      }
    });
    return target;
  }

  var regionCombinedBuckets = regionBucket ? {
    peer: buildCombinedReverseRoleBucket(roleMeta.peer, [regionBucket.roles.peer, regionBucket.roles.up, regionBucket.roles.wish]),
    up: buildCombinedReverseRoleBucket(roleMeta.up, [regionBucket.roles.peer, regionBucket.roles.up, regionBucket.roles.wish]),
    wish: buildCombinedReverseRoleBucket(roleMeta.wish, [regionBucket.roles.peer, regionBucket.roles.up, regionBucket.roles.wish]),
  } : null;

  ["peer", "up", "wish"].forEach(function(role) {
    var minTotal = role === "wish" ? REVERSE_ROLE_WISH_MIN_TOTAL : REVERSE_ROLE_MIN_TOTAL;
    if (target.roles[role].total >= minTotal) return;
    var fallbackRegionName = (parentRegion && parentRegion.name) || (regionBucket && regionBucket.regionName) || exact.parentName || exact.targetName;

    if (regionBucket && regionBucket.roles[role] && regionBucket.roles[role].total > 0) {
      target.roles[role] = cloneReverseRoleBucket(regionBucket.roles[role]);
      target.roles[role].fallbackFrom = fallbackRegionName;
      target.roles[role].fallbackNote = fallbackRegionName + " 생활권까지 넓혀 같은 역할의 시나리오를 봤습니다.";
      target.roles[role].copy = fallbackRegionName + " 생활권까지 넓혀 본 " + target.roles[role].labelKr + " 시나리오";
      return;
    }

    var exactCombined = buildCombinedReverseRoleBucket(roleMeta[role], [exact.roles.peer, exact.roles.up, exact.roles.wish]);
    if (exactCombined.total > 0) {
      target.roles[role] = cloneReverseRoleBucket(exactCombined);
      target.roles[role].fallbackFrom = exact.targetName;
      target.roles[role].fallbackNote = exact.targetName + "에서 이 역할 집계가 적어, 다른 역할로 등장한 기록까지 함께 봤습니다.";
      target.roles[role].copy = exact.targetName + "이(가) 다른 역할에서 등장한 기록까지 함께 본 결과입니다.";
      return;
    }

    if (regionCombinedBuckets && regionCombinedBuckets[role] && regionCombinedBuckets[role].total > 0) {
      target.roles[role] = cloneReverseRoleBucket(regionCombinedBuckets[role]);
      target.roles[role].fallbackFrom = fallbackRegionName;
      target.roles[role].fallbackNote = fallbackRegionName + " 생활권에서 이 역할 집계가 적어, 전체 등장 기록까지 넓혀 봤습니다.";
      target.roles[role].copy = fallbackRegionName + " 생활권에서 이 동네가 어떤 역할로든 등장한 기록까지 함께 본 결과입니다.";
    }
  });

  return target;
}

window.__APP_DATA__ = {
  REGIONS,
  SEOUL_SHAPES,
  PERSONAS,
  REPORTS,
  buildGenericReport,
  buildGenericPersonas,
  buildReverseAudienceIndex,
  getReverseAudienceForTarget,
};
