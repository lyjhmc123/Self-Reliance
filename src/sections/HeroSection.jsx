import { useState, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import coverImage from '../assets/cover.jpeg';

/**
 * HeroSection 컴포넌트
 *
 * 매거진 표지 역할의 전체화면 히어로 섹션.
 * 커버 이미지를 배경으로, 다단계 인트로 애니메이션 후 상하 5:5 분할 레이아웃으로 전환.
 *
 * 동작 흐름:
 * 1. 사용자가 페이지에 진입하면 커버 이미지가 전체 배경으로 표시된다
 * 2. 화면 중앙에 "intertext" 텍스트가 RandomReveal 효과로 글자별 노출된다
 * 3. reveal 완료 후 "intertext"가 상단으로 이동하며 "text" 부분이 흩어지며 사라진다
 * 4. 동시에 중앙 가로선이 그어지고, 하단에 타이틀+서브타이틀이 올라오며 우하단에 "by intertext"가 나타난다
 * 5. 스크롤하면 다음 섹션으로 전환된다
 *
 * Props:
 * @param {string} logo - 상단 로고 텍스트 (애니메이션 후 남는 부분) [Required]
 * @param {string} title - 메인 타이틀 텍스트 [Required]
 * @param {string} authorInfo - 저자 및 출판사 정보 [Optional]
 * @param {string} footerText - 하단 스크롤 안내 텍스트 [Optional, 기본값: 'Scroll to explore']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection
 *   logo="inter"
 *   title="자기신뢰"
 *   authorInfo="랄프 왈도 에머슨, 현대지성"
 * />
 */
function HeroSection({
  logo,
  title,
  authorInfo,
  footerText = 'Scroll to explore',
  sx,
}) {
  const fullWord = logo + 'text';
  const logoLength = logo.length;

  const [phase, setPhase] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const textPartRef = useRef(null);
  const [centerOffset, setCenterOffset] = useState(0);

  /** Fisher-Yates 셔플로 랜덤 reveal 순서 생성 */
  const randomOrder = useMemo(() => {
    const indices = Array.from({ length: fullWord.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [fullWord]);

  /** "text" 파트 글자별 랜덤 산개 오프셋 */
  const scatterOffsets = useMemo(() => {
    return Array.from({ length: fullWord.length - logoLength }, () => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
      rotate: (Math.random() - 0.5) * 90,
    }));
  }, [fullWord.length, logoLength]);

  /** "text" 파트 너비 측정 → Phase 2에서 "inter" 센터링 보정값 계산 */
  useEffect(() => {
    if (textPartRef.current) {
      setCenterOffset(textPartRef.current.offsetWidth / 2);
    }
  }, []);

  /** Phase 0 → 1: 배경 로딩 후 텍스트 reveal 시작 */
  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 800);
    return () => clearTimeout(timer);
  }, []);

  /** Phase 1: "intertext" 랜덤 reveal → Phase 2: 분리 애니메이션 */
  useEffect(() => {
    if (phase !== 1) return;

    const delay = 200;
    const stagger = 60;
    const timeouts = [];

    randomOrder.forEach((charIndex, orderIndex) => {
      const timeout = setTimeout(() => {
        setRevealedIndices((prev) => new Set([...prev, charIndex]));
      }, delay + orderIndex * stagger);
      timeouts.push(timeout);
    });

    /** reveal 완료 + 전환 시간 후 Phase 2 시작 */
    const totalTime = delay + fullWord.length * stagger + 1500;
    const phase2Timer = setTimeout(() => {
      setPhase(2);
    }, totalTime);
    timeouts.push(phase2Timer);

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [phase, randomOrder, fullWord.length]);

  const isPhase2 = phase >= 2;

  return (
    <Box
      sx={ {
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 2,
        ...sx,
      } }
    >
      {/* 배경 이미지 */}
      <Box
        component="img"
        src={ coverImage }
        alt="cover"
        sx={ {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        } }
      />

      {/* 배경 오버레이 — 텍스트 가독성 */}
      <Box
        sx={ {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(18, 16, 14, 0.35)',
        } }
      />

      {/* 하단 그라데이션 — 다음 섹션(다크)으로 자연스러운 전환 */}
      <Box
        sx={ {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to bottom, transparent 0%, #12100E 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        } }
      />

      {/* 콘텐츠 */}
      <Box
        sx={ {
          position: 'relative',
          zIndex: 1,
          height: '100%',
        } }
      >
        {/* "intertext" → "inter" 애니메이션 텍스트 */}
        <Box
          sx={ {
            position: 'absolute',
            top: isPhase2 ? '25%' : '50%',
            left: '50%',
            transform: isPhase2
              ? `translate(calc(-50% + ${centerOffset}px), -50%)`
              : 'translate(-50%, -50%)',
            transition: isPhase2
              ? 'top 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          } }
        >
          <Box
            component="span"
            sx={ {
              fontFamily: '"Inter", sans-serif',
              fontWeight: 900,
              fontSize: { xs: '5rem', sm: '7.5rem', md: '11rem', lg: '14rem' },
              color: '#F5F2EE',
              textTransform: 'lowercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              display: 'inline-flex',
              whiteSpace: 'nowrap',
            } }
          >
            {/* "inter" 글자 */}
            { fullWord.slice(0, logoLength).split('').map((char, index) => {
              const isRevealed = revealedIndices.has(index);
              return (
                <Box
                  component="span"
                  key={ index }
                  sx={ {
                    display: 'inline-block',
                    opacity: isRevealed ? 1 : 0,
                    filter: isRevealed ? 'blur(0px)' : 'blur(12px)',
                    transition: 'opacity 1.2s ease-out, filter 1.2s ease-out',
                  } }
                >
                  { char }
                </Box>
              );
            }) }
            {/* "text" 글자 — 너비 측정용 래퍼 + Phase 2에서 산개 */}
            <Box
              component="span"
              ref={ textPartRef }
              sx={ { display: 'inline-flex' } }
            >
              { fullWord.slice(logoLength).split('').map((char, i) => {
                const index = logoLength + i;
                const isRevealed = revealedIndices.has(index);
                const scatter = isPhase2 ? scatterOffsets[i] : null;
                return (
                  <Box
                    component="span"
                    key={ index }
                    sx={ {
                      display: 'inline-block',
                      opacity: scatter ? 0 : (isRevealed ? 1 : 0),
                      filter: scatter
                        ? 'blur(12px)'
                        : (isRevealed ? 'blur(0px)' : 'blur(12px)'),
                      transition: scatter
                        ? 'opacity 0.8s ease-out, filter 0.8s ease-out, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'opacity 1.2s ease-out, filter 1.2s ease-out',
                      transform: scatter
                        ? `translate(${scatter.x}px, ${scatter.y}px) rotate(${scatter.rotate}deg)`
                        : 'none',
                    } }
                  >
                    { char }
                  </Box>
                );
              }) }
            </Box>
          </Box>
        </Box>

        {/* 중앙 가로선 — Phase 2에서 왼쪽→오른쪽 그어짐 */}
        <Box
          sx={ {
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            px: { xs: 3, md: 6 },
          } }
        >
          <Box
            sx={ {
              width: isPhase2 ? '100%' : '0%',
              height: '1px',
              backgroundColor: 'rgba(245, 242, 238, 0.4)',
              transition: 'width 1.2s ease-out',
            } }
          />
        </Box>

        {/* 하단 50% — 타이틀 + 서브타이틀 — Phase 2에서 밑에서 올라오며 나타남 */}
        <Box
          sx={ {
            position: 'absolute',
            top: '50%',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1.5, md: 2 },
            opacity: isPhase2 ? 1 : 0,
            transform: isPhase2 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s',
          } }
        >
          <Typography
            variant="h2"
            sx={ {
              fontFamily: '"Noto Serif KR", serif',
              fontWeight: 600,
              fontSize: { xs: '3.15rem', sm: '4.7rem', md: '6.9rem', lg: '8.8rem' },
              color: '#F5F2EE',
              letterSpacing: '0.08em',
              lineHeight: 1.2,
            } }
          >
            { title }
          </Typography>

          { authorInfo && (
            <Typography
              variant="body2"
              sx={ {
                fontFamily: '"Noto Serif KR", serif',
                fontWeight: 300,
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                color: 'rgba(245, 242, 238, 0.6)',
                letterSpacing: '0.1em',
              } }
            >
              { authorInfo }
            </Typography>
          ) }
        </Box>

        {/* 우하단 — "by intertext" — Phase 2에서 나타남 */}
        <Typography
          sx={ {
            position: 'absolute',
            bottom: { xs: 80, md: 100 },
            right: { xs: 24, md: 48 },
            fontFamily: '"Pretendard Variable", sans-serif',
            fontWeight: 300,
            fontSize: { xs: '0.75rem', md: '0.85rem' },
            color: 'rgba(245, 242, 238, 0.5)',
            letterSpacing: '0.1em',
            textTransform: 'lowercase',
            opacity: isPhase2 ? 1 : 0,
            transition: 'opacity 1.5s ease-out 0.6s',
          } }
        >
          by intertext
        </Typography>

        {/* 최하단 — 스크롤 안내 — Phase 2에서 나타남 */}
        <Typography
          variant="caption"
          sx={ {
            position: 'absolute',
            bottom: { xs: 24, md: 32 },
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(245, 242, 238, 0.3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: isPhase2 ? 1 : 0,
            transition: 'opacity 1.5s ease-out 1s',
          } }
        >
          { footerText }
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroSection;
