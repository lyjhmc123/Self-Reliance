import { useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import LeadTextSection, { LeadHeadlineSection } from '../sections/LeadTextSection';
import LightMetaphorSection from '../sections/LightMetaphorSection';
import ArticleSection from '../sections/ArticleSection';
import FooterSection from '../sections/FooterSection';
import OutroSection from '../sections/OutroSection';
import GradientOverlay from '../components/dynamic-color/GradientOverlay';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
        logo="inter"
        title="자기신뢰"
        authorInfo="랄프 왈도 에머슨, 현대지성"
      />

      {/* 히어로 → 라이트 섹션 전환 브릿지 */}
      <Box
        sx={ {
          position: 'relative',
          zIndex: 3,
          height: '30vh',
          mt: '-30vh',
          background: 'linear-gradient(to bottom, transparent 0%, #F5F2EE 100%)',
          pointerEvents: 'none',
        } }
      />

      {/* 리드 헤드라인 — 라이트 배경 풀스크린 인용문 */}
      <LeadHeadlineSection
        headline={ intro.leadHeadline }
        sx={ { backgroundColor: '#F5F2EE' } }
      />

      {/* 리드 본문 — 라이트→다크 그라데이션 배경 */}
      <LeadTextSection
        text={ intro.leadText }
        sx={ { background: 'linear-gradient(to bottom, #F5F2EE 60%, #12100E 100%)' } }
      />

      {/* 핵심 메타포 — 어둠 속 한 줄기 빛 확장 인터랙션 */}
      <LightMetaphorSection />

      {/* 아티클 — 타이틀 + 본문 */}
      <ArticleSection
        title="당신 안의 진실"
        bodyBlocks={ [
          {
            lines: [
              '당신 자신의 생각을 믿는 것,',
              '은밀한 마음속에서 당신이 진실이라고 생각하는 것이',
              '모든 사람에게도 그대로 진실이 된다고 믿는 것,',
              '이것이 천재의 행동이다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '당신의 머릿속에 숨은 확신을',
              '밖으로 드러내면 보편적 의미를 획득한다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '가장 깊숙한 것은',
              '적절한 때가 되면 겉으로 분명하게 드러나기 때문이다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 2 — 한줄기 빛 */}
      <ArticleSection
        title="한줄기 빛"
        bodyBlocks={ [
          {
            lines: [
              '사람은 마음속 깊은 곳에서',
              '번쩍거리며 지나가는 빛줄기를 발견하고',
              '관찰하는 법을 배워야 한다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '각 개인에게는',
              '음유시인이나',
              '현자들에게서 나오는 하늘을 가로지르는 불빛보다',
              '자기 마음속에서 샘솟는 한 줄기 빛이 더 중요하다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '하지만 사람들은 그것이',
              '자기에게서 나왔다는 이유만으로',
              '그 생각을 별로 주목하지 않고 그냥 무시해버린다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '천재들이 남긴 모든 작품에서',
              '우리는 스스로 거부해버렸던 생각을 발견한다.',
              '낯설지만, 장엄한 모습으로 그 생각들은 우리에게 되돌아온다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 3 — 위대한 예술 작품의 교훈 */}
      <ArticleSection
        title="위대한 예술 작품의 교훈"
        bodyBlocks={ [
          {
            lines: [
              '위대한 예술 작품들이',
              '우리에게 전하는 가장 감동적인 교훈은 이것이다.',
              '다른 무수한 목소리가 반대 의견을 낼지라도,',
              '점잖으면서도 굳건한 자세로',
              '자신의 자발적인 느낌을 더 소중하게 믿고',
              '그 작품들이 웅변하는 소리를 들어야 한다는 것이다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '이렇게 하지 않는다면',
              '내일 어떤 낯선 사람이',
              '우리가 늘 생각하고 느꼈던 바로 그것을',
              '아주 그럴듯하게 말할 것이다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '그러면 우리는 그 타인에게서',
              '우리 생각을 받아들여야 하는 부끄러운 상태가 된다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 4 — 자신에게 주어진 경작지 */}
      <ArticleSection
        title="자신에게 주어진 경작지"
        bodyBlocks={ [
          {
            lines: [
              '부러움은 무지에서 나오고, 모방은 자살행위다.',
              '배우는 과정에서 이런 확신이 드는 순간이 온다.',
              '또한, 좋든 나쁘든 자신이라는 존재를',
              '있는 그대로 제 운명의 몫으로 받아들여야 하는 시간을 맞이한다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '이 세상은 좋은 것들로 가득 차 있다.',
              '그러나 자신에게 주어진 경작지를',
              '자기 자신의 노동으로 갈지 않으면,',
              '단 한 알의 옥수수도 그에게 주어지지 않는다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '인간 내부에 깃든 힘은 본래 새롭다.',
              '그 새로움 때문에 인간은',
              '자신이 무엇을 할 수 있는지 예상하지 못하는데,',
              '직접 뭔가를 해보아야만 비로소 자기 능력을 알게 된다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 5 — 당신 안의 신성한 생각 */}
      <ArticleSection
        title="당신 안의 신성한 생각"
        bodyBlocks={ [
          {
            lines: [
              '우리에게 강렬한 인상을 남기는',
              '얼굴, 성격, 인상이 있는 반면,',
              '그렇지 못한 것들도 있는데 여기에는 다 이유가 있다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '인상이 기억 속에 각인되는 것은',
              '사전에 정해진 조화를 따르기 때문이다.',
              '우리 눈은 빛이 있는 곳을 바라보고',
              '특정한 빛을 인식한다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '그런데 우리는 자기 생각을',
              '절반도 옳게 드러내지 못하고,',
              '각자가 마음속에 품고 있는 신성한 생각을',
              '오히려 부끄럽게 여긴다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '하지만 부끄러워하지 말라.',
              '그 신성한 생각은 자기 형편에 알맞고',
              '확실히 좋은 결과를 가져올 것이기에',
              '충실하게 밖으로 표현해야 마땅하다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 6 — 자기자신의 본성 */}
      <ArticleSection
        title="자기자신의 본성"
        bodyBlocks={ [
          {
            lines: [
              '당신의 성실한 마음 외에 그 무엇도 신성하지 않다.',
              '당신의 솔직한 의견을 자기 자신에게 선언하라.',
              '그러면 당신은 온 세상으로부터 지지를 받을 것이다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '자기 본성에서 나오는 법을 제외하고는',
              '그 어떤 법도 자신에게 신성할 수 없다.',
              '유일하게 옳은 것은 내 기질을 따라 생활하는 것이다.',
              '그 기질에 어긋나게 사는 것은 뭐든 잘못이었다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '올바른 사람은 갖은 반대 앞에서도',
              '자신을 제외한 모든 것을',
              '그저 이름뿐인 찰나적인 것으로 여긴다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 7 — 측정할 수 없는 빛 */}
      <ArticleSection
        title="측정할 수 없는 빛"
        bodyBlocks={ [
          {
            lines: [
              '모든 독창적 행위가 왜 인간을 그토록 매혹하는지는',
              '자기 신뢰의 이유를 탐구해보면 제대로 설명할 수 있다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '우리를 신뢰하는 이는 누구인가?',
              '보편적 신뢰의 근거가 되는 원초적 자아란 무엇인가?',
              '저 과학을 난처하게 만드는 별의 본성과 힘은 무엇인가?',
            ],
            delay: 2000,
          },
          {
            lines: [
              '별은 시차도 없고 측정 가능한 요소도 없지만,',
              '조금이라도 독립적인 특징을 보여준다면',
              '아무리 사소하고 불순하더라도 거기에 아름다운 빛을 쏘아주지 않는가?',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 8 — 직관은 모든 것의 원천 */}
      <ArticleSection
        title="직관은 모든 것의 원천"
        bodyBlocks={ [
          {
            lines: [
              '이 탐구는 우리를 그 원천으로 인도하는데,',
              '그것은 천재, 미덕, 생명의 본질로',
              '우리가 자발성 혹은 본능이라고 부르는 것이다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '우리는 이 일차적 지혜를 직관(intuition)이라고 부른다.',
              '그리고 그 뒤에 나오는 모든 가르침을 교양(tuition)이라고 한다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '이처럼 깊은 곳에 숨어 있는 힘,',
              '인간의 지적 분석이 미치지 못하는 최후의 것,',
              '바로 여기에서 모든 사물은 공동의 원천을 발견한다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 9 — 직관은 운명이다 */}
      <ArticleSection
        title="직관은 운명이다"
        bodyBlocks={ [
          {
            lines: [
              '생각이 얕은 사람들은',
              '남의 의견을 반박하듯이 직관의 진술도 반박한다.',
              '아니, 아주 즉각적으로 거세게 반박한다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '그들은 직관과 지적인 개념을',
              '서로 구분하지 않기 때문이다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '그러나 직관은 변덕스러운 것이 아니라 운명적이다.',
              '만약 내가 어떤 특징을 직관적으로 보았다면',
              '자녀들도 내 뒤를 이어 그것을 보게 될 것이고,',
              '시간이 흘러 모든 인류도 보게 될 것이다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '나의 직관은 하늘의 태양만큼이나 객관적인 사실이다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 아티클 10 — 운의 비밀 */}
      <ArticleSection
        title="운의 비밀"
        bodyBlocks={ [
          {
            lines: [
              '운의 비밀은',
              '우리 가까이에 있는 즐거움에 있다.',
              '신과 인간은 스스로 돕는 자를 환영한다.',
            ],
            delay: 0,
          },
          {
            lines: [
              '그(스스로 돕는 자)에게는',
              '모든 문이 활짝 열리고,',
              '모든 혀가 인사말을 하며,',
              '모든 영예가 수여되며,',
              '모든 눈이 자꾸만 보고 싶다는 듯 뒤쫓는다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '그는 우리 사랑을 필요로 하지 않기 때문에',
              '사랑은 그에게로 향하고 그를 포옹한다.',
              '그가 자기 길을 굳게 지키고',
              '우리의 승인 여부는 우습게 보기 때문에',
              '우리는 간청하듯 혹은 변명하듯 그를 쓰다듬고 축하한다.',
            ],
            delay: 2000,
          },
          {
            lines: [
              '사람들이 그를 미워하므로 신들은 그를 사랑한다.',
              '조로아스터는 이렇게 말했다.',
            ],
            delay: 2000,
          },
        ] }
      />

      {/* 클로징 인용 — 조로아스터 */}
      <Box
        sx={ {
          minHeight: '100svh',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
        } }
      >
        <Typography
          variant="h4"
          sx={ {
            fontFamily: '"Noto Serif KR", serif',
            fontWeight: 600,
            fontSize: { xs: '1.14rem', md: '1.32rem' },
            color: 'primary.main',
            textAlign: 'center',
            lineHeight: 2,
            wordBreak: 'keep-all',
          } }
        >
          &ldquo;꾸준히 버티면서
          <br />
          묵묵히 자기 일을 해나가는 자에게
          <br />
          축복의 신들은
          <br />
          재빨리 도움의 손길을 뻗는다.&rdquo;
        </Typography>
      </Box>

      {/* 출처 안내 */}
      <Box
        sx={ {
          minHeight: '100svh',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      >
        <Typography
          variant="body1"
          sx={ {
            fontFamily: '"Noto Serif KR", serif',
            fontWeight: 300,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            color: 'rgba(245, 242, 238, 0.6)',
            textAlign: 'center',
            lineHeight: 2,
            wordBreak: 'keep-all',
          } }
        >
          더 많은 텍스트는 랄프 왈도 에머슨 &lt;자기 신뢰&gt; 에서 만날 수 있습니다.
        </Typography>
      </Box>

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
        instagramHandle={ footer.instagramHandle }
        instagramUrl={ footer.instagramUrl }
        copyright={ footer.copyright }
      />
    </PageContainer>
  );
}

export default MagazinePage;
