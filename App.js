import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function App() {
  const webViewRef = useRef(null);
  const [message, setMessage] = useState({});
  const [info, setInfo] = useState();

  console.log("info", info);

  useEffect(() => {
    if (typeof message.data === "string") {
      const { auth, token } = JSON.parse(message.data);
      if (auth === "GoogleLogin") {
        GoogleSignin.configure();
        GoogleSignin.hasPlayServices();
        const userInfo = GoogleSignin.signIn();
        setInfo(userInfo);
      }
    }
  }, [message]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.screen, { display: "flex" }]}>
        <WebView
          source={{ uri: "https://app.socialsparsh.com" }}
          ref={webViewRef}
          onLoadEnd={(e) => {
            console.log("end");
            webViewRef.current.injectJavaScript("window.isNative = true;");
          }}
          javaScriptEnabledAndroid={true}
          javaScriptCanOpenWindowsAutomatically={true}
          allowsBackForwardNavigationGestures={true}
          onMessage={(event) => {
            setMessage(event.nativeEvent);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gif: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "black",
  },
  screen: {
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    flex: 1,
  },
});
