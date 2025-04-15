import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import images from '@/constants/images';
import FormFields from '@/components/FormField';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    router.push('/signUp');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Email và mật khẩu không thể để trống!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password); // Loại bỏ khoảng trắng
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      router.push('/home');
    } catch (error: any) {
      console.log(error); // In lỗi ra console để debug
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <View className='px-5'>
        <View className='items-center'>
          <Image source={images.sharebuy1} className='mt-14' />
        </View>
        <View className='py-2'>
          <Text className='font-poppins-bold text-xl text-center text-primary-200'>Chào mừng đến với ShareBuy</Text>
          <Text className='font-poppins-regular text-sm text-center text-gray-200 mt-2'>Đăng nhập để tiếp tục</Text>
          <View className="w-full min-h-[83vh] flex">
            <FormFields title="Email"
              otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
              placeholder="Email của bạn"
              icons={icons.message}
              handleChangeText={setEmail}
              value={email}
            />
            <FormFields title="Password"
              otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
              placeholder="Mật khẩu"
              icons={icons.password}
              keyboardType="password"
              secureTextEntry={true}
              handleChangeText={setPassword}
              value={password}
            />
            <CustomButton title={'Đăng nhập'}
              textStyles={'text-white'}
              containerStyles={'h-20 bg-primary-100 rounded-lg mt-5 '}
              handlePress={handleLogin}
            />
            <View className="flex-row items-center justify-center space-x-2 mt-8">
              <View className="flex-1 border-t border-gray-100" />
              <Text className="text-lg font-poppins-bold text-gray-200">HOẶC</Text>
              <View className="flex-1 border-t border-gray-100" />
            </View>
            <CustomButton title="Đăng nhập với Google"
              containerStyles="mt-5 border border-gray-100 h-20 justify-center items-center px-4 rounded-lg"
              icons={icons.google}
              textStyles={'text-gray-200'}
              handlePress={{}}
            />
            <CustomButton title="Đăng nhập với Facebook"
              containerStyles="mt-5 border border-gray-100 h-20 justify-center items-center px-4 rounded-lg"
              icons={icons.facebook}
              textStyles={'text-gray-200'}
              handlePress={{}}
            />
            <TouchableOpacity >
              <Text className='font-poppins-bold text-sm text-center text-primary-100 mt-2'>Quên mật khẩu</Text>

            </TouchableOpacity>
            <View className="flex-row justify-center items-center mt-2">
              <Text className="font-poppins-regular text-sm text-gray-200">
                Không có tài khoản?
              </Text>
              <TouchableOpacity className="ml-1" onPress={() => handleSignUp()}>
                <Text className="font-poppins-bold text-sm text-primary-100">
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>

      </View>
    </SafeAreaView>


  );
}
