import { Box, Button, Center, FormControl, Image, Input, Text, View, VStack } from 'native-base';
import React from 'react';
import useSignup from '../../hooks/useSignup';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../config/constants';
import RolePicker from './RolePicker';
import { ActivityIndicator } from 'react-native';
interface Props {

}

export const SignupForm: React.FC<Props> = () => {
  const { formData, setFormData, errors, handleSignup, canVerify, code, setCode, isLoading, handleVerify, verifying ,} = useSignup()
  const navigation = useNavigation()
  return (
    <VStack flex={1} backgroundColor={'#121212'}   color={'#fff'} width={'100%'}>
        {/* Email */}
    <Image flex={.8} source={require('./login.jpg')} alt='Login banner image' style={{objectFit : 'cover'}}  width={"full"}/>
    <RolePicker selectedRole={formData.role as 'CLIENT' | 'LAWYER'} setSelectedRole={(role)=> {
      setFormData({
        ...formData,
        role
      })
    }}/>
   <Box flex={2} p={2}>
   <FormControl  isRequired>
     
        <FormControl.Label _text={{
          bold: true
        }}>Username</FormControl.Label>
        <Input borderBottomWidth={1} borderWidth={0} borderBottomColor={'indigo.600'} fontSize={'lg'} focusOutlineColor={'indigo.600'} rounded={'lg'} color={'white'}  placeholder="CNIC Name" onChangeText={value => setFormData({
          ...formData,
          name: value
        }
        )} />
        <FormControl.HelperText _text={{
          fontSize: 'xs',
          color :'red.300'
        }}>
          Name on your CNIC 
        </FormControl.HelperText>
        {/* Error validation */}
        {
          'name' in errors ? <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            {errors.name}
          </FormControl.ErrorMessage>
          : <FormControl.ErrorMessage _text={{
            fontSize: 'xs'
          }}>
            invalid 
          </FormControl.ErrorMessage>
        }
      </FormControl>
   <FormControl  isRequired>
     
        <FormControl.Label _text={{
          bold: true
        }}>Email</FormControl.Label>
        <Input keyboardType="email-address" borderBottomWidth={1} borderWidth={0} borderBottomColor={'indigo.600'} fontSize={'lg'} focusOutlineColor={'indigo.600'} rounded={'lg'} color={'white'}  placeholder="Email" onChangeText={value => setFormData({
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
            fontSize: 'xs', color :'red.300'
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
        <Input borderBottomWidth={1} borderWidth={0} borderBottomColor={'indigo.600'} fontSize={'lg'} color={'white'} rounded={'lg'} type='password' placeholder="Password" onChangeText={value => setFormData({
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
   {
    !isLoading ?  <Button rounded={'full'} disabled={isLoading} fontSize={'xl'} fontWeight={'bold'} mt={2} colorScheme={'indigo'} onPress={handleSignup}>
    Signup
  </Button> : <ActivityIndicator />
   }
    <Text fontSize={'lg'} py={'1'} color={'white'}>
    {/* @ts-ignore */}  
      Already have an Account <Text px={'4'} onPress={()=>navigation.navigate(SCREENS.Login)} color={'indigo.600'}>Signin</Text>
    </Text>
   </Box>
   {
      canVerify && <Center position={'absolute'} height={'full'} width={'full'} bg={'#121212'}  >
        <Text color={'red.300'} fontSize={'lg'}>Please verify your email address</Text>
        <FormControl isRequired>
        <FormControl.Label  _text={{
          bold: true
        }}>Verification Code</FormControl.Label>
         <Input value={code} focusOutlineColor={'indigo.600'} type="text" keyboardType="decimal-pad"    borderBottomWidth={1} borderWidth={0} borderBottomColor={'indigo.600'} fontSize={'lg'} color={'white'} rounded={'lg'} placeholder="Verification Code" onChangeText={value => setCode(value)} />
        </FormControl>
       {
        !verifying ?  <Button disabled={verifying} colorScheme={'indigo'} mt={4} width={'full'}>
        Verify
      </Button> : <ActivityIndicator />
       }
        <Text color={'white'} px={2} fontSize={'lg'}>Enter the code sent to your userid@gmail.com</Text>
      </Center>
   }
    </VStack>
  );
};