import { Avatar, Button, Center, HStack, Image, ScrollView, Text, View } from 'native-base'
import React, { useEffect, useLayoutEffect } from 'react'
import { COLORS } from '../../config/constants'
import { useGetOtherClientProfileQuery } from '../store/query/profileApi'
import { ActivityIndicator } from 'react-native'
import { useSendFriendRequestMutation } from '../store/query/friendRequestApi'

export default function OtherClientModal({route, navigation} :  any) {
   const {Case} = route.params
   const {data , isLoading , error , isError} =useGetOtherClientProfileQuery(Case.id)
  const {
    status,
    description,
    category,
    createdAt,
    updatedAt,
    client
  } = Case
  const {
    profile
  } = client
  const [msg , setMsg] = React.useState('')
    const location = profile?.location
    const createDate = new Date(createdAt).toLocaleDateString()
   const [sendRequest , {isLoading : sendingRequest , isError : IsSendingRequestError}] = useSendFriendRequestMutation()
   const [IssendFriend, setSendFriend] = React.useState(false)
    const updateDate = new Date(updatedAt).toLocaleDateString()
  useLayoutEffect(()=>{
  navigation.setOptions({
    headerLeft(){
        return  <HStack space={4} alignItems={'center'}>
        {
          !(data?.avatar) ?   <Avatar source={{uri : data?.avatar }}/> : <Image
          w={40} h={40} alt={'avatar'} source={{
            uri: data?.avatar,
           }}/>
        }
        <Text color={'white'} fontSize={'xl'}>{data?.displayname || 'advoco user'}</Text>
      </HStack>
    }
  })
  },[navigation])
    return (
    <View  flex={1} bg={COLORS.main}>
       {
        isLoading ? <ActivityIndicator size="large" color={COLORS.surface} /> : 
       data && <View mx={2} rounded={'lg'} py={12}>
            <Text fontSize={18} color={COLORS.surface}>
                Bio
            </Text>
            <Text color={'white'} fontSize={22}>{data.bio}</Text>
            <Text fontSize={18} color={COLORS.surface}>
                Location
            </Text>
            <Text color={'white'} fontSize={22}>{data.location}</Text>
            <Text fontSize={18} color={COLORS.surface}>
                Phone
            </Text>
            <Text color={'white'} fontSize={22}>{data.phone}</Text>

            {
                    Case && (
                        <View rounded={'lg'} mt={2}  bg={'black'} p={2}>
                            <Text color={'white'} fontSize={20}>
                             The Case
                            </Text>
                   <View position={'absolute'} right={2} top={5}>
                    <Text py={1} color={status === "OPEN" ? COLORS.surface : status === "IN_PROGRESS" ? "blue.600" : "error.500"}
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
                    <Text py={3} color={'white'} fontSize={'lg'}>{description}</Text>
               <HStack py={4} justifyContent={"space-between"}>
                    <Text color={'black'} bg={COLORS.surface} px={4} rounded={'full'} py={1}>{category}</Text>
                    <Text bg={"grey"} rounded={'full'}  px={4} py={1}
                    color={"white"}
                    >{createDate}</Text>
               </HStack>
                   </View>
                    )
            }
            {
              IssendFriend ?  <Button onPress={async()=>{
                try {
                   const response = await sendRequest(Case.id).unwrap()
                     if ('message' in response) {
                        setMsg(response.message)
                        setSendFriend(true)
                     }
                } catch (error) {
                    
                }
            }} disabled={sendingRequest} mt={3} colorScheme={COLORS.surface} bg={COLORS.surface}
            borderColor={COLORS.surface}
            borderWidth={1} rounded={'full'} >
              

            </Button> : 
                msg && <Text color={'green.200'} mt={2} textAlig-n={'center'} fontSize={18}>{msg}</Text>
            }
       </View> 
}
       
    </View>
  )
}
