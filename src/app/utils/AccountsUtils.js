/**
 *
 * @param {any} value
 * @returns {Boolean}
 */
export const hasValue = (value) => !['', undefined, null].includes(value)

/**
 *
 * @param {string} val
 * @return {string}
 */
export const getUrlFromSvgString = (string) => {
  const blob = new Blob([string], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  return url
}
