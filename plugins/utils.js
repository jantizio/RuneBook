const rp = require('request-promise-native');
const { groupBy } = require('lodash');

function getJson(uri) {
  return rp({ uri, json: true });
}

function getStylesMap(usedKeyStr = 'name') {
  let stylesMap = {};

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
    stylesMap[runeInfo[usedKeyStr]] = runeInfo.id;
  });

  return stylesMap;
}

function getPerksMapMap(usedKeyStr = 'name') {
  let perksMap = {};

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
    [].concat(...runeInfo.slots.map(row => row.runes)).forEach(rune => {
      perksMap[rune[usedKeyStr]] = rune.id;
    });
  });

  return perksMap;
}

function getStyleId(runes) {
  let styleId = -1;

  freezer.get().runesreforgedinfo.forEach(runeInfo => {
      var runeIds = ([].concat(...runeInfo.slots.map(row => row.runes))).map(rune => rune.id)
      if (runes.every(v => runeIds.includes(v)) === true)
          styleId = runeInfo.id;
  });

  return styleId;
}

function sortRunes(runes, primaryStyle, subStyle) {
  const indexes = new Map();
  const sortingFunc = (a, b) => indexes.get(a) - indexes.get(b);

  const tree = freezer.get().runesreforgedinfo.reduce((obj, curr) => {
    obj[curr.id] = [].concat(...curr.slots.map(row => row.runes.map(i => i.id)));
    return obj;
  }, {});
  const styles = Object.keys(tree);

  const groupedRunes = groupBy(runes, rune => {
    for (style of styles) {
      let runeIndex = tree[style].indexOf(rune);
      if (runeIndex !== -1) {
        indexes.set(rune, runeIndex);
        return style;
      }
    }
  });

  groupedRunes[primaryStyle].sort(sortingFunc);
  groupedRunes[subStyle].sort(sortingFunc);

  return groupedRunes[primaryStyle].concat(groupedRunes[subStyle]);
}

module.exports = { getStylesMap, getPerksMapMap, getStyleId, getJson, sortRunes };
