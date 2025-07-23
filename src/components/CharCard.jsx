import { useEffect, useState } from 'react';
import { fetchCharId } from '../services/fetchChar';

function CharCard({ charId }) {
  const [char, setChar] = useState('');

  useEffect(() => {
    const getChar = async () => {
      const data = await fetchCharId(charId);
      setChar(data);
    };

    getChar();
  }, [charId]);

  if (!char) return <div>Loading Character...</div>;

  return <div className='text-2xl text-black'>{char.name}</div>;
}

export default CharCard;
