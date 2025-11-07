import { z } from 'zod';
import type { CountryMeta } from '../components/CountrySelect/CountrySelect.helpers';

export interface SendFormValues {
  firstName: string;
  lastName: string;
  phoneDigits: string;
  amountUsd: string; // raw input, digits only
}

export type SendFormErrors = Partial<Record<keyof SendFormValues, string>>;

export const useSendSchema = (country: CountryMeta) => {
  const schema = z.object({
    firstName: z.string().trim().min(1, 'Required'),
    lastName: z.string().trim().min(1, 'Required'),
    phoneDigits: z
      .string()
      .min(1, 'Required')
      .regex(/^\d+$/, 'Digits only')
      .refine((v) => v.length === country.digitsAfterPrefix, {
        message: `Must be ${country.digitsAfterPrefix} digits`,
      }),
    amountUsd: z
      .string()
      .min(1, 'Required')
      .regex(/^\d+$/, 'Enter a whole USD amount')
      .transform((v) => parseInt(v, 10))
      .pipe(z.number().gt(0, 'Amount must be greater than 0')),
  });

  const validate = (values: SendFormValues) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      return { data: parsed.data, errors: {} as SendFormErrors };
    }
    const flat = parsed.error.flatten();
    const err: SendFormErrors = {};
    (Object.keys(flat.fieldErrors) as (keyof SendFormValues)[]).forEach((k) => {
      const msgs = flat.fieldErrors[k];
      if (msgs && msgs.length) err[k] = msgs[0] as string;
    });
    return { data: null, errors: err };
  };

  return { schema, validate };
};

export default useSendSchema;
