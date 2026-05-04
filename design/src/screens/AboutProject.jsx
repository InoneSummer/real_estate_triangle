/* global React */
const { useEffect } = React;

function AboutProject({ onClose }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="about-page page-enter">
      <div className="about-shell">
        <header className="about-hero">
          <div>
            <span className="eyebrow">About Project</span>
            <h1>
              욕망의 삼각형으로 읽는
              <br />
              <em>부동산 이동 상상력</em>
            </h1>
          </div>
          <p className="about-hero-copy">
            집을 옮기고 싶다는 마음은 어디에서 올까요?
            이 프로젝트는 르네 지라르의 '모방 욕망' 이론을 빌려,
            같은 동네에 사는 비슷한 사람들이 다음에 어디를 바라보는지를 지도 위에 그려봅니다.
            Nemotron 페르소나 데이터셋, 한국부동산원 통계, 국토부 실거래가를 재료로 썼지만
            — 해석 과정에 합성 페르소나와 휴리스틱이 들어가므로, 실제 투자 판단의 근거로 쓸 수 있는 자료는 아닙니다.
          </p>
        </header>

        <div className="about-grid">
          <article className="about-card about-lead">
            <span className="about-kicker">Project Overview</span>
            <h2>이 프로젝트가 하려는 일</h2>
            <p>
              "지금 집을 사야 하나?"에 답하는 도구가 아닙니다.
              "나랑 비슷한 사람들은 다음에 어디를 보고 있을까?"를 지도 위에 펼쳐 보는 리포트에 가깝습니다.
              지역을 고르고, 페르소나를 고르면 — 그 사람이 갈 법한 세 곳이 나옵니다.
            </p>
            <p>
              집값만 비교하지 않습니다. 상급지에 대한 동경, 자산 방어 심리, 학군,
              뉴스가 만드는 분위기, 정책 신호 같은 것들이 한데 엮여서
              누군가의 '이사 상상력'을 만든다는 게 이 프로젝트의 전제입니다.
            </p>
          </article>

          <article className="about-card">
            <span className="about-kicker">Girard Frame</span>
            <h2>왜 '욕망의 삼각형'인가</h2>
            <p>
              프랑스 철학자 르네 지라르는 이렇게 말했습니다 — 사람은 자기가 뭘 원하는지 스스로 아는 게 아니라,
              <strong>다른 사람이 원하는 걸 보고 따라 원한다</strong>고.
              내가 뭔가를 욕망할 때, 거기엔 항상 내 욕망을 부추기는 '모델'이 있다는 겁니다.
            </p>
            <ul className="about-list">
              <li><strong>주체</strong> — 지금 어떤 동네에 사는 나</li>
              <li><strong>대상</strong> — 집 자체라기보다, '거기 살면 달라질 삶'이라는 이미지</li>
              <li><strong>매개자</strong> — 비슷한 처지의 지인, 상급지 사는 사람들, 뉴스, 정책 신호</li>
            </ul>
            <p>
              이걸 한국 부동산에 대입하면 꽤 많은 게 설명됩니다.
              사람들이 정보를 분석해서 목적지를 정한다기보다,
              비슷한 사람들의 시선을 따라 이사 상상을 한다는 게 이 프로젝트의 출발점입니다.
            </p>
          </article>

          <article className="about-card">
            <span className="about-kicker">Persona Dataset</span>
            <h2>페르소나는 어디서 왔나</h2>
            <p>
              "나랑 비슷한 사람"을 만들기 위해 NVIDIA의 <strong>Nemotron-Personas-Korea</strong> 데이터셋을 씁니다.
              한국의 인구통계·지역·직업·교육 분포를 바탕으로 합성한 700만 건 규모의 페르소나인데,
              실제 인물이 아니라 통계적으로 그럴듯한 가상 인물이라는 점이 중요합니다.
            </p>
            <ul className="about-list">
              <li>100만 레코드, 700만 페르소나 — CC BY 4.0 공개</li>
              <li>17개 시도, 252개 시군구, 7개 유형</li>
              <li>부동산 보유·소득 분위 정보는 없음</li>
            </ul>
            <p>
              자산을 정확히 추정하기 위한 데이터가 아니라,
              "이런 사람이 이 동네에 산다면 어디를 바라볼까"를 상상하기 위한 배경층입니다.
            </p>
            <a
              className="about-link"
              href="https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea"
              target="_blank"
              rel="noreferrer"
            >
              데이터셋 보러가기 ↗
            </a>
          </article>

          <article className="about-card">
            <span className="about-kicker">Data Sources</span>
            <h2>어떤 데이터를 쓰나</h2>
            <p>
              가격은 한국부동산원과 국토부 실거래가에서, 분위기는 네이버 뉴스에서 가져옵니다.
              세 가지를 엮어서 지역의 가격 수준, 최근 방향, 진입 간극, 정책 온도를 읽습니다.
            </p>
            <ul className="about-list">
              <li>한국부동산원 — 매매가격지수, 중위가, 전세/매매 비율</li>
              <li>국토교통부 — 아파트 월별 실거래가·거래량</li>
              <li>네이버 뉴스 — 정책 키워드, 지역 분위기 신호</li>
            </ul>
            <p>
              지금 보고 계신 화면은 이 구조가 어떻게 작동하는지 보여주는 에디토리얼 프리뷰입니다.
              실 서비스에서는 더 세밀한 경계 데이터와 뉴스 집계가 붙게 됩니다.
            </p>
            <p>
              데이터 수집·분석상의 한계로, 현재 지도와 리포트는{" "}
              <strong>서울 및 수도권(경기·인천)</strong> 지역에 한정되어 있습니다.
              향후 데이터가 확보되는 대로 범위를 넓힐 계획입니다.
            </p>
          </article>

          <article className="about-card about-made-by">
            <span className="about-kicker">Made By</span>
            <div className="about-made-by-row">
              <div className="about-avatar about-avatar-fallback" aria-hidden="true">
                <span className="about-avatar-glyph">🐾</span>
              </div>
              <div>
                <h2>만든 사람</h2>
                <p>
                  <strong>AskDori!</strong> — AI를 쉽고 가볍게 풀어내는 유튜브 채널입니다.
                  AI와 데이터, 그리고 인터페이스를 엮어서
                  한국인의 생활 속 욕망 구조를 시각화해보는 실험 중입니다.
                </p>
                <a
                  className="about-link"
                  href="https://www.youtube.com/channel/UCOheZes-Cg3Hrq1km5vsAtQ/"
                  target="_blank"
                  rel="noreferrer"
                >
                  유튜브 채널 보기 ↗
                </a>
              </div>
            </div>
          </article>

          <article className="about-card about-legal">
            <span className="about-kicker">Credits & License</span>
            <h2>출처와 저작권</h2>
            <ul className="about-list">
              <li>Nemotron-Personas-Korea — NVIDIA, CC BY 4.0</li>
              <li>부동산 통계·실거래가 — 한국부동산원, 국토교통부 (각 기관 권리)</li>
              <li>모방 욕망 이론 — 르네 지라르 (해석 프레임으로 참조)</li>
              <li>기획·해설·시각화·UI — AskDori!</li>
            </ul>
            <p className="about-legal-note">
              © AskDori! All rights reserved. 외부 데이터는 각 권리자의 라이선스를 따릅니다.
            </p>
          </article>
        </div>

        <div className="about-foot">
          <button className="btn-ghost" onClick={onClose}>← 리포트로 돌아가기</button>
        </div>
      </div>
    </section>
  );
}

window.AboutProject = AboutProject;
