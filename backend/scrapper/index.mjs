/* import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path'; */
/* import GENS from '../db/generations.json' assert { type: 'json' };
import VERSIONS from '../db/versions.json' assert { type: 'json' };
import POKEDEX from '../db/pokedex.json' assert { type: 'json' }; */
import GENVERPKDX from '../db/genverpkdx.json' assert { type: 'json' };

/* const DB_PATH = path.join(process.cwd(), 'backend/db/'); */

/* function readDBFile(dbName) {
  //Una vez se lee el archivo, se parsea a JSON, sino quedara como un string
  return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse);
} */

/* export function writeDBFIle(dbName, data) {
  return writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8');
} */

//from GENVERPKDX find games from gen then return them
export function getGamesFromGens(gen) {
  const games = GENVERPKDX.find((el) => el.gen.name === gen)
    .versions.map((el) => el.games)
    .flat();
  return games;
}

//from GENVERPKDX get pokedex by game with Array method
export function getPokedexFromGames(game) {
  const games = [];
  game.map((g, i) => {
    games.push(
      GENVERPKDX.find((el) => el.versions.find((el) => el.games.includes(game[i])))
        .pokedex
    );
  });

  //quitar duplicados y el flat es para que no quede un array dentro de otro
  /* return [...new Set(games.flat())];  */

  //convertir a Set para quitar duplicados y luego en array
  return [...new Set(games.flat())];
}

//from GENVERPKDX get pokedex by game with Array method
export function getGameFromPokedex(pkd, mapped) {
  const versions = [];
  let pokedex = [pkd];
  let pokdID;

  pokedex.map((pokedexName) => {
    let ver = mapped.find((el) =>
      el.pokedex.find((el) => {
        if (el.name == pokedexName) {
          pokdID = el.id;
          return true;
        }
        return false;
      })
    );
    if (ver === undefined) {
    } else {
      ver.versions.map((el) => {
        if (pokdID == el.pokedexID) {
          versions.push(el.gamesAcronyms);
        }
      });
    }
  });

  let games = versions
    .flat()
    .map((game) => game)
    .join('/');
  return games;
}

/* await writeFile(`${DB_PATH}/prueba.json`, JSON.stringify(games, null, 2), 'utf-8'); */
