import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import colors from '@/constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'solid' | 'outline';
}

const Button = ({
  label,
  onPress,
  disabled = false,
  style,
  variant = 'solid',
}: ButtonProps) => {
  return (
    <Pressable
      accessibilityRole='button'
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
        variant === 'solid' ? styles.solid : null,
        variant === 'outline' ? styles.outline : null,
        style,
      ]}
    >
      <Text style={variant === 'outline' ? styles.outlineLabel : styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
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
  outlineLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  solid: {
    backgroundColor: colors.complimentary1,
    borderColor: colors.complimentary1,
    borderWidth: 1.5,
    borderStyle: 'solid',
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.text,
    borderWidth: 1.5,
    borderStyle: 'solid',
  },
});

export default Button;
