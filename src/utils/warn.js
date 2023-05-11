
export const deprecate = (componentName, message) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.warn(`[NDS] [Deprecate] ${componentName}: ${message}`); // eslint-disable-line no-console
};

export const warn = (componentName, message) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.warn(`[NDS] ${componentName}: ${message}`); // eslint-disable-line no-console
};
