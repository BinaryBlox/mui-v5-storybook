const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);

// Original
// module.exports = {
//   stories: ["../src/**/*.stories.tsx"],
//   addons: ["@storybook/addon-docs"],
// };

/**
 * From existing story book
 */
module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials", 
    "@react-theming/storybook-addon",
     // '@storybook/preset-create-react-app',
    // '@storybook/addon-actions',
    // '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
 
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return  {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
