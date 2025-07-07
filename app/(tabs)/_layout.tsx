import { Redirect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function _layout() {

    const isAutenticated = false;
    if(!isAutenticated) return <Redirect href='/sign-in'/>
  return (
   <View>sayang</View>
  )
}