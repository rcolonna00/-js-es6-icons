const icons = [
	{
		name: 'cat',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'crow',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dog',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dove',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dragon',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'horse',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'hippo',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'fish',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'carrot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'apple-alt',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'lemon',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'pepper-hot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'user-astronaut',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-graduate',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-ninja',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-secret',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	}
];

const colors = [
    'blue',
    'orange',
    'purple'
];

// ES TEMPLATE ICONE
/*
<div class="icon">
    <i class="fas fa-cat"></i>
    <div>Cat</div>
</div>
*/

// Milestone 1
// Partendo dalla seguente struttura dati , 
// mostriamo in pagina tutte le icone disponibili come da layout.

// Milestone 2
// Coloriamo le icone per tipo

// Milestone 3
// Creiamo una select con i tipi di icone e usiamola per filtrare le icone

const iconsContainer = $('#icons-container');
const selectEl = $('#type');
const coloredArray = colorIcons(icons, colors);
const iconTypes = getIconsTypes(coloredArray)
//console.log( iconTypes)

printFilterOptions(iconTypes, selectEl);
printIcons(coloredArray, iconsContainer);

selectEl.change(function() {
	//leggere il tipo di icona scelta dall'utente
	const selectedType = selectEl.val();

	//ottere un array di icone con solo quelle del tipo selezionato
	const filteredIcons = filterIconsByType(coloredArray, selectedType);
	
	//stampare le icone
	printIcons(filteredIcons, iconsContainer);
});

/* -------- FUNZIONI -------- */
// Popolo un container con le icone

// iconsArray --> array di oggetti. Ogni oggetto un icona
// container --> un oggetto jquery che rappresenta elemento in cui stampare icone
//
// return: void(undefined)
function printIcons(iconsArray, container) {
	container.html('');

	//foreach per scrivere le icone nel container
	//console.log(iconsArray)

	iconsArray.forEach((element) => {

		//destrutturiamo element pe rprendere le informazioni
		const {name, prefix, family, color} = element;
		const nameUpperCase = name.toUpperCase();
		//console.log(element)
		const iconElementHTML = `
			<div class="icon">
				<i class="${family} ${prefix}${name}" style="color:${color};"></i>
				<div>${nameUpperCase}</div>
			</div> 
		`;

		container.append(iconElementHTML)
	});
}

// Crea un nuovo array di icone con i colori
//
// originalIconsArray --> array di oggetti, in cui ogni oggetto rappresenta un'icona
// colorsArray --> array di stringhe, in cui ogni stringa rappresenta un colore css
//
// return: array di oggetti, in cui ogni oggetto rappresenta un'icona  con anche i colori css
function colorIcons(originalIconsArray, colorsArray) {
	const iconTypes = getIconsTypes(originalIconsArray);
	//console.log(iconTypes)

	
	//Per creare un nuovo array da quello originale uso map()
	const iconsWithColors = originalIconsArray.map((element) => {
		const newIconObj = {
			//name: element.name,
			//prefix: element.prefix,
			//type: element.type,
			//family: element.family
			...element
		};

		// prendiamo l'indice del tipo dall'array dei tipi
		const iconTypeIndex = iconTypes.indexOf(newIconObj.type);
		//console.log(newIconObj.type + '-' + iconTypeIndex)
	
		//il colore del nuovo oggetto sarà quello con lo stesso 
		//indice del tipo
		if ( iconTypeIndex != -1 ) {
			newIconObj.color = colorsArray[iconTypeIndex];
			//console.log(newIconObj)
		}

		return newIconObj;
	});

	//console.log(iconsWithColors)
	return iconsWithColors;
};

// Crea un array con itipi di icone
//
// iconsArray --> array di oggetti. Ogni oggetto un icona
// 
// return: array dui stringhe, ogni stringa un tipo di icona senza duplicati
function getIconsTypes(iconsArray) {
	const typesArray = [];

	iconsArray.forEach((element) => {
		const elementType = element.type;

		//o con le negazione ! davanti typeArrow e senza scrivere == false
		if ( typesArray.includes(elementType) == false ) {
			typesArray.push(elementType);
		};
	});
	
	return typesArray;
};

// Popola la select per filtrare le icone
//
//iconTypesArray --> Array di stringhe, ogni stringa è un tipo di icona
//selectElement --> Oggetto jQuery che rappresenti la select a cui aggiungere le options
//
//return void(UNDEFINED)
function printFilterOptions(iconTypesArray, selectElement) {
	//console.log( selectElement)
	iconTypesArray.forEach((element) => {
		
		const newOption = `
		<option value="${element}">${element}</option>
		`;

		selectElement.append(newOption);
	});

};

// filtra le icone per tipo
//
// iconsArray --> array di oggetti. Ogni oggetto un icona
// type --> stringa che rappresenta il tipo di icona da filtrare
//
// return: array di oggetti, in cui ogni oggetto rappresenta un'icona, filtrato per tipo
function filterIconsByType(iconsArray, type) {

	if ( type.length == 0 ) {
		return iconsArray;
	}

	const filterdeArray = iconsArray.filter((element) => {
		return element.type == type;
	} );

	return filterdeArray;
}