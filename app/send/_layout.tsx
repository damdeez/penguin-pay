import { Stack } from 'expo-router';
import Header from '@/components/Header/Header';
import colors from '@/constants/theme';

export default function SendLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name='index' options={{ title: 'Amount to Send' }} />
      <Stack.Screen name='recipient/index' options={{ title: 'Recipient' }} />
      <Stack.Screen name='confirm/index' options={{ title: 'Confirm' }} />
    </Stack>
  );
}
