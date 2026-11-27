import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zagreb' });

export const readingTime = (text = '') => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
