import { labelVariantsCn } from '@mdreader/ui/components/ui/label';
import { LabelHTMLAttributes } from 'react';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={labelVariantsCn} {...props} />;
}
