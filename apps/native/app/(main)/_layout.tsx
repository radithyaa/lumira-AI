import { Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Home, Clock, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FF8225',
        tabBarInactiveTintColor: '#7E7E7E',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2.5 rounded-full ${focused ? 'bg-[#FFF5ED]' : ''}`}>
              <Icon as={Home} size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="report/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="relative">
              <View className={`w-16 h-16 rounded-full ${focused ? 'bg-[#FF8225]' : 'bg-[#FFF5ED]'} absolute -top-8 items-center justify-center shadow-lg`}>
                <Icon as={Clock} size={32} color={focused ? '#FFFFFF' : color} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`p-2.5 rounded-full ${focused ? 'bg-[#FFF5ED]' : ''}`}>
              <Icon as={User} size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
