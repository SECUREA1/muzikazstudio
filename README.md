# MUZIKAZ Model Market

Static landing page for the MUZIKAZ model-market concept.

## Run locally

```sh
npm start
```

Then open <http://127.0.0.1:4173/>.

You can also run the site without npm:

```sh
python3 -m http.server 4173
```

## Build and deploy

Build the static site before deployment:

```sh
npm run build
```

The build writes the site to `dist/` for Netlify and also mirrors it to `a1/` so deployments configured with `a1` as the publish directory continue to work.

Render can use the included `render.yaml` blueprint, which runs the same build command and publishes the generated `dist/` directory.
