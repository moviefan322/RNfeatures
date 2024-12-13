import { View, Text, StyleSheet } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

import { Place } from "../models/Place";

interface Props {
  navigation: any;
}

const AddPlace = ({ navigation }: Props) => {
  const createPlaceHandler = (place: Place) => {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
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
