import { useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import LeadTextSection, { LeadHeadlineSection } from '../sections/LeadTextSection';
import FooterSection from '../sections/FooterSection';
import OutroSection from '../sections/OutroSection';
import GradientOverlay from '../components/dynamic-color/GradientOverlay';
import Box from '@mui/material/Box';
import { PageContainer } from '../components/layout/PageContainer';
import magazineData from '../data/magazineData';

/**
 * MagazinePage 컴포넌트
 *
 * Intertext Magazine Issue No.1 전체 페이지.
 * 풀스크린 섹션 기반 몰입형 매거진 경험.
 *
 * 동작 흐름:
 * 1. 사용자가 페이지에 진입하면 HeroSection(표지)이 보인다
 * 2. 스크롤하면 리드 헤드라인, 리드 본문이 순서대로 나타난다
 * 3. Outro → Footer 순으로 이어진다
 *
 * Example usage:
 * <MagazinePage />
 */
function MagazinePage() {
  const { intro, outro, footer } = magazineData;
  const outroRef = useRef(null);

  return (
    <PageContainer maxWidth={ false } disableGutters>
      {/* WebGL 그라데이션 배경 — 스크롤에 따라 라이트→다크→라이트 전환 */}
      <GradientOverlay
        colorLight="#F5F2EE"
        colorDark="#12100E"
        scrollOutRef={ outroRef }
      />

      {/* 사이트 진입 — 라이트 영역 */}
      <HeroSection
        logo={ intro.logo }
        title={ intro.title }
        authorInfo={ intro.authorInfo }
        footerText={ intro.footerText }
      />

      {/* 리드 헤드라인 — 풀스크린 인용문 */}
      <LeadHeadlineSection headline={ intro.leadHeadline } />

      {/* 리드 본문 — 다크 배경 위 리드 텍스트 */}
      <LeadTextSection text={ intro.leadText } />

      {/* GradientOverlay 라이트 전환 트리거 — Outro 진입 전에 전환 시작 */}
      <Box ref={ outroRef } />

      {/* Outro — 마무리 인사 */}
      <OutroSection
        titles={ outro.titles }
        ctaText={ outro.ctaText }
        links={ outro.links }
      />

      {/* 퇴장 — 라이트 영역 */}
      <FooterSection
        logo={ footer.logo }
        description="Intertext 매거진은 한 호에 한 컨텐츠를 깊이 있게 해석하는 텍스트 중심의 디지털 매거진입니다. 텍스트를 통해 컨텐츠가 담고 있는 세계관과 철학을 읽어냅니다. 텍스트 사이에서 나, 너, 우리의 존재를 다시 읽습니다."
        instagramHandle={ footer.instagramHandle }
        instagramUrl={ footer.instagramUrl }
        copyright={ footer.copyright }
      />
    </PageContainer>
  );
}

export default MagazinePage;
