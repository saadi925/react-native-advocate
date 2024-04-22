import React from 'react';
import { Box, Text, Input, Button, Avatar, VStack, HStack, Select } from 'native-base';
import { useProfile } from './useProfile';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {
    isEditing,
    setIsEditing,
    handleSave,
    openImagePicker,
    cities,
    selectedCity,
    setSelectedCity,
    avatarSource,
    editedProfileData,
    setEditedProfileData,
    saving,
    isError,
  } = useProfile();

  return (
    <Box p={4} bg="#121212" shadow={2} borderRadius={8}>
      <VStack space={4} alignItems="center">
        {!avatarSource || !editedProfileData?.avatar ? (
          <Avatar size="xl" />
        ) : (
          <Avatar size="xl" source={{ uri: avatarSource || editedProfileData.avatar }} />
        )}
        <Button onPress={openImagePicker}>Choose Avatar</Button>
        <Text fontSize="lg" color="white" fontWeight="bold">
          {editedProfileData?.displayname}
        </Text>
        {isEditing ? (
          <Box w="100%" bg="#121212" borderRadius={8} p={4}>
            <Input
              variant="filled"
              placeholder="Location"
              value={editedProfileData?.location}
              onChangeText={(text) => setEditedProfileData({ ...editedProfileData, location: text })}
            />
            <Input
              variant="filled"
              placeholder="Bio"
              value={editedProfileData?.bio}
              onChangeText={(text) => setEditedProfileData({ ...editedProfileData, bio: text })}
            />
            <Input
              variant="filled"
              placeholder="Phone"
              value={editedProfileData?.phone}
              onChangeText={(text) => setEditedProfileData({ ...editedProfileData, phone: text })}
            />
            <Select
              selectedValue={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
            >
              {cities.map((city, index) => (
                <Select.Item key={index} label={city} value={city} />
              ))}
            </Select>
          </Box>
        ) : (
          <VStack space={2} alignItems="center">
            <Text>{editedProfileData?.location}</Text>
            <Text>{editedProfileData?.bio}</Text>
            <Text>{editedProfileData?.phone}</Text>
            <Text>{selectedCity}</Text>
          </VStack>
        )}
        {isError && (
          <Text color="red.400" fontSize="sm">
            Could not save profile
          </Text>
        )}
        {isEditing ? (
          <HStack space={4}>
            <Button disabled={saving} onPress={handleSave}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button onPress={() => setIsEditing(false)}>Cancel</Button>
          </HStack>
        ) : (
          <Button onPress={() => setIsEditing(true)}>Edit</Button>
        )}
      </VStack>
    </Box>
  );
};

export default Profile;
