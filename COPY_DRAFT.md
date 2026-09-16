# 카피 재상향 초안 (견적 고도화 후 반영용)

작성일: 2026-09-15
상태: **초안 — 아직 index.html에 반영 안 함**. 견적 고도화(P2) 검증에서 2개 시나리오가
예약까지 못 가는 문제가 있어 설계가 바뀔 수 있음. 아래 각 항목의 "확인 필요"를
실제 구현 확정 후 채우고, 그 다음에 index.html에 반영할 것.

기준 커밋: `54bc0f5` (2026-09-14, 카피 8곳을 현재 사양으로 낮춤)

---

## 브랜드 보이스 체크리스트 (모든 초안에 적용)

- 짧고 직접적이고 따뜻하게. You(가게 사장) 중심 — "Pobare가 한다"보다 "당신이 얻는 것"
- hype 금지: revolutionary, seamless, game-changing, cutting-edge 등 사용 안 함
- **"AI 챗봇"이라는 표현 쓰지 않음** — 기존 사이트 표현인 "it" / "an assistant"를 유지
- 과장 금지 — 구현 확정 전까지는 단정적 문구("always", "every time") 대신
  실제 동작 범위에 맞는 절제된 표현 사용

---

## 1. 낮춘 8곳 목록 (위치 · 원래 · 현재)

| # | 위치 (현재 라인) | 원래 문구 (~09-14 이전) | 현재 낮춘 문구 |
|---|---|---|---|
| 1 | `<meta name="description">` (L7) | "...quotes the job, asks the right questions, and takes the booking..." | "...quotes the job and takes the booking..." |
| 2 | 히어로 리드 `.lead` (L278) | "...answers the message, asks what it needs to quote, and takes the booking..." | "...answers the message, quotes your starting price, and takes the booking..." |
| 3 | "Why a booking link isn't enough" 체크리스트 3항목 (L360-362) | "Asks vehicle size, condition and scope before quoting" / "Gives a range you set, then confirms on inspection" / "Handles add-ons — pet hair, ozone, engine bay, ceramic" | "Matches the vehicle to the service they pick, then quotes your starting price" / "Gives the starting price up front..." / "Books the date, time and contact info..." |
| 4 | "How it works" STEP 1 본문 (L445) | "...your packages, your ranges, your add-ons, your hours." | "...your packages, your starting prices, your hours." |
| 5 | "You stay in control" 체크리스트 1항목 (L471) | "Quotes only inside the ranges you set" | "Quotes only using the starting prices you set" |
| 6 | "What it handles" 카드 — 제목/본문 (L512-513) | "Quotes the way you'd quote" / "Asks the questions that change the price, then gives your range. No made-up numbers." | "Quotes your starting price instantly" / "Replies with the starting price for the service they picked..." |
| 7 | "What it handles" 카드 — "Collects everything" 본문 (L518) | "Vehicle, condition, service, day, name and number..." | "Service, day, time, name and number..." |
| 8 | FAQ "wrong price" 답변 (L603) | "It can only use the ranges you gave us — it won't invent a number..." | "Not yet a range — here's exactly where it stands. Today it quotes the single starting price..." |

---

## 2. 위치별 재상향 초안

> ⚠️ 원래(09-14 이전) 문구로 되돌리는 게 아님 — 실제 구현(가격 범위·차량 상태 질문·
> 애드온 인식)에 맞춰 새로 씀. 구현을 직접 보지 않았으므로 세부 사실은 각 항목의
> "확인 필요"로 명시.

### #1 Meta description
- **영문(반영안)**: "Pobare answers the inquiries you can't get to — asks what it needs, quotes the range, and takes the booking. Built for one-person detailing shops. Free to start."
- **한국어 참고번역**: "Pobare가 놓칠 뻔한 문의에 답합니다 — 필요한 걸 묻고, 범위를 견적내고, 예약까지 받습니다. 1인 디테일링 샵을 위해 만들었습니다. 무료로 시작하세요."
- **확인 필요**: "asks what it needs"라고 부를 만큼 질문이 자연스러운지(질문이 1개뿐이면 "asks" 대신 다른 동사가 나을 수 있음), "quotes the range"라는 표현이 실제 응답 형식(예: "$75–95")과 맞는지

