import React from 'react';
import { View, Text, Button, Spinner, Select, Input, TextArea } from 'native-base';
import { CaseDataInput, CaseCategory } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';
interface CreateCaseProps {
  creating: boolean;
  error: any;
  onCreate: () => void;
  data: CaseDataInput;
  setData: React.Dispatch<React.SetStateAction<CaseDataInput>>;
}

const CreateCase: React.FC<CreateCaseProps> = ({
  creating,
  error,
  onCreate,
  data,
  setData,
}) => {
  const handleCategoryChange = (category: CaseCategory) => {
    setData({ ...data, category });
  };

  return (
    <View p={2}>
      {/* Title Input */}
      <Text fontSize={'lg'} color={'grey'}>Title</Text>
      <Input fontSize={'lg'} mt={2}
        borderWidth={0}
        borderBottomWidth={1} color={'white'}
        placeholder="Title"
        value={data.title}
        onChangeText={(value) => setData({ ...data, title: value })}
      />

      {/* Description Input */}
      <Text fontSize={'lg'} color={'grey'}>Description</Text>

      <TextArea mt={2} color={'white'} autoCompleteType={''} fontSize={'lg'}
        placeholder="Description"
        value={data.description}
        minHeight={200}
        borderBottomWidth={1}
        rounded={'lg'}
        borderColor={'blue.600'}
        onChangeText={(value) => setData({ ...data, description: value })}
      />

      {/* Category Selector */}
      <Text fontSize={'lg'} color={'grey'}>Category</Text>
      
      <Select color={'white'} fontSize={"xl"}
        selectedValue={data.category}
        borderWidth={0}

        onValueChange={(value : any) => handleCategoryChange(value)}
      >
        <Select.Item label="Family" value="FAMILY" />
        <Select.Item label="Criminal" value="CRIMINAL" />
        <Select.Item label="Civil" value="CIVIL" />
        <Select.Item label="Labour" value="LABOUR" />
        <Select.Item label="Property" value="PROPERTY" />
        <Select.Item label="Business" value="BUSINESS" />
        <Select.Item label="Other" value="OTHER" />
      </Select>

      {/* Error Message */}

      {/* Create Button */}
      <Button rounded={'full'} bg={COLORS.surface} onPress={onCreate} disabled={creating}>
        {creating ? <Spinner color="white" /> : <Text color={COLORS.back}>Create</Text>}
      </Button>
    </View>
  );
};

export default CreateCase;
