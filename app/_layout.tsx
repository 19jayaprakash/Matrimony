import { Stack } from "expo-router";
import { BackgroundMusicProvider, InteractionDetector } from "./BackgroundMusicProvider";
import "./global.css";

export default function RootLayout() {
  const backgroundMusic = require(`@/assets/audio/background.mp3`)
  return (
    <BackgroundMusicProvider musicSource={backgroundMusic}>
      <InteractionDetector>
    <Stack screenOptions={{gestureEnabled:false}}>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="navigation" options={{ headerShown: false}} />
      <Stack.Screen name="screens/ProfileView" options={{ title: "Back" }} />
            <Stack.Screen name="screens/ScheduleMeetScreen" options={{ title: "Back" }} />

    </Stack>
    </InteractionDetector>
    </BackgroundMusicProvider>
  );
}
