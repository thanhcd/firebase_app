import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';

const profile = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      router.replace('/signIn');
      alert('Đăng xuất thành công!');
    } catch (e) {
      alert('Đăng xuất thất bại!');
      console.log('Lỗi khi đăng xuất', e);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
      <Text>profile</Text>
      
    </View>
  )
}

export default profile