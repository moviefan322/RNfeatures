import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

interface Props {
  navigation: NavigationProp<any>;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Event {
  nativeEvent: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
}

const Map = ({ navigation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const isPicked = selectedLocation.lat !== 0 && selectedLocation.lng !== 0;

  const region: Region = {
    latitude: 40.697594,
    longitude: -73.916976,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: Event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat,
      lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!isPicked) {
      Alert.alert(
        "No location selected",
        "Please select a location before saving",
        [{ text: "Okay" }]
      );
      return;
    }

    navigation.navigate("AddPlace", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
