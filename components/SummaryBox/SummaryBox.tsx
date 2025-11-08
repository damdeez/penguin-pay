import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/theme';
import { formatMoney } from './SummaryBox.helpers';

interface SummaryBoxProps {
  title?: string;
  amount?: number | null;
  currency?: string;
  fallbackText?: string;
  note?: string | null;
  variant?: 'light' | 'primary';
}

const SummaryBox = ({
  title = 'Recipient receives',
  amount = null,
  currency,
  fallbackText = '—',
  note,
  variant = 'light',
}: SummaryBoxProps) => {
  const primary = variant === 'primary';

  return (
    <View style={primary ? styles.summaryBoxPrimary : styles.summaryBox}>
      <Text style={primary ? styles.summaryTitlePrimary : styles.summaryTitle}>
        {title}
      </Text>
      {amount != null && currency ? (
        <Text
          style={primary ? styles.summaryValuePrimary : styles.summaryValue}
        >
          {formatMoney(amount, currency)}
        </Text>
      ) : (
        <Text
          style={primary ? styles.summaryValuePrimary : styles.summaryValue}
        >
          {fallbackText}
        </Text>
      )}
      {note ? (
        <Text style={primary ? styles.ratesNotePrimary : styles.ratesNote}>
          {note}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryBox: {
    borderWidth: 1,
    borderColor: colors.borderMuted,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 4,
    margin: 16,
    marginBottom: 0,
  },
  summaryBoxPrimary: {
    backgroundColor: colors.primary,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 4,
  },
  summaryTitlePrimary: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  summaryValuePrimary: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
  },
  ratesNote: {
    marginTop: 6,
    fontSize: 12,
    color: colors.mutedText,
  },
  ratesNotePrimary: {
    marginTop: 6,
    fontSize: 12,
    color: colors.white,
    opacity: 0.9,
  },
});

export default SummaryBox;
