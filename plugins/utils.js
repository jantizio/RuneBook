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

/**
 * Sorts a rune array to the correct order for displaying
 * (probably horribly coded, I just dont see a better way atm)
 * Most of the map functions are just used to flatten the runes reforged info to just id's
 * @param {Array<Number>} runes - An array of potentially unsorted rune id's
 * @returns {Array<Number>} A sorted rune array suitable for displaying it on the UI
 */
function sortRunes(runes){
  const info = freezer.get().runesreforgedinfo;

  const runeSorted = [];


  // Determine Keystone (effectively just add all keystone ids to a single array and then check if any rune id matches one of the keystones)
  const keystones = info.map(x => x.slots[0].runes.map(y => y.id));
  const keystone = runes.find(x => keystones.flat().includes(x));
  runeSorted.push(keystone);
  runes = runes.filter(x => x != keystone);

  // Determine primary perks
  // First trying to find the type (Domination, etc) and then just loop through each slot and find the fitting rune and add it to the sorted rune page
  const primaryType = info.find(x => x.slots[0].runes.map(y => y.id).includes(keystone));
  primaryType.slots.forEach(x => {
    const perk = runes.find(y => x.runes.map(z => z.id).includes(y));
    if(!perk) return;
    runeSorted.push(perk);
    runes = runes.filter(x => x != perk);
  });

  // Determine secondary type
  // pretty much the same code as on primary, just the way of finding the type is a bit more complex
  const secondaryType = info.find(x => x.slots.map(y => y.runes.map(z => z.id)).flat().includes(runes[0]));
  secondaryType.slots.forEach(x => {
    const perk = runes.find(y => x.runes.map(z => z.id).includes(y));
    if(!perk) return;
    runeSorted.push(perk);
    runes = runes.filter(x => x != perk);
  })

  return runeSorted;
}

// Transfer of functions for use in other modules
module.exports = { getStylesMap, getPerksMap, getJson, removePerkIds, sortRunes };
