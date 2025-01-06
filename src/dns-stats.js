const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const newDomains = {};
  for (let key in domains) {
    const parts = domains[key].split('.').reverse();
    let currentDNS = '';
    for (let part of parts) {
      currentDNS += `.${part}`;
      if (newDomains[currentDNS]) {
        newDomains[currentDNS]++;
      } else {
        newDomains[currentDNS] = 1;
      }
    }
  }

  return newDomains;
}

module.exports = {
  getDNSStats
};
