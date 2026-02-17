import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RandomRevealText from '../components/kinetic-typography/RandomRevealText';

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
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLineDone, setIsLineDone] = useState(false);

  /** 뷰포트 진입 감지 → 선 애니메이션 시작 */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /** 선 애니메이션 완료(1s) 후 텍스트 reveal 시작 */
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsLineDone(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <Box
      ref={ (el) => { wrapperRef.current = el; sectionRef.current = el; } }
      sx={ {
        height: '200svh',
        position: 'relative',
        zIndex: 2,
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
          {/* 헤드라인 텍스트 — 선 완료 후 선 위에 등장 */}
          { isLineDone && (
            <RandomRevealText
              text={ headline }
              delay={ 200 }
              stagger={ 60 }
              variant="h4"
              sx={ {
                fontFamily: '"Noto Serif KR", serif',
                fontWeight: 400,
                textAlign: 'center',
                fontSize: { xs: '1.04rem', md: '1.28rem' },
                color: '#12100E',
                letterSpacing: '0.02em',
              } }
            />
          ) }

          {/* 왼쪽→오른쪽 선 — 텍스트 아래 */}
          <Box
            sx={ {
              width: isVisible ? '100%' : '0%',
              height: '1px',
              backgroundColor: 'rgba(18, 16, 14, 0.3)',
              transition: 'width 1s ease-out',
              mt: 4,
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
          contentRef.current.style.color = 'rgba(18, 16, 14, 0.85)';
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
        zIndex: 2,
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
            color: 'rgba(18, 16, 14, 0.08)',
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

          {/* 하단 주석 */}
          <Box sx={ { mt: 8, maxWidth: 520 } }>
            <Typography
              variant="caption"
              sx={ {
                color: 'rgba(18, 16, 14, 0.35)',
                fontSize: { xs: '0.65rem', md: '0.7rem' },
                lineHeight: 1.8,
                wordBreak: 'keep-all',
                textAlign: 'center',
                display: 'block',
              } }
            >
              *본 웹사이트에 수록된 텍스트는 해당 도서의 본문 일부를 발췌한 내용입니다.
              <br />
              *각 페이지 상단의 타이틀을 제외한 본문은 원서의 내용을 그대로 인용하였음을 밝힙니다.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export { LeadHeadlineSection };
export default LeadTextSection;
