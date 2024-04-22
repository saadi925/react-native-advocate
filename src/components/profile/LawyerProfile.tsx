import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { useCreateOrUpdateLawyerProfileMutation } from '../../store/query/lawyerApi';
import { LawyerProfile } from '../../../types/Cards';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const statusOptions = ['AVAILABLE', 'BUSY', 'OFFLINE'];

export default function LawyerProfileScreen() {
  const profile = useSelector((state: RootState) => state.auth.lawyerProfile);
  const [saveProfile, { isLoading, isError, error }] = useCreateOrUpdateLawyerProfileMutation();
  const [profileData, setProfileData] = useState<LawyerProfile | null>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      if (profileData) {
        const response = await saveProfile(profileData).unwrap();
        setIsEditing(false);
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Lawyer Profile</Text>
        <View style={{ marginBottom: 10 }}>
          <Text>Status</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            {statusOptions.map((status, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => isEditing && setProfileData({ ...profileData, status : status as any})}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: isEditing ? '#E2E8F0' : '#F3F4F6',
                  marginRight: 10,
                }}>
                <Text>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TextInput
          style={{ marginBottom: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: 'gray' }}
          placeholder="Description"
          value={profileData?.description || ''}
          onChangeText={(text) => setProfileData({ ...profileData, description: text })}
          editable={isEditing}
        />
        <TextInput
          style={{ marginBottom: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: 'gray' }}
          placeholder="Experience"
          value={profileData?.experience || ''}
          onChangeText={(text) => setProfileData({ ...profileData, experience: text })}
          editable={isEditing}
        />
        <TextInput
          style={{ marginBottom: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: 'gray' }}
          placeholder="Education"
          value={profileData?.education || ''}
          onChangeText={(text) => setProfileData({ ...profileData, education: text })}
          editable={isEditing}
        />
        {/* Add more fields as needed */}
        <Button title={isEditing ? 'Save' : 'Edit'} onPress={handleSave} />
        {isLoading && <ActivityIndicator style={{ marginTop: 20 }} />}
        {/* {isError && <Text style={{ color: 'red', marginTop: 20 }}>{error?.message}</Text>} */}
      </View>
    </ScrollView>
  );
}
