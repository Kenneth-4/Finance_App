import { Tabs, useSegments } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform, Pressable, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Determine active tab based on segments
  // segments[1] will be 'index', 'analytics', 'wallet', or 'profile'
  const activeTab = segments[1] || 'index';

  const fabBottom = Platform.OS === 'ios' ? insets.bottom + 100 : 90;
  const menuBottom = Platform.OS === 'ios' ? insets.bottom + 170 : 160;

  // Decide what to show in the menu based on the active tab
  const getMenuItems = () => {
    switch (activeTab) {
      case 'index':
        return [
          { label: 'Make Transaction', icon: 'swap-horizontal-outline' },
          { label: 'Add Funds', icon: 'add-circle-outline' }
        ];
      case 'analytics':
        return [
          { label: 'Add a Goal', icon: 'trophy-outline' }
        ];
      case 'wallet':
        return [
          { label: 'Add Card', icon: 'card-outline' },
          { label: 'Add Bank', icon: 'business-outline' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const showFAB = activeTab !== 'profile';

  // Automatically close menu when tab changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [activeTab]);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0022FF',
          tabBarInactiveTintColor: '#8E8E93',
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 + insets.bottom : 70 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: Platform.OS === 'ios' ? insets.bottom + 5 : (insets.bottom > 0 ? insets.bottom : 12),
            paddingTop: 12,
            borderTopWidth: 0,
            backgroundColor: '#FFFFFF',
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons name={focused ? "journal" : "journal-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="add"
          options={{ href: null }}
        />
      </Tabs>

      {/* Menu Overlay Backdrop */}
      {isMenuOpen && showFAB && (
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={styles.backdrop} />
        </Pressable>
      )}

      {/* Popup Menu */}
      {isMenuOpen && showFAB && (
        <View style={[styles.menuContainer, { bottom: menuBottom }]}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuOpen(false)}>
                <Ionicons name={item.icon as any} size={20} color="#0022FF" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>
      )}

      {/* Floating Plus Button with Bubble Press Effect */}
      {showFAB && (
        <Pressable 
          style={({ pressed }) => [
            styles.floatingFAB, 
            { 
              bottom: fabBottom,
              transform: [
                { scale: pressed ? 1.15 : 1 }, 
                { rotate: isMenuOpen ? '45deg' : '0deg' }
              ]
            }
          ]}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  menuContainer: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 2000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginHorizontal: 12,
  },
  floatingFAB: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0022FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0022FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
});
