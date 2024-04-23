import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setAuthenticated, setProfile, setRole } from '../store/slices/authSlice';
import { HOST } from '../../config/constants';

const useAuthentication = () => {
  const dispatch : AppDispatch = useDispatch()
 
  const auth =useSelector((state : RootState)=> state.auth.isAuthenticated)
  const profileData = useSelector((state : RootState)=> state.auth.profile)
  console.log(profileData);
 
  
 useEffect(()=>{
    getToken().then(token =>{
      if (token  && !auth) {
        dispatch(setAuthenticated(true))
          getRole().then(res=>{
            if (res) {
              dispatch(setRole(res as any))
            }
          })
      }
    })

  
 },[dispatch ])
 useEffect(()=>{
    fetchProfile()
 },[dispatch])
 async function fetchProfile(){
    try {
      const response = await fetch(
        `${HOST}/user/profile`
      ,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application', 
        
          authorization : `Bearer ${await getToken()}`        
        }}      )
      if (response.ok) {
        const body = await response.json()
        if (body) {
          dispatch(setProfile(body))
        }
      }
    } catch (error) {
      console.log(error)
    }
 }
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
  async function getRole() {
    const role = await AsyncStorage.getItem("role")
    return role 
  }
 async function logout(){
   await AsyncStorage.removeItem('token')
   dispatch(setAuthenticated(false))
   AsyncStorage.removeItem('role')
 }
 return {
    auth, toggleAuth, logout, getToken
 }
};

export default useAuthentication;