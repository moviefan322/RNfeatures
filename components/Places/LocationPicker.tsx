import { useState } from "react";
import { Alert, View, Image, Text, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../../util/location";
import { useTypedNavigation } from "../../types/useTypedNavigation";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState({
    lat: "0",
    lng: "0",
  });
  const navigation = useTypedNavigation();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation!.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation!.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this feature.",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude.toString(),
      lng: location.coords.longitude.toString(),
    });
    console.log(location);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = (
    <Text style={styles.noLoc}>No location chosen yet!</Text>
  );

  if (pickedLocation.lat !== "0") {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>
      {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  noLoc: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    justifyContent: "center",
  },
});
