import React, { useMemo, useState } from 'react';
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [phoneDigits, setPhoneDigits] = useState('');
  const [amountUsd, setAmountUsd] = useState(
    typeof params.amountUsd === 'string' ? params.amountUsd : ''
  );
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

  const nAmount = parseInt(amountUsd || '0', 10);
  const convertedAmount = useMemo<number | null>(() => {
    if (!nAmount || !convert) {
      return null;
    }
    const v = convert(nAmount, country.currency);
    return typeof v === 'number' ? v : null;
  }, [nAmount, convert, country.currency]);


  const handleSend = () => {
    const values: SendFormValues = {
      firstName,
      lastName,
      phoneDigits,
      amountUsd,
    };
    const result = validate(values);
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) {
      return;
    }

    const fullPhone = `${country.phonePrefix}${phoneDigits}`;
    Alert.alert(
      'Sending',
      `Sending ${amountUsd} USD to ${firstName} ${lastName} (${fullPhone}).`,
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

        <TextField
          label='Amount (USD 🇺🇸)'
          value={'$' + amountUsd}
          onChangeText={(t) => {
            const raw = t.startsWith('$') ? t.slice(1) : t;
            if (raw === '') {
              setAmountUsd('');
              return;
            } else if (/^\d+$/.test(raw)) {
              setAmountUsd(raw);
            }
          }}
          keyboardType='number-pad'
          error={errors.amountUsd}
          placeholder='e.g. 10'
          maxLength={7}
        />

        <SummaryBox
          title='Recipient receives'
          amount={convertedAmount}
          currency={country.currency}
          note={ratesError ? 'Using fallback rates. Set EXPO_PUBLIC_OER_APP_ID for live rates.' : null}
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
