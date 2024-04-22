// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Tab = createMaterialTopTabNavigator();

// export default function RequestTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Page1') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Page2') {
//               iconName = focused ? 'settings' : 'settings-outline';
//             }

//             // You can return any component that you like here!
//             return <Icon name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Page1" component={Page1} />
//         <Tab.Screen name="Page2" component={Page2} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
