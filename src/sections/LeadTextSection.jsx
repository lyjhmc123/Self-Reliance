import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ScrollRevealText from '../components/kinetic-typography/ScrollRevealText';

/**
 * 스크롤 페이드아웃 훅
 * wrapper 내 sticky 요소가 스크롤 진행률에 따라 페이드아웃된다.
 *
 * @param {number} fadeStart - 페이드아웃 시작 진행률 (0~1) [기본값: 0.3]
 */
function useStickyFadeOut(fadeStart = 0.3) {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || !stickyRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      const opacity = Math.max(0, 1 - Math.max(0, (progress - fadeStart) / (1 - fadeStart)));
      stickyRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeStart]);

  return { wrapperRef, stickyRef };
}

/**
 * LeadHeadlineSection 컴포넌트
 *
 * 리드 헤드라인만 표시하는 풀스크린 섹션.
 * 인용부호 장식과 함께 중앙에 표시되며, 스크롤 시 페이드아웃된다.
 *
 * 동작 흐름:
 * 1. 사용자가 HeroSection을 지나면 헤드라인이 풀스크린으로 표시된다
 * 2. 인용부호가 헤드라인 위아래에 장식적으로 배치된다
 * 3. 스크롤하면 서서히 페이드아웃되며 본문 섹션으로 전환된다
 *
 * Props:
 * @param {string} headline - 헤드라인 텍스트 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LeadHeadlineSection headline="당신 자신을 자기 이외의 곳에서 찾지 말라" />
 */
function LeadHeadlineSection({ headline, sx }) {
  const { wrapperRef, stickyRef } = useStickyFadeOut(0.3);

  return (
    <Box
      ref={ wrapperRef }
      sx={ {
        height: '200svh',
        position: 'relative',
        ...sx,
      } }
    >
      <Box
        ref={ stickyRef }
        sx={ {
          position: 'sticky',
          top: 0,
          height: '100svh',
          backgroundColor: 'transparent',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      >
        <Container
          maxWidth="md"
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <ScrollRevealText
            text={ headline }
            variant="h4"
            activeColor="#F5F2EE"
            inactiveColor="rgba(245, 242, 238, 0.12)"
            autoReveal
            autoRevealDuration={ 2000 }
            sx={ {
              fontFamily: '"Noto Serif KR", serif',
              fontWeight: 400,
              textAlign: 'center',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              letterSpacing: '0.02em',
              '& .MuiTypography-root': {
                fontFamily: '"Noto Serif KR", serif',
                fontWeight: 400,
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                letterSpacing: '0.02em',
                textAlign: 'center',
              },
            } }
          />
        </Container>
      </Box>
    </Box>
  );
}

/**
 * LeadTextSection 컴포넌트
 *
 * 매거진 리드 본문을 표시하는 풀스크린 섹션.
 * 다크 배경 위 라이트 텍스트가 중앙 정렬되며, sticky로 고정된다.
 * 스크롤을 계속하면 섹션이 서서히 투명해지며 다음 섹션으로 전환된다.
 *
 * 동작 흐름:
 * 1. 헤드라인 섹션을 지나면 본문이 풀스크린으로 표시된다
 * 2. 텍스트가 화면 중앙에 수직·수평 정렬된 채 sticky로 고정된다
 * 3. 스크롤 진행률 30%부터 섹션 전체가 서서히 페이드아웃된다
 * 4. 뒤에 겹쳐진 다음 섹션이 점점 노출되며 자연스럽게 전환된다
 *
 * Props:
 * @param {string|string[]} text - 리드 문단 텍스트 (문자열 또는 문단 배열) [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LeadTextSection text={['첫 번째 문단', '두 번째 문단']} />
 */
function LeadTextSection({ text, sx }) {
  const contentRef = useRef(null);
  const { wrapperRef, stickyRef } = useStickyFadeOut(0.3);

  const paragraphs = Array.isArray(text) ? text : [text];

  /** 뷰포트 진입 시 텍스트 전체가 밝아지는 애니메이션 */
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentRef.current.style.color = 'rgba(245, 242, 238, 0.85)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ wrapperRef }
      sx={ {
        height: '200svh',
        position: 'relative',
        ...sx,
      } }
    >
      <Box
        ref={ stickyRef }
        sx={ {
          position: 'sticky',
          top: 0,
          height: '100svh',
          backgroundColor: 'transparent',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      >
        <Container
          ref={ contentRef }
          maxWidth="md"
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(245, 242, 238, 0.12)',
            transition: 'color 1.5s ease-out',
          } }
        >
          <Box sx={ { maxWidth: 520 } }>
            { paragraphs.map((paragraph, index) => (
              <Typography
                key={ index }
                variant="body1"
                sx={ {
                  color: 'inherit',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-line',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  wordBreak: 'keep-all',
                  textAlign: 'center',
                  mb: index < paragraphs.length - 1 ? 4 : 0,
                } }
              >
                { paragraph }
              </Typography>
            )) }
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export { LeadHeadlineSection };
export default LeadTextSection;
