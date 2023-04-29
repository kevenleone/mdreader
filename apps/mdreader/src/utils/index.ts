export function readingTime(_text: string) {
  return '5 min read';
}

export function getInitials(text: string) {
  return text
    .split(' ')
    .map((_text) => _text.charAt(0).toUpperCase())
    .join('');
}
