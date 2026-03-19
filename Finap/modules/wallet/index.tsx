import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function WalletModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 16, color: '#8E8E93' }}>Your Cards and Payment Methods</Text>
      </View>
    </View>
  );
}
