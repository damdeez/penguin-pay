import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import CountrySelect from '@/components/CountrySelect/CountrySelect';
import type { CountryMeta } from '@/components/CountrySelect/CountrySelect.helpers';
import { COUNTRIES } from '@/components/CountrySelect/CountrySelect.helpers';
import TextField from '@/components/TextField/TextField';
import PhoneField from '@/components/PhoneField/PhoneField';
import Button from '@/components/Button/Button';
import useExchangeRates from '@/hooks/useExchangeRates';
import { useSendSchema, type SendFormValues } from '@/hooks/useSendValidation';
import colors from '@/constants/theme';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import useHeaderColor from '@/hooks/useHeaderColor';
import SummaryBox from '@/components/SummaryBox/SummaryBox';

const Recipient = () => {
  const params = useGlobalSearchParams();
  const amountUsdStr =
    typeof params.amountUsd === 'string'
      ? params.amountUsd
      : Array.isArray(params.amountUsd)
      ? params.amountUsd[0] ?? ''
      : '';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    phoneDigits?: string;
    amountUsd?: string;
  }>({});
  const router = useRouter();

  const {
    convert,
    error: ratesError,
  } = useExchangeRates();
  const { validate } = useSendSchema(country);

  const nAmount = parseInt(amountUsdStr || '0', 10);
  let convertedAmount: number | null = null;
  if (nAmount && convert) {
    const v = convert(nAmount, country.currency);
    if (typeof v === 'number') {
      convertedAmount = v;
    }
  }


  const handleSend = () => {
    const values: SendFormValues = {
      firstName,
      lastName,
      phoneDigits,
      amountUsd: amountUsdStr,
    };
    const result = validate(values);
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) {
      return;
    }

    const fullPhone = `${country.phonePrefix}${phoneDigits}`;
    Alert.alert(
      'Sending',
      `Sending ${amountUsdStr} USD to ${firstName} ${lastName} (${fullPhone}).`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          style: 'destructive',
          onPress: () => {
            router.push('/');
          },
        },
      ]
    );
  };

  useHeaderColor(scrolled ? colors.white : colors.background, colors.text);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrolled(y > 40);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='handled'
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <TextField
          label='Recipient First Name'
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize='words'
          error={errors.firstName}
          placeholder='Jane'
          returnKeyType='next'
        />

        <TextField
          label='Recipient Last Name'
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize='words'
          error={errors.lastName}
          placeholder='Doe'
          returnKeyType='next'
        />

        <CountrySelect
          value={country}
          onChange={(c) => {
            setCountry(c);
            setPhoneDigits('');
          }}
        />

        <PhoneField
          country={country}
          value={phoneDigits}
          onChange={setPhoneDigits}
          error={errors.phoneDigits}
        />

        <SummaryBox
          title={'Recipient receives'}
          amount={convertedAmount}
          currency={country.currency}
          note={
            ratesError
              ? 'Using fallback rates. Set EXPO_PUBLIC_OER_APP_ID for live rates.'
              : `Sending $${amountUsdStr} USD`
          }
        />

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
  
});

export default Recipient;
