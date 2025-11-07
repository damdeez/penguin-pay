import { Stack } from 'expo-router';
import Header from '../components/Header/Header';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        contentStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name='index' options={{ title: 'PenguinPay' }} />
      <Stack.Screen name='send/index' options={{ title: 'Send Transaction' }} />
    </Stack>
  );
}
