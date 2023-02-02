import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { TypePokemonLocation } from '../../../../types/models/PokemonLocation';
import { getGamesFromGens } from '../../../../backend/scrapper/index.mjs';

const getLocation = async (locationUrl: string) => {
  const response = await axiosInstance.get<TypePokemonLocation[]>(`${locationUrl}`);
  return response.data;
};

export type TypeGameObject = {
  [key: string]: {
    location_area: {
      name: string;
      url: string;
    };
    version_details: {
      max_chance: number;
      encounter_details: {
        min_level: number;
        max_level: number;
        condition_values: {
          name: string;
          url: string;
        }[];
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }[];
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export const usePokemonLocation = (locationUrl: string, currentGen: string) => {
  let data = useQuery<TypePokemonLocation[], AxiosError>(
    ['pokemonLocation', locationUrl],
    () => getLocation(locationUrl)
  );
  const games = getGamesFromGens(currentGen);

  let location: TypePokemonLocation[] = [];

  let pokemonLocations: TypeGameObject = {};

  for (const game of games) {
    pokemonLocations[game] = [];
  }

  if (data.data !== undefined) {
    location = data.data
      ?.map((location) => {
        return {
          ...location,
          version_details: location.version_details.filter((version) => {
            return games.includes(version.version.name);
          }),
        };
      })
      .filter((el) => el.version_details.length > 0);

    for (const loc of location) {
      for (const version of loc.version_details) {
        pokemonLocations[version.version.name].push({
          location_area: {
            name: loc.location_area.name,
            url: loc.location_area.url,
          },
          version_details: [
            {
              max_chance: version.max_chance,
              encounter_details: version.encounter_details,
              version: version.version,
            },
          ],
        });
      }
    }
  }
  return { pokemonLocations, games };
};
