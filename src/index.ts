import { Character } from './Interface/Character';
import { Hero } from './classes/Hero';
import { CharacterStorage } from './data/CharacterStorage';
import { RickAndMortyRemote } from './data/GetCharacter';

const ironman = new Hero('Ironman', 10, 55);
const characterStorage = new CharacterStorage();

console.log( ironman );
console.log( ironman.power );


const formElement = document.querySelector('#characterForm');
if (!formElement) {
    throw new Error("Form not found");
}
const form: HTMLFormElement = formElement as HTMLFormElement;
form.onsubmit = () => {
    const formData = new FormData(form);
    const text = formData.get('name') as string;
    console.log(text);


    const characters = characterStorage.loadCharacters();
    const newCharacter: Character = {
        id: 1,
        name: text,
        status: 'Alive',
        species: 'Human',
        type: 'Superhero',
        gender: '',
        origin: {
            name: '',
            url: ''
        },
        location: {
            name: '',
            url: ''
        },
        image: '',
        episode: [],
        url: '',
        created: ''
    };
    if (characters) {
        characters.push(newCharacter);
        characterStorage.saveCharacters(characters);
    }
    else {
        characterStorage.saveCharacters([newCharacter]);
    }
    return false; // prevent reload
};

const btnLoadData = document.getElementById('btnLoadData');
let page = 1;
if (btnLoadData) {
	btnLoadData.addEventListener('click', () => {
		if(page < 1000){
			page += 1;
			fetchAndStoreCharacters(page);
		}
	});
}

const btnLoadFromStorage = document.getElementById('btnLoadFromStorage');
if (btnLoadFromStorage) {
	btnLoadFromStorage.addEventListener('click', () => {
        displayCharacters();
    });
}


function fetchAndStoreCharacters(page: number) {
    // Implement the logic to fetch and store characters here
    // For example:
    const rickAndMortyRemote = new RickAndMortyRemote('https://rickandmortyapi.com/api/character');
    rickAndMortyRemote.fetchAndStoreCharacters(page)    
        .then(data => {
            console.log("saveCharacters", data);
            if (data) {
                characterStorage.saveCharacters(data);
            }
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
        });
}

function displayCharacters() {
    const characters = characterStorage.loadCharacters();
    const charactersContainer = document.getElementById('characters-container');
  
    if (characters) {
        characters.forEach(character => {
            const characterElement = document.createElement('p');
            characterElement.textContent = `Id: ${character.id}, Name: ${character.name}`;
            charactersContainer?.appendChild(characterElement);
        });
    }
    else {
        const noCharactersElement = document.createElement('p');
        noCharactersElement.textContent = 'No characters found';
        charactersContainer?.appendChild(noCharactersElement);
    }
}

