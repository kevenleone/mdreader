import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input as MainInput } from '@mdreader/ui/components/ui/input';

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
