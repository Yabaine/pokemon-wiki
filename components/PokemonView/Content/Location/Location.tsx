import React, { FC, useState, useEffect } from 'react';
import { withBem } from '../../../../utils/bem';
import Button from '../../../Button';
import Canvas from '../../../Canvas';
import kanto from '../../../../public/images/kanto.jpeg';
import { usePokemonLocation } from '../../../../lib/client/react-query/pokemon/usePokemonLocation';

//640px width 544px height

interface Props {
  currentGen: string;
  locationUrl: string;
}

const Location: FC<Props> = ({ currentGen, locationUrl }) => {
  const b = withBem('location');
  const [currentGame, setGame] = useState('');
  const color = ['rgb(255, 0, 36, .6)', 'rgb(255, 0, 36, .3)'];
  let ind = 0;
  let loaded = false;

  const { pokemonLocations, games } = usePokemonLocation(locationUrl, currentGen);

  useEffect(() => {
    if (games.includes(currentGame)) {
      return;
    } else {
      Object.entries(pokemonLocations).find(([key, value]) => {
        if (value.length > 0) {
          setGame(key);
          return true;
        } else {
          setGame('');
          return false;
        }
      });
    }
  }, [games, currentGen]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const image = new Image();
    image.src = kanto.src;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    image.onload = () => {
      loaded = true;
      ctx.drawImage(image, 0, 0);
      /*  ctx.beginPath();
        ctx.moveTo(80, 150);
        ctx.fillRect(80, 150, 35, 50); */
      ctx.fillStyle = color[ind];
      ctx.moveTo(225, 65);
      ctx.lineTo(290, 65);
      ctx.lineTo(290, 95);
      ctx.lineTo(258, 95);
      ctx.lineTo(258, 130);
      ctx.lineTo(225, 130);
      ctx.moveTo(225, 95);
      ctx.fillRect(180, 95, 45, 35);
      ctx.fill();
    };

    setInterval(() => {
      if (loaded) {
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = color[ind];
        ctx.moveTo(225, 65);
        ctx.lineTo(290, 65);
        ctx.lineTo(290, 95);
        ctx.lineTo(258, 95);
        ctx.lineTo(258, 130);
        ctx.lineTo(225, 130);
        ctx.moveTo(225, 95);
        ctx.fillRect(180, 95, 45, 35);
        ctx.fill();
        ind === 0 ? (ind = 1) : (ind = 0);
      }
    }, 750);
  };

  const ButtonsGamesList: FC = () => {
    return (
      <div className={b('games-list')}>
        <Button
          games={pokemonLocations}
          setMain={setGame}
          gameMain={currentGame}
        ></Button>
      </div>
    );
  };

  return (
    <div className={b('')}>
      <h2>Location</h2>
      <ButtonsGamesList></ButtonsGamesList>
      <div className={b('container')}>
        <Canvas draw={draw} width={kanto.width} height={kanto.height}></Canvas>
      </div>
    </div>
  );
};

export default Location;
