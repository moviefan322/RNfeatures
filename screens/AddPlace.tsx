import { View, Text, StyleSheet } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = () => {
  return <PlaceForm />;
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
