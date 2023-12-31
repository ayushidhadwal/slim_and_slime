import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const pickImage = async ({ aspect = [2, 2] }) => {
  const { canAskAgain, status } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!canAskAgain && status === "denied") {
    Alert.alert(
      "Permission denied",
      "Storage permission is denied. Please allow storage permission to update your profile picture.",
      [
        { text: "Cancel" },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }

  if (status === "granted") {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect,
      quality: 0.5,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const fileExtension = uri.substr(uri.lastIndexOf(".") + 1);
      return {
        uri: uri,
        name: `UploadedUserProfile.${fileExtension}`,
        type: `image/${fileExtension}`,
      };
    }
  }
};
