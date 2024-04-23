import { Box, Button, Center, FormControl, Image, Input, KeyboardAvoidingView, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import useSignup from '../../hooks/useSignup';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SCREENS } from '../../../config/constants';
import RolePicker from './RolePicker';
import { ActivityIndicator, Keyboard, Pressable } from 'react-native';
interface Props {

}

export const SignupForm: React.FC<Props> = () => {
  const { formData, setFormData, errors, handleSignup, canVerify, code, setCode, isLoading, handleVerify, verifying ,setErrors, setCanVerify} = useSignup()
  const navigation = useNavigation()

  return (
    <VStack flex={1} backgroundColor={COLORS.main}   color={'#fff'} width={'100%'}>
        {/* Email */}
    <Image flex={.8} source={require('./login.jpg')} alt='Login banner image' style={{objectFit : 'cover'}}  width={"full"}/>
    <RolePicker selectedRole={formData.role as 'CLIENT' | 'LAWYER'} setSelectedRole={(role)=> {
      setFormData({
        ...formData,
        role
      })
    }}/>
   <Box flex={2} p={2}>
  <KeyboardAvoidingView>
  <FormControl  isRequired>
     
     <FormControl.Label _text={{
       bold: true
     }}>Username</FormControl.Label>
     <Input borderBottomWidth={1} borderWidth={0} borderBottomColor={COLORS.surface} fontSize={'lg'} focusOutlineColor={COLORS.surface} rounded={'lg'} color={'white'}  placeholder="CNIC Name" onChangeText={value => setFormData({
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
       'name' in errors ? <Text color={'red.300'}>
         {errors.name as string}
       </Text>
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
     <Input keyboardType="email-address" borderBottomWidth={1} borderWidth={0} borderBottomColor={COLORS.surface} fontSize={'lg'} focusOutlineColor={COLORS.surface} rounded={'lg'} color={'white'}  placeholder="Email" onChangeText={value => setFormData({
       ...formData,
       email: value
     }
     )} />
   {!errors &&  <FormControl.HelperText _text={{
       fontSize: 'xs',
       color :'red.300'
     }}>
       Email should be a valid email.
     </FormControl.HelperText>}
     {/* Error validation */}
     {
       'email' in errors ? <Text color={'red.600'}>
         {errors.email as string}
       </Text>
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
     <Input borderBottomWidth={1} borderWidth={0} borderBottomColor={COLORS.surface} fontSize={'lg'} color={'white'} rounded={'lg'} type='password' placeholder="Password" onChangeText={value => setFormData({
       ...formData,
       password: value
     })} />
     {/* Error validation */}
     {
       'password' in errors && typeof errors.password === 'string' ? <Text color={'red.400'}>
         {errors.password}
       </Text>
       : <FormControl.ErrorMessage _text={{
         fontSize: 'xs'
       }}>
         invalid 
       </FormControl.ErrorMessage>
     }
   </FormControl>
   </KeyboardAvoidingView> 
   {
    !isLoading ?  <Button bgColor={COLORS.surface} rounded={'full'} disabled={isLoading} fontSize={'xl'} fontWeight={'bold'} mt={2} colorScheme={COLORS.surface} onPress={handleSignup}>
   <Text color={COLORS.back} fontSize={18}>
   Signup
   </Text>
  </Button> : <ActivityIndicator />
   }
    <Text fontSize={'lg'} py={'1'} color={'white'}>
    {/* @ts-ignore */}  
      Already have an Account <Text px={'4'} onPress={()=>navigation.navigate(SCREENS.Login)} color={COLORS.surface}>Signin</Text>
    </Text>
   </Box>
   {
      canVerify && <Center  px={"2%"} position={'absolute'} height={'full'} width={'full'} bg={'#121212'}  >
        
        <Text color={COLORS.surface} fontSize={'lg'}>Please verify your email address</Text>
        <Pressable onPress={()=>setCanVerify(!canVerify)}>
     <Text color={'grey'} textDecorationLine={'underline'}>Not your email ?</Text> 
       </Pressable>
        <FormControl isRequired>
        <FormControl.Label  _text={{
          bold: true
        }}>Verification Code</FormControl.Label>
         <Input maxLength={6} value={code} focusOutlineColor={COLORS.surface} type="text" keyboardType="decimal-pad"    borderBottomWidth={1} borderWidth={0} borderBottomColor={COLORS.surface} fontSize={'lg'} color={'white'} rounded={'lg'} placeholder="Verification Code" onChangeText={setCode} />
         {
          errors && 'code' in errors && <Text color={'red.300'}>
            {errors.code as string}
          </Text>
         }
        </FormControl>

       {
        !verifying ?  <Button disabled={verifying || code.length < 6} bg={COLORS.surface}  onPress={handleVerify} colorScheme={COLORS.surface} mt={4} width={'full'}>
        <Text color={COLORS.back} fontSize={'lg'}>
        Verify
        </Text>
      </Button> : <ActivityIndicator />
       }
       
 <Text color={'text.300'}>
 Enter the code sent to your 
 </Text>
        <Text color={'blue.300'}  fontSize={'lg'}>
        {formData.email.split('@')[0] + '***@' + formData.email.split('@')[1]}
        </Text>
      </Center>
   }
    </VStack>
  );
};