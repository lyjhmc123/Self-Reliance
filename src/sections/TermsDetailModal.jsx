import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { motion, AnimatePresence } from 'framer-motion';
import RandomRevealText from '../components/kinetic-typography/RandomRevealText';

/** 공유 이징 커브 */
const EASE_SMOOTH = [0.32, 0.72, 0, 1];

/**
 * 섹션 구분 장식 — 좌우 라인 + 중앙 텍스트
 */
function SectionDivider({ label }) {
  return (
    <Box
      sx={ {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        my: { xs: 6, md: 8 },
      } }
    >
      <Box sx={ { flex: 1, height: '1px', backgroundColor: 'rgba(245, 242, 238, 0.12)' } } />
      <Typography
        variant="body2"
        sx={ {
          fontFamily: '"Cormorant Garamond", "Pretendard Variable", serif',
          fontStyle: 'italic',
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          color: 'rgba(245, 242, 238, 0.5)',
          flexShrink: 0,
          letterSpacing: '0.04em',
        } }
      >
        { label }
      </Typography>
      <Box sx={ { flex: 1, height: '1px', backgroundColor: 'rgba(245, 242, 238, 0.12)' } } />
    </Box>
  );
}

/**
 * TermsDetailModal 컴포넌트
 *
 * 용어 상세 콘텐츠를 풀스크린 단일 칼럼 모달로 보여주는 컴포넌트.
 * 텍스트 중심 레이아웃으로 타이틀, 설명, 본문, 인용문을 순서대로 표시한다.
 *
 * 동작 흐름:
 * 1. 풀스크린 용어 섹션에서 '자세히 보기'를 클릭하면 이 모달이 열린다
 * 2. fade-in + slide-up 애니메이션으로 모달이 나타난다
 * 3. 타이틀이 RandomRevealText로 블러에서 나타나고, 설명/본문이 이어진다
 * 4. 스크롤하면 인용문(quotes)이 이어서 표시된다
 * 5. 닫기 버튼 또는 Escape 키로 모달이 닫힌다
 *
 * Props:
 * @param {boolean} isOpen - 모달 열림 여부 [Required]
 * @param {function} onClose - 모달 닫기 핸들러 [Required]
 * @param {object} term - 용어 데이터 객체 [Optional]
 *   { id, motif, title, description, body, quotes }
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TermsDetailModal
 *   isOpen={true}
 *   onClose={() => setOpen(false)}
 *   term={termData}
 * />
 */
function TermsDetailModal({
  isOpen,
  onClose,
  term,
  sx,
}) {
  /** exit 애니메이션 중 term 데이터 유지용 ref */
  const lastTermRef = useRef(null);

  if (term) {
    lastTermRef.current = term;
  }

  /** 표시할 데이터 — exit 중에도 마지막 데이터 유지 */
  const displayTerm = term || lastTermRef.current;

  /** 스크롤 잠금 + Escape 키 핸들링 */
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      { isOpen && displayTerm && (
        <motion.div
          key={ displayTerm.id }
          initial={ { opacity: 0, y: 40 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0, y: 20 } }
          transition={ { duration: 0.4, ease: EASE_SMOOTH } }
          role="dialog"
          aria-modal="true"
          style={ {
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
          } }
        >
          {/* 배경 — 클릭으로 닫기 */}
          <Box
            onClick={ onClose }
            sx={ {
              position: 'absolute',
              inset: 0,
              backgroundColor: '#12100E',
              ...sx,
            } }
          />

          {/* 닫기 버튼 — 고정 */}
          <IconButton
            onClick={ onClose }
            aria-label="닫기"
            sx={ {
              position: 'fixed',
              top: { xs: 16, md: 24 },
              right: { xs: 16, md: 32 },
              zIndex: 10,
              color: '#F5F2EE',
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: 'rgba(245, 242, 238, 0.08)',
              },
            } }
          >
            ✕
          </IconButton>

          {/* 스크롤 영역 */}
          <Box
            sx={ {
              position: 'relative',
              overflowY: 'auto',
              height: '100%',
            } }
          >
            {/* ── 단일 칼럼 텍스트 레이아웃 ── */}
            <Container
              maxWidth="sm"
              sx={ {
                pt: { xs: 10, md: 14 },
                pb: { xs: 4, md: 6 },
              } }
            >
              {/* 타이틀 — 모달 진입 시 blur에서 나타남 */}
              <RandomRevealText
                key={ displayTerm.id }
                text={ displayTerm.title }
                variant="h2"
                delay={ 300 }
                stagger={ 50 }
                sx={ {
                  fontWeight: 700,
                  fontSize: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#F5F2EE',
                  mb: 2,
                  display: 'block',
                } }
              />

              {/* 설명 — 이탤릭 세리프 */}
              { displayTerm.description && (
                <Typography
                  variant="body1"
                  sx={ {
                    fontFamily: '"Cormorant Garamond", "Pretendard Variable", serif',
                    fontStyle: 'italic',
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    color: 'rgba(245, 242, 238, 0.55)',
                    mb: 4,
                  } }
                >
                  { displayTerm.description }
                </Typography>
              ) }

              {/* 본문 */}
              { displayTerm.body && (
                <Typography
                  variant="body1"
                  sx={ {
                    color: 'rgba(245, 242, 238, 0.7)',
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    lineHeight: 1.9,
                    wordBreak: 'keep-all',
                  } }
                >
                  { displayTerm.body }
                </Typography>
              ) }
            </Container>

            {/* ── 인용문 ── */}
            { displayTerm.quotes?.length > 0 && (
              <motion.div
                initial={ { opacity: 0, y: 30 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ {
                  duration: 0.4,
                  delay: 0.5,
                  ease: 'easeOut',
                } }
              >
                <Container maxWidth="sm" sx={ { pb: { xs: 10, md: 14 } } }>
                  <SectionDivider label="Quotes" />
                  { displayTerm.quotes.map((quote, index) => (
                    <Box
                      key={ index }
                      sx={ {
                        textAlign: 'center',
                        mb: { xs: 5, md: 6 },
                      } }
                    >
                      <Typography
                        variant="h5"
                        component="blockquote"
                        sx={ {
                          fontFamily: '"Cormorant Garamond", "Pretendard Variable", serif',
                          fontSize: { xs: '1.6rem', md: '2rem' },
                          lineHeight: 1.6,
                          fontStyle: 'italic',
                          fontWeight: 400,
                          color: 'rgba(245, 242, 238, 0.65)',
                          mb: 1.5,
                        } }
                      >
                        &ldquo;{ quote.text }&rdquo;
                      </Typography>
                      { quote.source && (
                        <Typography
                          variant="caption"
                          sx={ {
                            color: 'rgba(245, 242, 238, 0.35)',
                            fontSize: '0.95rem',
                            letterSpacing: '0.04em',
                          } }
                        >
                          — { quote.source }
                        </Typography>
                      ) }
                    </Box>
                  )) }
                </Container>
              </motion.div>
            ) }
          </Box>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}

export default TermsDetailModal;
