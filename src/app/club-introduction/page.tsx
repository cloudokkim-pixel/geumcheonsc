"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import GCSCHeader from "@/components/GCSCHeader";
import Footer from "@/components/Footer";
import { useSiteLanguage, type Locale } from "@/components/site-language";

type CoachData = {
  name: string;
  role: string;
  career: string;
  philosophy: string;
  playerCareer?: string[];
  coachingCareer?: string[];
};

type ClubIntroCopy = {
  heroLabel: string;
  heroTitle: [string, string];
  heroSub: string;
  mvLabel: string;
  mission: { tag: string; title: [string, string]; sub: string };
  vision: { tag: string; title: string; sub: string };
  valuesLabel: string;
  valuesTitle: [string, string];
  values: Array<{ num: string; title: string; body: string }>;
  posLabel: string;
  posTitle: [string, string];
  posSub: string;
  posRows: Array<{ themName: string; themText: string; usText: string }>;
  coachLabel: string;
  coachTitle: [string, string];
  coachSub: string;
  coachProfileLabels: { player: string; coaching: string; philosophy: string };
  coaches: CoachData[];
  activityLabel: string;
  activityTitle: [string, string];
  activityCaptions: [string, string, string, string];
  activityCta: string;
  promiseLabel: string;
  promiseText: [string, string, string];
  promiseSub: string;
};

