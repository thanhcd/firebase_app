import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import FormFields from '@/components/FormField'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig' // chỉnh path nếu khác

const SignUpScreen = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { email, password, confirmPassword } = form;

    if (!email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Tạo tài khoản thành công:', userCredential.user);
      Alert.alert('Thành công', 'Tạo tài khoản thành công! Hãy đăng nhập lại!');
      router.push('/signIn');
    } catch (error: any) {
      console.log('Sign up error:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Lỗi', 'Email đã được sử dụng.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Lỗi', 'Email không hợp lệ.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo tài khoản.');
      }
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="px-5">
        <View className="items-center">
          <Image source={images.sharebuy1} className="mt-14" />
        </View>
        <View className="py-2">
          <Text className="font-poppins-bold text-xl text-center text-primary-200">Bắt đầu</Text>
          <Text className="font-poppins-regular text-sm text-center text-gray-200 mt-2">
            Tạo một tài khoản mới
          </Text>
          <View className="w-full min-h-[83vh] flex">

            <FormFields
              title="Email"
              placeholder="Email"
              icons={icons.message}
              otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
              value={form.email}
              handleChangeText={(value: string) => handleChange('email', value)}
            />

            <FormFields title="Password"
              otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
              placeholder="Mật khẩu"
              icons={icons.password}
              keyboardType="password"
              secureTextEntry={true}
              handleChangeText={(value: string) => handleChange('password', value)}
              value={form.password}
            />
            <FormFields title="Password"
              placeholder="Nhập lại mật khẩu"
              otherStyles="mt-5 border border-gray-100 h-16 justify-center items-center px-4 rounded-lg"
              icons={icons.password}
              keyboardType="password"
              secureTextEntry={true}
              handleChangeText={(value: string) => handleChange('confirmPassword', value)}
              value={form.confirmPassword}
            />
            <CustomButton
              title="Đăng ký"
              textStyles="text-white"
              containerStyles="h-20 bg-primary-100 rounded-lg mt-5"
              handlePress={handleSignUp}
            />

            <View className="flex-row justify-center items-center mt-2">
              <Text className="font-poppins-regular text-sm text-gray-200">Có tài khoản?</Text>
              <TouchableOpacity className="ml-1" onPress={() => router.push('/signIn')}>
                <Text className="font-poppins-bold text-sm text-primary-100">Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
