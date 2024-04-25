import { View, Text, Avatar, Button, Spinner, Input, Box, TextArea } from 'native-base';
import React, { useState } from 'react';
import { CaseDataInput, ClientCaseItem } from '../../../types/Cards';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { COLORS } from '../../../config/constants';

type CaseCardProps = {
  item: ClientCaseItem;
  onDelete: (id: string) => void;
  onUpdate: (newData: CaseDataInput) => void;
  loading: {
    deleting: boolean;
    updating: boolean;
  };
  errors :{
    deletingError : FetchBaseQueryError | SerializedError | undefined;
    updatingError : FetchBaseQueryError | SerializedError | undefined;
  }
};

const ClientCaseCard: React.FC<CaseCardProps> = ({ item, onDelete, onUpdate, loading, errors }) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState<CaseDataInput>({ ...item });
  const { title, client, description, id, status, createdAt, updatedAt, category } = item;
  const { profile } = client;
  const displayname = profile?.displayname || 'Unknown user';
  const avatar = profile?.avatar;

  const toggleEdit = () => {
    setEditedData({ ...item });
    setEditing(!editing);
  };

  const handleSave = () => {
    onUpdate(editedData);
    console.log(editedData);
    
    setEditing(false);
  };

  const handleChange = (field: keyof CaseDataInput, value: string) => {
    setEditedData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <View bg={COLORS.back} p={4} borderWidth={1} borderRadius={8} borderColor="gray.200" mb={4}>
      <View flexDirection="row" alignItems="center">
        {avatar ? <Avatar source={{ uri: avatar }} size="md" /> : <Avatar size="md" />}
        <Text fontSize={'xl'} ml={3} color={'white'} fontWeight="bold">
          {displayname || 'Unknown user'}
        </Text>
      </View>
      {editing ? (
        <Box mt={2}>
          <Input 
            color={'white'}
            fontSize={'xl'}
            borderWidth={0}
            borderBottomWidth={1}
            borderColor={COLORS.surface}
            value={editedData.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholder="Title"
            mt={2}
          />
          <TextArea autoCompleteType={'on'}
            color={'white'}
          fontSize={'xl'}
          borderWidth={0}
          borderBottomWidth={1}
          borderColor={COLORS.surface}
            value={editedData.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Description"
            mt={2}
          />
      {errors.updatingError || errors.deletingError && <Text color={'red.500'}>Error: {' invalid data'}</Text>}

          <View flexDirection="row" justifyContent="space-between" mt={4}>
            <Button onPress={toggleEdit} colorScheme="gray" rounded={'full'} isLoading={loading.updating}>
              Cancel
            </Button>
            <Button rounded={'full'} px={8} onPress={handleSave} colorScheme={'green'} bg={COLORS.surface} isLoading={loading.updating} >
              <Text color={COLORS.back}>Save</Text>
            </Button>
          </View>
        </Box>
      ) : (
        <>
          <Text color={'white'} fontSize={'xl'} mt={2}>{title}</Text>
          <Text color="gray.300" fontSize={'lg'}>{description}</Text>
          <Text color="gray.500">{category}</Text>
          <View flexDirection="row" justifyContent="space-between" mt={4}>
            <Button px={5} rounded={'full'} onPress={() => onDelete(id)} colorScheme="error" isLoading={loading.deleting}>
              Delete
            </Button>
            <Button rounded={'full'} px={8} onPress={toggleEdit} colorScheme={'green'} bg={COLORS.surface} isLoading={loading.updating} >
              <Text color={COLORS.back}>Edit</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ClientCaseCard;
