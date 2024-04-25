import React, { useEffect, useLayoutEffect, useState } from 'react'
import { OtherLawyerProfile } from '../../types/Responses'
import { Avatar, HStack, ScrollView, Text, View } from 'native-base'
import { useGetOtherLawyerProfileQuery } from '../store/query/profileApi'
import { ActivityIndicator, Pressable } from 'react-native'
import { COLORS } from '../../config/constants'
import { useSendFriendRequestMutation, useSendFRToLawyerMutation } from '../store/query/friendRequestApi'

export default function OtherLawyerModal({route , navigation} : any) {
const [alreadySent , setAlreadySent] = React.useState(false)
  const [data , setData] = React.useState<OtherLawyerProfile | null>(null)
  const {pId} = route.params as any
 const [msg , setMsg] = React.useState('')
    const {data : item, isLoading, isError , error} = useGetOtherLawyerProfileQuery(pId)
    console.log(data);
    
    useEffect(()=>{
      if(item){
        setData(item)
      }
    },[item])
    const {
         displayname, avatar, createdAt, bio, location, phone, lawyerProfile
    } = data || {}
    
    const {description, experience, education, specialization, status, contact} = lawyerProfile || {}
    const {email, website, instagram, linkedin, officeAddress, facebook} = contact || {}
    const [send, {isLoading : isSending, isError : sendingIsError}] = useSendFRToLawyerMutation()
    const onSendRequest = async (id : string) => {
 try {
  const response = await send(id).unwrap()
  console.log(response);
  
  setMsg(response.message)
 } catch (error : any) {
  // console.log("error :",error);
  // setMsg(error.data.error)
  setMsg('cannot send request')
  console.log(error);
  
  
 }
      
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerLeft(){
              return  <HStack space={4} alignItems={'center'}>
              <Avatar source={{uri : item?.avatar }}/>
              <Text color={'white'} fontSize={'xl'}>{item?.displayname || 'advocco user'}</Text>
            </HStack>
          }
          , headerRight(){
            return alreadySent? <></> : <Pressable disabled={isSending} onPress={()=> onSendRequest(pId)} style={{
              backgroundColor : COLORS.surface
              ,padding : 10,
              borderRadius : 50,
            
            }}  >
              {isSending ? <ActivityIndicator size={'small'} color={'#000'}/> : <Text  style={{color : '#000', fontSize : 18}}>Add User</Text>
          }
            </Pressable>
          }
        })
        },[navigation, item, isSending, alreadySent, setAlreadySent])
  // const containsSent = msg.toLowerCase().includes('sent')
 useEffect(()=>{
  // setAlreadySent(!containsSent)
  
 },[alreadySent])
        return (
   <ScrollView  bg={COLORS.main} flex={1}>
    <Text color={COLORS.surface} fontSize={20} textAlign={'center'}>{msg}</Text>
  {
    isLoading ? <ActivityIndicator size={'large'} /> : <View px={4}>
     <ShowTextWithLabel label='Bio' text={bio || 'No bio provided'}/>
     <ShowTextWithLabel label='Experience' text={experience + ' years' || 'No experience provided'}/>
      <ShowTextWithLabel label='Education' text={education || 'No education provided'}/>
      <ShowTextWithLabel label='Specialization' text={specialization || 'No specialization provided'}/>
      <ShowTextWithLabel label='Status' text={status || 'No status provided'}/>
      <ShowTextWithLabel label='Description' text={description || 'No description provided'}/>
      <ShowTextWithLabel label='Location' text={location || 'No location provided'}/>
      <ShowTextWithLabel label='Phone' text={phone || 'No phone provided'}/>
      <ShowTextWithLabel label='Email' text={email || 'No email provided'}/>
      <ShowTextWithLabel label='Website' text={website || 'No website provided'}/>
      <ShowTextWithLabel label='Instagram' text={instagram || 'No instagram provided'}/>
      <ShowTextWithLabel label='Linkedin' text={linkedin || 'No linkedin provided'}/>
      <ShowTextWithLabel label='Facebook' text={facebook || 'No facebook provided'}/>
      <ShowTextWithLabel label='Office Address' text={officeAddress || 'No office address provided'}/>

      
    </View>
  }
   </ScrollView>
  )
}


const ShowTextWithLabel = ({label, text} : {label : string, text : string}) => {
 const textContainsNo = text.toLowerCase().includes('no')
  return (
    <View>
      <Text color={COLORS.surface}>
        {label}
      </Text>
      <Text fontSize={20} color={textContainsNo ? 'gray.500' : 'white'}>{text}</Text>
    </View>
  )
}