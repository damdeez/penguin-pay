import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/theme';
import { router } from 'expo-router';

type LabelPosition = 'beside-icon' | 'below-icon';

interface TabBarEvent {
  type: 'tabPress' | 'tabLongPress';
  target?: string;
  canPreventDefault?: boolean;
}

interface TabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  descriptors: Record<
    string,
    {
      options: {
        title?: string;
        tabBarIcon?: (p: {
          focused: boolean;
          color: string;
          size: number;
        }) => React.ReactNode;
        tabBarLabel?:
          | string
          | ((p: {
              focused: boolean;
              color: string;
              position: LabelPosition;
              children: string;
            }) => React.ReactNode);
      };
    }
  >;
  navigation: {
    emit: (e: TabBarEvent) => void;
    navigate: (name: string) => void;
  };
}

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom - 8, 8) },
      ]}
    >
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title || route.name;
        const color = focused ? colors.primary : colors.mutedText;
        
        const onPress = () => {
          navigation.emit({ type: 'tabPress', target: route.key });
          if (route.name === 'send') {
            router.navigate('/send');

            return;
          } else if (!focused) {
            navigation.navigate(route.name);
          }
        };
        
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[styles.item, focused && styles.itemActive]}
          >
            <View
              style={[
                styles.activeBar,
                focused && { backgroundColor: colors.primary },
              ]}
            />
            <View style={styles.inner}>
              {options.tabBarIcon
                ? options.tabBarIcon({ focused, color, size: 22 })
                : null}
              {typeof options.tabBarLabel === 'function' ? (
                options.tabBarLabel({
                  focused,
                  color,
                  position: 'below-icon',
                  children: String(label),
                })
              ) : (
                <Text style={[styles.label, { color }]}>{label}</Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderMuted,
    backgroundColor: colors.background,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  itemActive: {},
  activeBar: {
    height: 3,
    width: '100%',
    backgroundColor: 'transparent',
  },
  inner: {
    paddingVertical: 8,
    gap: 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
});

export default TabBar;
