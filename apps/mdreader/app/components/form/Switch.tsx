import { Switch as BaseSwitch } from '@mdreader/interface';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
}

export function Switch({ name }: InputProps) {
  const { register, setValue, watch } = useFormContext();

  const fieldValue = watch(name);
  const registeredField = register(name);

  return (
    <BaseSwitch
      {...registeredField}
      checked={fieldValue}
      onCheckedChange={(checked) => setValue(name, checked)}
    />
  );
}
