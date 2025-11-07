import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { COUNTRIES, CountryMeta } from './CountrySelect.helpers';

interface CountrySelectProps {
  value: CountryMeta;
  onChange: (country: CountryMeta) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = useMemo(() => `${value.name} (${value.currency})`, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient Country</Text>
      <Pressable
        accessibilityRole='button'
        onPress={() => setOpen(true)}
        style={styles.select}
      >
        <Text style={styles.selectText}>{selectedLabel}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
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
                  <Text style={styles.optionText}>{item.name} ({item.currency})</Text>
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
    color: '#374151',
    marginBottom: 6,
  },
  select: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 16,
    color: '#111827',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
    padding: 12,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  option: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionSub: {
    fontSize: 12,
    color: '#6b7280',
  },
  close: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  closeText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default CountrySelect;
