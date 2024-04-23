import { Avatar, Box, Button, HStack, Image, Text, View } from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserIcon } from "../icons/UsersIcon";
import { COLORS, SCREENS } from "../../config/constants";
import { useNavigation } from "@react-navigation/native";
import ChatIcons from "../icons/ChatIcons";
import { Pressable } from "react-native";


const AppHeader= () => {
  const profile = useSelector((state : RootState)=> state.auth.profile)
  const {navigate} = useNavigation()
  return (
    <HStack bg={COLORS.main} justifyContent={'space-between'} alignItems={'center'}  px={1}>
     <ScreenHeader title={'Advoco'}/>
    <HStack alignItems={'center'}>
      {/* @ts-ignore */}
     <Pressable  onPress={()=>navigate(SCREENS.Chat)}>
      <ChatIcons fill={'skyblue'} size={40}/>
      </Pressable>
      {/* @ts-ignore */}
    <Button colorScheme={'black'} color={'transparent'} onPress={()=>navigate(SCREENS.Profile)}>
    {profile?.avatar ? <Avatar size="sm" source={{uri : profile.avatar}} /> : <UserIcon fill="#fff"  size={32}/>}
    </Button>
    </HStack>
    </HStack>
  );
};

export default AppHeader;



export const ScreenHeader = ({title} : {title : string}) => {
  return (
    <View  bg={COLORS.main} flexDirection={'row'} alignItems={'center'}  px={1}>
       <Image source={require('../../src/logo.jpg')} width={10} height={10} alt="logo" rounded={'full'}/>
      <Text   color={'white'} fontSize={'2xl'} px={2} fontWeight={"bold"}>
        {title}
      </Text>
    </View>
  );
}