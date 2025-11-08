import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import useExchangeRates from '../../hooks/useExchangeRates';
import { useSendAmountSchema } from '../../hooks/useSendAmountValidation';

import colors from '../../constants/theme';
import { useRouter } from 'expo-router';
import CountrySelect from '../CountrySelect/CountrySelect';
import { COUNTRIES, CountryMeta } from '../CountrySelect/CountrySelect.helpers';
import useHeaderColor from '../../hooks/useHeaderColor';
import SummaryBox from '../SummaryBox/SummaryBox';

const Send = () => {
  const [amountUsd, setAmountUsd] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [scrolled, setScrolled] = useState(false);

  const [errors, setErrors] = useState<{ amountUsd?: string }>({});
  const router = useRouter();

  const {
    convert,
    loading: ratesLoading,
    error: ratesError,
  } = useExchangeRates();
  const { validate } = useSendAmountSchema();

  const nAmount = parseInt(amountUsd || '0', 10);
  const converted = useMemo<number | null>(() => {
    if (!nAmount || !convert) {
      return null;
    }
    const v = convert(nAmount, country.currency);
    return typeof v === 'number' ? v : null;
  }, [nAmount, convert, country.currency]);

  const handleNext = () => {
    const result = validate({ amountUsd });
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      return;
    }
    router.push({
      pathname: '/send/recipient',
      params: { amountUsd },
    });
  };

  const actionColor = colors.primary;

  useHeaderColor(
    scrolled ? colors.background : actionColor,
    scrolled ? colors.text : colors.white
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrolled(y > 40);
  };

  if (ratesLoading) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ backgroundColor: actionColor }}
        keyboardShouldPersistTaps='handled'
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <SummaryBox
          variant='primary'
          title='Recipient receives'
          amount={converted}
          currency={country.currency}
          note={
            ratesError
              ? 'Using fallback rates. Set EXPO_PUBLIC_OER_APP_ID for live rates.'
              : null
          }
        />
        <View style={styles.amountArea}>
          <CountrySelect
            value={country}
            onChange={(c) => {
              setCountry(c);
            }}
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

          <Button label='Next' onPress={handleNext} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  amountArea: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.white,
    // Top shadow (iOS uses negative height to cast upward)
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // // Android shadow (cannot cast upward; subtle elevation for depth)
    // elevation: 6,
    padding: 16,
  },
});

export default Send;
