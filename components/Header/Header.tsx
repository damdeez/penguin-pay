import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/theme';
import { router } from 'expo-router';

interface HeaderProps {
  navigation: { goBack: () => void };
  options: { title?: string };
  route: { name: string };
  back?: { title?: string; href?: string } | undefined;
}

const Header = ({ navigation, options, route, back }: HeaderProps) => {
  const title = options.title ?? route.name;
  const showBack = route.name === 'send/index' || !!back;

  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          accessibilityRole='button'
          accessibilityLabel='Go back'
          onPress={() => {
            if (back) {
              navigation.goBack();
              return;
            }

            router.navigate('/');
          }}
          style={styles.back}
        >
          <Ionicons name='chevron-back' size={24} color={colors.text} />
        </Pressable>
      ) : null}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({ ios: 64, android: 24, default: 16 }),
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  back: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
});

export default Header;
