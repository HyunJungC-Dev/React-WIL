import { Stepper } from 'components';

/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="app">
      <Stepper id="unique-counter-desc" min={3} current={2} step={3} />
      {/* <h1 style={{ textAlign: 'center' }}>
        이벤트 핸들링 방법을 학습하며, Counter 컴포넌트를 작성해봅니다.
      </h1> */}
    </div>
  );
}
