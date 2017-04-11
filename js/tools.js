/**
 * Created by Константин on 10.04.2017.
 */

/**
 * Creating tags for outputting error messages
 * @param {Array} text
 * @returns {string}
 */
function renderWarning(text) {
  let out = '';
  for (const val of text) out += `<p>${val}</p>`;
  return `<div class="warning">${out}</div>`;
}

/**
 * Just creates an excerpt of very long description consisting of defined number of words
 * @param {string} text - original news description
 * @param {number} num  - number of words in the excerpt
 * @returns {string} - description or excerpt if needed
 */
function shortenText(text, num) {
  if (text) {
    const out = text.split(' ');
    if (num < out.length) return `${out.slice(0, num).join(' ')}...`;
    else return text;
  }
}