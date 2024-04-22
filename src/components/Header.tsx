import { Avatar, Box, Button, HStack, Image, Text, View } from "native-base";
import ChatIcons from "../icons/ChatIcons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserIcon } from "../icons/UsersIcon";
import { SCREENS } from "../../config/constants";
import { useNavigation } from "@react-navigation/native";


const AppHeader= () => {
  const profile = useSelector((state : RootState)=> state.auth.profile)
  const {navigate} = useNavigation()
  return (
    <HStack bg={'#121212'} justifyContent={'space-between'} alignItems={'center'}  py={1}>
      <View  flexDirection={'row'}>
      {/* <Image source={require('../../android/assets/android/mipmap-hdpi/ic_launcher.png')} alt="logo" rounded={'full'}/> */}
      <Text  py={'2'} px={2}  color={'indigo.300'} fontSize={'xl'} fontWeight={"bold"}>
        Advoco
      </Text>
      </View>
    <Box>
      {/* @ts-ignore */}
    <Button colorScheme={'black'} color={'transparent'} onPress={()=>navigate(SCREENS.Profile)}>
    {profile?.avatar ? <Avatar size="sm" source={{uri : profile.avatar}} /> : <UserIcon fill="#fff"  size={32}/>}
    </Button>
    </Box>
    </HStack>
  );
};

export default AppHeader;



export const ScreenHeader = ({title} : {title : string}) => {
  return (
    <View justifyContent={'space-between'} bg={'#121212'} flexDirection={'row'} py={1}>
      <Text   color={'white'} fontSize={'2xl'} fontWeight={"bold"}>
        {title}
      </Text>
    </View>
  );
}