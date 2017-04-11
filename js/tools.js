/**
 * Created by Константин on 10.04.2017.
 */
function renderWarning(text) {
  let out = '';
  for (const val of text) out += `<p>${val}</p>`;
  return `<div class="warning">${out}</div>`;
}

function shortenText(text, num) {
  const out = text.split(' ');
  if (num < out.length) return `${out.slice(0, num).join(' ')}...`;
  else return text;
}