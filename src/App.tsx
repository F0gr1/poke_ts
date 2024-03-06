import React, { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/pokemon';
const App = ()  =>{
 const initailURL = "https://pokeapi.co/api/v2/pokemon";
 const [looding, setLoging] = useState(true);
 useEffect( () => {
    const fetchPokemonData = async () =>{
      const res = await getAllPokemon(initailURL);
      console.log(res);
      setLoging(false)
    }
    fetchPokemonData();
 },[])
 return(
  <>
  {looding ? (
    <h1> ロード中</h1>
  ) : <h1> ポケモンデータ取得</h1>}
  </>
 )
}
export default App;
