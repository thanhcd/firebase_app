import { Slot, SplashScreen, Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // console.log('Fonts are loaded!');
      SplashScreen.hideAsync();
    } else {
      // console.log('Fonts are still loading...');
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <Slot />
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
    {/* Điều hướng đến /signIn sau khi thay đổi tệp */}
    <Stack.Screen name="signIn" />
  </Stack>
  );
}
