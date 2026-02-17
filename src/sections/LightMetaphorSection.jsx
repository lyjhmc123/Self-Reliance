import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
`;

/**
 * LightMetaphorSection 컴포넌트
 *
 * 어둠 속 노란 빛이 스크롤 진입에 따라 점점 커지는 풀스크린 섹션.
 *
 * 동작 흐름:
 * 1. LeadTextSection에서 스크롤하면 검은 화면 중앙에 작은 노란 빛이 맥동한다
 * 2. 섹션에 진입할수록 빛이 점점 커진다
 * 3. 100% 진입하면 빛이 화면의 약 1/4 크기까지 확장된다
 * 4. 이후 스크롤하면 전체가 페이드아웃되며 다음 섹션으로 전환된다
 *
 * Props:
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LightMetaphorSection />
 */
function LightMetaphorSection({ sx }) {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const glowRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || !stickyRef.current || !glowRef.current || !pulseRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      /** sticky 내부 스크롤 진행률 (0→1) — 빛이 화면에 보이는 동안 */
      const scrollableDistance = rect.height - vh;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      /** 빛 크기: 16px(점) → 화면 30% (vmin 기준), progress 0~0.5 구간에서 확장 */
      const initialSize = 16;
      const maxSize = Math.min(vw, vh) * 0.6;
      const targetScale = maxSize / initialSize;

      const growProgress = Math.min(1, progress / 0.5);
      const scale = 1 + (targetScale - 1) * growProgress;
      const pulseState = progress < 0.1 ? 'running' : 'paused';

      glowRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      pulseRef.current.style.animationPlayState = pulseState;

      /** 전체 페이드아웃: progress 0.6~1에서 1→0 */
      if (progress > 0.6) {
        stickyRef.current.style.opacity = 1 - (progress - 0.6) / 0.4;
      } else {
        stickyRef.current.style.opacity = 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
          overflow: 'hidden',
        } }
      >
        {/* Scale 래퍼 — JS가 transform으로 크기 제어 */}
        <Box
          ref={ glowRef }
          sx={ {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          } }
        >
          {/* 원형 빛 — CSS pulse 애니메이션 (scale/opacity) */}
          <Box
            ref={ pulseRef }
            sx={ {
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 198, 110, 0.6) 0%, rgba(255, 198, 110, 0.15) 40%, transparent 70%)',
              animation: `${pulse} 3s ease-in-out infinite`,
            } }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default LightMetaphorSection;
