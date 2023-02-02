import React, { FC, useEffect, useRef } from 'react';
import { withBem } from '../../utils/bem';

type Props = {
  draw: (context: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
};

const Canvas: FC<Props> = ({ draw, width, height }) => {
  const b = withBem('canvas-layout');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    /*  const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      draw(ctx);
    }, 1000);
    return () => clearInterval(interval); */
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw(ctx);
  }, []);

  return (
    <canvas className={b('')} ref={canvasRef} width={width} height={height}></canvas>
  );
};

export default Canvas;
