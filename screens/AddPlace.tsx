import { StyleSheet } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

import { Place } from "../models/Place";
import { insertPlace } from "../util/database";

interface Props {
  navigation: any;
}

const AddPlace = ({ navigation }: Props) => {
  const createPlaceHandler = async (place: Place) => {
    console.log("adding place ", place);
    const newPlace = await insertPlace(place);
    console.log("added ", newPlace);
    navigation.navigate("AllPlaces");
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
