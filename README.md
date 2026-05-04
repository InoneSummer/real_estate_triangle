# 내 마음속 부동산 이동지도

> 집값 말고, 욕망을 지도에 찍어보는 실험

`내 마음속 부동산 이동지도`는 한국인의 부동산 이동 욕망을 지역, 페르소나, 가격 힌트, 르네 지라르의 욕망의 삼각형 이론으로 시각화해보는 인터랙티브 프로젝트입니다.

이 프로젝트의 질문은 단순합니다.

> 나와 같은 동네에 사는 사람들은 다음에 어디로 가고 싶어할까?

서비스 데모: https://naileditapp.com

영상 소개: [Ask Dori! YouTube에서 보기](https://youtu.be/xO-IstQTtDI?si=-RURo_Ib96gJrGGt)

[![내 마음속 부동산 이동지도 소개 영상](https://img.youtube.com/vi/xO-IstQTtDI/hqdefault.jpg)](https://youtu.be/xO-IstQTtDI?si=-RURo_Ib96gJrGGt)

## 무엇을 보여주나요?

사용자는 먼저 지금 사는 지역을 고릅니다. 그다음 그 지역에 있을 법한 페르소나를 선택합니다. 마지막 리포트에서는 해당 페르소나가 다음에 바라볼 만한 목적지를 네 가지 역할로 나누어 보여줍니다.

- `현실 후보`: 지금 생활권을 크게 깨지 않고 옮길 수 있는 비교 후보
- `상향 희망`: 한 단계 위의 주거/자산/생활 좌표로 상상되는 후보
- `현실 타협`: 가격, 거리, 생활 조건 때문에 한 단계 낮춰 보는 후보
- `가고싶은 곳`: 당장 어렵더라도 계속 비교 기준으로 삼는 욕망의 목적지

이 프로젝트는 정확한 시세 조회 서비스가 아니라, 부동산을 둘러싼 사회적 욕망과 이동 상상을 읽어보는 에디토리얼 시뮬레이션입니다.

## 왜 만들었나요?

보통 부동산 지도는 가격, 거래량, 호가, 실거래가를 보여줍니다. 하지만 실제로 집을 고를 때 사람들은 숫자만 보지 않습니다.

사람들은 이런 것들도 함께 봅니다.

- 그 동네에 어떤 사람들이 산다고 상상되는가
- 그 동네에 산다는 말이 어떤 사회적 신호처럼 읽히는가
- 자녀 교육, 직장, 출퇴근, 생활 취향이 어떻게 이어지는가
- 지금 사는 곳을 발판으로 다음에 어디까지 갈 수 있다고 느끼는가

그래서 이 프로젝트는 “가격 지도”가 아니라 “욕망 지도”를 만들어보자는 실험에서 출발했습니다.

## 이론적 배경

이 프로젝트의 출발점은 르네 지라르의 욕망의 삼각형 이론입니다.

지라르는 사람이 대상을 직접 욕망하는 것이 아니라, 다른 사람이 욕망하는 것을 통해 욕망한다고 보았습니다. 이 관점을 부동산으로 옮기면, 우리는 집 자체만 원하는 것이 아닐 수 있습니다. 그 동네에 산다고 상상되는 사람들, 그들의 직업, 교육 방식, 자산 구조, 생활 이미지를 함께 욕망하는 것일 수 있습니다.

이 프로젝트에서는 그 구조를 다음처럼 해석했습니다.

- `나`: 현재 특정 지역에 살고 있는 사람
- `매개자`: 닮고 싶거나 비교하게 되는 사람/집단/생활 이미지
- `욕망의 동네`: 매개자를 통해 욕망하게 되는 목적지

## 사용한 데이터

이 public repository는 공개 가능한 수준의 설명과 데모 코드를 제공합니다.

### 한국인 페르소나 데이터셋

이 프로젝트는 NVIDIA의 `Nemotron-Personas-Korea` 데이터셋을 페르소나 구성의 참고 재료로 사용했습니다.

- Dataset: https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea
- License: CC BY 4.0

이 데이터셋은 실제 개인을 추적하는 데이터가 아니라, 한국 사회에 있을 법한 다양한 프로필 조합을 만들 수 있게 해주는 synthetic persona dataset입니다. 이름, 성별, 나이, 혼인상태, 교육 수준, 직업, 거주지역 등의 속성을 합성해 한국어 페르소나를 구성하는 데 활용할 수 있습니다.

데이터셋을 언급하거나 이 프로젝트의 방법론을 재사용할 때는 NVIDIA가 요청한 아래 BibTeX를 함께 인용해주세요.

```bibtex
@software{nvidia/Nemotron-Personas-Korea,
  author = {Kim, Hyunwoo and Ryu, Jihyeon and Lee, Jinho and Ryu, Hyungon and Praveen, Kiran and Prayaga, Shyamala and Thadaka, Kirit and Jennings, Will and Sadeghi, Bardiya and Sharabiani, Ashton and Choi, Yejin and Meyer, Yev},
  title = {Nemotron-Personas-Korea: Synthetic Personas Aligned to Real-World Distributions for Korea},
  month = {April},
  year = {2026},
  url = {https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea}
}
```

### 부동산 데이터

부동산의 현실감을 보강하기 위해 다음 데이터 계열을 참고했습니다.

- 한국부동산원 데이터: 가격지수, 중위매매가격, 전세가율 등 지역 시장 상태와 위계 참고
- 국토교통부 아파트 매매 실거래가 데이터: 실거래 기반 가격 힌트와 평단가 기준선 참고
- 뉴스/정책 신호: 지역 이슈, 개발, 교통, 규제 프레임 참고

단, 이 저장소의 public 버전은 원천 인증키나 전체 수집 파이프라인을 포함하지 않습니다.

## 주요 화면 흐름

1. 지역 선택
2. 지역별 대표 페르소나 선택
3. 리포트 확인
4. 목적지 카드 비교
5. 선호도 x 이동 가능성 4사분면 그래프 확인
6. 가격 차이와 에디터 노트 확인
7. “이 동네를 원하는 사람은 누구인가” 역수요 보기

## 주요 메트릭

이 프로젝트의 점수는 투자 판단을 위한 정량 모델이 아니라, 에디토리얼 시뮬레이션을 위한 설명용 스코어입니다.

- `선호도`: 상징성, 자산 위계, 페르소나 친화도, 생활 이미지 등을 반영한 욕망의 강도
- `이동 가능성`: 가격 차이, 생활권 거리감, 접근성, 현실적 실행 가능성을 반영한 점수
- `가격 차이`: 현재 거주지의 평단가 기준선 대비 후보지의 상대적 차이
- `역수요`: 특정 지역을 현실 후보, 상향 희망, 가고싶은 곳으로 보는 페르소나 집단

## 구현 방식

현재 공개 버전은 정적 웹앱입니다.

- `Vercel`: 정적 파일 배포
- `React`: 브라우저에서 지역, 페르소나, 가격 힌트, 목적지 로직 조합
- `Generated data`: 검토된 데모용 데이터와 가격 힌트
- `Local/Backend workflow`: 원천 데이터 수집, 가공, 알림, 실험적 LLM 패스는 공개 브라우저 밖에서 처리

사용자가 웹에서 지역과 페르소나를 선택하면, 브라우저 안의 React 앱이 사전 생성된 데이터와 로직을 조합해 리포트를 렌더링합니다. 사용자가 클릭할 때마다 서버에서 LLM을 호출하는 구조가 아닙니다.

## 주의

이 프로젝트는 투자 추천, 시세 예측, 대출 가능액 산정 서비스가 아닙니다.

화면의 결과는 공공 데이터와 synthetic persona dataset을 참고한 AI 기반 에디토리얼 시뮬레이션입니다. 실제 부동산 매수, 매도, 대출, 투자 판단에는 반드시 최신 원천 데이터와 전문가 검토가 필요합니다.

## Credits

- 기획/제작/최종 편집 책임: Ask Dori!
- Persona dataset: NVIDIA Nemotron-Personas-Korea
- AI-assisted implementation and documentation: OpenAI Codex
- AI-assisted product design exploration: Anthropic Claude
- Public demo: https://naileditapp.com
- YouTube: https://www.youtube.com/channel/UCOheZes-Cg3Hrq1km5vsAtQ/

Codex와 Claude는 이 프로젝트의 제작 과정에서 코드 구현, 디자인 탐색, 문서화, QA를 보조한 AI 협업 도구로 표기합니다. 프로젝트의 기획, 공개 범위 결정, 최종 편집 책임은 Ask Dori!에 있습니다.

## How to Cite

이 프로젝트를 소개할 때는 아래처럼 인용할 수 있습니다.

```text
Ask Dori!. 내 마음속 부동산 이동지도: 한국인 페르소나와 부동산 데이터를 활용한 욕망의 이동 지도. 2026.
https://naileditapp.com
```

데이터셋 자체를 인용할 때는 위의 `Nemotron-Personas-Korea` BibTeX를 사용해주세요.

## License

이 공개 저장소는 dual-license 방식을 권장합니다.

- Code: `MIT License`
- Documentation, editorial content, demo/sample data, and visual assets: `CC BY-NC 4.0`
- Third-party datasets and public data sources retain their original licenses and attribution requirements.

`Nemotron-Personas-Korea` is licensed under `CC BY 4.0`; please follow NVIDIA's attribution requirements and cite the dataset using the BibTeX above.

This project is for editorial, educational, and research-oriented demonstration. Commercial reuse of the project's written content, curated demo data, and visual presentation requires separate permission from Ask Dori!.
