import { useEffect, useState } from 'react';

type Rates = Record<string, number>;

interface ExchangeResult {
  rates: Rates | null;
  loading: boolean;
  error: string | null;
  convert: (amountUsd: number, currency: string) => number | null;
}

enum CurrencyCode {
  KES,
  NGN,
  TZS,
  UGX,
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
  const baseCurrency = 'USD'

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
        const res = await fetch(
          `${LATEST_URL}?app_id=${appId}&base=${baseCurrency}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch rates: ${res.status}`);
        }
        const data: { rates: Rates; base: string } = await res.json();
        const subset: Rates = {
          KES: data.rates[CurrencyCode.KES],
          NGN: data.rates[CurrencyCode.NGN],
          TZS: data.rates[CurrencyCode.TZS],
          UGX: data.rates[CurrencyCode.UGX],
        };
        setRates(subset);
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
    return Number((amountUsd * rate).toFixed(2));
  };

  return { rates, loading, error, convert };
};

export default useExchangeRates;
