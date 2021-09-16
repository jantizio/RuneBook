//EditorRune

//TODO: usare questo http://ddragon.leagueoflegends.com/cdn/10.16.1/data/it_IT/runesReforged.json

const { template } = require('lodash');

const p_rune = [8000, 8100, 8200, 8400, 8300]; //TODO: let var const
rune =
  '{"8000":[[8005,8008,8021,8010],[9101,9111,8009],[9104,9105,9103],[8014,8017,8299]],"8100":[[8112,8124,8128,9923],[8126,8139,8143],[8136,8120,8138],[8135,8134,8105,8106]],"8200":[[8214,8229,8230],[8224,8226,8275],[8210,8234,8233],[8237,8232,8236]],"8400":[[8437,8439,8465],[8446,8463,8401],[8429,8444,8473],[8451,8453,8242]],"8300":[[8351,8360,8358],[8306,8304,8313],[8321,8316,8345],[8347,8410,8352]]}';
var srs = []; //2 secondary runes line name
var rune = JSON.parse(rune);
/*const rune = {
  8000: [
    [8005, 8008, 8021, 8010],
    [9101, 9111, 8009],
    [9104, 9105, 9103],
    [8014, 8017, 8299],
  ],
  8100: [
    [8112, 8124, 8128, 9923],
    [8126, 8139, 8143],
    [8136, 8120, 8138],
    [8135, 8134, 8105, 8106],
  ],
  8200: [
    [8214, 8229, 8230],
    [8224, 8226, 8275],
    [8210, 8234, 8233],
    [8237, 8232, 8236],
  ],
  8300: [
    [8351, 8360, 8358],
    [8306, 8304, 8313],
    [8321, 8316, 8345],
    [8347, 8410, 8352],
  ],
  8400: [
    [8437, 8439, 8465],
    [8446, 8463, 8401],
    [8429, 8444, 8473],
    [8451, 8453, 8242],
  ],
};*/

/* image caching */
let imgList = [];
for (const perkStyle in rune) {
  imgList.push(`./img/runesReforged/perkStyle/${perkStyle}.png`);
  for (const element in rune[perkStyle]) {
    for (const i in rune[perkStyle][element]) {
      imgList.push(
        `./img/runesReforged/perk/${rune[perkStyle][element][i]}.png`
      );
    }
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('cotenuto caricato');

  /* cache image - non ho capito se funziona o no */
  preloadImages(imgList);

  for (var i = 0; i < p_rune.length; i++) {
    // faccio una copia del template
    let label = document
      .querySelector('template')
      .content.firstElementChild.cloneNode(true);

    // modifico l'attributo src dell'immagine
    label.querySelector('img').src =
      './img/runesReforged/perkStyle/' + p_rune[i] + '.png';

    // seleziono il radio button perchè devo modificare più di un attributo
    let radio = label.querySelector('input');
    radio.addEventListener('click', show_rune);
    radio.i = i;
    radio.value = p_rune[i];
    radio.name = 'rr';

    document.querySelector('.root-rune').appendChild(label);
  }
});

