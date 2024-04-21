import React, { useState } from 'react';
import { Container, Button, Text, HStack } from 'native-base';

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
    <HStack  justifyContent={'space-around'}  >
        <Button rounded={'full'} px={6} borderWidth={1} borderColor={selectedRole === "LAWYER"? 'transparent': 'red.600'}  bg={selectedRole === "CLIENT" ? 'green.600' : 'gray.600'}  color={'white'}  mx={2}
          onPress={() => handleRoleSelection('CLIENT')}
        >
          <Text color={'white'} fontSize={'lg'}>Client</Text>
        </Button>
        <Button rounded={'full'}  borderWidth={1} borderColor={selectedRole === "CLIENT"? 'transparent': 'red.600'} px={6} bg={selectedRole === "LAWYER" ? 'green.600' : 'gray.600'} 
          onPress={() => handleRoleSelection('LAWYER')}
        >
          <Text fontSize={'lg'} color={'white'}>Lawyer</Text>
        </Button>
    </HStack>
  );
};

export default RolePicker;
