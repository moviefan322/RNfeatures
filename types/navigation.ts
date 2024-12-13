import { Place } from "../models/Place";

export interface RootStackParamList {
  AllPlaces?: { place?: Place } ;
  AddPlace?: { lat?: number; lng?: number };
  Map: undefined;
  [key: string]: object | undefined;
}
