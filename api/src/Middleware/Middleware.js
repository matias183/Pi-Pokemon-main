const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");

const getPokemonsFromApi= async () =>{
const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")

const apiInfo= await apiUrl.data.results.map((e) => {
    return {
        id: e.id,
        name: e.name,
        type: e.types.map((t) => t.type.name),
        img: e.sprites.versions["generation-v"]["black-white"].animated.front_default,
        vida: e.stats[0].base_stat,
        fuerza: e.stats[1].base_stat,
        defensa: e.stats[2].base_stat,
        velocidad: e.stats[5].base_stat,
        height: e.height,
        weight: e.weight,
    }
})
return apiInfo}

const getPokemonFromDb= async () =>{
return await Pokemon.findAll({
    include:{
        model:Tipo,
        attributes:["name"],
        through:{
            attributes:[]
        }
    }
})
}

const getAllPokemons = async () => {
    const PokemonsFromApi = await getPokemonsFromApi();
    const PokemonsFromDb = await getPokemonsFromDb();
    const allPokemons = PokemonsFromApi.concat(PokemonsFromDb);
    return allPokemons;
  };


module.exports = {
getAllPokemons,
getPokemonFromDb,
getPokemonsFromApi
}