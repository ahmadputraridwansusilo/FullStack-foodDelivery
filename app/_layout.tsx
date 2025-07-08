import useAuthStore from "@/store/auth.store";
import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

Sentry.init({
  dsn: 'https://ff0e734849cb276fdf1586a7a7f239b8@o4509627374764032.ingest.us.sentry.io/4509627388657664',
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default Sentry.wrap(function RootLayout() {
  // 1. SEMUA HOOKS HARUS DI AWAL - TIDAK BOLEH ADA CONDITIONAL
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Bold': require("../assets/fonts/Quicksand-Bold.ttf"),
    'Quicksand-Medium': require("../assets/fonts/Quicksand-Medium.ttf"),
    'Quicksand-Regular': require("../assets/fonts/Quicksand-Regular.ttf"),
    'Quicksand-SemiBold': require("../assets/fonts/Quicksand-SemiBold.ttf"),
    'Quicksand-Light': require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    // Hanya fetch jika fonts sudah loaded
    if (fontsLoaded) {
      fetchAuthenticatedUser();
    }
  }, [fontsLoaded, fetchAuthenticatedUser]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
});