import remarkGfm from "remark-gfm";
export default {
  stories: [
    "../src/components/Introduction.mdx",
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
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
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
    // autodocs: true

    autodocs: "tag",
    defaultName: "Documentation",
  },
};
