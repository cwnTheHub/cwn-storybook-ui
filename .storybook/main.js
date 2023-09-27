export default {
  stories: [
    "../src/stories/Introduction.mdx",
    "../src/stories/Installation.mdx",
    "../src/stories/Upgrading.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "@storybook/addon-styling",
    {
      name: "@storybook/addon-docs",
      options: {
        csfPluginOptions: null,
        jsxOptions: {},
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
};
