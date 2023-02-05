import React, { FC, useEffect, useRef } from 'react';
import { withBem } from '../../utils/bem';

type Props = {
  draw: (context: CanvasRenderingContext2D) => void;
  currentGame: string;
  image: {
    height: number;
    width: number;
    src: string;
    style: string;
  };
};

const Canvas: FC<Props> = ({ draw, currentGame, image }) => {
  const b = withBem('canvas-layout');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = canvasRef.current;

  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (currentGame === '') {
      ctx.clearRect(0, 0, image.width, image.height);
    } else {
      draw(ctx);
    }
  }, [currentGame]);

  return (
    <canvas
      className={image.style}
      ref={canvasRef}
      width={image.width}
      height={image.height}
    ></canvas>
  );
};

export default Canvas;
