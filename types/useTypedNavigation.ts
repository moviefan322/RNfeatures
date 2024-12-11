import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const useTypedNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

export const useTypedRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
