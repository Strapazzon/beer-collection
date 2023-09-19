### Live link: [https://beer-collection-theta.vercel.app/](https://beer-collection-theta.vercel.app/)

## Beer collection

The Beer Collection is a web application that features a catalog of Punk beers. With this application, users can create their own custom collections from the Punk catalog.

## Architecture

For this project, I decided to use the [Radix UI](https://www.radix-ui.com) framework and themes. It allows for the quick development of beautiful applications with fast coding. Additionally, I included the [Stitches](https://stitches.dev) styled library based on class tokens to ensure good performance for pages.

Using [NextJS](https://nextjs.org/) and its server-side rendering power, I can optimize pages for both performance and SEO.

To persist user sessions and collection information on the backend side, I have decided to use [Vercel KV](https://vercel.com/docs/storage/vercel-kv). This is a Redis persistence database in-memory, which has excellent performance.
To ensure data persistence and optimal performance for user sessions and collection information on the backend side, I decided to use Vercel KV. This Redis persistence database in-memory provides excellent performance and reliability.

I have chosen to use the Cypress suite for testing purposes, as it is a highly efficient testing framework that is well integrated with both React and NextJS. Cypress offers a range of features that allow for comprehensive testing of web applications, such as automated testing, debugging, and real-time reloads. Additionally, Cypress provides an easy-to-use interface for creating and managing test suites, making it a great choice for developers of all skill levels. By utilizing the Cypress suite, I can ensure that my website is thoroughly tested and optimized for optimal performance and user experience.

To host this project on the web, I have decided to use the Vercel platform, which is optimized for NextJS.

## Technologies and libraries

- [NextJS](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com)
- [Stitches](https://stitches.dev)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Vercel](https://vercel.com)
- [Cypress](https://www.cypress.io/)

## Lighthouse performance report

![Alt text](https://share.cleanshot.com/k4cT2X33+)

### A project directory layout

    .
    ├── cypress
        ├── downloads
        ├── e2e
        ├── fixtures
        ├── support
    ├── public
        ├── assets
    ├── src                     # Source files
        ├── gray-matter
        ├── modules
            ├── common
            ├── components
            ├── libs
            ├── theme
        ├── pages
            ├── api
        ├── styles

## Requirements

Vercel KV storage [https://vercel.com/docs/storage/vercel-kv](https://vercel.com/docs/storage/vercel-kv)

## Environment variables:

Create a new file named `.env.local` in the project's root directory and add the following variables to it:

```dosini
# .env.example, committed to repo
PUNK_API_URL=
SITE_URL=
MAX_ITEMS_PER_PAGE=
MAX_BEER_ID=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
REDIS_COLLECTION_PREFIX=
```

## Getting Started

Install dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Cypress Tests

```bash
npm run cypress
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
