import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function SettingsModule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 16, color: '#8E8E93' }}>App Preferences and Security</Text>
      </View>
    </View>
  );
}
