const rp = require('request-promise-native');
const { groupBy } = require('lodash');

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
 * Returns the rune style id based on the passed rune ids.
 * @param {Array} runes - A list of runes ids
 * @return {number} Runic style ID that could be determined. If no ID could be determined -1 is returned.
 */
function getStyleId(runes) {
  let styleId = -1;

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
    const runeIds = new Set(([].concat(...runeInfo.slots.map(row => row.runes))).map(rune => rune.id))
    if (runes.every(v => runeIds.has(v)) === true)
        styleId = runeInfo.id;
  });

  return styleId;
}

/**
 * Sortiert die Runen so wie sie auch im Spiele sind.
 * @param {Array} runes - A list of runes ids
 * @param {number} primaryStyle - Style Id of the primary runes
 * @param {number} subStyle - Style Id of the secondary runes
 * @return {Array} Sorted list of runes
 */
function sortRunes(runes, primaryStyle, subStyle) {
  // Index map for later sorting
  const indexes = new Map();

  // Sorting function that sorts the runes based on the index in the tree
  const sortingFunc = (a, b) => indexes.get(a) - indexes.get(b);

  // Creates a tree of style id and the matching runes
  const tree = freezer.get().runesreforgedinfo.reduce((obj, curr) => {
    obj[curr.id] = [].concat(...curr.slots.map(row => row.runes.map(i => i.id)));
    return obj;
  }, {});

  // Groups the passed runes fit to the respective style id
  const groupedRunes = groupBy(runes, (rune) => {
    for (const style of Object.keys(tree)) {
      const runeIndex = tree[style].indexOf(rune);
      if (runeIndex !== -1) {
        indexes.set(rune, runeIndex);
        return style;
      }
    }
  });

  // Sorts the groups for the respective style
  groupedRunes[primaryStyle].sort(sortingFunc);
  groupedRunes[subStyle].sort(sortingFunc);

  // Merges primary and secondary runes in the correct order
  return groupedRunes[primaryStyle].concat(groupedRunes[subStyle]);
}

// Transfer of functions for use in other modules
module.exports = { getStylesMap, getPerksMap, getStyleId, getJson, sortRunes };
