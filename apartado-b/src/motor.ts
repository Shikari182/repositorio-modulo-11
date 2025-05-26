const imgRegex = /<img\s+?(?:[^>]*?\s+?)?src\s*?=\s*?([""'])(.*?)\1/gi;

export const extractImageLinks = (html: string): string[] => {
  const matches = Array.from(html.matchAll(imgRegex));
  return matches.map(match => match[2]).filter(Boolean);
};