import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

const { width } = Dimensions.get('window');

interface TimeTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TimeTab = ({ label, isActive, onPress }: TimeTabProps) => (
  <TouchableOpacity 
    style={[styles.timeTab, isActive && styles.activeTimeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.timeTabText, isActive && styles.activeTimeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

const StatCard = ({ label, value, trend, isPositive }: StatCardProps) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <View style={styles.trendContainer}>
      <Ionicons 
        name={isPositive ? "arrow-up" : "arrow-down"} 
        size={14} 
        color={isPositive ? "#00C366" : "#FF4B4B"} 
      />
      <Text style={[styles.trendText, { color: isPositive ? "#00C366" : "#FF4B4B" }]}>
        {trend}
      </Text>
    </View>
  </View>
);

interface GoalCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  percent: number;
  current: string;
  target: string;
  isAccent?: boolean;
}

const GoalCard = ({ icon, title, percent, current, target, isAccent }: GoalCardProps) => (
  <View style={[styles.goalCard, !isAccent && { backgroundColor: '#FFFFFF', borderWidth: 0, elevation: 2 }]}>
    <View style={styles.goalHeader}>
      <View style={styles.goalTitleContainer}>
        <View style={styles.goalIconContainer}>
          <Ionicons name={icon} size={22} color={isAccent ? "#0022FF" : "#8E8E93"} />
        </View>
        <Text style={styles.goalTitle}>{title}</Text>
      </View>
      <Text style={[styles.goalPercent, !isAccent && { color: '#1A1A1A' }]}>{percent}%</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${percent}%` }, !isAccent && { backgroundColor: '#CBD5E0' }]} />
    </View>
    <Text style={styles.goalFooter}>{current} of {target} saved</Text>
  </View>
);

export default function AnalyticsModule() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Month');

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20), paddingBottom: 15 }]}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={22} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Time Selector Tabs */}
      <View style={styles.timeSelector}>
        {['Day', 'Week', 'Month', 'Year'].map((tab) => (
          <TimeTab 
            key={tab} 
            label={tab} 
            isActive={activeTab === tab} 
            onPress={() => setActiveTab(tab)} 
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overview Stat Cards */}
        <View style={styles.overviewGrid}>
          <StatCard 
            label="Total Spent" 
            value="$2,450.00" 
            trend="+12.5% from last month" 
            isPositive={true} 
          />
          <StatCard 
            label="Budget Left" 
            value="$550.00" 
            trend="-5.2% vs average" 
            isPositive={false} 
          />
        </View>

        {/* Spending by Category Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Spending by Category</Text>
            <TouchableOpacity>
              <Ionicons name="information-circle" size={20} color="#CBD5E0" />
            </TouchableOpacity>
          </View>
          <Text style={styles.chartSubTitle}>Distribution for Oct 2023</Text>
          
          <View style={styles.chartPlaceholder}>
            {/* Horizontal labels as shown in the mockup */}
            {['FOOD', 'TRANSP', 'BILLS', 'HEALTH', 'OTHER'].map((label) => (
              <Text key={label} style={styles.xAxisLabel}>{label}</Text>
            ))}
          </View>
        </View>

        {/* Savings Goals Section */}
        <Text style={styles.sectionHeader}>Savings Goals</Text>
        <GoalCard 
          icon="airplane" 
          title="Europe Summer Trip" 
          percent={75} 
          current="$3,750" 
          target="$5,000" 
          isAccent={true}
        />
        <GoalCard 
          icon="car-outline" 
          title="New Car Fund" 
          percent={22} 
          current="$5,500" 
          target="$25,000" 
          isAccent={false}
        />

        {/* Smart Insight Card */}
        <View style={styles.insightCard}>
          <View style={styles.insightCircle} />
          <Text style={styles.insightTitle}>Smart Insight</Text>
          <Text style={styles.insightText}>
            You spent <Text style={{ fontWeight: '800' }}>$120 less</Text> on Dining Out compared to last month. Keep it up! This could add <Text style={{ fontWeight: '800' }}>$1,440</Text> to your savings annually.
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>View Detail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
