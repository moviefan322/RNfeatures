import { View, Text, StyleSheet } from "react-native";

const PlaceDetails = () => {
  return (
    <View style={styles.container}>
      <Text>PlaceDetails</Text>
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
