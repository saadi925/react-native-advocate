import { View, Text, Avatar, Button, Spinner, Input, Box } from 'native-base';
import React, { useState } from 'react';
import { CaseDataInput, ClientCaseItem } from '../../../types/Cards';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

const ClientCaseCard: React.FC<CaseCardProps> = ({ item, onDelete, onUpdate, loading }) => {
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
    setEditing(false);
  };

  const handleChange = (field: keyof CaseDataInput, value: string) => {
    setEditedData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <View p={4} borderWidth={1} borderRadius={8} borderColor="gray.200" mb={4}>
      <View flexDirection="row" alignItems="center">
        {avatar ? <Avatar source={{ uri: avatar }} size="md" /> : <Avatar size="md" />}
        <Text ml={3} fontWeight="bold">
          {displayname}
        </Text>
      </View>
      {editing ? (
        <Box mt={2}>
          <Input
            value={editedData.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholder="Title"
            mt={2}
          />
          <Input
            value={editedData.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Description"
            mt={2}
          />
          <View flexDirection="row" justifyContent="space-between" mt={4}>
            <Button onPress={toggleEdit} colorScheme="gray" isLoading={loading.updating}>
              Cancel
            </Button>
            <Button onPress={handleSave} colorScheme="blue" isLoading={loading.updating}>
              Save
            </Button>
          </View>
        </Box>
      ) : (
        <>
          <Text mt={2}>{title}</Text>
          <Text color="gray.500">{description}</Text>
          <Text color="gray.500">{category}</Text>
          <View flexDirection="row" justifyContent="space-between" mt={4}>
            <Button onPress={() => onDelete(id)} colorScheme="error" isLoading={loading.deleting}>
              Delete
            </Button>
            <Button onPress={toggleEdit} colorScheme="blue" isLoading={loading.updating}>
              Edit
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ClientCaseCard;
