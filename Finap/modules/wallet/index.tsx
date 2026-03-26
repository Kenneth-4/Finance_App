import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface CardItemProps {
  balance: string;
  type: 'VISA' | 'MASTERCARD';
  color: string;
}

const CardItem = ({ balance, type, color }: CardItemProps) => (
  <TouchableOpacity style={[styles.cardItem, { backgroundColor: color }]}>
    <View style={styles.cardHeader}>
      <Ionicons name="wifi-outline" size={32} color="white" style={{ transform: [{ rotate: '90deg' }] }} />
      <Text style={styles.visaText}>{type}</Text>
    </View>
    <View>
      <Text style={styles.cardLabel}>Available Balance</Text>
      <Text style={styles.cardValue}>{balance}</Text>
    </View>
  </TouchableOpacity>
);

interface BankItemProps {
  name: string;
  type: string;
  amount: string;
  status: string;
  statusColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

const BankItem = ({ name, type, amount, status, statusColor, icon, iconColor, iconBg }: BankItemProps) => (
  <TouchableOpacity style={styles.bankItem}>
    <View style={[styles.bankIconContainer, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={24} color={iconColor} />
    </View>
    <View style={styles.bankContent}>
      <Text style={styles.bankName}>{name}</Text>
      <Text style={styles.bankType}>{type}</Text>
    </View>
    <View style={styles.bankAmountContainer}>
      <Text style={styles.bankAmount}>{amount}</Text>
      <Text style={[styles.bankStatus, { color: statusColor }]}>{status}</Text>
    </View>
  </TouchableOpacity>
);

export default function WalletModule() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20), paddingBottom: 15 }]}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Ionicons name="wallet-outline" size={20} color="white" style={styles.balanceIcon} />
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>$12,450.00</Text>
          <Text style={styles.balanceTrend}>
            <Ionicons name="trending-up-outline" size={14} color="#FFFFFFE6" />
            {'  '}+2.5% this month
          </Text>
        </View>

        {/* Your Cards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Cards</Text>
            <TouchableOpacity style={styles.addCardButton}>
              <Ionicons name="add-circle" size={20} color="#0022FF" />
              <Text style={styles.addCardText}>Add Card</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.cardsList}
          >
            <CardItem balance="$8,210.00" type="VISA" color="#1A202C" />
            <CardItem balance="$4,240.00" type="VISA" color="#0022FF" />
          </ScrollView>
        </View>

        {/* Bank Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bank Accounts</Text>
          </View>
          <BankItem 
            name="Chase Savings" 
            type="Checking • 4920" 
            amount="$8,240.50" 
            status="Active" 
            statusColor="#00C366" 
            icon="business-outline" 
            iconColor="#FF9F43" 
            iconBg="#FFF3E6"
          />
          <BankItem 
            name="Bank of America" 
            type="Business • 3012" 
            amount="$2,112.00" 
            status="Updated 2h ago" 
            statusColor="#8E8E93" 
            icon="business-outline" 
            iconColor="#0022FF" 
            iconBg="#EEF0FF"
          />
        </View>
        
        {/* Extra space for bottom padding of scroll content */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
