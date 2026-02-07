import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * LeadTextSection 컴포넌트
 *
 * 매거진 리드문을 표시하는 풀스크린 섹션.
 * 검정 배경 위 라이트 텍스트가 중앙 정렬되며, sticky로 고정된다.
 * 스크롤을 계속하면 섹션이 서서히 투명해지면서 뒤에 겹쳐진
 * 다음 섹션(가능태공간)의 점들이 자연스럽게 드러난다.
 *
 * 동작 흐름:
 * 1. 사용자가 HeroSection을 지나 스크롤하면 검정 배경 위에 리드문이 표시된다
 * 2. 텍스트가 화면 중앙에 수직·수평 정렬된 채 sticky로 고정된다
 * 3. 스크롤 진행률 30%부터 섹션 전체가 서서히 페이드아웃된다
 * 4. 뒤에 겹쳐진 다음 섹션의 점들이 점점 노출되며 자연스럽게 전환된다
 *
 * Props:
 * @param {string} text - 리드 문단 텍스트 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LeadTextSection text="리얼리티 트랜서핑은..." />
 */
function LeadTextSection({ text, sx }) {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || !stickyRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      /** 진행률 30% 이후부터 페이드아웃 시작 → 100%에서 완전히 투명 */
      const opacity = Math.max(0, 1 - Math.max(0, (progress - 0.3) / 0.7));
      stickyRef.current.style.opacity = opacity;
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
          backgroundColor: '#12100E',
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
            justifyContent: 'center',
          } }
        >
          <Typography
            variant="body1"
            sx={ {
              maxWidth: 520,
              color: '#F5F2EE',
              lineHeight: 1.9,
              whiteSpace: 'pre-line',
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              wordBreak: 'keep-all',
              textAlign: 'center',
            } }
          >
            { text }
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default LeadTextSection;
