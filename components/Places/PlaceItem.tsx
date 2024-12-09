import { View, Image, Text, StyleSheet, Pressable } from "react-native";

import type Place from "../../types/place";

interface PlaceItemProps {
  place: Place;
  onSelect: () => void;
}

const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
  return (
    <Pressable style={styles.container} onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
