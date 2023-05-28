import { Input as MainInput } from '@mdreader/interface';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  useBaseInput?: boolean;
}

export function Input({ useBaseInput, ...props }: InputProps) {
  const { register } = useFormContext();

  if (useBaseInput) {
    return <input id={props.name} {...register(props.name)} {...props} />;
  }

  return <MainInput id={props.name} {...register(props.name)} {...props} />;
}
