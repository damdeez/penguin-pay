import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/theme';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  navigation: { goBack: () => void };
  options: { title?: string };
  route: { name: string };
  back?: { title?: string; href?: string } | undefined;
}

const Header = ({ navigation, options, route, back }: HeaderProps) => {
  const title = options.title ?? route.name;
  const showBack = route.name === 'send/index' || !!back;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
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
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  back: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlignVertical: 'center',
  },
});

export default Header;
