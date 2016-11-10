// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        plugins: [
          require('karma-teamcity-reporter'),
          require('jasmine-core'),
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-phantomjs-launcher')
        ],
        customLaunchers: {
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [

            {
                pattern: 'dist/lib/es6-shim/es6-shim.min.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/zone.js/dist/zone.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/reflect-metadata/Reflect.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/systemjs/dist/system-polyfills.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/systemjs/dist/system.src.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/zone.js/dist/async-test.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/zone.js/dist/fake-async-test.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/zone.js/dist/fake-async-test.js',
                included: true,
                watched: false
            }, {
                pattern: 'dist/lib/jasmine-core/**/*',
                included: false,
                served: true,
                nocache: true
            }, {
                pattern: 'dist/**/*.js',
                included: false,
                served: true,
                nocache: true
            },


            // paths to support debugging with source maps in dev tools
            {
                pattern: 'src/**/*.ts',
                included: false,
                watched: false
            }, {
                pattern: 'dist/**/*.js.map',
                included: false,
                watched: false
            },

            {
                pattern: 'config/karma-test-shim.js',
                included: true,
                watched: true
            },

        ],
        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler

            '/node_modules/': 'http://localhost:9876/base/dist/lib/',
            '/app/': 'http://localhost:9876/base/dist/app/'
            

        },    
        exclude: [
            // Vendor packages might include spec files. We don't want to use those.
            'dist/lib/**/*.spec.js'
        ],
        preprocessors: {},
        port: 9876,
        logLevel: config.LOG_INFO,
        reporters: ['teamcity']

    });
};