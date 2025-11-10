import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '@/constants/theme';
import type { CountryMeta } from '@/components/ui/CountrySelect/CountrySelect.helpers';

interface PhoneFieldProps {
  country: CountryMeta;
  value: string;
  onChange: (digits: string) => void;
  error?: string;
}

const PhoneField = ({ country, value, onChange, error }: PhoneFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient Phone</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <Text style={styles.prefix}>{country.phonePrefix}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(t) => onChange(t.replace(/\D+/g, ''))}
          keyboardType='number-pad'
          placeholder={`digits (${country.digitsAfterPrefix})`}
          placeholderTextColor='#9ca3af'
          maxLength={country.digitsAfterPrefix}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 6,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
  },
  prefix: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingRight: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  error: {
    marginTop: 6,
    color: colors.error,
    fontSize: 12,
  },
});

export default PhoneField;
