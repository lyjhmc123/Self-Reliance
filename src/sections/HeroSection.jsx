import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { keyframes } from '@mui/material/styles';
import RandomRevealText from '../components/kinetic-typography/RandomRevealText';
import selfImage from '../assets/self.jpg';

const floatUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * HeroSection 컴포넌트
 *
 * 매거진 표지 역할의 전체화면 히어로 섹션.
 * 라이트 배경(Wall Tint White #F5F2EE) 위에 로고, 타이틀, 저자 정보를 수직 배치.
 *
 * 동작 흐름:
 * 1. 사용자가 페이지에 진입하면 100vh 크기의 표지가 표시된다
 * 2. 상단에 로고, 중앙에 타이틀과 저자 정보가 수직 정렬된다
 * 3. 하단에 스크롤 안내 텍스트가 표시된다
 * 4. 스크롤하면 다음 섹션(LeadTextSection)으로 자연스럽게 전환된다
 *
 * Props:
 * @param {string} logo - 매거진 로고 텍스트 [Required]
 * @param {string} title - 메인 타이틀 텍스트 [Required]
 * @param {string} authorInfo - 저자 및 출판사 정보 [Optional]
 * @param {string} footerText - 하단 스크롤 안내 텍스트 [Optional, 기본값: 'Scroll to explore']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroSection
 *   logo="by Intertext"
 *   title="자기 신뢰"
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
  return (
    <Box
      sx={ {
        height: '100vh',
        position: 'relative',
        overflow: 'visible',
        backgroundColor: 'transparent',
        zIndex: 2,
        ...sx,
      } }
    >
      {/* 테두리 프레임 */}
      <Box
        sx={ {
          position: 'absolute',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          border: '1px solid rgba(18, 16, 14, 0.1)',
          pointerEvents: 'none',
        } }
      />

      {/* 히어로 텍스트 영역 */}
      <Container
        maxWidth="md"
        sx={ {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: { xs: 4, md: 6 },
        } }
      >
        {/* 상단: 로고 */}
        <Typography
          variant="h6"
          component="div"
          sx={ {
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: '#12100E',
            pt: { xs: 2, md: 4 },
          } }
        >
          { logo }
        </Typography>

        {/* 중앙: 서브타이틀 + 타이틀 */}
        <Box
          sx={ {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            mt: '-10vh',
          } }
        >
          {/* 타이틀 상단 캐치프레이즈 — RandomRevealText로 등장 */}
          <RandomRevealText
            text="인생의 모든 답은 내 안에 있다"
            variant="h3"
            delay={ 200 }
            stagger={ 40 }
            sx={ {
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: '1.1rem', sm: '1.4rem', md: '2rem' },
              fontWeight: 400,
              color: 'rgba(18, 16, 14, 0.5)',
              letterSpacing: '0.045em',
              mb: 2,
            } }
          />

          {/* 메인 타이틀 — 캐치프레이즈 후 RandomRevealText로 등장 */}
          <RandomRevealText
            text={ title }
            variant="h1"
            delay={ 1200 }
            stagger={ 60 }
            sx={ {
              fontFamily: '"Noto Serif KR", serif',
              fontWeight: 500,
              fontSize: { xs: '3.5rem', sm: '4.5rem', md: '7rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#12100E',
              mb: '40px',
              display: 'block',
            } }
          />

          {/* 저자 정보 — 타이틀 후 RandomRevealText로 등장 */}
          { authorInfo && (
            <RandomRevealText
              text={ authorInfo }
              variant="caption"
              delay={ 2000 }
              stagger={ 40 }
              sx={ {
                fontFamily: '"Noto Serif KR", serif',
                fontSize: '0.9rem',
                color: 'rgba(18, 16, 14, 0.5)',
                letterSpacing: '0.05em',
              } }
            />
          ) }

        </Box>

        {/* 하단: 스크롤 안내 */}
        <Typography
          variant="caption"
          sx={ {
            color: 'rgba(18, 16, 14, 0.3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            pb: { xs: 2, md: 4 },
          } }
        >
          { footerText }
        </Typography>
      </Container>

      {/* 우하단 책 표지 이미지 — 서브타이틀 등장 후 부드럽게 떠오름 */}
      <Box
        component="img"
        src={ selfImage }
        alt="자기 신뢰 표지"
        sx={ {
          position: 'absolute',
          bottom: { xs: '18%', md: '20%' },
          right: { xs: '6%', md: '8%' },
          width: { xs: 100, sm: 120, md: 150 },
          opacity: 0,
          animation: `${floatUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2.8s forwards`,
          boxShadow: '0 8px 32px rgba(18, 16, 14, 0.12)',
        } }
      />

      {/* 커버 이미지 — 히어로 하단에서 시작해 다음 섹션까지 걸침 */}
      {/* <Box
        sx={ {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          mt: { xs: '-38vh', md: '-42vh' },
        } }
      >
        <Container maxWidth="md">
          <ScrollScaleContainer
            scaleFrom={ 0.8 }
            scaleTo={ 1 }
          >
            <Placeholder.Image
              ratio="16/9"
              sx={ {
                width: '100%',
                borderRadius: '40px',
              } }
            />
          </ScrollScaleContainer>
        </Container>
      </Box> */}
    </Box>
  );
}

export default HeroSection;
