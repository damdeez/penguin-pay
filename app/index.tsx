import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PenguinPay</Text>
      <Link href='/send' style={styles.link}>Go to Send Transaction</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  link: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});
