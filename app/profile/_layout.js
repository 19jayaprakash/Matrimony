// app/(profile)/_layout.tsx (Profile section layout)

import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    
    <Stack screenOptions={{ headerShown: false ,gestureEnabled:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile/BasicDetails" options={{ title: "Basic Details" }} />
      <Stack.Screen name="profile/PartnerPreference" options={{ title: "Partner Preferences" }} />

      {/* <Stack.Screen name="FamilyDetails/index" options={{ title: "Family Details" }} />
      <Stack.Screen name="ProfessionalDetails/index" options={{ title: "Professional Details" }} />
      <Stack.Screen name="UserInterest/index" options={{ title: "Interests" }} />
      <Stack.Screen name="UserPreference/index" options={{ title: "Preferences" }} /> */}
    </Stack>
  );
}