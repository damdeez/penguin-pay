import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import useHeaderAppearance from '@/hooks/useHeaderAppearance';

type AppHeaderProps = BottomTabHeaderProps | NativeStackHeaderProps;

const Header = (props: AppHeaderProps) => {
  const { navigation, options, route } = props;
  const back = 'back' in props ? props.back : undefined;
  const title = options.title ?? route.name;
  const insets = useSafeAreaInsets();
  const { backgroundColor, tintColor } = useHeaderAppearance();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor }]}>
      {!!back ? (
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
          <Ionicons name='chevron-back' size={24} color={tintColor} />
        </Pressable>
      ) : null}
      <Text numberOfLines={1} style={[styles.title, { color: tintColor }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingHorizontal: 16,
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
    textAlignVertical: 'center',
  },
});

export default Header;
