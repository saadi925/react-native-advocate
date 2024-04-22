import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setAuthenticated } from '../store/slices/authSlice';

const useAuthentication = () => {
  const dispatch : AppDispatch = useDispatch()
 const auth =useSelector((state : RootState)=> state.auth.isAuthenticated)
 console.log(auth);
 useEffect(()=>{
    getToken().then(token =>{
      if (token) {
        dispatch(setAuthenticated(true))
      }
    })
 },[dispatch ])
 
 async function getToken (){
   try {
    const token = await AsyncStorage.getItem('token')
    return token
   } catch (error) {
     throw new Error('unauthorized')
   }
  }
  function toggleAuth(){
   dispatch(setAuthenticated(true))
  } 
 async function logout(){
   await AsyncStorage.removeItem('token')
   dispatch(setAuthenticated(false))
 }
 return {
    auth, toggleAuth, logout, getToken
 }
};

export default useAuthentication;