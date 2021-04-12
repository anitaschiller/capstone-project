const path = require('path');
module.exports = {
  ignore: ['**/*.spec.js', '**/src/components/ImageCropper.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/StyleGuideWrapper'),
  },
};
