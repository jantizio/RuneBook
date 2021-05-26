const rp = require('request-promise-native');

/**
 * Gets a JSON object from a URI via 'request-promise-native'.
 * @param {string} uri - URI from which the json is to be retrieved
 * @return {object} JSON object what were received from the uri
 */
function getJson(uri) {
  return rp({ uri, json: true });
}

/**
 * Returns a list of runes styles with ID as value.
 * @param {string} usedKeyStr - The value to be used as key. Default is 'name'
 * @return {object} A list of rune styles with the respective ID as value.
 */
function getStylesMap(usedKeyStr = 'name') {
  const stylesMap = {};

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
    stylesMap[runeInfo[usedKeyStr]] = runeInfo.id;
  });

  return stylesMap;
}

/**
 * Returns a list of rune perks with ID as value.
 * @param {string} usedKeyStr - The value to be used as key. Default is 'name'
 * @return {object} A list of rune perks with the respective ID as value.
 */
function getPerksMap(usedKeyStr = 'name') {
  const perksMap = {};

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
    [].concat(...runeInfo.slots.map(row => row.runes)).forEach(rune => {
      perksMap[rune[usedKeyStr]] = rune.id;
    });
  });

  return perksMap;
}

/**
 * Filters the perk ids from a list of runes ids.
 * @param {Array} runes - A list of runes ids
 * @return {Array} A list of runes ids without the ids of the perks.
 */
function removePerkIds(runes) {
  const perkIds = freezer.get().runesreforgedinfo.map(runeInfo =>  runeInfo.id);
  return runes.filter(el => !perkIds.includes(el));
}

// Transfer of functions for use in other modules
module.exports = { getStylesMap, getPerksMap, getJson, removePerkIds };
