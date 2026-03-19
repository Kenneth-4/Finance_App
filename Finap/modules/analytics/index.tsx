import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function AnalyticsModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 16, color: '#8E8E93' }}>Financial Insights and Reporting</Text>
      </View>
    </View>
  );
}
