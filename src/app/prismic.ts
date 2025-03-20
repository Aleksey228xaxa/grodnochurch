import * as prismic from '@prismicio/client';

const apiUrl = process.env.PRISMIC_API_URL;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!apiUrl) {
  throw new Error('PRISMIC_API_URL is not defined in .env.local');
}

export const prismicClient = prismic.createClient(apiUrl, {
  accessToken: accessToken || undefined, // Если токен не задан, передаем undefined
});
