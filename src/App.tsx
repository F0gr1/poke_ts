import React, { useEffect, useState } from 'react';
import { getAllPokemon  , getPokemon} from './utils/pokemon';
import PokemonCard from './components/PokemonCard';
import './App.css'
import NavBar from './components/Navbar';

const App = ()  =>{
 const initailURL = "https://pokeapi.co/api/v2/pokemon";
 const [looding, setLooding] = useState(true);
 const [pokemonData , setPokemonData] = useState([]);
 const [nextURL , setNextURL] = useState("");
 const [prevURL , setPrevURL] = useState("");
 useEffect( () => {
    const fetchPokemonData = async () =>{
      const res : any = await getAllPokemon(initailURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLooding(false)
    }
    fetchPokemonData();
 },[])

    const loadPokemon = async(pokemonData : any) => {
      let _pokemonData =  await Promise.all(
        pokemonData.map((pokemon :any) => {
          let pokemonRecord = getPokemon(pokemon.url);
            return pokemonRecord
        })
      )

      setPokemonData(_pokemonData as never[]);
    }
    const handleNextPage = async() =>{
      setLooding(true);
      let data:any = await getAllPokemon(nextURL);
      await loadPokemon(data.results)
      setNextURL(data.next);
      setPrevURL(data.previous)
      setLooding(false)
    };
    const handlePrevPage = async() =>{
      if(!prevURL) return;
      setLooding(true);
      let data:any = await getAllPokemon(prevURL);
      await loadPokemon(data.results)
      setPrevURL(data.previous);
      setNextURL(data.next);
      setLooding(false)
    };
 return(
  <>
  <NavBar/>
  <div className='App'>
    {looding ? (
        <h1> ロード中</h1>
      ) :
      <>
        <div className='pokemonCardContainer'>
          {pokemonData.map((pokemon , i) =>{
              return <PokemonCard pokemon={pokemon} key={i}/>
          })}
        </div>
        <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
        </div>
     </>
    }

  </div>
  </>
 )
}

export default App;
