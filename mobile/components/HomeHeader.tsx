import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { AddLotteryNavigationProp } from '../types';
import { colors } from '../colors';
import {
  useLotteriesSortingContext,
  LotteryListSortingOptions,
} from '../contexts/LotteriesSortingContext';

interface HomeHeaderProps {
  selectedLotteries: string[];
}

const LotteriesSortingButton = () => {
  const { selectedSorting, switchSorting } = useLotteriesSortingContext();

  const iconName =
    selectedSorting === LotteryListSortingOptions.Ascending
      ? 'arrowup'
      : 'arrowdown';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.sortingButton}
      onPress={switchSorting}
    >
      <Text style={styles.sortingButtonText}>Prices</Text>
      <AntDesign name={iconName} size={16} color="black" />
    </TouchableOpacity>
  );
};

export const HomeHeader = ({ selectedLotteries }: HomeHeaderProps) => {
  const navigation = useNavigation<AddLotteryNavigationProp>();

  const backgroundColor =
    selectedLotteries.length === 0 ? colors.grey : colors.secondary;

  return (
    <View style={styles.header}>
      <LotteriesSortingButton />
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigation.navigate('Register', { selectedLotteries })}
        style={[styles.button, { backgroundColor }]}
        disabled={selectedLotteries.length === 0}
      >
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    minHeight: 48,
    width: '100%',
  },
  button: {
    position: 'absolute',
    right: 16,
    top: 8,
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  text: {
    color: colors.buttonSecondary,
  },
  sortingButton: {
    position: 'absolute',
    left: 16,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortingButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 3,
  },
});
