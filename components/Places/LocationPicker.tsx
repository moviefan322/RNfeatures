import { useEffect, useState } from "react";
import { Alert, View, Image, Text, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getAddress } from "../../util/location";
import { useRoute, RouteProp, useIsFocused } from "@react-navigation/native";
import { useTypedNavigation } from "../../types/useTypedNavigation";
import { RootStackParamList } from "../../types/navigation";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

interface LocationPickerProps {
  onTakeLocation: (lat: string, lng: string, address: string) => void;
}

const LocationPicker = ({ onTakeLocation }: LocationPickerProps) => {
  const [pickedLocation, setPickedLocation] = useState({
    lat: "0",
    lng: "0",
  });
  const isFocused = useIsFocused();

  const navigation = useTypedNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setPickedLocation({
        lat: mapPickedLocation.lat!.toString(),
        lng: mapPickedLocation.lng!.toString(),
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onTakeLocation(
          pickedLocation.lat,
          pickedLocation.lng,
          address,
        );
      }
    };
    handleLocation();
  }, [pickedLocation, onTakeLocation]);

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
      <View style={styles.mapPreview}>{locationPreview}</View>
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
