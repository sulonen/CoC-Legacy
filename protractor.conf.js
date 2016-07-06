exports.config = {
  framework: 'jasmine',
  
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  plugins: [{
    path: 'node_modules/protractor-istanbul-plugin',
    logAssertions: true,
    failAssertions: true
  }],
  
  specs: ['./test/e2e/*spec.js']
};
