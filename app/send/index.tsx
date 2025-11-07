import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CountrySelect from '../../components/CountrySelect/CountrySelect';
import type { CountryMeta } from '../../components/CountrySelect/CountrySelect.helpers';
import { COUNTRIES } from '../../components/CountrySelect/CountrySelect.helpers';
import TextField from '../../components/TextField/TextField';
import PhoneField from '../../components/PhoneField/PhoneField';
import Button from '../../components/Button/Button';
import useExchangeRates from '../../hooks/useExchangeRates';
import { useSendSchema, type SendFormValues } from '../../hooks/useSendValidation';

const formatMoney = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  } catch {
    // Fallback when currency isn't supported in Intl on some platforms
    return `${value.toFixed(2)} ${currency}`;
  }
};

// Validation is handled by Zod schema in hooks/useSendValidation

const Send = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [amountUsd, setAmountUsd] = useState('');

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phoneDigits?: string; amountUsd?: string }>({});

  const { convert, loading: ratesLoading, error: ratesError } = useExchangeRates();
  const { validate } = useSendSchema(country);

  const converted = useMemo(() => {
    const n = parseInt(amountUsd || '0', 10);
    if (!n || !convert) return null;
    const val = convert(n, country.currency);
    return typeof val === 'number' ? val : null;
  }, [amountUsd, country.currency, convert]);

  const handleSend = () => {
    const values: SendFormValues = { firstName, lastName, phoneDigits, amountUsd };
    const result = validate(values);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) return;

    const fullPhone = `${country.phonePrefix}${phoneDigits}`;
    Alert.alert('Sending', `Sending ${amountUsd} USD to ${firstName} ${lastName} (${fullPhone}).`);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Send Transaction</Text>

        <TextField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          error={errors.firstName}
          placeholder="Jane"
          returnKeyType="next"
        />

        <TextField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
          error={errors.lastName}
          placeholder="Doe"
          returnKeyType="next"
        />

        <CountrySelect value={country} onChange={(c) => { setCountry(c); setPhoneDigits(''); }} />

        <PhoneField
          country={country}
          value={phoneDigits}
          onChange={setPhoneDigits}
          error={errors.phoneDigits}
        />

        <TextField
          label="Amount (USD)"
          value={amountUsd}
          onChangeText={(t) => setAmountUsd(t.replace(/\D+/g, ''))}
          keyboardType="number-pad"
          error={errors.amountUsd}
          placeholder="e.g. 10"
          maxLength={7}
        />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Recipient receives</Text>
          {ratesLoading ? (
            <Text style={styles.summaryValue}>Loading rates…</Text>
          ) : converted != null ? (
            <Text style={styles.summaryValue}>{formatMoney(converted, country.currency)}</Text>
          ) : (
            <Text style={styles.summaryValue}>—</Text>
          )}
          {ratesError ? <Text style={styles.ratesNote}>Using fallback rates. Set EXPO_PUBLIC_OER_APP_ID for live rates.</Text> : null}
        </View>

        <Button label="Send" onPress={handleSend} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  ratesNote: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
  },
});

export default Send;
