export type CountryCode = 'KE' | 'NG' | 'TZ' | 'UG';
export type Currency = 'KES' | 'NGN' | 'TZS' | 'UGX';

export interface CountryMeta {
  code: CountryCode;
  name: string;
  currency: Currency;
  phonePrefix: string;
  digitsAfterPrefix: number;
}

export const COUNTRIES: CountryMeta[] = [
  { code: 'KE', name: 'Kenya', currency: 'KES', phonePrefix: '+254', digitsAfterPrefix: 9 },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', phonePrefix: '+234', digitsAfterPrefix: 7 },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', phonePrefix: '+255', digitsAfterPrefix: 9 },
  { code: 'UG', name: 'Uganda', currency: 'UGX', phonePrefix: '+256', digitsAfterPrefix: 7 },
];

export const getCountryMeta = (code: CountryCode): CountryMeta => {
  const meta = COUNTRIES.find((c) => c.code === code);
  if (!meta) {
    throw new Error(`Unknown country code: ${code}`);
  }
  return meta;
};
