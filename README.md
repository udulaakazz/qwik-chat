<p align="center"><img src="https://i.imgur.com/KF6fhEY.png" alt="project-image"></p>

Qwik Chat is a demo chatbot application that uses Qwik and OpenAI API with Latest ChatGPT Models. The ChatBot fetches data on the server-side using `server$()` function and provides streaming responses to the client and ensures that the API key is not visible on the client side.

## Setup

1. Clone this repository
2. Run `npm install`
3. Create a new OpenAI API key at https://platform.openai.com/account/api-keys
4. Rename `.env.example` to `.env.local` and add your OpenAI API key
5. Start the application with `npm start`

## Streaming Responses

App provides streaming responses to the client using built in `servers$()` function.

Streaming responses enhance user engagement by providing real-time and dynamic content updates, leading to a more interactive and responsive user experience. Instead of waiting for the entire response to load, users can see and interact with content as it's being generated, resulting in faster load times and a more engaging, conversational interface.

## Follow-Up Questions

You can ask follow-up questions from Qwik Chat.

## Qwik Resources

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```
