import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  navigation: { goBack: () => void };
  options: { title?: string };
  route: { name: string };
  back?: { title?: string; href?: string } | undefined;
}

const Header = ({ navigation, options, route, back }: HeaderProps) => {
  const title = options.title ?? route.name;

  return (
    <View style={styles.container}>
      {back ? (
        <Pressable
          accessibilityRole='button'
          accessibilityLabel='Go back'
          onPress={navigation.goBack}
          style={styles.back}
        >
          <Ionicons name='chevron-back' size={24} color='#111827' />
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({ ios: 54, android: 24, default: 16 }),
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    alignItems: "center",
    justifyContent: "center",
  },
  backPlaceholder: {
    width: 24,
    height: 24,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
});

export default Header;
