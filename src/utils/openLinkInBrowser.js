import { Linking } from "react-native";

export const openLinkInBrowser = (url) => {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
};
