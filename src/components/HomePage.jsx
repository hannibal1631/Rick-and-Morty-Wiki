// import { useEffect, useState } from 'react';
// import { fetchCharId } from '../services/fetchChar';

// function CharCard({ charId }) {
//   const [char, setChar] = useState('');

//   useEffect(() => {
//     const getChar = async () => {
//       const data = await fetchCharId(charId);
//       setChar(data);
//     };

//     getChar();
//   }, [charId]);

//   if (!char) return <div>Loading Character...</div>;

//   return <div className='text-2xl text-black'>{char.name}</div>;
// }

// export default CharCard;

import { useEffect, useState } from 'react';
import { fetchAllCharacters } from '../services/fetchChar'; // Adjust path as needed

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        setLoading(true);
        // Fetch first page of characters (20 characters)
        const data = await fetchAllCharacters(1);
        setCharacters(data.results);
        setError(null);
      } catch (err) {
        console.error('Error fetching characters:', err);
        setError('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    getAllCharacters();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900'>
        <div className='text-2xl text-white'>Loading Characters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900'>
        <div className='text-2xl text-red-400'>{error}</div>
      </div>
    );
  }

  return (
    <div className='p-6 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 min-h-screen'>
      <h1 className='text-4xl font-bold text-center mb-8 text-white drop-shadow-lg'>
        Rick & Morty Characters
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto'>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

// Character Card Component
function CharacterCard({ character }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'text-green-600 bg-green-100';
      case 'dead':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-4 border-gray-200 overflow-hidden relative group cursor-pointer'>
      {/* Character Image */}
      <div className='relative'>
        <img
          src={character.image}
          alt={character.name}
          className='w-full h-48 object-cover'
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/300x200/cccccc/666666?text=No+Image';
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
      </div>

      {/* Card Content */}
      <div className='p-4 space-y-3'>
        {/* Name */}
        <h3 className='text-lg font-bold text-gray-800 text-center border-b-2 border-gray-200 pb-2'>
          {character.name}
        </h3>

        {/* Status Badge */}
        <div className='flex justify-center'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              character.status
            )}`}
          >
            {character.status?.toUpperCase()}
          </span>
        </div>

        {/* Character Details */}
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='font-medium text-gray-600'>Species:</span>
            <span className='text-gray-800'>{character.species}</span>
          </div>

          <div className='flex justify-between'>
            <span className='font-medium text-gray-600'>Gender:</span>
            <span className='text-gray-800'>{character.gender}</span>
          </div>

          <div className='border-t pt-2'>
            <div className='mb-1'>
              <span className='font-medium text-gray-600 text-xs'>Origin:</span>
              <p
                className='text-gray-800 text-xs truncate'
                title={character.origin?.name || character.origin}
              >
                {character.origin?.name || character.origin}
              </p>
            </div>

            <div>
              <span className='font-medium text-gray-600 text-xs'>
                Location:
              </span>
              <p
                className='text-gray-800 text-xs truncate'
                title={character.location?.name || character.location}
              >
                {character.location?.name || character.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
    </div>
  );
}

export default HomePage;
