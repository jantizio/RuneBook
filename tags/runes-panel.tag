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
        <div class="root-rune">
        </div>
        <div class="second-rune" id="second">
        </div>
        <div class="runes-panel">
            <div class="primary-runes alignment">
            </div>
            <div class="panel">
                <div class="secondary-runes alignment">
                </div>
                <div class="additional-runes alignment">
                    <!-- additional first line -->
                    <label>
                        <input type="radio" name="afl" value="small" >
                        <img src="./img/runesReforged/perk/5008.png">
                    </label>

                    <label>
                        <input type="radio" name="afl" value="big">
                        <img src="./img/runesReforged/perk/5005.png">
                    </label>

                    <label>
                        <input type="radio" name="afl" value="big">
                        <img src="./img/runesReforged/perk/5007.png">
                    </label>

                    <div class="break"></div>
                    <!-- additional second line -->
                    <label>
                        <input type="radio" name="asl" value="small" >
                        <img src="./img/runesReforged/perk/5008.png">
                    </label>

                    <label>
                        <input type="radio" name="asl" value="big">
                        <img src="./img/runesReforged/perk/5002.png">
                    </label>

                    <label>
                        <input type="radio" name="asl" value="big">
                        <img src="./img/runesReforged/perk/5003.png">
                    </label>

                    <div class="break"></div>
                    <!-- additional third line -->
                    <label>
                        <input type="radio" name="atl" value="small" >
                        <img src="./img/runesReforged/perk/5001.png">
                    </label>

                    <label>
                        <input type="radio" name="atl" value="big">
                        <img src="./img/runesReforged/perk/5002.png">
                    </label>

                    <label>
                        <input type="radio" name="atl" value="big">
                        <img src="./img/runesReforged/perk/5003.png">
                    </label>
                </div>
            </div>
        </div>
    </div>


	</br>Salva la pagina di rune in locale
        <button class={ (opts.current.champion && opts.plugins.local[opts.tab.active]) ? "ui icon button" : "ui icon button disabled"} data-tooltip="{ i18n.localise('currentpage.downloadcurrentpage') }" onclick={ saveCurrentPage }>
			<i class="download icon"></i>
		</button>
    </div>
</div>

<script src="erune.js"></script>
<script>

        saveCurrentPage(evt) {
			evt.preventUpdate = true;
            let page = {
					"autoModifiedSelections": [],
					"current": true,
					"id": 835441637,
					"isActive": false,
					"isDeletable": true,
					"isEditable": true,
					"isValid": true,
					"lastModified": 1630062301624,
					"name": "ses",
					"order": 1,
					"primary-runesStyleId": 8100,
					"selectedPerkIds": [
						9923,
						8126,
						8138,
						8135,
						8345,
						8410,
						5005,
						5008,
						5002
					],
					"subStyleId": 8300
				};
			console.log("salvato");
			freezer.emit("currentpage:save", page);
		}
</script>
</runes-panel>