import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import colors from '@/constants/theme';
import { COUNTRIES } from '@/components/CountrySelect/CountrySelect.helpers';
import Button from '@/components/Button/Button';
import { Ionicons } from '@expo/vector-icons';

const Confirm = () => {
  const params = useLocalSearchParams<{
    firstName?: string;
    lastName?: string;
    phoneDigits?: string;
    amountUsd?: string;
    countryCode?: string;
    convertedAmount?: string;
  }>();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const country =
    COUNTRIES.find((x) => x.code === params.countryCode) ?? COUNTRIES[0];

  const firstName = params.firstName ?? '';
  const lastName = params.lastName ?? '';
  const phoneDigits = params.phoneDigits ?? '';
  const amountUsd = params.amountUsd ?? '';
  const convertedAmount = params.convertedAmount ?? '';
  const fullPhone = `${country.phonePrefix}${phoneDigits}`;

  useEffect(() => {
    if (!confirming) {
      return;
    }
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setTimeout(() => router.replace('/'), 1000);
      }
    });
  }, [confirming, opacity, router, scale]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Transfer</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Recipient</Text>
          <Text style={styles.value}>
            {firstName} {lastName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{fullPhone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount (USD)</Text>
          <Text style={styles.value}>${amountUsd}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Recipient Receives</Text>
          <Text style={styles.value}>
            {convertedAmount} {country.currency}
          </Text>
        </View>
      </View>

      <Button label='Confirm' onPress={() => setConfirming(true)} />

      {confirming ? (
        <View style={styles.overlay} pointerEvents='none'>
          <Animated.View
            style={[styles.success, { transform: [{ scale }], opacity }]}
          >
            <Ionicons
              name='checkmark-circle'
              size={72}
              color={colors.primary}
            />
            <Text style={styles.successText}>Sent!</Text>
          </Animated.View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    gap: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.mutedText,
  },
  value: {
    color: colors.text,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  successText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});

export default Confirm;
