import { Hono } from 'hono';
import versiongroup from '../db/versiongroups.json';
import pokedex from '../db/pokedex.json';
import generations from '../db/generations.json';
import version from '../db/versions.json';
import genverpkdx from '../db/genverpkdx.json';
import regions from '../db/regions.json';

const app = new Hono();

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/versiongroup',
      description: 'List of version groups',
    },
    {
      endpoint: '/pokedex',
      description: 'List of all Pokedex',
    },
    {
      endpoint: '/version',
      description: 'List of all game versions',
    },
    {
      endpoint: '/generations',
      description: 'List of all pokemon generations',
    },
    {
      endpoint: '/genverpkdx',
      description: 'List of all pokemon generations',
    },
    {
      endpoint: '/regions',
      description: 'List of all regions',
    },
  ]);
});

app.get('/versiongroup', (ctx) => {
  return ctx.json(versiongroup);
});

app.get('/pokedex', (ctx) => {
  return ctx.json(pokedex);
});

app.get('/version', (ctx) => {
  return ctx.json(version);
});

app.get('/generations', (ctx) => {
  return ctx.json(generations);
});

app.get('/genverpkdx', (ctx) => {
  return ctx.json(genverpkdx);
});

app.get('/regions', (ctx) => {
  return ctx.json(regions);
});

export default app;

/* export default {
  async fetch(request, env, ctx) {
    return new Response(
      JSON.stringify(versiongroup),
      //Le indicamos el tipo de archivo que le pasamos al browser al hacer la peticion
      { headers: { 'content-type': 'application/json;charset=UTF-8' } }
    );
  },
}; */
