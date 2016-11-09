/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

    // map tells the System loader where to look for things
    var map = {
        // 'environment': '.',
        'app': 'app', // 'dist',
        '@angular': 'library/@angular',
        'rxjs': 'library/rxjs',
        'ng2-idle': 'library/ng2-idle'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'ng2-idle': { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'upgrade',
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'index.js',
            defaultExtension: 'js'
        };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {
            main: '/bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    }

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        map: map,
        packages: packages,
    };

    System.config(config);

})(this);
