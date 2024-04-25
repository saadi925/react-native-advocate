import React, { useEffect, useState } from 'react';
import { useLoginUserMutation } from '../store/query/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthentication from './useAuthentication';
import { setProfile, setRole, setUser } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
export const errorChecker = (error: unknown) => {
  if (error && typeof error == "object"  &&   'data' in error && typeof error.data === 'object' && error.data && 'errors' in error.data &&  Array.isArray(error.data.errors)) {
    return error.data.errors
  }
  return []

}

const useLogin = () => {
  const dispatch = useDispatch()
  const {toggleAuth} = useAuthentication()
 const [login , {isLoading, }] = useLoginUserMutation()
  const [errors, setErrors] = React.useState({});

  const [formData , setFormData] = useState({
    email : '', password : ''
  })
  const validate = () => {
    if (formData.email === undefined) {
      setErrors({ ...errors,
        email: 'Email is required'
      });
      return false;
    } else if (formData.password.length < 8) {
      setErrors({ ...errors,
        password: 'password is tooshort'
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
      console.log("response :", response);
      
      if (response.token) {
        AsyncStorage.setItem('token', response.token)
        toggleAuth()
       dispatch(setProfile(response.profile))
       dispatch(setUser(response.userId))
       AsyncStorage.setItem("role", response.role)
        dispatch(setRole(response.role))
      }
      
    } catch (error : unknown) {
      console.log(error);
      
      const errs = errorChecker(error)
      if ( errs.length === 1&&typeof errs[0].msg === 'string'){
        setErrors({password : errs[0].msg})
      }
      errs.forEach((err : any) => {
       if ('msg' in err) {
    if (err.path === 'email') {
      setErrors({ ...errors, email: err.msg });
    }
    if (err.path === 'password') {
      setErrors({ ...errors, password: err.msg });
    }}
      })
    }
  }

return {
    formData, setFormData, handleLogin, errors, setErrors, validate, isLoading
}
};

export default useLogin;