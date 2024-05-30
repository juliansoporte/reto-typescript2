import { Character } from "../Interface/Character";

export class RickAndMortyRemote {

    constructor(public url: string) {

    }

    async fetchAndStoreCharacters(page: number) {
        try {            
            const response = await fetch(`${this.url}?page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data1 = await response.json();
            console.log('by fetchAndStoreCharacters2', data1);
            const characters : Character[]  = data1.results.map((item: Character) => ({
                id: item.id,
                name: item.name,
                status: item.status,
                species: item.species,
                type: item.type,
            }));
            console.log(characters);
            return characters;
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
}

