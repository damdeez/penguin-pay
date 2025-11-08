import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import TextField from '@/components/TextField/TextField';
import Button from '@/components/Button/Button';
import useExchangeRates from '@/hooks/useExchangeRates';
import { useSendAmountSchema } from '@/hooks/useSendAmountValidation';

import colors from '@/constants/theme';
import { useRouter } from 'expo-router';
import CountrySelect from '@/components/CountrySelect/CountrySelect';
import {
  COUNTRIES,
  CountryMeta,
} from '@/components/CountrySelect/CountrySelect.helpers';
import useHeaderColor from '@/hooks/useHeaderColor';
import SummaryBox from '@/components/SummaryBox/SummaryBox';
import { AntDesign } from '@expo/vector-icons';

const Send = () => {
  const [amountUsd, setAmountUsd] = useState('');
  const [country, setCountry] = useState<CountryMeta>(COUNTRIES[0]);
  const [scrolled, setScrolled] = useState(false);

  const [errors, setErrors] = useState<{ amountUsd?: string }>({});
  const router = useRouter();
  const spinAnim = useRef(new Animated.Value(0)).current;

  const {
    convert,
    loading: ratesLoading,
    error: ratesError,
  } = useExchangeRates();
  const { validate } = useSendAmountSchema();

  const nAmount = parseInt(amountUsd || '0', 10);
  let convertedAmount: number | null = null;
  if (nAmount && convert) {
    const v = convert(nAmount, country.currency);
    if (typeof v === 'number') {
      convertedAmount = v;
    }
  }

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

  // Spinning loading icon animation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => {
      loop.stop();
      spinAnim.setValue(0);
    };
  }, [spinAnim]);
  
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const spinnerStyle = { transform: [{ rotate: spin }] };

  if (ratesLoading) {
    return (
      <View style={styles.loading}>
        <Animated.View style={spinnerStyle}>
          <AntDesign name='loading' size={24} color={colors.text} />
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.primaryHero}
        keyboardShouldPersistTaps='handled'
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <SummaryBox
          variant='primary'
          title='Recipient receives'
          amount={convertedAmount}
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  primaryHero: {
    backgroundColor: colors.primary,
  },
  amountArea: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.white,
    padding: 16,
  },
});

export default Send;
