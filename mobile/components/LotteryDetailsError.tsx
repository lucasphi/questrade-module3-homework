import { StyleSheet, View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../colors';

interface LotteryDetailsErrorProps {
  message?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export const LotteryDetailsError = ({
  message = 'We were unable to load your lottery...',
  buttonTitle = 'Navigate back',
  onButtonPress,
}: LotteryDetailsErrorProps) => {
  const navigation = useNavigation();
  const handlePress = onButtonPress ?? (() => navigation.goBack());
  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={48} color="black" />
      <Text style={styles.whoopsText}>Whoops...!</Text>
      <Text style={styles.regularText}>Something went wrong!</Text>
      <Text style={styles.regularText}>
        We were unable to load your lottery...
      </Text>
      <View style={styles.button}>
        <Button title={buttonTitle} onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  whoopsText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 10,
  },
  regularText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});
