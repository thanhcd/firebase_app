import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';
import icons from '@/constants/icons';
import { fetchUserData } from '@/lib/fireBase';
import { useAuth } from '@/lib/AuthContext';

const Profile = () => {
  interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
    middleText?: string;
  }

  const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    showArrow = true,
    middleText,
  }: SettingsItemProps) => {
    return (
      <TouchableOpacity
        className='flex flex-row items-center justify-between py-3'
        onPress={onPress}
      >
        <View className='flex flex-row items-center flex-1 gap-3'>
          <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
          <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>
            {title}
          </Text>
        </View>
        {middleText && <Text className='text-gray-500'>{middleText}</Text>}
        {showArrow && <Image source={icons.right} className='size-5' />}
      </TouchableOpacity>
    );
  };

  const { user } = useAuth();
  useEffect(() => {
    console.log('User from context:', user);
  }, [user]);

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
    <SafeAreaView className='h-full bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-poppins-bold text-primary-200'>Profile</Text>
        </View>
        {/* <TouchableOpacity onPress={handleLogout}>
          <Image source={icons.logout}/>
        </TouchableOpacity> */}

        {user && (
          <View className='flex-row flex mt-5'>
            <TouchableOpacity activeOpacity={0.7}>
              <View className='flex flex-row items-center relative mt-5'>
                <Image source={icons.date} className='size-28 rounded-full' />
                <View className='flex flex-col ml-5'>
                  <Text className='text-lg font-poppins-bold mt-2 text-primary-200'>{user?.email}</Text>
                  <Text className='text-gray-200 font-poppins-regular text-lg'>
                    @{user?.email?.split('@')[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.gender} title='Giới tính' middleText={user?.Gender ?? "Đang tải..."} onPress={() => router.push('/gender')} />
          <SettingsItem icon={icons.date} title='Sinh nhật' middleText={user?.Birthday ? new Date(user.Birthday).toISOString().split('T')[0] : "Đang tải..."} onPress={() => router.push('/date')} />
          <SettingsItem icon={icons.email} title='Email' middleText={user?.email ?? "Đang tải..."} onPress={() => router.push('/email')} />
          <SettingsItem icon={icons.phone} title='Số điện thoại' middleText={user?.Phone ?? "Đang tải..."} onPress={() => router.push('/phone')} />
          <SettingsItem icon={icons.password} title='Thay đổi mật khẩu' middleText='************' onPress={() => router.push('/changePass')} />
        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-gray-100'>
          <SettingsItem
            icon={icons.logout}
            title='Logout'
            textStyle='text-danger'
            showArrow={false}
            onPress={handleLogout}
          />
          <SettingsItem
            icon={icons.logout}
            title='Tạo dữ liệu'
            textStyle='text-danger'
            showArrow={false}
            onPress={handleLogout}
          />
          <SettingsItem
            icon={icons.logout}
            title='Test lấy dữ liệu'
            textStyle='text-danger'
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
