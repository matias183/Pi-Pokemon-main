const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const { getAllPokemons} = require("../Middleware/Middleware.js");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    let Pokemon = await getAllPokemons();
    if (name) {
      let queryPokemon = await Pokemon.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (queryPokemon.length) {
        res.status(200).send(queryPokemon);
      } else {
        res.status(404).send("Este pokemon no existe");
      }
    } else {
      res.status(200).send(Pokemon);
    }
  });


// router.post("/", async (req, res) => {
//   let { name, vida, fuerza, defensa, velocidad, altura, peso, tipos } =
//     req.body;
//   if (
//     isNaN(vida) ||
//     isNaN(fuerza) ||
//     isNaN(defensa) ||
//     isNaN(velocidad) ||
//     isNaN(altura) ||
//     isNaN(peso)
//   )
//     return res.json({ info: "One of the arguments its not a number" });

//   if (!name) return res.json({ info: "A name is required" });

//   const existe = await Pokemon.findOne({ where: { name: name } });
//   if (existe) return res.json({ info: "The Pokemon already exists" });

//   const pokemon = await Pokemon.create({
//     name: name.toLowerCase(),
//     vida: Number(vida),
//     fuerza: Number(fuerza),
//     defensa: Number(defensa),
//     velocidad: Number(velocidad),
//     altura: Number(altura),
//     peso: Number(peso),
//   });

//   if (!tipos.length) tipos = [1];

//   await pokemon.setTipos(tipos);
//   res.json({ info: "Pokemon created" });
// });

module.exports = router;