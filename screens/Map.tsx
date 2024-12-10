import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const region = {
    latitude: 40.697594, 
    longitude: -73.916976,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.map} initialRegion={region}></MapView>;
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