const copy: Record<Locale, ClubIntroCopy> = {
  ko: {
    heroLabel: "About · Since 2015 · G.C.S.C",
    heroTitle: ["축구 팀이 아니라", "축구 매니지먼트 클럽"],
    heroSub: "2015년 창단, 서울 서남권 기반. 선수의 커리어 전체를 설계하고 끝까지 성장시키는 클럽입니다.",
    mvLabel: "Mission & Vision · G.C.S.C",
    mission: {
      tag: "Mission — 우리는 왜 존재하는가",
      title: ["선수를 키우는 곳이 아니라,", "선수의 길을 설계하는 시스템"],
      sub: "단순 훈련 서비스가 아닌, 선수의 커리어 전체를 설계하고 성장시키는 매니지먼트 클럽입니다.",
    },
    vision: {
      tag: "Vision — 10년 후 우리의 모습",
      title: "G.C.S.C 출신 선수가 K리그와 해외 무대에서 뛰는 것이 당연한 클럽",
      sub: "2035년까지 서울 서남권에서 가장 많은 선수를 성인 무대로 배출하는 유소년 통합형 선수개발 클럽.",
    },
    valuesLabel: "Core Values · G.C.S.C",
    valuesTitle: ["우리가 지키는", "세 가지 약속"],
    values: [
      {
        num: "핵심 가치 01",
        title: "끝까지 성장시킨다",
        body: "유소년부터 성인 무대까지. 중간에 멈추지 않는 선수의 성장 경로를 만드는 것이 우리의 약속입니다.",
      },
      {
        num: "핵심 가치 02",
        title: "시스템으로 성장한다",
        body: "개인 코치의 능력이 아닌, 클럽 전체의 일관된 프레임워크로 선수를 성장시킵니다.",
      },
      {
        num: "핵심 가치 03",
        title: "재능을 낭비하지 않는다",
        body: "상위 1%가 아닌 상위 20~40%의 선수들. 시스템이 있어서 묻혀있는 재능을 발굴하고 키웁니다.",
      },
    ],
    posLabel: "Why G.C.S.C · Positioning",
    posTitle: ["다른 곳과", "무엇이 다른가"],
    posSub: "훈련만 하는 곳은 많습니다. G.C.S.C는 다릅니다.",
    posRows: [
      {
        themName: "한국 축구부",
        themText: "팀을 위해 선수를 씁니다",
        usText: "선수를 위해 팀을 운영합니다",
      },
      {
        themName: "K리그 유스팀",
        themText: "선택된 상위 1%의 길입니다",
        usText: "성장할 상위 20~40%의 길입니다",
      },
      {
        themName: "민간 아카데미",
        themText: "훈련에서 끝납니다",
        usText: "성인 무대까지 이어집니다",
      },
    ],
    coachLabel: "Coaching Staff · G.C.S.C",
    coachTitle: ["선수의 곁에서", "함께하는 사람들"],
    coachSub: "G.C.S.C의 지도자는 가르치는 사람이 아닙니다. 선수의 길을 함께 설계하는 파트너입니다.",
    coachProfileLabels: { player: "선수경력", coaching: "지도경력", philosophy: "지도 철학" },
    coaches: [
      {
        name: "천경필",
        role: "대표",
        career: "전 ○○대학교 축구부 · AFC 라이선스 보유",
        philosophy: "\"결과보다 과정을, 기술보다 태도를 먼저 봅니다\"",
      },
      {
        name: "김한석",
        role: "감독",
        career: "아시아청소년대표 · 연세대학교 · 경찰청축구단",
        playerCareer: ["숭실고", "아시아청소년대표", "연세대학교", "경찰청축구단"],
        coachingCareer: ["레알마드리드 한국 지사 총감독", "신천중학교 코치", "NS주니어 U12 감독", "서울동작FC U15 코치", "금천축구클럽 U15 감독"],
        philosophy: "단순히 승리만을 쫓는 팀이 아닌, 탁월한 성장 시스템과 문화를 통해 모든 선수가 꿈꾸고 선망하는 팀으로 나아가는 것, 그것이 저의 변하지 않는 지도 철학입니다",
      },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
      { name: "코치명 준비 중", role: "코치", career: "이력 준비 중", philosophy: "\"지도 철학 준비 중\"" },
    ],
    activityLabel: "Activity · G.C.S.C",
    activityTitle: ["매일의 훈련이", "선수를 만든다"],
    activityCaptions: [
      "훈련 — 반복이 실력이 된다",
      "경기 — 배운 것을 증명하는 자리",
      "행사 — 함께 만드는 기억",
      "기타 — 클럽의 모든 순간",
    ],
    activityCta: "갤러리 전체 보기",
    promiseLabel: "Club Promise · Since 2015",
    promiseText: ["첫 번째 공부터", "마지막 계약서까지,", "G.C.S.C가 함께합니다"],
    promiseSub: "유소년부터 프로 계약까지. 선수의 모든 단계를 클럽이 함께 설계하고 성장시킵니다.",
  },
  en: {
    heroLabel: "About · Since 2015 · G.C.S.C",
    heroTitle: ["Not just a football team —", "a football management club"],
    heroSub: "Founded in 2015, based in southwestern Seoul. A club that designs and develops each player's entire career.",
    mvLabel: "Mission & Vision · G.C.S.C",
    mission: {
      tag: "Mission — Why we exist",
      title: ["Not a place to develop players,", "but a system that designs their path"],
      sub: "More than training services — a management club that designs and grows each player's entire career.",
    },
    vision: {
      tag: "Vision — Where we'll be in 10 years",
      title: "A club where G.C.S.C alumni playing in the K-League and overseas is simply expected",
      sub: "By 2035, the leading integrated youth development club in southwestern Seoul — producing the most players at the senior level.",
    },
    valuesLabel: "Core Values · G.C.S.C",
    valuesTitle: ["Three commitments", "we never break"],
    values: [
      {
        num: "Core Value 01",
        title: "We develop players all the way",
        body: "From youth to senior level. Our promise is to build a growth path that never stops in the middle.",
      },
      {
        num: "Core Value 02",
        title: "We grow through systems",
        body: "Not individual coaches' abilities — a consistent club-wide framework that develops every player.",
      },
      {
        num: "Core Value 03",
        title: "We never waste talent",
        body: "Not just the top 1% — the top 20–40%. Our system finds and develops talent that would otherwise go unseen.",
      },
    ],
    posLabel: "Why G.C.S.C · Positioning",
    posTitle: ["What makes us", "different"],
    posSub: "There are many places to train. G.C.S.C is different.",
    posRows: [
      {
        themName: "School football teams",
        themText: "Players serve the team",
        usText: "The team serves the players",
      },
      {
        themName: "K-League academies",
        themText: "A path for the top 1%",
        usText: "A path for the top 20–40% who can grow",
      },
      {
        themName: "Private academies",
        themText: "It ends at training",
        usText: "It continues to the senior stage",
      },
    ],
    coachLabel: "Coaching Staff · G.C.S.C",
    coachTitle: ["The people who walk", "alongside every player"],
    coachSub: "Our coaches are not teachers. They are partners who design the player's path together.",
    coachProfileLabels: { player: "Playing Career", coaching: "Coaching Career", philosophy: "Coaching Philosophy" },
    coaches: [
      {
        name: "Cheon Gyeong-pil",
        role: "Director",
        career: "Former ○○ University FC · AFC License holder",
        philosophy: "\"Process over results. Attitude before technique.\"",
      },
      {
        name: "Kim Han-seok",
        role: "Head Coach",
        career: "Asia Youth National Team · Yonsei University · Police FC",
        playerCareer: ["Soongsil High School", "Asia Youth National Team", "Yonsei University", "Police FC"],
        coachingCareer: ["Real Madrid Korea Branch General Director", "Sincheon Middle School Coach", "NS Junior U12 Head Coach", "Seoul Dongjak FC U15 Coach", "Geumcheon Football Club U15 Head Coach"],
        philosophy: "My unwavering coaching philosophy is to build a team that does not simply chase victories, but becomes a team every player dreams of and looks up to through an excellent growth system and culture.",
      },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
      { name: "Coach TBD", role: "Coach", career: "Career TBD", philosophy: "\"Philosophy TBD\"" },
    ],
    activityLabel: "Activity · G.C.S.C",
    activityTitle: ["Daily training is", "what builds players"],
    activityCaptions: [
      "Training — Repetition becomes skill",
      "Matches — The stage to prove what you've learned",
      "Events — Memories made together",
      "Others — Every moment of the club",
    ],
    activityCta: "View full gallery",
    promiseLabel: "Club Promise · Since 2015",
    promiseText: ["From the first kick", "to the final contract,", "G.C.S.C is with you"],
    promiseSub: "From youth to professional contract. The club designs and grows every stage of the player's journey.",
  },
  ja: {
    heroLabel: "About · Since 2015 · G.C.S.C",
    heroTitle: ["ただのサッカーチームではなく、", "サッカーマネジメントクラブ"],
    heroSub: "2015年創設、ソウル南西部を拠点に。選手のキャリア全体を設計し、最後まで育てるクラブです。",
    mvLabel: "Mission & Vision · G.C.S.C",
    mission: {
      tag: "Mission — 私たちが存在する理由",
      title: ["選手を育てる場所ではなく、", "選手の道を設計するシステム"],
      sub: "単なるトレーニングサービスではなく、選手のキャリア全体を設計・育成するマネジメントクラブです。",
    },
    vision: {
      tag: "Vision — 10年後の私たち",
      title: "G.C.S.C出身選手がKリーグや海外舞台で活躍することが当然のクラブ",
      sub: "2035年までにソウル南西部で最多の選手をシニア舞台に輩出する、ユース統合型育成クラブ。",
    },
    valuesLabel: "Core Values · G.C.S.C",
    valuesTitle: ["私たちが守る", "三つの約束"],
    values: [
      {
        num: "コアバリュー 01",
        title: "最後まで育てる",
        body: "ユースからシニア舞台まで。途中で止まらない選手の成長経路を作ることが私たちの約束です。",
      },
      {
        num: "コアバリュー 02",
        title: "システムで成長する",
        body: "個人コーチの力量ではなく、クラブ全体の一貫したフレームワークで選手を育成します。",
      },
      {
        num: "コアバリュー 03",
        title: "才能を無駄にしない",
        body: "上位1%ではなく上位20〜40%の選手たち。システムがあるからこそ眠れる才能を発掘し育てます。",
      },
    ],
    posLabel: "Why G.C.S.C · Positioning",
    posTitle: ["他との", "違いとは"],
    posSub: "トレーニングだけの場所はたくさんあります。G.C.S.Cは違います。",
    posRows: [
      {
        themName: "学校サッカー部",
        themText: "チームのために選手を使います",
        usText: "選手のためにチームを運営します",
      },
      {
        themName: "Kリーグユース",
        themText: "選ばれた上位1%の道です",
        usText: "成長できる上位20〜40%の道です",
      },
      {
        themName: "民間アカデミー",
        themText: "トレーニングで終わります",
        usText: "シニア舞台まで続きます",
      },
    ],
    coachLabel: "Coaching Staff · G.C.S.C",
    coachTitle: ["選手のそばで", "共に歩む人たち"],
    coachSub: "G.C.S.Cの指導者は教える人ではありません。選手の道を共に設計するパートナーです。",
    coachProfileLabels: { player: "選手経歴", coaching: "指導経歴", philosophy: "指導哲学" },
    coaches: [
      {
        name: "チョン・ギョンピル",
        role: "代表",
        career: "元○○大学サッカー部 · AFCライセンス保有",
        philosophy: "\"結果より過程を、技術より姿勢を先に見ます\"",
      },
      {
        name: "キム・ハンソク",
        role: "監督",
        career: "アジアユース代表 · 延世大学校 · 警察庁サッカー団",
        playerCareer: ["崇実高校", "アジアユース代表", "延世大学校", "警察庁サッカー団"],
        coachingCareer: ["レアル・マドリード韓国支社 総監督", "新川中学校 コーチ", "NSジュニア U12 監督", "ソウル東作FC U15 コーチ", "衿川サッカークラブ U15 監督"],
        philosophy: "単に勝利だけを追うチームではなく、優れた成長システムと文化を通じて、すべての選手が夢見て憧れるチームへ進むこと。それが私の変わらない指導哲学です。",
      },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
      { name: "コーチ名 準備中", role: "コーチ", career: "経歴 準備中", philosophy: "\"指導哲学 準備中\"" },
    ],
    activityLabel: "Activity · G.C.S.C",
    activityTitle: ["日々のトレーニングが", "選手を作る"],
    activityCaptions: [
      "トレーニング — 反復が実力になる",
      "試合 — 学んだことを証明する場",
      "イベント — 共に作る思い出",
      "その他 — クラブのすべての瞬間",
    ],
    activityCta: "ギャラリー全体を見る",
    promiseLabel: "Club Promise · Since 2015",
    promiseText: ["最初のボールから", "最後の契約書まで、", "G.C.S.Cが共にいます"],
    promiseSub: "ユースからプロ契約まで。選手のすべての段階をクラブが共に設計し育成します。",
  },
  zh: {
    heroLabel: "About · Since 2015 · G.C.S.C",
    heroTitle: ["不只是足球队，", "更是足球管理俱乐部"],
    heroSub: "2015年创立，立足首尔西南部。一个全程规划并陪伴球员职业生涯成长的俱乐部。",
    mvLabel: "Mission & Vision · G.C.S.C",
    mission: {
      tag: "Mission — 我们为何存在",
      title: ["不是培养球员的地方，", "而是规划球员道路的系统"],
      sub: "不仅仅是训练服务，而是全程规划并成就球员职业生涯的管理型俱乐部。",
    },
    vision: {
      tag: "Vision — 十年后的我们",
      title: "G.C.S.C出身的球员驰骋K联赛与海外赛场，理所当然",
      sub: "到2035年，成为首尔西南部向职业赛场输送最多球员的青训综合型俱乐部。",
    },
    valuesLabel: "Core Values · G.C.S.C",
    valuesTitle: ["我们坚守的", "三个承诺"],
    values: [
      {
        num: "核心价值 01",
        title: "陪伴到最后",
        body: "从青训到职业赛场。我们的承诺是为每位球员构建永不中断的成长路径。",
      },
      {
        num: "核心价值 02",
        title: "以系统促成长",
        body: "不依赖个别教练的能力，而是用俱乐部整体的一贯框架培养每一位球员。",
      },
      {
        num: "核心价值 03",
        title: "不浪费任何才华",
        body: "不只关注前1%，而是前20〜40%的球员。我们的系统发掘并培育被埋没的才华。",
      },
    ],
    posLabel: "Why G.C.S.C · Positioning",
    posTitle: ["与其他地方", "有何不同"],
    posSub: "提供训练的地方很多。G.C.S.C不一样。",
    posRows: [
      {
        themName: "学校足球队",
        themText: "为了球队而使用球员",
        usText: "为了球员而运营球队",
      },
      {
        themName: "K联赛青训队",
        themText: "只有顶尖1%才能走的路",
        usText: "有成长潜力的前20〜40%的路",
      },
      {
        themName: "私立学院",
        themText: "止步于训练",
        usText: "延续到职业赛场",
      },
    ],
    coachLabel: "Coaching Staff · G.C.S.C",
    coachTitle: ["陪伴在球员身旁的", "那些人"],
    coachSub: "G.C.S.C的教练不是传授者，而是与球员共同规划道路的伙伴。",
    coachProfileLabels: { player: "球员经历", coaching: "执教经历", philosophy: "执教理念" },
    coaches: [
      {
        name: "千庆弼",
        role: "代表",
        career: "前○○大学足球队 · AFC执照持有者",
        philosophy: "\"过程重于结果，态度先于技术\"",
      },
      {
        name: "金汉石",
        role: "主教练",
        career: "亚洲青年代表 · 延世大学 · 警察厅足球队",
        playerCareer: ["崇实高中", "亚洲青年代表", "延世大学", "警察厅足球队"],
        coachingCareer: ["皇家马德里韩国分部总教练", "新川中学教练", "NS Junior U12 主教练", "首尔铜雀FC U15 教练", "衿川足球俱乐部 U15 主教练"],
        philosophy: "不是单纯追逐胜利，而是通过卓越的成长系统和文化，成为所有球员梦想并向往的球队。这是我始终不变的执教理念。",
      },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
      { name: "教练名 准备中", role: "教练", career: "履历准备中", philosophy: "\"执教理念准备中\"" },
    ],
    activityLabel: "Activity · G.C.S.C",
    activityTitle: ["每天的训练", "成就球员"],
    activityCaptions: [
      "训练 — 重复成就实力",
      "比赛 — 证明所学的舞台",
      "活动 — 共同创造的记忆",
      "其他 — 俱乐部的每个瞬间",
    ],
    activityCta: "查看完整图库",
    promiseLabel: "Club Promise · Since 2015",
    promiseText: ["从第一脚球", "到最后一份合同，", "G.C.S.C与你同行"],
    promiseSub: "从青训到职业合同。俱乐部陪伴球员走过每一个阶段，共同规划与成长。",
  },
};

