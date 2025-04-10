import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { googleAuthConfig } from "./firebase";
import { handleGoogleAuth } from "./authService";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const router = useRouter();
  const [request, response, promptAsync] =
    Google.useAuthRequest(googleAuthConfig);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleAuth(id_token).then((result) => {
        if (result.success) {
          Alert.alert("Success", "Google login successful!");
          router.push("/home");
        } else {
          Alert.alert("Error", "Google login failed");
        }
      });
    }
  }, [response]);

  return { promptAsync, request };
};
