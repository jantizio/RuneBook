const p_rune = [8000, 8100, 8200, 8400, 8300]; //TODO: let var const
rune =
  '{"8000":[[8005,8008,8021,8010],[9101,9111,8009],[9104,9105,9103],[8014,8017,8299]],"8100":[[8112,8124,8128,9923],[8126,8139,8143],[8136,8120,8138],[8135,8134,8105,8106]],"8200":[[8214,8229,8230],[8224,8226,8275],[8210,8234,8233],[8237,8232,8236]],"8400":[[8437,8439,8465],[8446,8463,8401],[8429,8444,8473],[8451,8453,8242]],"8300":[[8351,8360,8359],[8306,8304,8313],[8321,8316,8345],[8347,8410,8352]]}';
let label, img, radio, c;
var rune = JSON.parse(rune);

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('cotenuto caricato');

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
    b.id = i;
    //b.setAttribute('onclick', 'this.show_rune(' + i + ')');
    b.name = 'rr';

    c.appendChild(b);
    c.appendChild(a);

    document.querySelector('.root-rune').appendChild(c);
  }
});

//mostra il ramo secondario e le rune principali
function show_rune(evt) {
  let id = evt.currentTarget.id;
  let rune_to_dl = document.querySelector('.second-rune');
  while (rune_to_dl.hasChildNodes())
    rune_to_dl.removeChild(rune_to_dl.firstChild);

  for (let i = 0; i < p_rune.length; i++) {
    if (i == id) continue;

    c = document.importNode(label, false);
    var a = document.importNode(img, false);
    a.src = './img/runesReforged/perkStyle/' + p_rune[i] + '.png';
    var b = document.importNode(radio, false);
    b.name = 'sr';
    b.addEventListener('click', show_snd_rune);
    b.id = i;
    //b.setAttribute('onclick', 'show_snd_rune(' + i + ')');

    c.appendChild(b);
    c.appendChild(a);

    document.querySelector('.second-rune').appendChild(c);
  }

  //--------------------------------------------------------------------
  rune_to_dl = document.querySelector('.primary-runes');
  while (rune_to_dl.hasChildNodes())
    rune_to_dl.removeChild(rune_to_dl.firstChild);

  for (let i = 0; i < rune[p_rune[id]].length; i++) {
    for (let j = 0; j < rune[p_rune[id]][i].length; j++) {
      c = document.importNode(label, false);
      var a = document.importNode(img, false);
      a.src = './img/runesReforged/perk/' + rune[p_rune[id]][i][j] + '.png';
      var b = document.importNode(radio, false);
      b.name = 'p' + i;

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
  let id = evt.currentTarget.id;
  rune_to_dl = document.querySelector('.secondary-runes');
  while (rune_to_dl.hasChildNodes())
    rune_to_dl.removeChild(rune_to_dl.firstChild);

  for (let i = 0; i < rune[p_rune[id]].length; i++) {
    for (let j = 0; j < rune[p_rune[id]][i].length; j++) {
      c = document.importNode(label, false);
      var a = document.importNode(img, false);
      a.src = './img/runesReforged/perk/' + rune[p_rune[id]][i][j] + '.png';
      var b = document.importNode(radio, false);
      b.name = 's' + i;

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
