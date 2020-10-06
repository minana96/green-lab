/*globals HJ_REVISION:true */
window.hjBootstrap =
    window.hjBootstrap ||
    function (scriptDomain, modulePath, siteId) {
        /**
         * Try to prevent loading the script at all for the major bots/crawlers.
         * This is the first line defence against serving our scripts to crawlers.
         * Warns in console if we aren't loading, to aid support.
         * Any changes to this regex should also be added to the client_api view on the backend.
         **/
        var knownBots = [
            'bot',
            'headless',
            'google',
            'baidu',
            'bing',
            'msn',
            'duckduckbot',
            'teoma',
            'slurp',
            'yandex',
            'phantomjs',
            'pingdom',
            'ahrefsbot'
        ];
        var botString = knownBots.join('|');
        var botTestRegex = new RegExp(botString, 'i');

        // We'll let the client API do a more reliable test for us if we can't get the userAgent ourselves.
        var navigator = window.navigator || { userAgent: 'unknown' };
        var detectedUserAgent = navigator.userAgent ? navigator.userAgent : 'unknown';
        var isProbablyBot = botTestRegex.test(detectedUserAgent);
        if (isProbablyBot) {
            // eslint-disable-next-line no-console
            console.warn('Hotjar not launching due to suspicious userAgent:', detectedUserAgent);
            return;
        }

        /**
         * The function that becomes window.hjBootstrap.
         * It needs all three parameters so that it actually gets `siteId`, the third param, even though
         * it doesn't itself use them.
         **/
        var bootstrap = function (scriptDomain, modulePath, siteId) {
            // Used to check for multiple script installs.
            window.hjBootstrapCalled = (window.hjBootstrapCalled || []).concat(siteId);

            // Show message if the script was loaded twice.
            if (window.hj && window.hj._init && window.hj._init._verifyInstallation) {
                hj._init._verifyInstallation();
            }
        };
        bootstrap(scriptDomain, modulePath, siteId);

        // Caution - do not rename this variable to 'document' as minification will not recognise that this is
        // referring to window.document, resulting in 'a=a'.
        var doc = window.document;
        var head = doc.head || doc.getElementsByTagName('head')[0];
        var scriptTag,
            styleTag,
            varsFrame,
            varsFrameCSS,
            varsFrameName = '_hjRemoteVarsFrame';

        if (!doc.addEventListener) {
            return;
        }

        // We need to assign this to a value so that the modules-xxxx webpack asset loader can load from the
        // correct path.
        hj.scriptDomain = scriptDomain;

        scriptTag = doc.createElement('script');
        scriptTag.async = 1;
        scriptTag.src = hj.scriptDomain + modulePath;
        scriptTag.charset = 'utf-8';

        head.appendChild(scriptTag);

        varsFrameCSS = [
            'iframe#' + varsFrameName + ' {',
            'display: none !important; width: 1px !important; height: 1px !important; ' +
                'opacity: 0 !important; pointer-events: none !important;',
            '}'
        ];

        styleTag = doc.createElement('style');
        styleTag.type = 'text/css';
        if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText = varsFrameCSS.join('');
        } else {
            styleTag.appendChild(doc.createTextNode(varsFrameCSS.join('')));
        }
        head.appendChild(styleTag);

        varsFrame = doc.createElement('iframe');
        varsFrame.style.cssText = varsFrameCSS[1];
        varsFrame.name = varsFrameName;
        varsFrame.title = varsFrameName;
        varsFrame.id = varsFrameName;
        varsFrame.src = 'https://' + (window._hjSettings.varsHost || 'vars.hotjar.com') + '/<<box>>';

        // We only use one onload here due to problems with some 3rd-party scripts stacking onload calls.
        varsFrame.onload = function () {
            bootstrap.varsLoaded = true;
            if (typeof hj !== 'undefined' && hj.event) {
                hj.event.signal('varsLoaded');
            }
        };
        bootstrap.varsJar = varsFrame;

        function appendVarsFrame() {
            // We wait for a few ms before we load in the iframe to try and be sure it isn't blocking things.
            setTimeout(function () {
                doc.body.appendChild(varsFrame);
            }, 50);
        }

        // If the page is already DOMContentLoaded then load the iframe, otherwise wait until it's good to go.
        if (doc.readyState === 'interactive' || doc.readyState === 'complete' || doc.readyState === 'loaded') {
            appendVarsFrame();
        } else {
            doc.addEventListener('DOMContentLoaded', appendVarsFrame);
        }

        // Dynamic settings
        bootstrap.revision = HJ_REVISION;

        window.hjBootstrap = bootstrap;
    };

/**
 * <<script_domain>> - Replaced by nginx depending on the environments.
 * <<modules_file_path>> - Replaced by webpack based on the hashed filename of the modules file.
 * <<site_id>> - Replaced by nginx depending on the site.
 */
window.hjBootstrap('<<script_domain>>', '<<modules_file_path>>', '<<site_id>>');