### #2 히어로 리드
- **영문(반영안)**: "You're three hours into a paint correction. Pobare answers the message, asks what it needs, and quotes a range — so the job doesn't leave while your hands are full."
- **한국어 참고번역**: "페인트 교정 작업 3시간째. 그 사이 Pobare가 메시지에 답하고, 필요한 걸 묻고, 범위로 견적을 냅니다 — 손이 바쁜 사이 일이 다른 데로 새지 않도록."
- **확인 필요**: "takes the booking"을 리드에서 뺐던 이전 버전과 달리 다시 넣을지(문장 길이 vs 정보량 트레이드오프), 질문이 지연 없이 즉시 나가는지(리드 문장의 리듬상 "asks what it needs" 뒤에 바로 "quotes"가 이어져야 자연스러움)

### #3 "Why a booking link isn't enough" 체크리스트 (3항목)
- **영문(반영안)**:
  1. "Asks what it needs — vehicle, condition, scope — before it quotes"
  2. "Gives a range, confirmed once every detail's in"
  3. "Recognizes the add-ons you've told it about"
- **한국어 참고번역**:
  1. "견적 전에 필요한 걸 먼저 묻습니다 — 차량, 상태, 범위"
  2. "범위로 안내하고, 세부사항이 다 모이면 확정합니다"
  3. "미리 알려준 애드온을 알아봅니다"
- **확인 필요**:
  - 질문이 정확히 몇 개 항목(차량/상태/범위 셋 다인지, 일부만인지)을 묻는지 — "vehicle, condition, scope" 3단어를 그대로 써도 되는지
  - "confirmed once every detail's in"이 실제 흐름(챗봇 내에서 바로 확정 vs 사장 승인 후 확정)과 맞는지 — 기존 승인 카드("Waiting for your approval") 흐름이 살아있다면 "confirmed"라는 단어가 오해를 줄 수 있어 "then flagged for your approval" 식으로 조정 필요할 수 있음
  - 애드온 인식이 몇 종류/어떤 목록인지 (기존엔 "pet hair, ozone, engine bay, ceramic"처럼 구체 예시가 있었음 — 실제 인식 목록이 다르면 예시 단어를 새로 골라야 함), 인식 실패 시 폴백 동작이 있는지

### #4 "How it works" STEP 1 본문
- **영문(반영안)**: "A photo of your price list is enough. We build it out with you — your packages, your ranges, your add-ons, your hours."
- **한국어 참고번역**: "가격표 사진 한 장이면 충분합니다. 패키지, 범위, 애드온, 영업시간까지 함께 만들어 드립니다."
- **확인 필요**: 온보딩 단계에서 실제로 사장이 "range"와 "add-on"을 별도로 입력/설정하는 UI가 있는지 — 없다면(자동 추론이라면) "we build it out with you" 대신 다른 주어가 필요

### #5 "You stay in control" 체크리스트 1항목
- **영문(반영안)**: "Quotes only inside the ranges you set"
- **한국어 참고번역**: "당신이 정한 범위 안에서만 견적을 냅니다"
- **확인 필요**: 없음 — 배경에 명시된 "가격 범위" 구현과 정확히 일치하는 문구라 09-14 이전 원문 그대로 되돌려도 될 가능성이 높음. 다만 범위를 사장이 직접 "설정"하는 구조가 맞는지만 확인

### #6 "What it handles" 카드 — 제목/본문
- **영문(반영안)**: 제목 "Quotes the way you'd quote" / 본문 "Asks what changes the price, then gives your range. No made-up numbers."
- **한국어 참고번역**: 제목 "당신처럼 견적을 냅니다" / 본문 "가격이 달라지는 요인을 묻고, 범위로 안내합니다. 지어낸 숫자는 없습니다."
- **확인 필요**: "Asks what changes the price"가 실제 질문 문항(차량 상태 등)의 성격을 정확히 표현하는지, 질문이 1턴인지 여러 턴인지에 따라 "Asks" 뒤 서술이 달라져야 함

### #7 "What it handles" 카드 — "Collects everything" 본문
- **영문(반영안)**: "Vehicle, condition, service, day, name and number — all in the chat, all in one place."
- **한국어 참고번역**: "차량, 상태, 서비스, 날짜, 이름과 연락처까지 — 채팅 안에서 한 번에."
- **확인 필요**: 없음 — 차량 상태 질문 구현과 정확히 일치. 다만 "condition"이 실제 수집 필드명과 같은 뜻인지만 확인

