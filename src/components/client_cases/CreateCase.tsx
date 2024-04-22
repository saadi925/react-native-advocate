import React from 'react';
import { View, Text, Button, Spinner, Select, Input } from 'native-base';
import { CaseDataInput, CaseCategory } from '../../../types/Cards';
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
    <View>
      {/* Title Input */}
      <Text>Title</Text>
      <Input
        placeholder="Title"
        value={data.title}
        onChangeText={(value) => setData({ ...data, title: value })}
      />

      {/* Description Input */}
      <Text>Description</Text>
      <Input
        placeholder="Description"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
      />

      {/* Category Selector */}
      <Text>Category</Text>
      <Select
        selectedValue={data.category}
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
      {/* {error && <Text>Error: {error.message}</Text>} */}

      {/* Create Button */}
      <Button onPress={onCreate} disabled={creating}>
        {creating ? <Spinner color="white" /> : <Text>Create</Text>}
      </Button>
    </View>
  );
};

export default CreateCase;
