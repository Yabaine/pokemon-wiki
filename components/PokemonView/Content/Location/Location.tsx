import { FC, useEffect, useRef, useState } from 'react';
import { usePokemonLocation } from '../../../../lib/client/react-query/pokemon/usePokemonLocation';
import jhoto from '../../../../public/images/jhoto.webp';
import kanto from '../../../../public/images/kanto.webp';
import { TypeGroupGenPokeDX } from '../../../../types/models/GroupGenPokeDX';
import { withBem } from '../../../../utils/bem';
import Button from '../../../Button';
import Canvas from '../../../Canvas';

interface Props {
  currentGen: string;
  locationUrl: string;
  mapped: TypeGroupGenPokeDX;
}

const Location: FC<Props> = ({ currentGen, locationUrl, mapped }) => {
  const b = withBem('location');
  const [currentGame, setGame] = useState('');
  const color = ['rgb(255, 0, 36, .6)', 'rgb(255, 0, 36, .3)'];
  let flashTimerRef = useRef<ReturnType<typeof setInterval>>();
  let ind = 0;
  let image = {
    height: 0,
    width: 0,
    src: '',
    style: '',
  };

  const { pokemonLocations, games } = usePokemonLocation(locationUrl, currentGen);

  class MapLocation {
    location: string[];
    coordinates: any;

    constructor() {
      this.location = [];
      this.coordinates = [];
    }

    getGameLocation() {
      for (const [key, value] of Object.entries(pokemonLocations)) {
        if (key === currentGame) {
          this.location = value.map((el) => {
            return el.location_area.name;
          });
        }
      }
    }

    getCoordinates() {
      mapped
        .find((region) => {
          return region.gen.name === currentGen;
        })
        ?.locations.forEach((loc) => {
          if (loc.areas == undefined) return { name: '', url: '' };
          loc.areas.forEach((area) => {
            if (this.location.includes(area.name)) {
              this.coordinates.push(loc.coords);
            }
          });
        });
    }
  }

  function setImage() {
    if (currentGen === 'generation-i') {
      image = {
        height: kanto.height,
        width: kanto.width,
        src: kanto.src,
        style: 'm-auto w-96 lg:w-3/4 xl:w-2/3 2xl:w-3/6',
      };
    } else if (currentGen === 'generation-ii') {
      image = {
        height: jhoto.height,
        width: jhoto.width,
        src: jhoto.src,
        style: 'm-auto w-11/12',
      };
    }
  }

  setImage();

  const mapLocation = new MapLocation();
  mapLocation.getGameLocation();
  mapLocation.getCoordinates();

  const draw = (ctx: CanvasRenderingContext2D) => {
    const imagen = new Image();
    imagen.src = image.src;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    imagen.onload = () => {
      ctx.drawImage(imagen, 0, 0);
      ctx.fillStyle = color[ind];
      mapLocation.coordinates.forEach((loc: any) => {
        loc.forEach((coord: any) => {
          ctx.fillRect(coord.x, coord.y, coord.w, coord.h);
          ctx.fill();
        });
      });
    };

    flashTimerRef.current = setInterval(() => {
      ctx.drawImage(imagen, 0, 0);
      ctx.fillStyle = color[ind];
      mapLocation.coordinates.forEach((loc: any) => {
        loc.forEach((coord: any) => {
          ctx.fillRect(coord.x, coord.y, coord.w, coord.h);
          ctx.fill();
        });
      });
      ind === 0 ? (ind = 1) : (ind = 0);
    }, 750);
  };

  useEffect(() => {
    if (games.includes(currentGame)) {
      return;
    }
    clearInterval(flashTimerRef.current);
    Object.entries(pokemonLocations).find(([key, value]) => {
      if (value.length > 0) {
        setGame(key);
        return true;
      } else {
        setGame('');
        return false;
      }
    });
  }, [games]);

  useEffect(() => {
    clearInterval(flashTimerRef.current);
    setGame('');
    Object.entries(pokemonLocations).find(([key, value]) => {
      if (value.length == 0) {
        return false;
      } else if (key === currentGame) {
        return true;
      } else {
        setGame(key);
        return true;
      }
    });
  }, [locationUrl]);

  useEffect(() => {
    return () => {
      clearInterval(flashTimerRef.current);
    };
  }, []);

  const handleClick = (game: string) => {
    if (currentGame === game) return;
    setGame(game);
    clearInterval(flashTimerRef.current);
  };

  const ButtonsGamesList: FC = () => {
    return (
      <div className={b('games-list')}>
        {Object.entries(pokemonLocations).map(([KEY, value]) => {
          return (
            <Button
              key={KEY}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(KEY);
              }}
              disabled={value.length == 0}
              variant={currentGame === KEY ? 'primary' : 'neutral'}
              size="base"
            >
              {KEY}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={b('')}>
      <h2>Location</h2>
      <ButtonsGamesList></ButtonsGamesList>
      <div className={b('container')}>
        {currentGame === '' && (
          <div className={b('no-locations')}>
            <p>There are no locations for this pokemon</p>
          </div>
        )}
        <Canvas currentGame={currentGame} draw={draw} image={image}></Canvas>
      </div>
    </div>
  );
};

export default Location;
