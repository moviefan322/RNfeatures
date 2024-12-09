import { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");

  const changeTitleHandler = (text: string) => {
    setEnteredTitle(text);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
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
