const wordsPerMinute = 200;

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;

  const readingTime = Math.ceil(words / wordsPerMinute);

  return `${readingTime} min(s)`;
}

export function getInitials(text: string = '') {
  return text
    .split(' ')
    .map((_text) => _text.charAt(0).toUpperCase())
    .join('');
}
