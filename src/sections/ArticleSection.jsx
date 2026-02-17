import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import RandomRevealText from '../components/kinetic-typography/RandomRevealText';

const flicker = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  20% {
    opacity: 0.15;
  }
  40% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.1;
  }
  80% {
    opacity: 0.45;
  }
`;

/**
 * ArticleSection 컴포넌트
 *
 * 아티클 타이틀과 본문으로 구성된 풀스크린 섹션.
 *
 * 동작 흐름:
 * 1. 섹션이 뷰포트에 진입하면 얇은 선이 왼쪽→오른쪽으로 그어진다
 * 2. 선 애니메이션 완료 후 타이틀이 RandomRevealText 효과로 나타난다
 * 3. 타이틀 reveal 완료 후 본문 블록들이 순차적으로 서서히 밝아지며 노출된다
 *
 * Props:
 * @param {string} title - 아티클 타이틀 [Required]
 * @param {Array<{lines: string[], delay: number, isHighlight: boolean}>} bodyBlocks - 본문 블록 배열. lines(텍스트 줄), delay(이전 블록 노출 후 대기 ms), isHighlight(강조 스타일) [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ArticleSection
 *   title="부러움은 무지에서 나온다"
 *   bodyBlocks={[
 *     { lines: ['첫 줄', '둘째 줄'], delay: 0 },
 *     { lines: ['셋째 줄'], delay: 2000 },
 *   ]}
 * />
 */
function ArticleSection({ title, bodyBlocks = [], sx }) {
  const sectionRef = useRef(null);
  const [isLineDone, setIsLineDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const isFullyRevealed = bodyBlocks.length === 0 || visibleBlocks >= bodyBlocks.length;
  const [isNextVisible, setIsNextVisible] = useState(false);

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

  /** 선 애니메이션 완료(1.2s) 후 타이틀 reveal 시작 */
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsLineDone(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isVisible]);

  /** 타이틀 reveal 완료 후 첫 번째 블록 노출 */
  useEffect(() => {
    if (!isLineDone || !title || bodyBlocks.length === 0) return;

    const charCount = title.replace(/\s/g, '').length;
    const revealDuration = 200 + charCount * 60 + 1200;

    const timer = setTimeout(() => {
      setVisibleBlocks(1);
    }, revealDuration);

    return () => clearTimeout(timer);
  }, [isLineDone, title, bodyBlocks.length]);

  /** 이전 블록 노출 후 다음 블록 순차 노출 */
  useEffect(() => {
    if (visibleBlocks === 0 || visibleBlocks >= bodyBlocks.length) return;

    const nextBlock = bodyBlocks[visibleBlocks];
    const delayMs = nextBlock.delay || 1000;

    const timer = setTimeout(() => {
      setVisibleBlocks((prev) => prev + 1);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [visibleBlocks, bodyBlocks]);

  /** 마지막 블록 노출 2초 후 '다음으로' 표시 */
  useEffect(() => {
    if (!isFullyRevealed || bodyBlocks.length === 0) return;

    const timer = setTimeout(() => {
      setIsNextVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isFullyRevealed, bodyBlocks.length]);

  return (
    <Box
      ref={ sectionRef }
      sx={ {
        minHeight: '100svh',
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      } }
    >
      <Container maxWidth="md">
        {/* 타이틀 영역 */}
        <Box sx={ { mb: 8, position: 'relative' } }>
          {/* 메타포 글로우 — 타이틀과 걸쳐서 깜빡이며 빛남 */}
          { isLineDone && (
            <Box
              sx={ {
                position: 'absolute',
                top: '50%',
                left: '20%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 120, md: 180 },
                height: { xs: 120, md: 180 },
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 198, 110, 0.5) 0%, rgba(255, 198, 110, 0.1) 40%, transparent 70%)',
                animation: `${flicker} 4s ease-in-out infinite`,
                pointerEvents: 'none',
                zIndex: 0,
              } }
            />
          ) }

          {/* 왼쪽→오른쪽 선 */}
          <Box
            sx={ {
              width: isVisible ? '100%' : '0%',
              height: '1px',
              backgroundColor: 'rgba(245, 242, 238, 0.3)',
              transition: 'width 1s ease-out',
              mb: 5,
            } }
          />

          {/* 타이틀 */}
          { isLineDone && (
            <RandomRevealText
              text={ title }
              delay={ 200 }
              stagger={ 60 }
              variant="h3"
              sx={ {
                position: 'relative',
                zIndex: 1,
                fontFamily: '"Noto Serif KR", serif',
                fontWeight: 400,
                fontSize: { xs: '1.6rem', md: '2.2rem' },
                color: '#F5F2EE',
                letterSpacing: '0.04em',
                lineHeight: 1.6,
              } }
            />
          ) }
        </Box>

        {/* 본문 블록들 — 순차적으로 서서히 밝아짐 */}
        { bodyBlocks.map((block, blockIndex) => (
          <Box
            key={ blockIndex }
            sx={ {
              opacity: blockIndex < visibleBlocks ? 1 : 0,
              transition: 'opacity 2s ease-out',
              mt: blockIndex > 0 ? 5 : 0,
            } }
          >
            { block.lines.map((line, lineIndex) => (
              <Typography
                key={ lineIndex }
                variant="body1"
                sx={ {
                  fontFamily: '"Noto Serif KR", serif',
                  fontWeight: block.isHighlight ? 600 : 300,
                  fontSize: block.isHighlight
                    ? { xs: '1.14rem', md: '1.32rem' }
                    : { xs: '0.95rem', md: '1.1rem' },
                  color: block.isHighlight
                    ? 'primary.main'
                    : 'rgba(245, 242, 238, 0.85)',
                  lineHeight: 2,
                  wordBreak: 'keep-all',
                } }
              >
                { line }
              </Typography>
            )) }
          </Box>
        )) }

        {/* 다음으로 — 마지막 블록 노출 2초 후 등장 */}
        <Box
          sx={ {
            opacity: isNextVisible ? 1 : 0,
            transition: 'opacity 1.5s ease-out',
            mt: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          } }
        >
          <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245, 242, 238, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            sx={ { width: 16, height: 16 } }
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ArticleSection;
