import { Character } from "../Interface/Character";

export class CharacterStorage {   

    saveCharacters(characters: Character[]) {
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    loadCharacters(): Character[] | null {
        const charactersString = localStorage.getItem('characters');
        if (charactersString) {
            return JSON.parse(charactersString);
        }
        return null;
    }
}