export default async function (to, from, savedPosition) {
    let position = false;

    if (to.matched.length < 2) {
        // scroll to the top of the page
        position = {x: 0, y: 0};
    } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = {x: 0, y: 0};
    }

    if (savedPosition) {
        return savedPosition;
    }

    return new Promise((resolve) => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
            // coords will be used if no selector is provided,
            // or if the selector didn't match any element.
            if (to.hash) {
                let hash = to.hash;
                // CSS.escape() is not supported with IE and Edge.
                if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
                    hash = '#' + window.CSS.escape(hash.substr(1));
                }
                try {
                    if (document.querySelector(hash)) {
                        // scroll to anchor by returning the selector
                        position = {selector: hash};
                    }
                } catch (e) {
                    console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS' +
                        '.escape).');
                }
            }

            resolve(position);
        });
    });
}
