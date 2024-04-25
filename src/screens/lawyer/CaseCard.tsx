import React from 'react'
import { ClientCaseItem } from '../../../types/Cards'
import { Avatar, HStack, View, Text, Box } from 'native-base'
import { COLORS, SCREENS } from '../../../config/constants'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
type CaseCardProps = {
  item : ClientCaseItem 
  }

export default function ClientCard({
  item
} : CaseCardProps) {
  const {
    id,
    status,
    description,
    category,
    createdAt,
    updatedAt,
    client
  } = item
  const {
    profile
  } = client
   const avatar = profile?.avatar
   const {navigate} = useNavigation() 
    const displayname = profile?.displayname
    const location = profile?.location
    const createDate = new Date(createdAt).toLocaleDateString()
    const updateDate = new Date(updatedAt).toLocaleDateString()
  return (
    <View bg={COLORS.back} mt={2} p={1} py={4} rounded={'lg'}>
     <Pressable onPress={()=> {
      // @ts-ignore
      navigate(SCREENS.OtherClientModal, {
        Case : item
      })
     }}>
     <HStack space={3} alignItems={'center'} >
     <Avatar source={{uri: avatar || undefined}} />
        <Text fontSize={18} color={'white'}>{displayname}</Text>
        </HStack>
     </Pressable>
        <View position={'absolute'} right={2} top={5}>
        <Text color={status === "OPEN" ? COLORS.surface : status === "IN_PROGRESS" ? "blue.600" : "error.500"}
        fontWeight={"bold"}>
          {status}
        </Text>
     </View>
        <HStack justifyContent={'space-between'}>
        <Text color={COLORS.surface} fontWeight={'semibold'}>{location}</Text>
        <HStack>
        <Text color={'gray.600'}>
              Last edit
        </Text>
        <Text color={COLORS.surface} fontWeight={'semibold'}>  {updateDate}</Text>
        </HStack>
        </HStack>
        <Text color={'white'} fontSize={'lg'}>{description}</Text>
   <HStack justifyContent={"space-between"}>
        <Text color={'black'} bg={COLORS.surface} px={4} rounded={'full'} py={1}>{category}</Text>
        <Text bg={"grey"} rounded={'full'}  px={4} py={1}
        color={"white"}
        >{createDate}</Text>
   </HStack>

    </View>
  )


}
