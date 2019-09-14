export function strip(html) {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent.replace(/\n/g, '') || tmp.innerText.replace(/\n/g, '') || '';
}

export function getOffset(el) {
    let rect = el.getBoundingClientRect();

    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

export function scrollTo(id = false, offset = 0) {
    if (!id) {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    } else {
        const target = document.getElementById(id);
        if (target) {
            const position = getOffset(target).top;
            window.scroll({top: position - offset, left: 0, behavior: 'smooth'});
        }
    }
}

export function scrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

export function detectWebGLContext() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl')
        || canvas.getContext('experimental-webgl');
    return gl && gl instanceof WebGLRenderingContext;
}

export const getMinMaxLabel = (min, max) => {
    let label = '';
    if (min) label += `${min}-`;
    if (max) label += max;

    if (min === max)
        label = `${min}`;

    return label;
};

export function getElementOffset(elem) {
    if (!elem)
        elem = this;

    let x = elem.offsetLeft;
    let y = elem.offsetTop;

    while (elem.offsetParent) {
        elem = elem.offsetParent;

        x += elem.offsetLeft;
        y += elem.offsetTop;
    }

    return {left: x, top: y};
}
