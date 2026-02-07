import TermFullscreenSection from './TermFullscreenSection';

export default {
  title: 'Section/TermFullscreenSection',
  component: TermFullscreenSection,
  tags: ['autodocs'],
  argTypes: {
    term: {
      control: 'object',
      description: '용어 데이터 객체 { id, motif, title, description, body, quotes }',
    },
    index: {
      control: { type: 'number', min: 0, max: 7 },
      description: '현재 용어의 인덱스 (0-based)',
    },
    totalCount: {
      control: { type: 'number', min: 1, max: 20 },
      description: '전체 용어 개수',
    },
    onDetailClick: {
      action: 'detailClicked',
      description: '자세히 보기 클릭 핸들러',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

const sampleTerm = {
  id: 'variants-space',
  motif: 'grid',
  title: '가능태 공간',
  description: '모든 가능한 현실이 존재하는 무한한 정보장',
  body: '변이 공간(Variants Space)은 트랜서핑의 가장 핵심적인 개념입니다.',
  quotes: [
    { text: '변이 공간에는 모든 것이 이미 존재한다.', source: '바딤 젤란드' },
  ],
};

export const Default = {
  args: {
    term: sampleTerm,
    index: 0,
    totalCount: 8,
  },
};

export const Variants = {
  render: (args) => (
    <>
      <TermFullscreenSection
        term={ {
          id: 'variants-space',
          motif: 'grid',
          title: '가능태 공간',
          description: '모든 가능한 현실이 존재하는 무한한 정보장',
        } }
        index={ 0 }
        totalCount={ 8 }
        onDetailClick={ args.onDetailClick }
      />
      <TermFullscreenSection
        term={ {
          id: 'pendulum',
          motif: 'ripple',
          title: '펜듈럼',
          description: '집단적 사고 에너지로 형성된 정보 구조물',
        } }
        index={ 1 }
        totalCount={ 8 }
        onDetailClick={ args.onDetailClick }
      />
      <TermFullscreenSection
        term={ {
          id: 'importance',
          motif: 'warp',
          title: '중요도',
          description: '목표에 대한 과도한 의미 부여',
        } }
        index={ 2 }
        totalCount={ 8 }
        onDetailClick={ args.onDetailClick }
      />
    </>
  ),
  parameters: {
    controls: { disable: true },
  },
};
