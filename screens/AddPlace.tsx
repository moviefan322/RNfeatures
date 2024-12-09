import { View, Text, StyleSheet } from "react-native";

const AddPlace = () => {
  return (
    <View style={styles.container}>
      <Text>AddPlace</Text>
    </View>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
