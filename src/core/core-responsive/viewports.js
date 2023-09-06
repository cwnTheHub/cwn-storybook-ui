const viewports = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

viewports.map = new Map([
  [viewports.xs, 0],
  [viewports.sm, 576],
  [viewports.md, 768],
  [viewports.lg, 992],
  [viewports.xl, 1200],
]);
viewports.values = Array.from(viewports.map.values());
viewports.keys = Array.from(viewports.map.keys());

const viewportsSortedDescending = Array.from(viewports.map.entries()).reverse();

// The largest viewport such that the given width is still >= the breakpoint
viewports.select = (width = 0) => {
  if (!Number.isFinite(+width) || width < 0) {
    throw new Error(`width must be a non-negative number, received: ${width}`);
  }
  return viewportsSortedDescending.find(([, min]) => width >= min)[0];
};
const inherit = ({ xs, sm = xs, md = sm, lg = md, xl = lg }) => ({
  xs,
  sm,
  md,
  lg,
  xl,
});
viewports.inherit = inherit;

const fromArray = (viewportsArray) => ({
  xs: viewportsArray[0],
  sm: viewportsArray[1],
  md: viewportsArray[2],
  lg: viewportsArray[3],
  xl: viewportsArray[4],
});
viewports.fromArray = fromArray;

export default viewports;
