const p_rune = [8000, 8100, 8200, 8400, 8300]; //TODO: let var const
rune =
  '{"8000":[[8005,8008,8021,8010],[9101,9111,8009],[9104,9105,9103],[8014,8017,8299]],"8100":[[8112,8124,8128,9923],[8126,8139,8143],[8136,8120,8138],[8135,8134,8105,8106]],"8200":[[8214,8229,8230],[8224,8226,8275],[8210,8234,8233],[8237,8232,8236]],"8400":[[8437,8439,8465],[8446,8463,8401],[8429,8444,8473],[8451,8453,8242]],"8300":[[8351,8360,8359],[8306,8304,8313],[8321,8316,8345],[8347,8410,8352]]}';
let label, img, radio, c;
var srs = []; //2 secondary runes line name
var rune = JSON.parse(rune);

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

  label = document
    .getElementsByTagName('template')[0]
    .content.firstElementChild.cloneNode(true);
  img = label.querySelector('img');
  radio = label.querySelector('input');

  for (var i = 0; i < p_rune.length; i++) {
    c = document.importNode(label, false);
    var a = document.importNode(img, false);
    a.src = './img/runesReforged/perkStyle/' + p_rune[i] + '.png';
    var b = document.importNode(radio, false);
    b.addEventListener('click', show_rune);
    b.i = i;
    b.value = p_rune[i];
    //b.setAttribute('onclick', 'this.show_rune(' + i + ')');
    b.name = 'rr';

    c.appendChild(b);
    c.appendChild(a);

    document.querySelector('.root-rune').appendChild(c);
  }
});

//mostra il ramo secondario e le rune principali
function show_rune(evt) {
  let id = evt.currentTarget.i;

  del_panel_rune('.second-rune');
  del_panel_rune('.secondary-runes'); // FIX: fix veloce per il bug della pagina principale = a secondaria

  for (let i = 0; i < p_rune.length; i++) {
    if (i == id) continue;

    c = document.importNode(label, false);
    var a = document.importNode(img, false);
    a.src = './img/runesReforged/perkStyle/' + p_rune[i] + '.png';
    var b = document.importNode(radio, false);
    b.name = 'sr';
    b.addEventListener('click', show_snd_rune);
    b.i = i;
    b.value = p_rune[i];
    //b.setAttribute('onclick', 'show_snd_rune(' + i + ')');

    c.appendChild(b);
    c.appendChild(a);

    document.querySelector('.second-rune').appendChild(c);
  }

  //--------------------------------------------------------------------
  del_panel_rune('.primary-runes');

  for (let i = 0; i < rune[p_rune[id]].length; i++) {
    for (let j = 0; j < rune[p_rune[id]][i].length; j++) {
      c = document.importNode(label, false);
      var a = document.importNode(img, false);
      a.src = './img/runesReforged/perk/' + rune[p_rune[id]][i][j] + '.png';
      var b = document.importNode(radio, false);
      b.name = 'p' + i;
      b.value = rune[p_rune[id]][i][j];

      c.appendChild(b);
      c.appendChild(a);

      document.querySelector('.primary-runes').appendChild(c);
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

  for (let i = 1; i < rune[p_rune[id]].length; i++) {
    for (let j = 0; j < rune[p_rune[id]][i].length; j++) {
      c = document.importNode(label, false);
      var a = document.importNode(img, false);
      a.src = './img/runesReforged/perk/' + rune[p_rune[id]][i][j] + '.png';
      var b = document.importNode(radio, false);
      b.name = 's' + i;
      b.value = rune[p_rune[id]][i][j];

      c.appendChild(b);
      c.appendChild(a);

      document.querySelector('.secondary-runes').appendChild(c);
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

function manage_secondary_runes(radio_name) {
  if (radio_name == srs[0] || radio_name == srs[1]) {
    //bug predict?
    return 0;
  }

  if (srs.length < 2) srs[srs.length] = radio_name;
  //add as last elem
  else {
    document.querySelector(
      'input[type=radio][name=' + srs[0] + ']:checked'
    ).checked = false;

    srs[0] = srs[1];
    srs[1] = radio_name;
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
