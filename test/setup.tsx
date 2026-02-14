import "@testing-library/jest-dom";

// Prevent occasional crashes in some UI libs / environments
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;

//   Correct framer-motion mock:
// - motion.button renders a real <button>
// - motion.div renders a real <div>
// - strips motion-only props so React doesn't warn
jest.mock("framer-motion", () => {
  const React = require("react");

  const stripMotionProps = (props: any) => {
    const {
      whileHover,
      whileTap,
      whileDrag,
      drag,
      dragConstraints,
      dragElastic,
      layout,
      layoutId,
      initial,
      animate,
      exit,
      transition,
      variants,
      onAnimationStart,
      onAnimationComplete,
      ...rest
    } = props;
    return rest;
  };

  const MotionFactory = (Tag: any) =>
    React.forwardRef(({ children, ...props }: any, ref: any) =>
      React.createElement(Tag, { ref, ...stripMotionProps(props) }, children)
    );

  return {
    AnimatePresence: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    motion: {
      div: MotionFactory("div"),
      span: MotionFactory("span"),
      button: MotionFactory("button"),
      article: MotionFactory("article"),
      main: MotionFactory("main"),
      section: MotionFactory("section"),
    },
  };
});
