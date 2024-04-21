import { Box, Button, Center, FormControl, Image, Input, Text, View, VStack } from 'native-base';
import React from 'react';
import useSignup from '../../hooks/useSignup';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../config/constants';
import useLogin from '../../hooks/useLogin';
import { ActivityIndicator } from 'react-native';
interface Props {

}

export const LoginForm: React.FC<Props> = () => {
  const { formData, setFormData, errors, handleLogin,isLoading  } = useLogin()
  const navigation = useNavigation()
  return (
    <VStack flex={1} backgroundColor={'#121212'}   color={'#fff'} width={'100%'}>
        {/* Email */}
    <Image flex={1} rounded={'lg'} source={require('./login.jpg')} alt='Login banner image' style={{objectFit : 'cover'}}  width={"full"}/>
   <Box flex={2} p={2}>
   <FormControl  isRequired>
        <FormControl.Label _text={{
          bold: true
        }}>Email</FormControl.Label>
        <Input keyboardType="email-address" borderBottomWidth={1} borderWidth={0} borderColor={'indigo.600'} borderBottomColor={'indigo.600'} fontSize={'lg'} focusOutlineColor={'indigo.600'} rounded={'lg'} color={'white'}  placeholder="Email" onChangeText={value => setFormData({
          ...formData,
          email: value
        }
        )} />
        <FormControl.HelperText _text={{
          fontSize: 'xs',
          color :'red.300'
        }}>
          Email should be a valid email.
        </FormControl.HelperText>
        {/* Error validation */}
        {
          'email' in errors ? <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            {errors.email}
          </FormControl.ErrorMessage>
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
        <Input type='password' borderBottomWidth={1} borderWidth={0} borderColor={'indigo.600'} borderBottomColor={'indigo.600'} fontSize={'lg'} color={'white'} rounded={'lg'} placeholder="Password" onChangeText={value => setFormData({
          ...formData,
          password: value
        })} />
        {/* Error validation */}
        {
          'password' in errors ? <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            {errors.password}
          </FormControl.ErrorMessage>
          : <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            invalid 
          </FormControl.ErrorMessage>
        }
      </FormControl>
   {!isLoading ?  <Button  rounded={'full'} mt={2}  colorScheme={'green'} onPress={()=> handleLogin()}>
Sign In
</Button> : <ActivityIndicator />
   }
    <Text py={'4'} fontSize={'lg'} color={'white'}>
    {/* @ts-ignore */}  
     Do not have an account? <Text px={'4'} onPress={()=>navigation.navigate(SCREENS.Signup)} color={'indigo.600'}>Signup</Text>
    </Text>
   </Box>

    </VStack>
  );
};