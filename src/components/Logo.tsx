import { Avatar, Image, Text, View } from "native-base";
import ChatIcons from "../icons/ChatIcons";


const AppLogo= () => {
  return (
    <View justifyContent={'space-between'} bg={'darkBlue.900'} flexDirection={'row'} display={'flex'}>
      <View  flexDirection={'row'}>
      <Image source={require('../../android/assets/android/mipmap-mdpi/ic_launcher.png')} alt="logo" width={45} height={45} rounded={'full'}/>
      <Text py={'2'} px={2}  color={'white'} fontSize={'xl'} fontWeight={"bold"}>
        Advoco
      </Text>
      </View>
      <ChatIcons />
      <Avatar  />
    </View>
  );
};

export default AppLogo;