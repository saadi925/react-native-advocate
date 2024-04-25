import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, Pressable, KeyboardType } from 'react-native';
import { useCreateOrUpdateLawyerProfileMutation } from '../../store/query/lawyerApi';
import { LawyerProfile } from '../../../types/Cards';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { COLORS } from '../../../config/constants';
import EditIcon from '../../icons/EditIcon';
import { Box, Select, TextArea } from 'native-base';
import { errorChecker } from '../../hooks/useLogin';

const statusOptions = ['AVAILABLE', 'BUSY', 'OFFLINE'];

export default function LawyerProfileScreen() {
  const profile = useSelector((state: RootState) => state.auth.lawyerProfile);

  const [saveProfile, { isLoading, isError, error }] = useCreateOrUpdateLawyerProfileMutation();
  const [profileData, setProfileData] = useState<LawyerProfile | null>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({})
  const setValue = (name: keyof LawyerProfile, value: string) => {
    setProfileData(
      { ...profileData, [name]: value }
    )
  }
  const handleSave = async () => {
    try {
      if (profileData) {
        setErrors({})
        const response = await saveProfile(profileData).unwrap();
        setIsEditing(false);
        console.log("response", response);
      }
    } catch (error) {
      const errs = errorChecker(error)
      console.log(errs);
      
      if (errs.length === 1 && typeof errs[0].msg === 'string') {
        setErrors({ password: errs[0].msg })
      }
      errs.forEach((err: any) => {
        if ('msg' in err) {
          if (err.path) {
            setErrors({ ...errors, [err.path]: err.msg });
          }
        }
      })
    }
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.main }}>
      <Text
        style={{ fontSize: 20, textAlign: 'center', color: COLORS.surface }}
      >
        This profile will be visible to clients, and will impact your visibility in search results.
      </Text>
      <Pressable style={{
        position: 'absolute',
        right: 0
      }} onPress={() => setIsEditing(!isEditing)} >
        <EditIcon size={24} fill='gray' />
      </Pressable>
      <InputEditableWrapper required errors={errors} name="email" placeholder='Email' value={profileData?.email || ''} setValue={setValue} isEditing={isEditing} />
      <Box style={{ paddingHorizontal: 12, marginVertical: 4 }}>
        {
          'description' in errors ? <Text style={{
            color: 'red'
          }}>
        Description cannot be empty
          </Text> : null
        }
        <Text style={{
          color: COLORS.surface,
        }}>{'Description *'}</Text>
        {isEditing ? <TextArea value={profileData?.description} onChangeText={(text)=> setValue('description', text)}  fontSize={18} borderColor={'gray.500'} color={'white'} autoCompleteType={''} minHeight={60} placeholder='Description' />
          : <Text style={{
            fontSize: 18,
            color: 'white'
          }} >{profileData?.description || 'No description provided'}</Text>
        }

      </Box>
      <InputEditableWrapper errors={errors} name="instagram" keyboardType="url" placeholder="Instagram Url" value={profileData?.instagram || ''} setValue={setValue} isEditing={isEditing} />
      <InputEditableWrapper errors={errors} name="facebook" keyboardType="url" placeholder="Facebook Url" value={profileData?.facebook || ''} setValue={setValue} isEditing={isEditing} />
      <InputEditableWrapper errors={errors} name="linkedin" keyboardType="url" placeholder="Linked In Url" value={profileData?.linkedin || ''} setValue={setValue} isEditing={isEditing} />
      <InputEditableWrapper required errors={errors} name="experience" keyboardType='numeric' max={2} placeholder="Experience in years" value={profileData?.experience || ''} setValue={setValue} isEditing={isEditing} />
      <InputEditableWrapper required errors={errors} name="education" placeholder="Education" value={profileData?.education || ''} setValue={setValue} isEditing={isEditing} />
      <Box style={{ paddingHorizontal: 12, marginVertical: 4 }}>
        {
          'specialization' in errors ? <Text style={{
            color: 'red'
          }}>
          cannot be empty
          </Text> : null
        }
        <Text style={{
          color: COLORS.surface,
        }}>{'Specialization In *'}</Text>
        {
          isEditing ? <Select color={'white'} fontSize={"xl"}
            selectedValue={profileData?.specialization}
            borderWidth={0}

            onValueChange={(value: any) => setValue("specialization", value)}
          >
            <Select.Item label="Family" value="FAMILY" />
            <Select.Item label="Criminal" value="CRIMINAL" />
            <Select.Item label="Civil" value="CIVIL" />
            <Select.Item label="Labour" value="LABOUR" />
            <Select.Item label="Property" value="PROPERTY" />
            <Select.Item label="Business" value="BUSINESS" />
            <Select.Item label="Other" value="OTHER" />
          </Select> : <Text style={{ fontSize: 18, color: 'white', padding: 4 }}>{profileData?.specialization || 'No specialization provided'}</Text>
        }
      </Box>
      <InputEditableWrapper errors={errors} name="officeAddress" placeholder="Office Address" value={profileData?.officeAddress || ''} setValue={setValue} isEditing={isEditing} />
      <InputEditableWrapper errors={errors} name="phone" keyboardType={"phone-pad"} placeholder="Phone" value={profileData?.phone || ''} setValue={setValue} max={13} isEditing={isEditing} />
      {
        isEditing && <Pressable disabled={isLoading} onPress={handleSave} style={{
          backgroundColor: COLORS.surface,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          borderRadius: 12,
          marginBottom: 4
        }}>
          {
            !isLoading ? <Text style={{ color: COLORS.main, padding: 10, fontSize: 18 }}>
              Save
            </Text> : <ActivityIndicator color={COLORS.back} size={'large'} />
          }
        </Pressable>
      }
    </ScrollView>
  );
}


const InputEditableWrapper = ({ name, value, setValue, isEditing, placeholder, keyboardType,
  max, errors, required
}: { name: keyof LawyerProfile; value: string; setValue: (name: keyof LawyerProfile, value: string) => void; isEditing: boolean, placeholder: string, keyboardType?: KeyboardType, max?: number, errors: any , required ?: boolean}) => {
  const key = name as string | number | symbol
  const [err, setErr] = useState('')
  useEffect(() => {
    setErr("")
    if (key in errors) {
      if (key === 'experience' || key === 'education') {
        setErr('cannot be empty')
      }else setErr(errors[key])
    }
  }, [key, errors])
  return (
    <View>
      <Text style={{
        color: COLORS.surface,
        paddingHorizontal: 12
      }}>{placeholder} {required ?'*' : '(optional)' } </Text>
      {isEditing ? (
        <Box>
          {

            err && <Text style={{
              color: 'red', paddingHorizontal : 12
            }}>
              {err}
            </Text>
          }
          <TextInput 
            style={{ padding: 10, margin: 10, marginTop: 2, borderWidth: 1, borderColor: 'gray', fontSize: 18, borderRadius: 12, backgroundColor :"#000"}}
            value={value}
            maxLength={max || undefined}
            keyboardType={keyboardType || undefined}
            placeholder={placeholder}
            onChangeText={(text) => setValue(name, text)}
          />
        </Box>
      ) : (
        <Text style={{ color : 'white' ,fontSize: 18, padding: 10, margin: 10 }}>{value || `No ${placeholder} provided`}</Text>
      )}
    </View>
  );
}
