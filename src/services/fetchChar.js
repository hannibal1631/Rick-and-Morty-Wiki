import { getCharacter } from 'rickmortyapi';

export const fetchCharId = async (id) => {
  try {
    const characters = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    if (!characters.ok) {
      throw new error(`Error fetching characters: ${characters.statusText}`);
    }

    const data = await characters.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
