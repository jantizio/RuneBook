<runes-panel>



<div class="ui modal runes-modal">
	<div class="content">
		<template>
			<label>
			<input type="radio" name="" value="small">
			<img src="">
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
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<div class="break"></div>

					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<div class="break"></div>

					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<div class="break"></div>

					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<label class="placeholder">
						<img src="./img/runesReforged/perk/qm.png">
					</label>
					<div class="break"></div>
				</div>
				<div class="panel">
					<div class="secondary-runes">
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<div class="break"></div>

						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<div class="break"></div>

						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
						<label class="placeholder">
							<img src="./img/runesReforged/perk/qm.png">
						</label>
					</div>
					<div class="additional-runes">
						<!-- additional first line -->
						<label>
						<input type="radio" name="afl" value="5008" >
						<img src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="afl" value="5005">
						<img src="./img/runesReforged/perk/5005.png">
						</label>
						<label>
						<input type="radio" name="afl" value="5007">
						<img src="./img/runesReforged/perk/5007.png">
						</label>
						<div class="break"></div>
						<!-- additional second line -->
						<label>
						<input type="radio" name="asl" value="5008" >
						<img src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="asl" value="5002">
						<img src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="asl" value="5003">
						<img src="./img/runesReforged/perk/5003.png">
						</label>
						<div class="break"></div>
						<!-- additional third line -->
						<label>
						<input type="radio" name="atl" value="5001" >
						<img src="./img/runesReforged/perk/5001.png">
						</label>
						<label>
						<input type="radio" name="atl" value="5002">
						<img src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="atl" value="5003">
						<img src="./img/runesReforged/perk/5003.png">
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
			<button class="ui icon button" onclick={ getRadio }>
				<i class="play icon"></i>
			</button>
		</div>
	</div>
</div>

<script src="erune.js"></script>
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
			let primary = selectedValues.shift();
			let sub = selectedValues.shift();

            let page = {
					"autoModifiedSelections": [],
					"current": true,
					"id": 835441637,
					"isActive": false,
					"isDeletable": true,
					"isEditable": true,
					"isValid": true,
					"lastModified": new Date().getTime() / 1000,
					"name": document.querySelector('#nomepagina').innerHTML,
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

			const rbs = document.querySelectorAll('input[type="radio"]');
			let selectedValues = [];
			for (const rb of rbs) {
                if (rb.checked) {
                    selectedValues.push(parseInt(rb.value));
                }
            }
			let primary = selectedValues.shift();
			let sub = selectedValues.shift();

            let runePage = {
					"autoModifiedSelections": [],
					"current": true,
					"id": 835441637,
					"isActive": false,
					"isDeletable": true,
					"isEditable": true,
					"isValid": true,
					"lastModified": new Date().getTime() / 1000,
					"name": document.querySelector('#nomepagina').innerHTML,
					"order": 1,
					"primary-runesStyleId": primary,
					"selectedPerkIds": selectedValues,
					"subStyleId": sub
				};
			console.log("salvato");
			freezer.emit("currentpage:save", runePage);

			var page = document.querySelector('#nomepagina').innerHTML;
			console.log("DEV page key", page);
			freezer.emit("page:upload", opts.current.champion, page);
		}

</script>
</runes-panel>