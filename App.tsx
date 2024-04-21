import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { STACKS } from './config/constants';
import AuthScreen from './src/screens/AuthScreen';
import useAuthentication from './src/hooks/useAuthentication';
import AppScreen from './src/screens/AppScreen';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppHeader from './src/components/Header';

export const Stack = createNativeStackNavigator();

function App() {
  const {auth} = useAuthentication()
  return (
  <Provider store={store}>
      <NavigationContainer >
      <SafeAreaView style={{flex : 1, backgroundColor :"#121212", padding : 0, margin : 0}}>
  <NativeBaseProvider >
  <Stack.Navigator
   screenOptions={{
   presentation :"fullScreenModal" 
  }}
  initialRouteName={auth ? STACKS.App : STACKS.Auth}>
      <Stack.Screen  name={STACKS.Auth} options={{
        headerShown : false
      
      }} component={AuthScreen} />
      <Stack.Screen options={{
        header : AppHeader
      }} name={STACKS.App}  component={AppScreen} />
      </Stack.Navigator>
  </NativeBaseProvider>
  </SafeAreaView>
    </NavigationContainer>
    </Provider>
  );
}

export default App;