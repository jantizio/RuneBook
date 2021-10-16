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
						<input type="radio" name="afl6" value="5008" >
						<img draggable="false" src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="afl6" value="5005">
						<img draggable="false" src="./img/runesReforged/perk/5005.png">
						</label>
						<label>
						<input type="radio" name="afl6" value="5007">
						<img draggable="false" src="./img/runesReforged/perk/5007.png">
						</label>
						<div class="break"></div>
						<!-- additional second line -->
						<label>
						<input type="radio" name="asl7" value="5008" >
						<img draggable="false" src="./img/runesReforged/perk/5008.png">
						</label>
						<label>
						<input type="radio" name="asl7" value="5002">
						<img draggable="false" src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="asl7" value="5003">
						<img draggable="false" src="./img/runesReforged/perk/5003.png">
						</label>
						<div class="break"></div>
						<!-- additional third line -->
						<label>
						<input type="radio" name="atl8" value="5001" >
						<img draggable="false" src="./img/runesReforged/perk/5001.png">
						</label>
						<label>
						<input type="radio" name="atl8" value="5002">
						<img draggable="false" src="./img/runesReforged/perk/5002.png">
						</label>
						<label>
						<input type="radio" name="atl8" value="5003">
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


</runes-panel>
