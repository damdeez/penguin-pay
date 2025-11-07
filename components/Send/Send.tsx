import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CountrySelect from '../CountrySelect/CountrySelect';
import type { CountryMeta } from '../CountrySelect/CountrySelect.helpers';
import { COUNTRIES } from '../CountrySelect/CountrySelect.helpers';
import TextField from '../TextField/TextField';
import PhoneField from '../PhoneField/PhoneField';
import Button from '../Button/Button';
import useExchangeRates from '../../hooks/useExchangeRates';
import { useSendSchema, type SendFormValues } from '../../hooks/useSendValidation';
import colors from '../../constants/theme';

const formatMoney = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
};

const Send = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [amountUsd, setAmountUsd] = useState('');

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phoneDigits?: string; amountUsd?: string }>({});

  const { convert, loading: ratesLoading, error: ratesError } = useExchangeRates();
  const { validate } = useSendSchema(country);

  const nAmount = parseInt(amountUsd || '0', 10);
  const converted = (() => {
    if (!nAmount || !convert) {
      return null;
    }
    const val = convert(nAmount, country.currency);
    return typeof val === 'number' ? val : null;
  })();

  const handleSend = () => {
    const values: SendFormValues = { firstName, lastName, phoneDigits, amountUsd };
    const result = validate(values);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      return;
    }

    const fullPhone = `${country.phonePrefix}${phoneDigits}`;
    Alert.alert('Sending', `Sending ${amountUsd} USD to ${firstName} ${lastName} (${fullPhone}).`);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        <TextField
          label='First Name'
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize='words'
          error={errors.firstName}
          placeholder='Jane'
          returnKeyType='next'
        />

        <TextField
          label='Last Name'
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize='words'
          error={errors.lastName}
          placeholder='Doe'
          returnKeyType='next'
        />

        <CountrySelect value={country} onChange={(c) => { setCountry(c); setPhoneDigits(''); }} />

        <PhoneField country={country} value={phoneDigits} onChange={setPhoneDigits} error={errors.phoneDigits} />

        <TextField
          label='Amount (USD)'
          value={amountUsd}
          onChangeText={(t) => setAmountUsd(t.replace(/\D+/g, ''))}
          keyboardType='number-pad'
          error={errors.amountUsd}
          placeholder='e.g. 10'
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

        <Button label='Send' onPress={handleSend} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.text,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: colors.borderMuted,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  ratesNote: {
    marginTop: 6,
    fontSize: 12,
    color: colors.mutedText,
  },
});

export default Send;
