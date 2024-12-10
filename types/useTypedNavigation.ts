import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const useTypedNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
