<runes-panel>

<div class="ui modal runes-modal">
    <div class="content">
    EDITOR RUNE QUI
	</br>Salva la pagina di rune in locale
        <button class={ (opts.current.champion && opts.plugins.local[opts.tab.active]) ? "ui icon button" : "ui icon button disabled"} data-tooltip="{ i18n.localise('currentpage.downloadcurrentpage') }" onclick={ saveCurrentPage }>
			<i class="download icon"></i>
		</button>
		<div class="zio">ciao</div>
    </div>
</div>

<script>

window.addEventListener('DOMContentLoaded', (event) => {
	console.log("cotenuto caricato")
	//document.querySelector(".zio").onclick = function(){this.show_rune};
	document.querySelector(".zio").addEventListener("click", this.show_rune);
});

show_rune() {
	document.querySelector(".zio").innerHTML = "ciao zio!";
}

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
					"primaryStyleId": 8100,
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