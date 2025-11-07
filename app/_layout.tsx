import { Tabs } from 'expo-router';
import Header from '../components/Header/Header';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/theme';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          paddingTop: 8,
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
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
        name='send/index'
        options={{
          title: 'Send Transaction',
          tabBarLabel: 'Send',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='send-sharp' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
