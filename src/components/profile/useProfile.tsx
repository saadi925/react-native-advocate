import AsyncStorage from '@react-native-async-storage/async-storage';
import  { useEffect, useState } from 'react'
// import RNFS from 'react-native-fs';

import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { HOST } from '../../../config/constants';
import { useDispatch } from 'react-redux';
import { ProfileInput } from '../../../types/Cards';
import { useCreateProfileMutation, useGetUserProfileQuery } from '../../store/query/profileApi';
import { setProfile } from '../../store/slices/authSlice';

export  function useProfile() {
  const dispatch = useDispatch()  
  const [isEditing, setIsEditing] = useState(false);
  const [errMsg , setErrMsg] = useState<string | null>(null)
  // const  {data ,refetch, isLoading, error : profileGettingError, isError : profileIsError} =useGetUserProfileQuery()
  //   console.log(data);
  //   useEffect(()=>{
  //     if (data) {
  //       dispatch(setProfile(data))
  //     }
  //   },[])
    const [onSave , {isLoading : saving , error : savingError, isError}] =useCreateProfileMutation()
    // const [queryCities , setQuery ] = useState("I")
    const [editedProfileData, setEditedProfileData] = useState<Partial<ProfileInput> | null | undefined>();
  
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [avatarSource, setAvatarSource] = useState<string | null>(null);
  // useEffect(()=>{
  //  fetchCities(queryCities)
  // },[queryCities, setQuery])

    const fetchCities = async (query : string) => {
      try {
        const response = await fetch(`${HOST}/api/get-cities?startsWith=${query}`);
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        } else {
          console.error('Failed to fetch cities');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const handleSave = async () => {
     try {
      const response = await onSave({...editedProfileData, avatar : avatarSource}).unwrap()
    if ('createdAt' in response) {
      dispatch(setProfile({
        ...editedProfileData, avatar : avatarSource
       }))
      //  refetch()

       setIsEditing(false);

    }
      
     } catch (exception) {
      console.log("Error saving profile", exception);
    if (exception && typeof exception === 'object' &&'data' in exception && exception.data &&
    typeof exception.data === 'object' && 'error' in exception.data && typeof exception.data.error === 'string') {
      setErrMsg(exception.data.error);
    }
     }


    };
  
    const uploadAvatar = async (data : any) => {
      try {
      if (editedProfileData?.avatar) {
        const token = await AsyncStorage.getItem('token');
        console.log(editedProfileData.avatar);
        
        // const avatarData = await RNFS.readFile(editedProfileData.avatar, 'base64');
        const response = await fetch(`${HOST}/user/profile/avatar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: data }),
        });
      // console.log(response);
      
        if (response.ok) {
          const body = await response.json();
          console.log(body);
          if (body.avatar) {
            
            setAvatarSource(`${HOST}${body.avatar}`);
          }
        } else {
          console.error('Failed to upload avatar:', response);
        }
      }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    };
    
    const openImagePicker = () => {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        includeBase64: true,
        selectionLimit: 1,
      };
    
      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
        } else if (response.assets) {
          // console.log(response.assets);
          
          const source = { uri: response.assets[0].uri };
          setEditedProfileData({ ...editedProfileData, avatar: source.uri });
           uploadAvatar(response.assets[0])
           
          
        }
      });
    };
    
    return {
        isEditing,
        setIsEditing,
        handleSave,
        uploadAvatar,
        openImagePicker,
        cities,
        selectedCity,
        setSelectedCity,
        avatarSource,
        setAvatarSource,
        editedProfileData,
        setEditedProfileData,
        saving,
        savingError,errMsg,
        isError, profileData : undefined,
        gettingProfileLoading : undefined,
    }
}
