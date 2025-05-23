import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ChatScreen from '../screens/AiAssistant';
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Matches':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
               case 'Chat':
              iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
           
            default:
              iconName = 'home-outline';
          }
          
          return (
            <Icon 
              name={iconName} 
              size={focused ? size + 2 : size} 
              color={color} 
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text 
              style={{
                fontSize: focused ? 12 : 10,
                color: color,
                fontWeight: focused ? '600' : '400',
                marginTop: -2
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarActiveTintColor: '#ff5c5c',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarBadge: undefined, 
        }}
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchesScreen}
        options={{
          tabBarBadge: undefined, 
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarBadge: undefined,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarBadge: undefined,
        }}
      />
      
    </Tab.Navigator>
  );
}