const ACTIVITY_CATEGORIES = [
  { key: "training", href: "/gallery?category=training" },
  { key: "match",    href: "/gallery?category=match" },
  { key: "event",    href: "/gallery?category=event" },
  { key: "etc",      href: "/gallery?category=etc" },
] as const;

type CategoryKey = (typeof ACTIVITY_CATEGORIES)[number]["key"];
type PhotoMap = Record<CategoryKey, string | null>;

type CoachCardProps = {
  coach: CoachData;
  i: number;
  labels: { player: string; coaching: string; philosophy: string };
};

function CoachCard({ coach, i, labels }: CoachCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const careerPanelId = `coach-career-${i}`;
  const photoSrc =
    i === 0 ? "/staff/coach-cheon-goldpoint-1024x1440.png" :
    i === 1 ? "/staff/coach-hanseok-goldpoint-1024x1440.png" :
    null;
  const isRegistered = photoSrc !== null;
  const hasCareers = !!(coach.playerCareer || coach.coachingCareer);
  const hasBothCareers = !!(coach.playerCareer && coach.coachingCareer);

  return (
    <div
      className="overflow-hidden rounded-[14px] border border-[#2a2a2a] bg-[#1c1c1c]"
    >
      {/* 카드 본체: 사진(좌) + 정보(우) */}
      <div className="flex min-h-[160px]">
        {/* 프로필 사진 영역 */}
        <div className="relative w-[160px] shrink-0 self-stretch overflow-hidden bg-[#161616] sm:w-[180px]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.16]">
            <Image src="/gallery/gclogo.png" alt="" width={120} height={120} className="object-contain" />
          </div>
          {photoSrc && (
            <Image
              src={photoSrc}
              alt={coach.name}
              fill
              className="object-cover object-top"
              sizes="180px"
            />
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
          <p className={`text-[18px] font-black leading-tight ${isRegistered ? "text-[#f5f5f7]" : "text-[#444]"}`}>
            {coach.name}
          </p>
          <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${isRegistered ? "text-[#cc2222]" : "text-[#383838]"}`}>
            {coach.role}
          </p>
          <p className={`mt-3 text-[12px] leading-[1.55] ${isRegistered ? "text-[#666]" : "text-[#3a3a3a]"}`}>
            {coach.career}
          </p>
          <p
            className={`mt-2 text-[12px] italic leading-[1.6] ${isRegistered ? "text-[#a1a1a6]" : "text-[#3a3a3a]"}`}
            style={!isOpen ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}
          >
            {coach.philosophy}
          </p>
        </div>
      </div>

      {/* 하단 인디케이터 바 */}
      {hasCareers && (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={careerPanelId}
          onClick={() => setIsOpen((v) => !v)}
          className={`flex w-full items-center justify-center gap-1.5 border-t py-3 transition-colors ${
          isOpen ? "border-[#3a1a1a] bg-[#1a0a0a]" : "border-[#3a1a1a] bg-[#191414]"
        }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${isOpen ? "text-[#cc2222]" : "text-[#cc4444]"}`}>
            {isOpen ? "접기" : "경력 보기"}
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" stroke={isOpen ? "#cc2222" : "#cc4444"}
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* 펼침: 경력 리스트 */}
      {isOpen && hasCareers && (
        <div id={careerPanelId} className="border-t border-[#2a2a2a] px-5 pb-5 pt-4">
          <div className={`grid gap-5 ${hasBothCareers ? "sm:grid-cols-2" : ""}`}>
            {coach.playerCareer && (
              <div>
                <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#cc2222]">
                  {labels.player}
                </p>
                <ul className="space-y-1.5">
                  {coach.playerCareer.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] leading-[1.5] text-[#bbb]">
                      <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#cc2222]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {coach.coachingCareer && (
              <div>
                <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#cc2222]">
                  {labels.coaching}
                </p>
                <ul className="space-y-1.5">
                  {coach.coachingCareer.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] leading-[1.5] text-[#bbb]">
                      <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#cc2222]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClubIntroductionPage() {
  const { locale } = useSiteLanguage();
  const t = copy[locale];

  const [photos, setPhotos] = useState<PhotoMap>({ training: null, match: null, event: null, etc: null });

  useEffect(() => {
    Promise.all(
      ACTIVITY_CATEGORIES.map(({ key }) =>
        fetch(`/api/gallery?pageSize=1&category=${key}`)
          .then((r) => r.json())
          .then((data) => ({ key, url: (data.items?.[0]?.thumbnailUrl as string | null | undefined) ?? null }))
          .catch(() => ({ key, url: null }))
      )
    ).then((results) => {
      const map = {} as PhotoMap;
      for (const { key, url } of results) map[key] = url;
      setPhotos(map);
    });
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f7]">
      <GCSCHeader />

      {/* ── S1 Hero ── */}
      <section className="border-b border-[#222] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.heroLabel}</p>
          <h1
            className="font-['Barlow_Condensed',sans-serif] font-black uppercase leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
          >
            <span className="block text-[#f5f5f7]">{t.heroTitle[0]}</span>
            <span className="block text-[#cc2222]">{t.heroTitle[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.8] text-[#c0c0c5] sm:text-lg">{t.heroSub}</p>
        </div>
      </section>

      {/* ── S2 Mission / Vision ── */}
      <section className="border-b border-[#222] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.mvLabel}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Mission */}
            <div className="rounded-[4px] border-l-[3px] border-[#cc2222] bg-[#1c1c1e] px-6 py-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#cc2222]">{t.mission.tag}</p>
              <p
                className="font-['Barlow_Condensed',sans-serif] font-black leading-[1.15] text-[#f5f5f7]"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
              >
                {t.mission.title[0]}
                <br />
                {t.mission.title[1]}
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-[#a1a1a6]">{t.mission.sub}</p>
            </div>
            {/* Vision */}
            <div className="rounded-[4px] border-l-[3px] border-[#c49550] bg-[#1a1208] px-6 py-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#c49550]">{t.vision.tag}</p>
              <p
                className="font-['Barlow_Condensed',sans-serif] font-black leading-[1.15] text-[#f5f5f7]"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
              >
                {t.vision.title}
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-[#a1a1a6]">{t.vision.sub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── S3 Core Values ── */}
      <section className="border-b border-[#222] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.valuesLabel}</p>
          <h2
            className="mb-10 font-['Barlow_Condensed',sans-serif] font-black uppercase leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            <span className="text-[#f5f5f7]">{t.valuesTitle[0]}</span>
            <br />
            <span className="text-[#cc2222]">{t.valuesTitle[1]}</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.values.map((v) => (
              <div key={v.num} className="rounded-[4px] bg-[#1c1c1e] px-5 py-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#cc2222]">{v.num}</p>
                <p className="mb-3 text-base font-bold text-[#f5f5f7]">{v.title}</p>
                <p className="text-sm leading-[1.7] text-[#6e6e73]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4 Positioning ── */}
      <section className="border-b border-[#222] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.posLabel}</p>
          <h2
            className="mb-2 font-['Barlow_Condensed',sans-serif] font-black uppercase leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            <span className="text-[#f5f5f7]">{t.posTitle[0]}</span>
            <br />
            <span className="text-[#cc2222]">{t.posTitle[1]}</span>
          </h2>
          <p className="mb-10 text-sm text-[#6e6e73]">{t.posSub}</p>
          <div className="flex flex-col gap-3">
            {t.posRows.map((row) => (
              <div key={row.themName} className="grid grid-cols-[1fr_28px_1fr] items-center gap-3 sm:gap-4">
                {/* 경쟁 */}
                <div className="rounded-[3px] bg-[#161616] px-4 py-4">
                  <p className="mb-2 text-[10px] tracking-[0.04em] text-[#555]">{row.themName}</p>
                  <p className="text-sm leading-[1.5] text-[#6e6e73]">{row.themText}</p>
                </div>
                {/* 화살표 */}
                <div className="text-center text-lg text-[#cc2222]">→</div>
                {/* G.C.S.C */}
                <div className="rounded-[3px] border-l-2 border-[#cc2222] bg-[#1c1c1e] px-4 py-4">
                  <p className="mb-2 text-[10px] tracking-[0.04em] text-[#888890]">G.C.S.C</p>
                  <p className="text-sm font-medium leading-[1.5] text-[#f5f5f7]">{row.usText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5 Coach Profile ── */}
      <section className="border-b border-[#222] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.coachLabel}</p>
          <h2
            className="mb-2 font-['Barlow_Condensed',sans-serif] font-black uppercase leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            <span className="text-[#f5f5f7]">{t.coachTitle[0]}</span>
            <br />
            <span className="text-[#cc2222]">{t.coachTitle[1]}</span>
          </h2>
          <p className="mb-10 text-sm leading-[1.8] text-[#6e6e73]">{t.coachSub}</p>

          <div className="grid gap-4 md:grid-cols-2">
            {t.coaches.map((coach, i) => (
              <CoachCard key={i} coach={coach} i={i} labels={t.coachProfileLabels} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S6 Activity Photos ── */}
      <section className="border-b border-[#222] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#cc2222]">{t.activityLabel}</p>
          <h2
            className="mb-10 font-['Barlow_Condensed',sans-serif] font-black uppercase leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          >
            <span className="text-[#f5f5f7]">{t.activityTitle[0]}</span>
            <br />
            <span className="text-[#cc2222]">{t.activityTitle[1]}</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITY_CATEGORIES.map(({ key, href }, i) => {
              const imgUrl = photos[key];
              return (
                <a key={key} href={href} className="group overflow-hidden rounded-[4px] bg-[#1c1c1e] transition hover:ring-1 hover:ring-[#cc2222]">
                  <div className="relative h-48 w-full bg-[#2a2a2a]">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={t.activityCaptions[i]}
                        fill
                        className="object-cover transition group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11px] text-[#444]">No image</div>
                    )}
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-[#c0c0c5]">{t.activityCaptions[i]}</p>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="mt-8">
            <a
              href="/gallery"
              className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-[#424245] bg-transparent px-6 text-sm font-semibold text-[#f5f5f7] transition hover:bg-white/5"
            >
              {t.activityCta}
              <span className="text-[#cc2222]">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── S7 Club Promise ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border-l-[3px] border-[#c49550] bg-[#1a1208] px-8 py-10 sm:px-10">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#c49550]">{t.promiseLabel}</p>
            <p
              className="font-['Barlow_Condensed',sans-serif] font-black leading-[1.15] text-[#f5f5f7]"
              style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
            >
              {t.promiseText[0]}
              <br />
              {t.promiseText[1]}
              <br />
              {t.promiseText[2]}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-[1.8] text-[#a1a1a6]">{t.promiseSub}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
