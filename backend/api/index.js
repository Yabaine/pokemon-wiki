import { Hono } from 'hono';
import versiongroup from '../db/version-groups.json';

const app = new Hono();

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/versiongroup',
      description: 'List of version groups',
    },
  ]);
});

app.get('/versiongroup', (ctx) => {
  return ctx.json(versiongroup);
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
