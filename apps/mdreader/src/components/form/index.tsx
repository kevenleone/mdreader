import { ReactNode, FormHTMLAttributes } from 'react';
import { FormProvider } from 'react-hook-form';

import { ErrorMessage } from './ErrorMessage';
import { Field } from './Field';
import { HelpMessage } from './HelpMessage';
import { Input } from './Input';
import { Label } from './Label';

type FormProps = {
  children: ReactNode;
  formProviderProps: any;
} & FormHTMLAttributes<HTMLFormElement>;

type FormChildrens = {
  ErrorMessage: typeof ErrorMessage;
  Field: typeof Field;
  HelpMessage: typeof HelpMessage;
  Input: typeof Input;
  Label: typeof Label;
};

const Form: React.FC<FormProps> & FormChildrens = ({
  children,
  formProviderProps,
  ...formProps
}) => (
  <FormProvider {...formProviderProps}>
    <form className="space-y-5 my-3" {...formProps}>
      {children}
    </form>
  </FormProvider>
);

Form.ErrorMessage = ErrorMessage;
Form.Field = Field;
Form.HelpMessage = HelpMessage;
Form.Input = Input;
Form.Label = Label;

export default Form;
