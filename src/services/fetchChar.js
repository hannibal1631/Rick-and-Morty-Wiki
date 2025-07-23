// import { getCharacter } from 'rickmortyapi';

// export const fetchCharId = async (id) => {
//   try {
//     const characters = await fetch(
//       `https://rickandmortyapi.com/api/character/${id}`
//     );

//     if (!characters.ok) {
//       throw new error(`Error fetching characters: ${characters.statusText}`);
//     }

//     const data = await characters.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

import { getCharacter } from 'rickmortyapi';

export const fetchCharId = async (id) => {
  try {
    const characters = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    if (!characters.ok) {
      throw new Error(`Error fetching characters: ${characters.statusText}`);
    }

    const data = await characters.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// New function to fetch all characters
export const fetchAllCharacters = async (page = 1) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching characters: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to fetch ALL characters from all pages
export const fetchAllCharactersAllPages = async () => {
  try {
    let allCharacters = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching characters: ${response.statusText}`);
      }

      const data = await response.json();
      allCharacters = [...allCharacters, ...data.results];

      // Check if there's a next page
      hasNextPage = data.info.next !== null;
      page++;
    }

    return allCharacters;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
