import { useEffect, useState } from 'react';

type Rates = Record<string, number>;

interface ExchangeResult {
  rates: Rates | null;
  base: string;
  loading: boolean;
  error: string | null;
  convert: (amountUsd: number, currency: string) => number | null;
}

const FALLBACK_RATES: Rates = {
  KES: 130,
  NGN: 1600,
  TZS: 2600,
  UGX: 3800,
};

const LATEST_URL = 'https://openexchangerates.org/api/latest.json';

const useExchangeRates = (): ExchangeResult => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const appId = process.env.EXPO_PUBLIC_OER_APP_ID;
    if (!appId) {
      setRates(FALLBACK_RATES);
      return;
    }
    const controller = new AbortController();
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${LATEST_URL}?app_id=${appId}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch rates: ${res.status}`);
        }
        const data: { rates: Rates; base: string } = await res.json();
        const subset: Rates = {
          KES: data.rates['KES'],
          NGN: data.rates['NGN'],
          TZS: data.rates['TZS'],
          UGX: data.rates['UGX'],
        };
        setRates(subset);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        setRates(FALLBACK_RATES);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
    return () => controller.abort();
  }, []);

  const convert = (amountUsd: number, currency: string) => {
    if (!rates) {
      return null;
    }
    const rate = rates[currency];
    if (!rate || Number.isNaN(amountUsd)) {
      return null;
    }
    return amountUsd * rate;
  };

  return { rates, base: 'USD', loading, error, convert };
};

export default useExchangeRates;
