import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

import PlacesList from "../components/Places/PlacesList";
import { Place } from "../models/Place";
import { fetchPlaces } from "../util/database";

interface AllPlacesProps {
  route: RouteProp<RootStackParamList, "AllPlaces">;
  navigation: any;
}

const AllPlaces = ({ route }: AllPlacesProps) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      await fetchPlaces();
    };
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((prev) => {
      //   if (route.params?.place) {
      //     return [...prev, route.params.place];
      //   }
      //   return prev;
      // });
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