//svuota la pagina
function polishEditorRune()
{
  //unselect primary rune rb
  const rbs = document.querySelectorAll('input[type="radio"]');
	  for (const rb of rbs) {
          rb.checked = false;
      }
  del_panel_rune('.primary-runes')
  del_panel_rune('.second-rune');
  del_panel_rune('.secondary-runes');  

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      let label = document
        .querySelector('template')
        .content.firstElementChild.cloneNode(true);
      if (i == 0) label.classList.add('keystone');

      label.querySelector('img').src = "./img/runesReforged/perk/qm.png";
      let radio = label.querySelector('input');
      radio.name = 'p' + i;
      label.className="placeholder";

      document.querySelector('.primary-runes').appendChild(label);
    }
    document
      .querySelector('.primary-runes')
      .appendChild(
        document
          .createRange()
          .createContextualFragment('<div class="break"></div>')
      );
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let label = document
        .querySelector('template')
        .content.firstElementChild.cloneNode(true);
      if (i == 0) label.classList.add('keystone');

      label.querySelector('img').src = "./img/runesReforged/perk/qm.png";
      let radio = label.querySelector('input');
      radio.name = 's' + i;
      label.className="placeholder";

      document.querySelector('.secondary-runes').appendChild(label);
    }
    document
      .querySelector('.secondary-runes')
      .appendChild(
        document
          .createRange()
          .createContextualFragment('<div class="break"></div>')
      );
  }
  //document.getElementById("nomepagina").content="Nuova pagina di rune";

}
//mostra il ramo secondario e le rune principali
function show_rune(evt) {
  // prende l'id dell'elemento selezionato
  let id = evt.currentTarget.i;

  del_panel_rune('.second-rune');
  del_panel_rune('.secondary-runes');
  setPlaceholder('.secondary-runes'); // FIX: fix veloce per il bug della pagina principale = a secondaria

  // stampa 4 rune su 5 per le secondarie
  for (let i = 0; i < p_rune.length; i++) {
    if (i == id) continue;

    let label = document
      .querySelector('template')
      .content.firstElementChild.cloneNode(true);

    label.querySelector('img').src =
      './img/runesReforged/perkStyle/' + p_rune[i] + '.png';

    let radio = label.querySelector('input');
    radio.addEventListener('click', show_snd_rune);
    radio.i = i;
    radio.value = p_rune[i];
    radio.name = 'sr';

    document.querySelector('.second-rune').appendChild(label);
  }

  //--------------------------------------------------------------------
  del_panel_rune('.primary-runes');

  // creo la variabile runeTree per rendere più chiaro il codice
  let runeTree = p_rune[id];

  // stampa tutto il ramo di rune primarie selezionato
  for (let i = 0; i < rune[runeTree].length; i++) {
    for (let j = 0; j < rune[runeTree][i].length; j++) {
      let label = document
        .querySelector('template')
        .content.firstElementChild.cloneNode(true);
      if (i == 0) label.classList.add('keystone');

      label.querySelector('img').src =
        './img/runesReforged/perk/' + rune[runeTree][i][j] + '.png';

      let radio = label.querySelector('input');
      radio.value = rune[runeTree][i][j];
      radio.name = 'p' + i;

      document.querySelector('.primary-runes').appendChild(label);
    }
    document
      .querySelector('.primary-runes')
      .appendChild(
        document
          .createRange()
          .createContextualFragment('<div class="break"></div>')
      );
  }
}

function show_snd_rune(evt) {
  let id = evt.currentTarget.i;

  del_panel_rune('.secondary-runes');

  // creo la variabile runeTree per rendere più chiaro il codice
  let runeTree = p_rune[id];

  // stampa tutto il ramo di rune secondarie selezionato
  for (let i = 1; i < rune[runeTree].length; i++) {
    for (let j = 0; j < rune[runeTree][i].length; j++) {
      let label = document
        .querySelector('template')
        .content.firstElementChild.cloneNode(true);
      if (i == 0) label.classList.add('keystone');

      label.querySelector('img').src =
        './img/runesReforged/perk/' + rune[runeTree][i][j] + '.png';

      let radio = label.querySelector('input');
      radio.addEventListener('click', manage_secondary_runes);
      radio.value = rune[runeTree][i][j];
      radio.name = 's' + i;

      document.querySelector('.secondary-runes').appendChild(label);
    }
    document
      .querySelector('.secondary-runes')
      .appendChild(
        document
          .createRange()
          .createContextualFragment('<div class="break"></div>')
      );
  }
}

//rimuove il contenuto di un div
function del_panel_rune(panel_target) {
  rune_to_dl = document.querySelector(panel_target);
  while (rune_to_dl.hasChildNodes())
    rune_to_dl.removeChild(rune_to_dl.firstChild);
}

function setPlaceholder(panel_target) {
  const label = document.createElement('label');
  label.className = 'placeholder';
  const img = document.createElement('img');
  img.src = './img/runesReforged/perk/qm.png';
  label.append(img);

  const div = document.createElement('div');
  div.className = 'break';

  const target = document.querySelector(panel_target);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      target.append(label.cloneNode(true));
    }
    target.append(div.cloneNode(true));
  }
}

function manage_secondary_runes(evt) {
  const radio_name = evt.target.name;
  if (radio_name == srs[0] || radio_name == srs[1]) {
    //bug predict? questo if sembra andare bene
    return;
  }

  if (srs.length < 2) srs.push(radio_name);
  //add as last elem
  else {
    let firstElem = document.querySelector(
      'input[type=radio][name=' + srs[0] + ']:checked'
    );
    if (firstElem) firstElem.checked = false;

    srs.shift();
    srs.push(radio_name);
  }
}

function preloadImages(array) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(this);
      if (index !== -1) {
        // remove image from the array once it's loaded
        // for memory consumption reasons
        list.splice(index, 1);
      }
    };
    list.push(img);
    img.src = array[i];
  }
}
