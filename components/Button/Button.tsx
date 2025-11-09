import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import colors from '@/constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button = ({ label, onPress, disabled = false, style }: ButtonProps) => {
  return (
    <Pressable
      accessibilityRole='button'
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.complimentary1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    backgroundColor: colors.borderMuted,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
