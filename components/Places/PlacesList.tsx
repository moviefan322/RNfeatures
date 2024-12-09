import { View, Text, StyleSheet, FlatList } from "react-native";
import type Place from "../../types/place";

import PlaceItem from "./PlaceItem";

interface PlacesListProps {
  places: Place[];
}

const PlacesList = ({ places }: PlacesListProps) => {
  const onSelect = () => {
    console.log("Place selected");
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelect} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16
  }
});
