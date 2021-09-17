<runes-panel>



<div class="ui modal runes-modal">
	<div class="content">
		<template>
			<label>
			<input type="radio" name="" value="small">
			<img draggable="false" src="">
			</label>
		</template>
		<div class="runes-container">
			<div id="nomepagina" spellcheck="false" contenteditable>Nuova pagina di rune</div>
			<!--  <input type="text" name="rname" value="Nuova pagina di rune" id="nomepagina">  -->
			<div class="runes-header">
				<div class="root-rune">
				</div>
				<div class="second-rune">
				</div>
			</div>
			<div class="runes-panel">
				<div class="primary-runes">
				</div>
				<div class="panel">
					<div class="secondary-runes">
					</div>
					<div class="additional-runes">
						<!-- additional first line -->
						<label>
						<input type="radio" name="afl" value="5008" >
						<img draggable="false" src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="afl" value="5005">
						<img draggable="false" src="./img/runesReforged/perk/5005.png">
						</label>
						<label>
						<input type="radio" name="afl" value="5007">
						<img draggable="false" src="./img/runesReforged/perk/5007.png">
						</label>
						<div class="break"></div>
						<!-- additional second line -->
						<label>
						<input type="radio" name="asl" value="5008" >
						<img draggable="false" src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="asl" value="5002">
						<img draggable="false" src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="asl" value="5003">
						<img draggable="false" src="./img/runesReforged/perk/5003.png">
						</label>
						<div class="break"></div>
						<!-- additional third line -->
						<label>
						<input type="radio" name="atl" value="5001" >
						<img draggable="false" src="./img/runesReforged/perk/5001.png">
						</label>
						<label>
						<input type="radio" name="atl" value="5002">
						<img draggable="false" src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="atl" value="5003">
						<img draggable="false" src="./img/runesReforged/perk/5003.png">
						</label>
					</div>
				</div>
			</div>
		</div>

		<div class="ui icon buttons">
			<button class={ (opts.current.champion && opts.plugins.local[opts.tab.active]) ? "ui icon button" : "ui icon button disabled"} data-tooltip="{ i18n.localise('currentpage.downloadcurrentpage') }" data-position="top left" data-inverted onclick={ saveCurrentPage }>
				<i class="bookmark icon"></i>
			</button>
			<button class={ (opts.connection.page && opts.connection.page.isEditable && opts.connection.summonerLevel >= 10) ? "ui icon button" : "ui icon button disabled" } onclick={ uploadPage } data-tooltip={ i18n.localise('pagelist.uploadpage') } data-position="top left" data-inverted="">
				<i class="upload icon" data-key={key}></i>
			</button>
			<!--  <button class="ui icon button" onclick={ clearPage } data-tooltip={ i18n.localise('pagelist.uploadpage') } data-position="top left" data-inverted="">
				<i class="paint brush icon"></i>
			</button>  -->
			<!--  <button class="ui icon button" onclick={ getRadio }>
				<i class="play icon"></i>
			</button>  -->
			
		</div>
	</div>
</div>


<script>

        saveCurrentPage(evt) {
			evt.preventUpdate = true;

			const rbs = document.querySelectorAll('input[type="radio"]');
			let selectedValues = [];
			for (const rb of rbs) {
                if (rb.checked) {
                    selectedValues.push(parseInt(rb.value));
                }
            }
			if(selectedValues.length != 11) {alert(i18n.localise('runespanel.error') ); return;}
			let primary = selectedValues.shift();
			let sub = selectedValues.shift();

			let name = document.querySelector('#nomepagina').innerHTML || "Nuova pagina di rune";

  


            let page = {
					"autoModifiedSelections": [],
					"current": true,
					"id": Math.floor(Math.random() * (9999999999 - 100000000 + 1) + 100000000),
					"isActive": false,
					"isDeletable": true,
					"isEditable": true,
					"isValid": true,
					"lastModified": new Date().getTime() / 1000,
					"name": name,
					"order": 1,
					"primary-runesStyleId": primary,
					"selectedPerkIds": selectedValues,
					"subStyleId": sub
				};
			console.log("salvato");
			freezer.emit("currentpage:save", page);
		}

		getRadio() {
			var now = new Date().getTime() / 1000;
			console.log(now);
			let nome = document.querySelector('#nomepagina').innerHTML;
			console.log(nome)
		}

		uploadPage(evt) {
			evt.preventUpdate = true;

			// prima salva la pagina poi fa l'upload
			this.saveCurrentPage(evt);

			var page = document.querySelector('#nomepagina').innerHTML;
			console.log("DEV page key", page);
			freezer.emit("page:upload", opts.current.champion, page);
		}

		findTooltip(id) {
			if(!opts.tooltips.rune) return;
			console.log(opts.tooltips.rune)
			var tooltip = opts.tooltips.rune.find( (element) => element.id === id)
			/*var tooltip = opts.tooltips.rune.find((el) => el.id === opts.connection.page.selectedPerkIds[index]);*/
			return '<b>' + tooltip.name + '</b><br>' + tooltip.longDesc;
		}

		clearPage(evt){
			evt.preventUpdate = true;

			const rbs = document.querySelectorAll('input[type="radio"]');
			let p_rune = [8000, 8100, 8200, 8400, 8300];
			for (const rb of rbs) {
                if ( rb.checked && !(p_rune.includes(parseInt(rb.value))) ) {
                    rb.checked = false;
                }
            }
		}

</script>
</runes-panel>
