import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" options={{ title: 'Tab' }} />
    </Stack>
  );
}
