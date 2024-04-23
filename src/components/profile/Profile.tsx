import React from 'react';
import { Box, Text, Input, Button, Avatar, VStack, HStack, Select, TextArea, Center } from 'native-base';
import { useProfile } from './useProfile';
import EditIcon from '../../icons/EditIcon';
import { KeyboardType, Pressable } from 'react-native';
import { ProfileInput } from '../../../types/Cards';
import FlagIcon from '../../icons/FlagIcon';
import { COLORS } from '../../../config/constants';
import useAuthentication from '../../hooks/useAuthentication';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {
    isEditing,
    setIsEditing,
    handleSave,
    openImagePicker,
    cities,
    selectedCity,
    setSelectedCity,
    avatarSource,
    editedProfileData,
    setEditedProfileData,
    saving,
    isError,setQuery,profileData
  } = useProfile();
const setValue = (name : keyof ProfileInput , value : string) =>{
  setEditedProfileData(
    {...editedProfileData, [name] : value}
  )
}
const {logout} = useAuthentication()
  return (
    <Box p={4} bg={COLORS.main} flex={1} shadow={2} >
      <Box alignItems={'center'}>
      <Pressable  onPress={openImagePicker}>
      <Avatar source={{uri : editedProfileData?.avatar || undefined}} size={'2xl'}/> 
      </Pressable>
      </Box>
<Box >
{isEditing ?
      <FormInput name={"displayname"} value={profileData?.displayname} placeholder='Display Name' setValue={setValue} />
      :  <Text my={3}  color={'#fff'} fontSize={'2xl'}>
      {profileData?.displayname || 'Display Name'}
    </Text>
     }
      <Pressable style={{
        position : 'absolute',
        right : 0
      }} onPress={() =>setIsEditing(!isEditing)} >
      <EditIcon size={24} fill='gray'/>
      </Pressable>
</Box>
      <Box >
      {isEditing ?
      <FormInput name={"location"} value={profileData?.location} placeholder='Location' setValue={setValue} />
      :  <Text my={3}color={'#fff'} fontSize={'2xl'}>
     {profileData?.location || 'Location'}
    </Text>
     }
     
     {
      isEditing ? <TextArea color={'white'} mt={2} fontSize={20} placeholder='About you' focusOutlineColor={'blue.600'} autoCompleteType={""}
      value={profileData?.bio} onChangeText={(text)=>setValue("bio", text)}
      />  : <Text my={3}color={'#fff'} fontSize={'2xl'}>
    {profileData?.bio || 'Bio'}
    </Text>
     }
     <HStack  px={2} space={2} alignItems={"center"} >
     <FlagIcon />
     {
       isEditing ? <FormInput name="phone" type={"numeric"} setValue={setValue} placeholder='Phone' value={profileData?.phone} max={11} /> :         
        <Text
      color={'#fff'} fontSize={'2xl'}
      >
        {profileData?.phone || 'Phone'}
      </Text>
  
     }
      </HStack>
     {
      isEditing && <Button mt={4} bg={'indigo.600'} onPress={handleSave} rounded={'full'}>
        Save
      </Button>
     }
      </Box>
   {
    !isEditing && <Button position={'absolute'} px={5} bottom={5} fontWeight={'semibold'} left={'40%'} bg={'red.600'} onPress={logout} rounded={'full'}>
        <Text color={'white'} fontSize={'xl'}>
          Logout
        </Text>
      </Button>
   }
    </Box>
  );
};

export default Profile;


const FormInput = ({placeholder, value, setValue, name, type, max} :{
  placeholder : string , value : any, setValue : (name : keyof ProfileInput , value : any)=> void, name : keyof ProfileInput, type? : KeyboardType,max? : number
})=>{
  return <Input 
  colorScheme={'indigo'}
   fontSize={20} 
   color={'white'}
   maxLength={max ? max : undefined}
   keyboardType={type ? type  : "default"}
   borderWidth={0}
   borderBottomWidth={1}
  focusOutlineColor={'blue.600'}
  mt={1} 
  placeholder={placeholder}
  onChangeText={(text)=> setValue(name,text)}
  />
}