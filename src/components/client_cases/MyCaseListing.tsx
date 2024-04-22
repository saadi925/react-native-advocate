import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useCreateCaseMutation, useDeleteCaseMutation, useGetCasesQuery, useUpdateCaseMutation } from '../../store/query/clientApi';
import ClientCaseCard from './CaseCard';
import { View, Text, Fab, Icon, Button } from 'native-base';
import { CaseDataInput, ClientCaseItem } from '../../../types/Cards';
import CreateCase from './CreateCase';

const MyCaseListing: React.FC = () => {
  const { data, isLoading, error, refetch, isError } = useGetCasesQuery({});
  const [createCase, { isLoading: creating, error: postingError }] = useCreateCaseMutation();
  const [deleteCase, { isLoading: deleting, error: deletingError }] = useDeleteCaseMutation();
  const [updateCase, { isLoading: updating, error: updatingError }] = useUpdateCaseMutation();
  const [isCreating, setCreating] = useState(false);
  const toggleCreate = () => setCreating(!isCreating);
  const [caseData, setCaseData] = useState<CaseDataInput>({
    title: '',
    description: '',
    category: "OTHER",
  });
  const [isRefreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };

  const onCreate = async () => {
    try {
      await createCase(caseData);
      refetch();
    } catch (error) {
      console.log("creating case error:", error);
    }
  }

  const onDelete = async (id: string ) => {
    const res = await deleteCase(id).unwrap();
    refetch();
    console.log("delete response", res);
  }

  const onUpdate = async (newData : CaseDataInput) => {
    const res = await updateCase(newData).unwrap();
    refetch();
    console.log('update response ', res);
  }

  const renderCaseItem = ({ item }: { item: ClientCaseItem }) => {
    return <ClientCaseCard  loading={{ deleting, updating }}
      onDelete={onDelete} onUpdate={onUpdate}
      errors={{ deletingError, updatingError }}
      item={item} />;
  };

  return (
    <View flex={1} bg={'#121212'}>
      {/* Create Case Form */}
      {isCreating ?
        <CreateCase
          data={caseData}
          setData={setCaseData}
          onCreate={onCreate}
          error={postingError}
          creating={creating}
        />
        :
        <>
          {/* Display Data or Loading/Errors */}
          {isLoading ?
            <ActivityIndicator />
            :
            isError ?
              <Text color={'red.600'}>Error while fetching cases.</Text>
              :
              <FlatList
                data={data}
                renderItem={renderCaseItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent={() => <Text color={'red.600'}>No cases found.</Text>}
              />
          }
        </>
      }
    </View>
  );
};

export default MyCaseListing;
