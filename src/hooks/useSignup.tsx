import React, { useState } from 'react';
import { signupData, useCreateUserMutation, useEmailVerifyMutation } from '../store/query/authApi';
import { errorChecker } from './useLogin';
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
    return regex.test(email);
  }

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
    }
  }
  async function handleVerify() {
    try {
      const verifyEmailResponse = await verifyEmail({
        email : formData.email, 
        code
      }).unwrap()
      
    } catch (error) {
      
    }
  }
return {
    formData, setFormData, handleSignup, errors,canVerify, code , setCode, isLoading, handleVerify, verifying
}
};

export default useSignup;