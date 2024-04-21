import React, { useState } from 'react';
import { useLoginUserMutation } from '../store/query/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthentication from './useAuthentication';
export const errorChecker = (error: unknown) => {
  if (error && typeof error == "object"  &&   'data' in error && typeof error.data === 'object' && error.data && 'errors' in error.data &&  Array.isArray(error.data.errors)) {
    return error.data.errors
  }
  return []

}

const useLogin = () => {
  const {toggleAuth} = useAuthentication()
 const [login , {isLoading, }] = useLoginUserMutation()
  const [errors, setErrors] = React.useState({});
  
  const [formData , setFormData] = useState({
    email : '', password : ''
  })
  const validate = () => {
    if (formData.email === undefined) {
      setErrors({ ...errors,
        name: 'Email is required'
      });
      return false;
    } else if (formData.password.length < 8) {
      setErrors({ ...errors,
        name: 'password is tooshort'
      });
      return false;
    }
    return true
  }
  async function handleLogin(){
    try {
      
     const isOk =  validate()
      if (!isOk) {
        
        return
      }
      const response = await login(formData).unwrap()
      if (response.token) {
        AsyncStorage.setItem('token', response.token)
        toggleAuth()
      }
      
    } catch (error : unknown) {
      const errs = errorChecker(error)
       // {email : 'email is ---'}
      //  [{
       //  msg :{}
     //               }, { msg :{}}]
    }
  }

return {
    formData, setFormData, handleLogin, errors, setErrors, validate, isLoading
}
};

export default useLogin;