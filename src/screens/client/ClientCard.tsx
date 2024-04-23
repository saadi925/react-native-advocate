import { Avatar, HStack, Text, View } from 'native-base'
import React from 'react'
import { LawyerItem } from '../../../types/Cards'
import { COLORS } from '../../../config/constants'
import { formatDate } from '../../components/helpers'
type LawyerItemCardProps = {
  item: LawyerItem
}

export default function LawyerItemCard({item} : LawyerItemCardProps) {
  const {id , status ,description,rating , experience, createdAt, updatedAt, user,} = item
  const {profile} = user
  const {avatar, displayname, location} = profile
  const date = new Date(createdAt).toLocaleDateString()
  return (
   <View p={2} mt={2} rounded={'lg'}  w={'full'} bg={COLORS.back}>
      <HStack space={3} alignItems={'center'} >
     <Avatar source={{uri: avatar}} />
        <Text fontSize={18} color={'white'}>{displayname}</Text>
        </HStack>
     <View position={'absolute'} right={2} top={5}>
        <Text color={status === 'AVAILABLE' ? COLORS.surface : status === "BUSY" ? "blue.600" : "error.500"}
        fontWeight={"bold"}>
          {status}
        </Text>
     </View>
        <HStack justifyContent={'space-between'}>
        <Text color={COLORS.surface} fontWeight={'semibold'}>{location}</Text>
        <Text color={'grey.600'} fontWeight={'semibold'}>Joined  {date}</Text>
        </HStack>
        <Text color={'white'} fontSize={'lg'}>{description}</Text>
   <HStack justifyContent={"space-between"}>
        <Text color={'black'} bg={COLORS.surface} px={4} rounded={'full'} py={1}>{experience}</Text>
        <Text bg={"grey"} rounded={'full'}  px={4} py={1}
        color={"white"}
        >{rating} ⭐</Text>
   </HStack>
   </View>
  )
}