### #8 FAQ "wrong price?" 답변
- **영문(반영안)**: "It can quote a range now, not just a single price. It only uses the ranges and add-ons you gave us — it won't invent a number. And on the free plan nothing is confirmed until you approve it, so you see the quote before the customer is held to it. Most owners watch closely for a week or two, then let it run."
- **한국어 참고번역**: "이제 단일 가격이 아니라 범위로 견적을 낼 수 있습니다. 당신이 준 범위와 애드온 안에서만 움직이고, 숫자를 지어내지 않습니다. 무료 플랜에서는 승인 전까지 아무것도 확정되지 않으니, 고객에게 전달되기 전에 먼저 확인할 수 있습니다. 대부분의 사장님은 1~2주 정도 지켜본 뒤 자동으로 맡깁니다."
- **확인 필요**: **가장 중요 — 검증에서 2개 시나리오가 예약까지 못 가는 문제가 이 FAQ 답변의 신뢰도와 직결됨.** 이 문제가 해결되기 전에는 "it won't invent a number"라고 단정하는 이 문구를 올리면 안 됨. 해결 여부·범위(어떤 시나리오가 실패하는지, 사용자에게 보이는 실패인지 내부 로직 문제인지)부터 확인 필요

---

## 3. "확인 필요" 종합 (구현 확정 후 채울 것)

1. 차량 상태 질문 — 정확히 몇 개 항목을 묻는지, 문항 문구, 몇 턴에 걸쳐 묻는지
2. 가격 범위 — 응답 형식(예: "$75–95" vs "75~95달러"), 사장이 범위를 직접 설정하는 UI가 있는지
3. 애드온 인식 — 인식 가능한 애드온 목록/개수, 인식 실패 시 동작(무시하는지, 되묻는지)
4. 견적 확정 흐름 — 챗봇이 범위를 "확정"하는 시점이 승인 카드(사장 승인) 이전/이후 중 어디인지, 기존 "Waiting for your approval" 흐름과 문구가 충돌하지 않는지
5. **검증 실패 2개 시나리오** — 예약까지 못 가는 원인이 무엇인지, 사용자 대면 실패인지, FAQ #8 문구를 올려도 되는 수준으로 해결됐는지 (가장 우선순위 높음 — 이게 해결되기 전엔 8곳 중 어느 것도 index.html에 올리면 안 됨)

---

## 4. 목업 변경 필요 목록 (구조 변경 없이 "무엇을" 바꿔야 하는지만 — 이번 라운드에서 실제 반영 안 함)

현재 히어로 챗 목업의 승인 카드(`.card-out`)는 3줄 구조:
```
<span class="k">Waiting for your approval</span>
<span class="v">Wed, Sept 24 · Basic Wash - Truck · 75달러부터</span>
<span class="s">Jungtae Kim · 587-971-5904 · #b0ef3527</span>
```

- **가격 범위가 생기면**: `.v` 줄의 "75달러부터"(단일 시작가)를 범위 표기(예: "$75–95")로 교체 필요. 형식은 위 "확인 필요 #2" 확정 후 결정
- **애드온이 인식되면**: 현재 구조엔 애드온을 보여줄 자리가 없음 — `.s` 줄에 이어붙이거나, 새 줄(예: "Notes: pet hair removal")을 추가해야 함. 몇 개까지 표시할지, 어떤 문구("Notes" vs "Add-ons")를 쓸지는 확인 필요 #3 확정 후 결정
- **차량 상태 질문이 생기면**: 현재 히어로/보조 챗 패널 대화 모두 "서비스 선택 → 바로 견적"으로 이어짐(질문 턴 없음). 조건 질문이 실제 대화 흐름에 들어간다면, 대화 중간에 질문-답변 한 쌍을 추가하는 게 가장 실제에 가까움 — 정확한 문구는 확인 필요 #1 확정 후 작성
- 이 세 가지 모두 **이번 라운드에서는 반영하지 않음** — 목록만 정리해 다음 라운드 스코프로 남김

---

## 5. 우선순위 제언

FAQ 답변(#8)과 체크리스트 항목(#3)은 "검증 실패 2개 시나리오"와 직접 맞물려 있어
가장 늦게 확정해야 함. 반대로 #5("You stay in control")와 #7("Collects everything")은
배경에 명시된 구현 내용과 거의 그대로 일치해 가장 먼저 확정 가능한 후보.
