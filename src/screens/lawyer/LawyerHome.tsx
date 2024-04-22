import { Text, View } from 'native-base'
import React from 'react'
import { useGetClientsQuery } from '../../store/query/lawyerApi'

export default function LawyerHome() {
   const {data , isLoading, error, isError, refetch} = useGetClientsQuery({})
   
  return (
    <View flex={1} w={'full'} backgroundColor={'darkBlue.900'}>
        <Text>Lawyer Home</Text>
    </View>
  )
}
