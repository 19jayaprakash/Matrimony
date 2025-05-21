import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false ,gestureEnabled:false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="CreateAccount" options={{ title: 'Create Account' }} />
    </Stack>
  );
}
