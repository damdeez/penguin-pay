import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface TextFieldProps extends Pick<TextInputProps, 'value' | 'onChangeText' | 'keyboardType' | 'placeholder' | 'autoCapitalize' | 'onBlur' | 'returnKeyType' | 'onSubmitEditing' | 'maxLength'> {
  label: string;
  error?: string;
}

const TextField = ({ label, error, ...inputProps }: TextFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#9ca3af"
        {...inputProps}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    marginTop: 6,
    color: '#ef4444',
    fontSize: 12,
  },
});

export default TextField;

