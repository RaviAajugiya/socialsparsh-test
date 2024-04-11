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

  useEffect(() => {
    if (typeof message.data === "string") {
      const { auth, token } = JSON.parse(message.data);
      if (auth === "GoogleLogin") {
        console.log("GoogleLogin");
        GoogleSignin.configure({
          offlineAccess: true,
          forceCodeForRefreshToken: true,
          scopes: [
            // "https://www.googleapis.com/auth/business.manage",
            "email",
            "profile",
            "openid",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ],
          webClientId:
            "340572475372-vjnrvbmqh28enbkd6mvsu7fiqimedd1u.apps.googleusercontent.com",
        });

        GoogleSignin.hasPlayServices()
          .then((hasPlayService) => {
            if (hasPlayService) {
              GoogleSignin.signIn()
                .then((userInfo) => {
                  console.log(userInfo);
                })
                .catch((e) => {
                  console.log("ERROR IS: " + e);
                });
            }
          })
          .catch((e) => {
            console.log("ERROR IS: " + e);
          });
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
