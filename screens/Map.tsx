import { View, Text, StyleSheet } from "react-native";

const Map = () => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
