import React, { useState } from 'react';
import {  useCreateUserMutation, useEmailVerifyMutation } from '../store/query/authApi';
import { errorChecker } from './useLogin';
import { signupData } from '../../types/Responses';
import { err } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setRole } from '../store/slices/authSlice';
const initialFormData : signupData= {
  name : '',  email : '', password : '', role :'CLIENT'
 }

const useSignup = () => {
  const [verifyEmail , {isLoading : verifying}] = useEmailVerifyMutation()
  const [createUser , {isLoading, error}] = useCreateUserMutation()
  const [errors , setErrors] = useState({})
  const [code , setCode] = useState<string>('')
  const [canVerify, setCanVerify] = useState(false);
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(regex.test(email));
    console.log(email);
    
    
    return regex.test(email);
  }
 const dispatch : AppDispatch = useDispatch()
  const [formData , setFormData] = useState(initialFormData)
  async function handleSignup(){
    const isEmail = validateEmail(formData.email)
    if (!isEmail) {
      
      setErrors({email : 'invalid email'})
      return;
    }
    if (formData.password.length < 8) {
      setErrors({password : 'password is too short'})
      return;
    }
    if (formData.name.length < 3) {
      setErrors({name : 'name is too short'})
      return;
    }
    try {
      const response = await createUser(formData).unwrap()
        if (response.redirectToVerify) {
          setCanVerify(true)
          setErrors({})
        }
      } catch (error) {
        const errs = errorChecker(error)
     if (errs.length === 1 && typeof errs[0].msg === 'string' ) {
        setErrors({email : errs[0].msg})
        if (errs[0].msg === 'verify your email to get logged in') {
          setCanVerify(true)
        }
     }
        else if (errs.length > 0) {
          errs.forEach(err => {
            if (err.path === 'email') {
              setErrors(prevErrors => ({ ...prevErrors, email: err.msg })); 
            } else if (err.path === 'password') {
              setErrors(prevErrors => ({ ...prevErrors, password: err.msg })); 
            }
          });
        }
      
    }
  }
  async function handleVerify() {
    try {
      console.log("code : && email :", code, " :", formData.email);
      
      const verifyEmailResponse = await verifyEmail({
        email : formData.email, 
        code
      }).unwrap()
      console.log("verifyEmailResponse :", verifyEmailResponse);
      
      if (verifyEmailResponse.token) {
        AsyncStorage.setItem('token', verifyEmailResponse.token)
        dispatch(setAuthenticated(true))
        dispatch(setRole(verifyEmailResponse.role)) 
        AsyncStorage.setItem("role", verifyEmailResponse.role)
        setCanVerify(false)
      }
    } catch (error) {
      if (typeof error === 'object' && error && 'data' in error && error.data && typeof error.data == 'object'
        && 'error' in error.data && error.data.error
      ) {
        setErrors({code : error.data.error})
      }
      
     
    }
  }
return {
    formData, setFormData, handleSignup, errors,canVerify, code , setCode, isLoading, handleVerify, verifying, setErrors, setCanVerify
}
};

export default useSignup;