import React, { useState } from 'react';
import { Container, Button, Text, HStack } from 'native-base';
import { Pressable } from 'react-native';

const RolePicker = ({
    selectedRole = 'CLIENT',setSelectedRole 
}: {
    selectedRole: 'CLIENT' | 'LAWYER';
    setSelectedRole: (role: 'CLIENT' | 'LAWYER') => void;
}) => {

  const handleRoleSelection = (role : 'CLIENT' | 'LAWYER') => {
    setSelectedRole(role);
  };

  return (
    <HStack  alignItems={'center'}  justifyContent={'center'}  >
        <Button  roundedLeft={'full'} py={1} px={4} bgColor={
          selectedRole === 'CLIENT' ? 'primary.500' : 'gray.500'
        }
          onPress={() => handleRoleSelection('CLIENT')}
        >
          <Text color={'white'} fontSize={'lg'}>Client</Text>
        </Button>
        <Button roundedRight={'full'} py={1} px={4}
          bgColor={
            selectedRole === 'LAWYER' ? 'primary.500' : 'gray.500'
          }

          onPress={() => handleRoleSelection('LAWYER')}
        >
          <Text fontSize={'lg'} color={'white'}>Lawyer</Text>
        </Button>
    </HStack>
  );
};

export default RolePicker;
