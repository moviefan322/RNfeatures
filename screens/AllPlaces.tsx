import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

import PlacesList from "../components/Places/PlacesList";
import { Place } from "../models/Place";

interface AllPlacesProps {
  route: RouteProp<RootStackParamList, "AllPlaces">;
}

const AllPlaces = ({ route }: AllPlacesProps) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params?.place) {
      setLoadedPlaces((prev) => {
        if (route.params?.place) {
          return [...prev, route.params.place];
        }
        return prev;
      });
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
