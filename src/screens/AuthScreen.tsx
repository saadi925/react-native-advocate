import React from 'react'
import { Stack } from '../../App'
import { SCREENS } from '../../config/constants'
import { SignupForm } from '../components/Form/SignupForm'
import { LoginForm } from '../components/Form/LoginForm'



export default function AuthScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown : false
    }} initialRouteName={SCREENS.Signup}>
    <Stack.Screen name={SCREENS.Signup} component={SignupForm} />
    <Stack.Screen name={SCREENS.Login} component={LoginForm} />
    </Stack.Navigator>
  )
}
