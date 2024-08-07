import { Box, Button, Center, FormControl, Image, Input, KeyboardAvoidingView, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import useSignup from '../../hooks/useSignup';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SCREENS } from '../../../config/constants';
import useLogin from '../../hooks/useLogin';
import { ActivityIndicator } from 'react-native';
interface Props {

}

export const LoginForm: React.FC<Props> = () => {
  const { formData, setFormData, errors, handleLogin,isLoading , setErrors } = useLogin()
  const navigation = useNavigation()
 
  return (
<KeyboardAvoidingView behavior="padding" flex={1} justifyContent="center">
<VStack flex={1} backgroundColor={COLORS.main}   color={'#fff'} width={'100%'}>
        {/* Email */}
    <Image flex={1} roundedTop={'lg'} source={require('./auth.jpg')} opacity={80} alt='Login banner image' style={{objectFit : 'cover'}}  width={"full"}/>
   <Box flex={2} p={2}>
   <FormControl  isRequired>
        <FormControl.Label _text={{
          bold: true
        }}>Email</FormControl.Label>
        <Input keyboardType="email-address" borderBottomWidth={1} borderWidth={0} borderColor={COLORS.surface} borderBottomColor={COLORS.surface} fontSize={'lg'} focusOutlineColor={COLORS.surface} rounded={'lg'} color={'white'}  placeholder="Email" onChangeText={value => setFormData({
          ...formData,
          email: value
        }
        )} />
       {!errors && <FormControl.HelperText _text={{
          fontSize: 'xs',
          color :'red.300'
        }}>
          Email should be a valid email.
        </FormControl.HelperText>}
        {/* Error validation */}
        {
          'email' in errors ? <Text color={'red.300'}>
            {errors.email  as string}
          </Text>
          : <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            invalid 
          </FormControl.ErrorMessage>
        }
      </FormControl>
      {/* Password */}
      <FormControl isRequired>
        <FormControl.Label _text={{
          bold: true
        }}>Password</FormControl.Label>
        <Input  type='password' borderBottomWidth={1} borderWidth={0} borderColor={COLORS.surface} borderBottomColor={COLORS.surface} fontSize={'lg'} color={'white'} rounded={'lg'} placeholder="Password" onChangeText={value => setFormData({
          ...formData,
          password: value
        })} />
        {/* Error validation */}
        {
          'password' in errors ? <Text color={'red.400'}>
            {errors.password as string}
          </Text>
          : <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            invalid 
          </FormControl.ErrorMessage>
        }
      </FormControl>
   {!isLoading ?  <Button  rounded={'full'} mt={2} bg={COLORS.surface} colorScheme={COLORS.surface}  onPress={()=> handleLogin()}>
 <Text color={'#000'} fontSize={18} fontWeight={"semibold"}>
    Sign In
 </Text>
</Button> : <ActivityIndicator />
   }
    <Text py={'4'} fontSize={'lg'} color={'white'}>
    {/* @ts-ignore */}  
     Do not have an account? <Text px={'4'} onPress={()=>navigation.navigate(SCREENS.Signup)} color={COLORS.surface}>Signup</Text>
    </Text>
   </Box>

    </VStack>
</KeyboardAvoidingView>
  );
};