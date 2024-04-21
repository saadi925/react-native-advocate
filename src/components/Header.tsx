import { View } from 'native-base';
import React from 'react';
import AppLogo from './Logo';

interface Props {}

const AppHeader: React.FC<Props> = () => {
  return (
    <View>
      <AppLogo/>  
    </View>
  );
};

export default AppHeader;