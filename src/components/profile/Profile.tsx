import React from 'react';
import { Box, Text, Input, Button, Avatar, VStack, HStack, Select, TextArea, Center, View } from 'native-base';
import { useProfile } from './useProfile';
import EditIcon from '../../icons/EditIcon';
import { ActivityIndicator, KeyboardType, Pressable } from 'react-native';
import { ProfileInput } from '../../../types/Cards';
import FlagIcon from '../../icons/FlagIcon';
import { COLORS, SCREENS } from '../../../config/constants';
import useAuthentication from '../../hooks/useAuthentication';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {
    isEditing,
    setIsEditing,
    handleSave,
    openImagePicker,
    editedProfileData,
    setEditedProfileData,
    saving,
    profileData, errMsg,
    gettingProfileLoading
  } = useProfile();
  const {navigate} = useNavigation()
const setValue = (name : keyof ProfileInput , value : string) =>{
  setEditedProfileData(
    {...editedProfileData, [name] : value}
  )
}
const role = useSelector((state : RootState)=> state.auth.role)
const {logout} = useAuthentication()
  return (
  <>
  {
    gettingProfileLoading ? <ActivityIndicator size="large" color={COLORS.main} /> :
    <Box p={4} bg={COLORS.main} flex={1} shadow={2} >
    <Box alignItems={'center'}>
    <Pressable  onPress={openImagePicker}>
    <Avatar source={{uri : editedProfileData?.avatar || undefined}} size={'2xl'}/> 
    </Pressable>
    </Box>
<Box >

<Box>
<Text style={{
       color : COLORS.surface,
    }}>{'Display Name'}</Text>
{isEditing ?
   
    <FormInput name={"displayname"} value={editedProfileData?.displayname} placeholder='Display Name' setValue={setValue} />

    :  <Text my={3}  color={'#fff'} fontSize={'2xl'}>
    {profileData?.displayname || 'Display Name'}
  </Text>
   }
   </Box>
    <Pressable style={{
      position : 'absolute',
      right : 0
    }} onPress={() =>setIsEditing(!isEditing)} >
    <EditIcon size={24} fill='gray'/>
    </Pressable>
</Box>
    <Box >
    <Box>
    <Text style={{
       color : COLORS.surface,
    }}>{'Location'}</Text>
    {isEditing ?
    <FormInput name={"location"} value={editedProfileData?.location} placeholder='Location' setValue={setValue} />
    :  <Text my={3}color={'#fff'} fontSize={'2xl'}>
   {profileData?.location || 'Location'}
  </Text>
   }
    </Box>
   
   <Box>
   <Text style={{
       color : COLORS.surface,
    }}>{'Bio'}</Text>
   {
    isEditing ? <TextArea color={'white'} mt={2} fontSize={20} placeholder='About you' focusOutlineColor={'blue.600'} autoCompleteType={""}
    value={editedProfileData?.bio} onChangeText={(text)=>setValue("bio", text)}
    />  : <Text my={3}color={'#fff'} fontSize={'2xl'}>
  {profileData?.bio || 'No Bio Provided'}
  </Text>
   }
   </Box>
   <Text style={{
       color : COLORS.surface,
    }}>{'Phone'}</Text>
   <HStack  px={2} space={2} alignItems={"center"} >
   <FlagIcon />
   {
     isEditing ? <FormInput name="phone" type={"phone-pad"} setValue={setValue} placeholder='+92 number' value={editedProfileData?.phone} max={13} /> :         
      <Text
    color={'#fff'} fontSize={'2xl'}
    >
      {profileData?.phone || editedProfileData?.phone || 'No Phone Provided'}
    </Text>

   }
   
    </HStack>

 {isEditing &&   <Text color={'red.600'} fontSize={18}>
      {errMsg}
    </Text>}
   {isEditing && <Button disabled={saving} mt={4} bg={COLORS.surface} colorScheme={"black"} onPress={handleSave} rounded={'full'}>
     {
      saving ? <ActivityIndicator color={COLORS.main} size={'large'} /> : <Text fontSize={20} color={'black'}>Save</Text>
     }
    </Button>}
    </Box>
 {!isEditing && 
  role === 'LAWYER' && (
    // @ts-ignore
    <Pressable onPress={()=> navigate(SCREENS.LawyerProfile)} style={{
      backgroundColor : COLORS.surface,
      paddingHorizontal : 12,
      borderRadius : 50,
      position : 'absolute',
      bottom : 8,
      right : 50
    }}>
      <Text fontSize={18} py={2} px={4} textAlign={'center'}>
        Create Your Lawyer Profile
      </Text>
    </Pressable>
  )
 }
  </Box>
  }
  </>
  );
};

export default Profile;


const FormInput = ({placeholder, value, setValue, name, type, max} :{
  placeholder : string , value : any, setValue : (name : keyof ProfileInput , value : any)=> void, name : keyof ProfileInput, type? : KeyboardType,max? : number
})=>{
  return (
    
  <Input 
  colorScheme={''}
   fontSize={20} 
   color={'white'}
    value={value}
   maxLength={max ? max : undefined}
   keyboardType={type ? type  : "default"}
   borderWidth={0}
   borderBottomWidth={1}
  focusOutlineColor={'blue.600'}
  mt={1} 
  placeholder={placeholder}
  onChangeText={(text)=> setValue(name,text)}
  />
  )
}