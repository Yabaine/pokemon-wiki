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
  return GENVERPKDX.find((el) => el.gen.name === gen)
    .versions.map((el) => el.games)
    .flat();
}

export function getVersionsGamesFromGens(gen) {
  return GENVERPKDX.find((el) => el.gen.name === gen)
    .versions.map((el) => el.versionName)
    .flat();
}

export function getPokedexFromGames(game) {
  const games = [];
  game.map((_, i) => {
    games.push(
      GENVERPKDX.find((el) => el.versions.find((el) => el.games.includes(game[i])))
        .pokedex
    );
  });

  return [...new Set(games.flat())];
}

export function getGameFromPokedex(pkd, mapped) {
  let pokdID;

  return mapped
    .find((el) =>
      el.pokedex.find((el) => {
        if (el.name == pkd) {
          pokdID = el.id;
          return true;
        }
        return false;
      })
    )
    .versions.map((el) => {
      if (pokdID == el.pokedexID) {
        return el.gamesAcronyms;
      }
      return [];
    })
    .flat()
    .join('/');
}

export function getGenFromGame(games, mapped) {
  let gens = [];
  games.map((juego) => {
    gens.push(
      mapped.find((el) => {
        return el.versions.find((ver) => {
          return ver.games.includes(juego);
        });
      }).gen.altName
    );
  });
  return [...new Set(gens)];
}

export function filterItemsByGen(gen, items) {
  const games = getGamesFromGens(gen);

  return items
    .map((item) => {
      return {
        ...item,
        version_details: item.version_details.filter((el) =>
          games.includes(el.version.name)
        ),
      };
    })
    .filter((el) => el.version_details.length > 0);
}

export function getDescFromGames(gen, desc) {
  const games = getGamesFromGens(gen);
  return desc.filter((item) => {
    return games.includes(item.version.name) && item.language.name == 'en';
  });
}

export function getMovesFromPokemonByGen(gen, pokemon) {
  const versionGames = getVersionsGamesFromGens(gen);

  let moves = pokemon.moves
    .map((move) => {
      return {
        ...move,
        version_group_details: move.version_group_details.filter((el) =>
          versionGames.includes(el.version_group.name)
        ),
      };
    })
    .filter((el) => el.version_group_details.length > 0);

  return { moves: [...new Set(moves)], games: versionGames };
}

/* await writeFile(`${DB_PATH}/prueba.json`, JSON.stringify(games, null, 2), 'utf-8'); */
