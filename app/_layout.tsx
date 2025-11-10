import { Tabs } from 'expo-router';
import Header from '@/components/Header/Header';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/theme';
import TabBar from '@/components/TabBar/TabBar';
import HeaderAppearanceProvider from '@/providers/HeaderAppearanceProvider';

export default function RootLayout() {
  return (
    <HeaderAppearanceProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          sceneStyle: { backgroundColor: colors.background },
        }}
        tabBar={(props) => (
          <TabBar
            state={props.state}
            descriptors={props.descriptors}
            navigation={props.navigation}
          />
        )}
      >
        <Tabs.Screen
          name='index'
          options={{
            headerShown: false,
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home-sharp' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='send'
          options={{
            headerShown: false,
            title: 'Send Transaction',
            tabBarLabel: 'Send',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='send-sharp' color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </HeaderAppearanceProvider>
  );
}
