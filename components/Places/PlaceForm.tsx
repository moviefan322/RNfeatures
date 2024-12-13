import { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/Place";

interface PlaceFormProps {
  onCreatePlace: (place: Place) => void;
}

interface Location {
  lat: string;
  lng: string;
  address: string;
}

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const changeTitleHandler = (text: string) => {
    setEnteredTitle(text);
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback(
    (lat: string, lng: string, address: string) => {
      setSelectedLocation({ lat, lng, address });
    },
    []
  );

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation!);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onTakeLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
