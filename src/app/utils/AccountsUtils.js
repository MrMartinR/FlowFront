/**
 *
 * @param {any} value
 * @returns {Boolean}
 */
export const hasValue = (value) => {
    return !['', undefined, null].includes(value) ? true : false;
};

/**
 *
 * @param {string} val
 * @return {string}
 */
export const getUrlFromSvgString = (string) => {
    let blob = new Blob([string], { type: 'image/svg+xml' });
    let url = URL.createObjectURL(blob);
    return url;
};
