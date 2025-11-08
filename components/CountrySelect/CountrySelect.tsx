import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/theme';
import { COUNTRIES, CountryMeta } from '@/components/CountrySelect/CountrySelect.helpers';
import { Ionicons } from '@expo/vector-icons';

interface CountrySelectProps {
  value: CountryMeta;
  onChange: (country: CountryMeta) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const selectedLabel = `${value.name} (${value.currency})`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient Country</Text>
      <Pressable
        accessibilityRole='button'
        onPress={() => setOpen(true)}
        style={styles.select}
      >
        <Text style={styles.selectText}>{selectedLabel}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={24} color={colors.text} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType='none'
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.backdrop}>
          <View
            style={[
              styles.sheet,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Pressable
              accessibilityRole='button'
              onPress={() => setOpen(false)}
              style={styles.handle}
            />
            <Text style={styles.sheetTitle}>Select country</Text>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>
                    {item.name} ({item.currency})
                  </Text>
                  <Text style={styles.optionSub}>{item.phonePrefix}</Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setOpen(false)} style={styles.close}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    padding: 12,
    boxShadow: '0 0 12px 4px rgba(0, 0, 0, 0.2)',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderMuted,
    marginBottom: 16,
    marginTop: 4,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMuted,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  optionSub: {
    fontSize: 12,
    color: colors.mutedText,
  },
  close: {
    alignSelf: 'center',
    paddingVertical: 16,
  },
  closeText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CountrySelect;
