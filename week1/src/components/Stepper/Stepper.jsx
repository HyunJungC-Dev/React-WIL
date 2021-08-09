import './Stepper.css';
import { Component } from 'react';
import { shape, exact, string, bool, number, oneOfType, oneOf } from 'prop-types';
import { ReactComponent as SvgIconLeft } from 'assets/icons/left.svg';
import { ReactComponent as SvgIconRight } from 'assets/icons/right.svg';
import { A11yHidden } from 'components';
import { classNames } from 'utils';

/* -------------------------------------------------------------------------- */

const StringOrNumberType = oneOfType([number, string]);

const ButtonType = shape({
  label: string,
  withTitle: bool,
});

const ButtonPropsType = exact({
  left: ButtonType,
  right: ButtonType,
});

export class Stepper extends Component {
  static defaultProps = {
    buttonProps: {
      left: {
        label: '카운트 감소',
        withTitle: true,
      },
      right: {
        label: '카운트 증가',
        withTitle: true,
      },
    },
    min: 0,
    max: 100000,
    current: 0,
    step: 1,
    // dir: 'horizontal'
    dir: 'vertical'
  };

  static propTypes = {
    id: string.isRequired,
    buttonProps: ButtonPropsType,
    min: StringOrNumberType,
    max: StringOrNumberType,
    current: StringOrNumberType,
    step: StringOrNumberType,
    dir : oneOf(['horizontal', 'vertical'])
  };

  state = {
    count: Number(this.props.current),
    dir: this.props.dir,
  };

  static getDerivedStateFromProps({ min, max }, { count }) {
    const updateCount = count < min ? min : count > max ? max : count;
    return {
      isMinValue: count <= min,
      isMaxValue: count >= max,
      count: updateCount,
    };
  }

  handleUpdate = (type, e) => {
    this.setState(
      ({ count }, { step }) => ({
        count: count + step * (type.includes('inc') ? 1 : -1),
      }),
      this.updateDocumentTitle
    );
  };

  handleIncrement = (type, e) => {
    this.setState(
      ({ count }, { step }) => ({
        count: count + step,
      }),
      this.updateDocumentTitle
    );
  };

  handleDecrement = (type, e) => {
    this.setState(
      ({ count }, { step }) => ({
        count: count - step,
      }),
      this.updateDocumentTitle
    );
  };

  handleBlurOutput = (e) => {
    this.setState({
      count: Number(e.target.value),
    });
  };

  render() {
    const {
      id,
      buttonProps: { left,right },
    } = this.props;

    const { count, isMinValue, isMaxValue, dir } = this.state;

    return (
      <div
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        aria-describedby={id}
        className={classNames("stepper", dir)}
      >
        <A11yHidden id={id}>
          카운트 증가 또는 감소 버튼을 눌러, 카운트 값을 변경할 수 있습니다.
        </A11yHidden>
        <button
          type="button"
          className="button"
          aria-label={left.label}
          title={left.withTitle && left.label}
          disabled={isMinValue}
          onClick={(e) => this.handleUpdate('decrement', e)}
        >
          <SvgIconLeft />
        </button>
        <output
          className="output"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={this.handleBlurOutput}
        >
          {count}
        </output>
        <button
          type="button"
          className="button"
          aria-label={right.label}
          title={right.withTitle && right.label}
          disabled={isMaxValue}
          onClick={(e) => this.handleUpdate('increment', e)}
        >
          <SvgIconRight/>
        </button>
      </div>
    );
  }

  updateDocumentTitle() {
    document.title = `(${this.state.count}) React 스텝퍼 앱`;
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate({ min, max }) {
    // prevState : parameters
    // currentState : this.state
    // console.log({ min, max });
    // console.log({ 현재값: this.state.count });
    // const { count } = this.state;
    // if (count < min) this.setState({ count: min });
    // if (count > max) this.setState({ count: max });
  }
}
