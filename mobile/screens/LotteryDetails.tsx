import React, { ReactElement } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Lottery, LotteryDetailsRouteProp } from '../types';
import { useLotteryDetails } from '../hooks/useLotteryDetails';
import Loader from '../components/Loader';

interface LotteryDetailsDataProviderProps {
  children: (lotteryDetails: Lottery) => ReactElement;
  lotteryId: string;
}

const LotteryDetailsDataProvider = ({
  children,
  lotteryId,
}: LotteryDetailsDataProviderProps) => {
  const { data, loading } = useLotteryDetails(lotteryId);

  if (loading) return <Loader />;
  return data ? children(data) : null;
};

const renderTextRow = (title: string, value: string): ReactElement => {
  const prefix = `${title}: `;
  return (
    <View style={styles.textRow}>
      <Text>
        {prefix}
        <Text style={styles.boldText}>{value}</Text>
      </Text>
    </View>
  );
};

interface LotteryDetailsViewProps {
  lottery: Lottery;
}

const LotteryDetailsView = ({ lottery }: LotteryDetailsViewProps) => {
  const { id, name, prize, status, type } = lottery;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{name}</Text>
      {renderTextRow('ID', id)}
      {renderTextRow('Price', prize)}
      {renderTextRow('Status', status)}
      {renderTextRow('Type', type)}
    </View>
  );
};

export const LotteryDetails = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <LotteryDetailsDataProvider lotteryId={route.params.id}>
      {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
    </LotteryDetailsDataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  textRow: {
    marginBottom: 12,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
