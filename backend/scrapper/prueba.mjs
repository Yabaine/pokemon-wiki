import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
/* import GENS from '../db/generations.json' assert { type: 'json' };
import VERSIONS from '../db/versions.json' assert { type: 'json' };
import POKEDEX from '../db/pokedex.json' assert { type: 'json' }; */
import GENVERPKDX from '../db/genverpkdx.json' assert { type: 'json' };
import alter from '../db/alter.json' assert { type: 'json' };

const DB_PATH = path.join(process.cwd(), 'backend/db/');

/* function readDBFile(dbName) {
  //Una vez se lee el archivo, se parsea a JSON, sino quedara como un string
  return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse);
} */

export function writeDBFIle(dbName, data) {
  return writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8');
}

export function getGamesFromGeneration(gen) {
  const versions = alter.find((el) => el.gen.name == gen).versions;
  const games = [];
  for (let game in versions) {
    games.push(versions[game].games);
  }
  return games.flat();
}

export function getPokedexFromGames(game) {
  let idPokedex = [];
  let pokedex = [];
  console.time('for in');
  for (let i = 0; i < game.length; i++) {
    alter.map((juego) => {
      /* console.time('getOwnPropertyNames');
      Object.getOwnPropertyNames(juego.versions).forEach((x) => {
        if (juego.versions[x].games.includes(game[i])) {
          idPokedex.push(juego.versions[x].pokedexID);
        }
      });

      console.timeEnd('getOwnPropertyNames'); */

      //x representa el nombre de la propiedad de versions
      for (let x in juego.versions) {
        //utilizar includes para ver si el ARRAY de games contiene el game[i]
        if (juego.versions[x].games.includes(game[i])) {
          idPokedex.push(juego.versions[x].pokedexID);
          break;
        }
      }

      for (let x in juego.pokedex) {
        if (juego.pokedex[x].id == idPokedex[i]) {
          pokedex.push(juego.pokedex[x]);
          break;
        }
      }
    });
  }
  console.timeEnd('for in');
  return pokedex;
}

//from GENVERPKDX find games from gen then return them
export function getGamesFromGen(gen) {
  GENVERPKDX.find((el) => el.gen.name === gen)
    .versions.map((el) => el.games)
    .flat();
  return games;
}

//from GENVERPKDX get pokedex by game with Array method
export function getPokedexFromGame(game) {
  console.time('array find');

  const games = [];
  game.map((g, i) => {
    games.push(
      GENVERPKDX.find((el) => el.versions.find((el) => el.games.includes(game[i])))
        .pokedex
    );
  });

  console.timeEnd('array find');

  //quitar duplicados y el flat es para que no quede un array dentro de otro
  /* return [...new Set(games.flat())];  */

  //convertir a Set para quitar duplicados y luego en array
  return [...new Set(games.flat())];
}

//from GENVERPKDX get pokedex by game with Set method
/* export function getPokedexFromGame(game) {
  console.time('array find');

  const games = new Set();
  game.map((g, i) => {
    games.add(
      GENVERPKDX.find((el) => el.versions.find((el) => el.games.includes(game[i])))
        .pokedex
    );
  });

  console.timeEnd('array find');
  return games;
} */

/* console.log(getPokedexFromGame(['red', 'crystal', 'emerald', 'firered', 'leafgreen']));
console.log('*********************************'); */
/* const tob = getGamesFromGen('generation-ii');
console.log(tob) */

/* console.log(getGamesFromGeneration('generation-i')); */
/* console.log(getPokedexFromGames(['red', 'crystal', 'emerald', 'firered', 'leafgreen'])); */

/* await writeFile(`${DB_PATH}/prueba.json`, JSON.stringify(games, null, 2), 'utf-8'); */

/* pokedex.map((region) => {
  console.log(region);
  let ver = mapped.find((el) => el.pokedex.find((el) => el.name.includes(region)));
  if (ver === undefined) {
  } else {
    ver.versions.map((el) => {
  
        versions.push(ver.versions);
 
    });
  }
}); */
