export default function ImageWithTheme(props: any) {
  const theme = 'light';

  return (
    <img
      alt={props.alt}
      src={theme === 'light' ? props.light : props.dark}
      {...props}
    />
  );
}
