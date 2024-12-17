// karma.conf.js
module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-coverage'), // Asegúrate de agregar karma-coverage aquí
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        reporters: [
          { type: 'html' }, // Genera un informe HTML
          { type: 'text-summary' } // Genera un resumen en la terminal
        ],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'coverage'], // Asegúrate de agregar 'coverage' aquí
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
    });
  };
  