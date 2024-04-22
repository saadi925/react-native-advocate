import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS, STACKS } from './config/constants';
import AuthScreen from './src/screens/AuthScreen';
import useAuthentication from './src/hooks/useAuthentication';
import AppScreen from './src/screens/AppScreen';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppHeader from './src/components/Header';

export const Stack = createNativeStackNavigator();

function AppWrapper() {
  const {auth} = useAuthentication(
  )

  return (
      <NavigationContainer >
      <SafeAreaView style={{flex : 1, backgroundColor :"#121212", padding : 0, margin : 0}}>
  <NativeBaseProvider >
  <Stack.Navigator
   screenOptions={{
   presentation :"fullScreenModal" 
  }}
  >
      {
        !auth ? <Stack.Screen  name={STACKS.Auth} options={{
          headerShown : false
        
        }} component={AuthScreen} /> : <Stack.Screen options={{
          headerShown : false
        }} name={STACKS.App}  component={AppScreen} /> 
      }
      
      </Stack.Navigator>
  </NativeBaseProvider>
  </SafeAreaView>
    </NavigationContainer>
  );
}



export default function App() {
  return (
     <Provider store={store}>
        <AppWrapper />
      </Provider>    
  )
}
