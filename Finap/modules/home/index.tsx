import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

const transactions = [
  {
    id: '1',
    title: 'Apple Store',
    category: 'Electronics',
    time: '2h ago',
    amount: '-$999.00',
    method: 'Debit Card',
    icon: 'laptop-outline',
    iconColor: '#FF9500',
    bgColor: '#FFF5E5',
    type: 'expense'
  },
  {
    id: '2',
    title: 'Uber Ride',
    category: 'Transport',
    time: '5h ago',
    amount: '-$24.50',
    method: 'Wallet',
    icon: 'car-outline',
    iconColor: '#007AFF',
    bgColor: '#E5F1FF',
    type: 'expense'
  },
  {
    id: '3',
    title: 'Salary Payment',
    category: 'Work',
    time: 'yesterday',
    amount: '+$4,500.00',
    method: 'Transfer',
    icon: 'briefcase-outline',
    iconColor: '#34C759',
    bgColor: '#EBF9EE',
    type: 'income'
  },
  {
    id: '4',
    title: 'Starbucks',
    category: 'Food',
    time: 'yesterday',
    amount: '-$12.80',
    method: 'Debit Card',
    icon: 'fast-food-outline',
    iconColor: '#AF52DE',
    bgColor: '#F6EDFC',
    type: 'expense'
  }
];

export default function HomeModule() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Alex Johnson</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialIcons name="notifications-none" size={24} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <MaterialIcons name="credit-card" size={24} color="rgba(255, 255, 255, 0.7)" />
        </View>
        <Text style={styles.balanceValue}>$12,450.80</Text>
        <View style={styles.balanceFooter}>
          <View style={styles.cardLogos}>
            <View style={[styles.cardLogoCircle, { backgroundColor: 'rgba(255, 255, 255, 0.4)' }]} />
            <View style={[styles.cardLogoCircle, { backgroundColor: 'rgba(255, 255, 255, 0.2)', marginLeft: -12 }]} />
          </View>
          <TouchableOpacity style={styles.addFundsBtn}>
            <Text style={styles.addFundsText}>Add Funds</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expense Analysis */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Expense Analysis</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Monthly</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.analysisCard}>
        <View style={styles.chartPlaceholder}>
          <View style={[styles.chartBar, { height: '60%' }]} />
          <View style={[styles.chartBar, { height: '40%' }]} />
          <View style={[styles.chartBar, { height: '80%', backgroundColor: '#0022FF' }]} />
          <View style={[styles.chartBar, { height: '50%' }]} />
          <View style={[styles.chartBar, { height: '30%' }]} />
          <View style={[styles.chartBar, { height: '45%' }]} />
          <View style={[styles.chartBar, { height: '35%' }]} />
        </View>
        <View style={styles.chartLabels}>
          <Text style={styles.chartLabelText}>Mon</Text>
          <Text style={styles.chartLabelText}>Tue</Text>
          <Text style={styles.chartLabelText}>Wed</Text>
          <Text style={styles.chartLabelText}>Thu</Text>
          <Text style={styles.chartLabelText}>Fri</Text>
          <Text style={styles.chartLabelText}>Sat</Text>
          <Text style={styles.chartLabelText}>Sun</Text>
        </View>
        <View style={styles.analysisStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statValue, { color: '#34C759' }]}>+$2,400</Text>
          </View>
          <View style={[styles.statItem, { borderLeftWidth: 1, borderLeftColor: '#F2F2F7' }]}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={[styles.statValue, { color: '#FF3B30' }]}>-$1,200</Text>
          </View>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>See all</Text>
        </TouchableOpacity>
      </View>

      {transactions.map(item => (
        <View key={item.id} style={styles.transactionItem}>
          <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
            <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.category} • {item.time}</Text>
          </View>
          <View style={styles.transactionAmount}>
            <Text style={[styles.amountText, { color: item.type === 'income' ? '#34C759' : '#1C1C1E' }]}>{item.amount}</Text>
            <Text style={styles.methodText}>{item.method}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
