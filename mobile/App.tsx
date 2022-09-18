import { StatusBar } from "expo-status-bar";

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import { Background } from "./src/components/Background";
//import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const styles = StyleSheet.create({
    container: { flex: 1 },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <StatusBar
          style="auto"
          backgroundColor="transparent"
          translucent
        ></StatusBar>
        {fontsLoaded ? <Routes /> : <Loading />}
      </Background>
    </SafeAreaView>
  );
}
