import { labelVariantsCn } from '@mdreader/interface';
import { LabelHTMLAttributes } from 'react';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={labelVariantsCn} {...props} />;
}
