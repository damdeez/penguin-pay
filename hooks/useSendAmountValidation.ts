import { z } from 'zod';

export interface SendAmountValues {
  amountUsd: string;
}

export type SendAmountErrors = Partial<Record<keyof SendAmountValues, string>>;

export const useSendAmountSchema = () => {
  const schema = z.object({
    amountUsd: z
      .string()
      .min(1, 'Required')
      .regex(/^\d+$/, 'Enter a whole USD amount')
      .transform((v) => parseInt(v, 10))
      .pipe(z.number().gt(0, 'Amount must be greater than 0')),
  });

  const validate = (values: SendAmountValues) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      const emptyErrors: SendAmountErrors = {};
      return { data: parsed.data, errors: emptyErrors };
    }
    const flat = parsed.error.flatten();
    const err: SendAmountErrors = {};
    const msgs = flat.fieldErrors.amountUsd;
    if (msgs && msgs.length > 0) {
      err.amountUsd = String(msgs[0]);
    }
    return { data: null, errors: err };
  };

  return { schema, validate };
};

export default useSendAmountSchema;
