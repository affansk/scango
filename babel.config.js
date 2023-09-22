module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'], // existing

  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
