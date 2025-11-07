import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { CountryMeta } from '../CountrySelect/CountrySelect.helpers';

interface PhoneFieldProps {
  country: CountryMeta;
  value: string; // only digits after prefix
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
          keyboardType="number-pad"
          placeholder={`digits (${country.digitsAfterPrefix})`}
          placeholderTextColor="#9ca3af"
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
    color: '#374151',
    marginBottom: 6,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  prefix: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingRight: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  error: {
    marginTop: 6,
    color: '#ef4444',
    fontSize: 12,
  },
});

export default PhoneField;

