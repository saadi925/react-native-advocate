import React, { useState } from 'react';
import { Container, Button, Text, HStack } from 'native-base';
import { Pressable } from 'react-native';
import { COLORS } from '../../../config/constants';

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
        <Button colorScheme={COLORS.surface} roundedLeft={'full'} py={1} px={4} bgColor={
          selectedRole === 'CLIENT' ? COLORS.surface : 'gray.600'
        }
          onPress={() => handleRoleSelection('CLIENT')}
        >
          <Text color={selectedRole === "CLIENT" ? COLORS.back : 'white'} fontSize={'lg'}>Client</Text>
        </Button>
        <Button roundedRight={'full'} py={1} px={4}
          bgColor={
            selectedRole === 'LAWYER' ? COLORS.surface: 'gray.500'
          }

          onPress={() => handleRoleSelection('LAWYER')}
        >
          <Text fontSize={'lg'} color={selectedRole === "LAWYER" ? COLORS.back : 'white'}>Lawyer</Text>
        </Button>
    </HStack>
  );
};

export default RolePicker;
