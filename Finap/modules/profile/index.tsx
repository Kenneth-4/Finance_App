import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subLabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
  labelStyle?: any;
}

const SettingRow = ({ icon, label, subLabel, rightElement, onPress, isLast, labelStyle }: SettingRowProps) => (
  <TouchableOpacity 
    style={[styles.row, isLast && styles.lastRow]} 
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.iconBg}>
      <Ionicons name={icon} size={22} color="#0022FF" />
    </View>
    <View style={styles.rowContent}>
      <Text style={[styles.rowLabel, labelStyle]}>{label}</Text>
      {subLabel && <Text style={styles.rowSubLabel}>{subLabel}</Text>}
    </View>
    {rightElement || <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />}
  </TouchableOpacity>
);

export default function ProfileModule() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' }} 
              style={styles.avatar} 
            />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={16} color="white" />
            </View>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.j@expensetracker.io</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile Details</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.card}>
            <SettingRow 
              icon="cash-outline" 
              label="Currency" 
              subLabel="Change your primary currency" 
              rightElement={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.rightLabel}>USD ($)</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
                </View>
              }
            />
            <SettingRow 
              icon="notifications-outline" 
              label="Notifications" 
              subLabel="Alerts, budget limits, updates" 
              isLast
              rightElement={
                <Switch 
                  value={notifications} 
                  onValueChange={setNotifications}
                  trackColor={{ false: '#EEF0FF', true: '#0022FF' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <View style={styles.card}>
            <SettingRow 
              icon="happy-outline" 
              label="Face ID / Touch ID" 
              subLabel="Biometric authentication" 
              rightElement={
                <Switch 
                  value={faceId} 
                  onValueChange={setFaceId}
                  trackColor={{ false: '#EEF0FF', true: '#0022FF' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <SettingRow 
              icon="ellipsis-horizontal-circle-outline" 
              label="Change PIN" 
              subLabel="Set a 6-digit security pin" 
              isLast
            />
          </View>
        </View>

        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SYSTEM</Text>
          <View style={styles.card}>
            <SettingRow 
              icon="moon-outline" 
              label="Dark Mode" 
              subLabel="Switch between themes" 
              rightElement={
                <View style={styles.themeSelector}>
                  <TouchableOpacity 
                    style={[styles.themeButton, !isDarkMode && styles.activeThemeButton]}
                    onPress={() => setIsDarkMode(false)}
                  >
                    <Text style={[styles.themeButtonText, !isDarkMode && styles.activeThemeButtonText]}>Light</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.themeButton, isDarkMode && styles.activeThemeButton]}
                    onPress={() => setIsDarkMode(true)}
                  >
                    <Text style={[styles.themeButtonText, isDarkMode && styles.activeThemeButtonText]}>Dark</Text>
                  </TouchableOpacity>
                </View>
              }
            />
            <SettingRow 
              icon="log-out-outline" 
              label="Log Out" 
              labelStyle={styles.logoutText}
              isLast
              rightElement={<Ionicons name="arrow-redo-outline" size={20} color="#FF4B4B" />}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Expense Tracker v2.4.1</Text>
        </View>
      </ScrollView>
    </View>
  );
}
