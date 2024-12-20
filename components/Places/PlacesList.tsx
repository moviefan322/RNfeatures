import { View, Text, StyleSheet, FlatList } from "react-native";
import type Place from "../../types/place";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

interface PlacesListProps {
  places: Place[] | [];
}

const PlacesList = ({ places }: PlacesListProps) => {
  const onSelect = () => {
    console.log("Place selected");
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelect} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
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
    fontSize: 16,
    color: Colors.primary200,
  },
});
