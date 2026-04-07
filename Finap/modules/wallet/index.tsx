import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface CardData {
  id: string;
  balance: number;
  type: 'VISA' | 'MASTERCARD';
  color: string;
  bankName: string;
}

interface BankAccountData {
  id: string;
  name: string;
  type: string;
  amount: number;
  status: string;
  statusColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

interface CardItemProps {
  balance: number;
  type: 'VISA' | 'MASTERCARD';
  color: string;
  bankName: string;
  onPress: () => void;
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CardItem = ({ balance, type, color, bankName, onPress }: CardItemProps) => (
  <TouchableOpacity style={[styles.cardItem, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Ionicons name="wifi-outline" size={32} color="white" style={{ transform: [{ rotate: '90deg' }] }} />
      <Text style={styles.visaText}>{type}</Text>
    </View>
    <View>
      <Text style={[styles.cardBankName, { marginBottom: 4, marginTop: 8 }]}>{bankName}</Text>
      <Text style={styles.cardLabel}>Available Balance</Text>
      <Text style={styles.cardValue}>{formatCurrency(balance)}</Text>
    </View>
  </TouchableOpacity>
);

interface BankItemProps {
  name: string;
  type: string;
  amount: number;
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
      <Text style={styles.bankAmount}>{formatCurrency(amount)}</Text>
      <Text style={[styles.bankStatus, { color: statusColor }]}>{status}</Text>
    </View>
  </TouchableOpacity>
);

const CARD_COLORS = [
  '#1A202C', // Dark
  '#0022FF', // Blue
  '#7000FF', // Purple
  '#00C366', // Green
  '#FF4B2B', // Red
];

export default function WalletModule() {
  const insets = useSafeAreaInsets();
  
  // Add Card State
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCardColor, setNewCardColor] = useState(CARD_COLORS[0]);
  const [newCardType, setNewCardType] = useState<'VISA' | 'MASTERCARD'>('VISA');
  const [newBankName, setNewBankName] = useState('');

  // Manage Card State
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [manageMode, setManageMode] = useState<'ACTIONS' | 'ADD_CASH' | 'EDIT'>('ACTIONS');
  const [cashAmount, setCashAmount] = useState('');

  // Data State
  const [cards, setCards] = useState<CardData[]>([
    { id: '1', balance: 8210.00, type: 'VISA', color: '#1A202C', bankName: 'Chase Bank' },
    { id: '2', balance: 4240.00, type: 'VISA', color: '#0022FF', bankName: 'Bank of America' },
  ]);

  const [bankAccounts, setBankAccounts] = useState<BankAccountData[]>([
    { id: '1', name: 'Chase Bank', type: 'Checking • 4920', amount: 8240.50, status: 'Active', statusColor: '#00C366', icon: 'business-outline', iconColor: '#FF9F43', iconBg: '#FFF3E6' },
    { id: '2', name: 'Bank of America', type: 'Business • 3012', amount: 2112.00, status: 'Updated 2h ago', statusColor: '#8E8E93', icon: 'business-outline', iconColor: '#0022FF', iconBg: '#EEF0FF' },
  ]);

  const handleAddCard = () => {
    const finalBankName = newBankName || 'My Bank';
    const newCard: CardData = {
      id: Math.random().toString(),
      balance: 0.00,
      type: newCardType,
      color: newCardColor,
      bankName: finalBankName,
    };
    
    // Also create a dummy bank account for this card if it doesn't exist
    if (!bankAccounts.find(acc => acc.name === finalBankName)) {
      setBankAccounts([...bankAccounts, {
        id: Math.random().toString(),
        name: finalBankName,
        type: 'General • ' + Math.floor(1000 + Math.random() * 9000),
        amount: 0,
        status: 'Just Added',
        statusColor: '#0022FF',
        icon: 'business-outline',
        iconColor: '#0022FF',
        iconBg: '#EEF0FF'
      }]);
    }

    setCards([...cards, newCard]);
    setIsAddModalVisible(false);
    setNewBankName('');
  };

  const openManageModal = (card: CardData) => {
    setSelectedCard(card);
    setManageMode('ACTIONS');
    setIsManageModalVisible(true);
  };

  const handleAddCash = () => {
    const amount = parseFloat(cashAmount);
    if (!amount || isNaN(amount)) return;

    if (selectedCard) {
      // Update Card Balance
      const updatedCards = cards.map(c => 
        c.id === selectedCard.id ? { ...c, balance: c.balance + amount } : c
      );
      setCards(updatedCards);

      // Update Bank Account Balance (Reflect into bank accounts)
      const updatedBanks = bankAccounts.map(acc => 
        acc.name === selectedCard.bankName ? { ...acc, amount: acc.amount + amount } : acc
      );
      setBankAccounts(updatedBanks);

      setIsManageModalVisible(false);
      setCashAmount('');
      Alert.alert('Success', `${formatCurrency(amount)} added to your ${selectedCard.bankName} account.`);
    }
  };

  const handleEditCard = () => {
    if (selectedCard) {
      const updatedCards = cards.map(c => 
        c.id === selectedCard.id ? { ...c, color: selectedCard.color, type: selectedCard.type } : c
      );
      setCards(updatedCards);
      setIsManageModalVisible(false);
    }
  };

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
          <Text style={styles.balanceValue}>
            {formatCurrency(bankAccounts.reduce((acc, curr) => acc + curr.amount, 0))}
          </Text>
          <Text style={styles.balanceTrend}>
            <Ionicons name="trending-up-outline" size={14} color="#FFFFFFE6" />
            {'  '}+2.5% this month
          </Text>
        </View>

        {/* Your Cards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Cards</Text>
            <TouchableOpacity 
              style={styles.addCardButton}
              onPress={() => setIsAddModalVisible(true)}
            >
              <Ionicons name="add-circle" size={20} color="#0022FF" />
              <Text style={styles.addCardText}>Add Card</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.cardsList}
          >
            {cards.map(card => (
              <CardItem 
                key={card.id}
                balance={card.balance} 
                type={card.type} 
                color={card.color} 
                bankName={card.bankName}
                onPress={() => openManageModal(card)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bank Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bank Accounts</Text>
          </View>
          {bankAccounts.map(acc => (
            <BankItem 
              key={acc.id}
              name={acc.name} 
              type={acc.type} 
              amount={acc.amount} 
              status={acc.status} 
              statusColor={acc.statusColor} 
              icon={acc.icon} 
              iconColor={acc.iconColor} 
              iconBg={acc.iconBg}
            />
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsAddModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <View style={styles.previewContainer}>
              <View style={[styles.previewCard, { backgroundColor: newCardColor }]}>
                <View style={styles.cardHeader}>
                  <View style={styles.previewChip} />
                  <Text style={styles.previewType}>{newCardType}</Text>
                </View>
                <View style={{ marginTop: 24 }}>
                  <Text style={[styles.cardBankName, { marginBottom: 4 }]}>{newBankName || 'BANK NAME'}</Text>
                  <Text style={styles.previewNumber}>**** **** **** 0000</Text>
                </View>
                <View style={styles.previewFooter}>
                  <View><Text style={styles.previewLabel}>Card Holder</Text><Text style={styles.previewValue}>YOUR NAME</Text></View>
                  <View><Text style={styles.previewLabel}>Expires</Text><Text style={styles.previewValue}>12/28</Text></View>
                </View>
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Bank Name</Text>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter bank name" value={newBankName} onChangeText={setNewBankName} />
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Select Card Type</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity style={[styles.typeOption, newCardType === 'VISA' && styles.typeOptionSelected]} onPress={() => setNewCardType('VISA')}>
                  <Text style={[styles.typeText, newCardType === 'VISA' && styles.typeTextSelected]}>VISA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeOption, newCardType === 'MASTERCARD' && styles.typeOptionSelected]} onPress={() => setNewCardType('MASTERCARD')}>
                  <Text style={[styles.typeText, newCardType === 'MASTERCARD' && styles.typeTextSelected]}>MASTERCARD</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Select Card Color</Text>
              <View style={styles.colorSelector}>
                {CARD_COLORS.map(color => (
                  <TouchableOpacity key={color} style={[styles.colorOption, newCardColor === color && styles.colorOptionSelected]} onPress={() => setNewCardColor(color)}>
                    <View style={[styles.colorInner, { backgroundColor: color }]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddCard}>
              <Text style={styles.submitButtonText}>Add Card</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Manage Card Modal */}
      <Modal
        visible={isManageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsManageModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsManageModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {manageMode === 'ACTIONS' ? `Manage ${selectedCard?.bankName}` : 
                 manageMode === 'ADD_CASH' ? 'Add Cash' : 'Edit Card'}
              </Text>
              <TouchableOpacity onPress={() => setIsManageModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            {selectedCard && manageMode === 'ACTIONS' && (
              <View style={{ gap: 16 }}>
                <TouchableOpacity 
                  style={styles.manageOption}
                  onPress={() => setManageMode('ADD_CASH')}
                >
                  <View style={[styles.manageIcon, { backgroundColor: '#EEF0FF' }]}>
                    <Ionicons name="cash-outline" size={24} color="#0022FF" />
                  </View>
                  <View>
                    <Text style={styles.manageTitle}>Add Cash</Text>
                    <Text style={styles.manageSub}>Top up your card balance</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#8E8E93" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.manageOption}
                  onPress={() => setManageMode('EDIT')}
                >
                  <View style={[styles.manageIcon, { backgroundColor: '#F0F2F5' }]}>
                    <Ionicons name="create-outline" size={24} color="#1A1A1A" />
                  </View>
                  <View>
                    <Text style={styles.manageTitle}>Edit Card</Text>
                    <Text style={styles.manageSub}>Change color or card type</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#8E8E93" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              </View>
            )}

            {selectedCard && manageMode === 'ADD_CASH' && (
              <View>
                <Text style={styles.inputLabel}>Amount to Add</Text>
                <View style={styles.textInputContainer}>
                  <TextInput 
                    style={styles.textInput}
                    placeholder="e.g. 500.00"
                    keyboardType="numeric"
                    value={cashAmount}
                    onChangeText={setCashAmount}
                    autoFocus
                  />
                </View>
                <TouchableOpacity style={[styles.submitButton, { marginTop: 24 }]} onPress={handleAddCash}>
                  <Text style={styles.submitButtonText}>Add Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ alignSelf: 'center', marginTop: 16 }} 
                  onPress={() => setManageMode('ACTIONS')}
                >
                  <Text style={{ color: '#8E8E93', fontWeight: '600' }}>Back</Text>
                </TouchableOpacity>
              </View>
            )}

            {selectedCard && manageMode === 'EDIT' && (
              <View>
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Select Card Type</Text>
                  <View style={styles.typeSelector}>
                    <TouchableOpacity style={[styles.typeOption, selectedCard.type === 'VISA' && styles.typeOptionSelected]} onPress={() => setSelectedCard({...selectedCard, type: 'VISA'})}>
                      <Text style={[styles.typeText, selectedCard.type === 'VISA' && styles.typeTextSelected]}>VISA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeOption, selectedCard.type === 'MASTERCARD' && styles.typeOptionSelected]} onPress={() => setSelectedCard({...selectedCard, type: 'MASTERCARD'})}>
                      <Text style={[styles.typeText, selectedCard.type === 'MASTERCARD' && styles.typeTextSelected]}>MASTERCARD</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Select Card Color</Text>
                  <View style={styles.colorSelector}>
                    {CARD_COLORS.map(color => (
                      <TouchableOpacity key={color} style={[styles.colorOption, selectedCard.color === color && styles.colorOptionSelected]} onPress={() => setSelectedCard({...selectedCard, color})}>
                        <View style={[styles.colorInner, { backgroundColor: color }]} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity style={[styles.submitButton, { marginTop: 24 }]} onPress={handleEditCard}>
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ alignSelf: 'center', marginTop: 16 }} 
                  onPress={() => setManageMode('ACTIONS')}
                >
                  <Text style={{ color: '#8E8E93', fontWeight: '600' }}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
