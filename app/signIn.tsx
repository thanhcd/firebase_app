import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Đảm bảo đường dẫn đúng
import images from '@/constants/images';
import FormFields from '@/components/FormField';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state loading
  // Kiểm tra trạng thái đăng nhập khi component được tải
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
  
        onAuthStateChanged(auth, (user) => {
          if (user || storedUser) {
            console.log('Đã đăng nhập:', user || storedUser);
            router.push('/home');
          }
        });
      } catch (e) {
        console.error('Lỗi khi lấy user từ AsyncStorage', e);
      }
    };
  
    checkLoginStatus();
  }, []);

  const handleSignUp = () => {
    router.push('/signUp');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Email và mật khẩu không thể để trống!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // ✅ Lưu UID hoặc toàn bộ user nếu cần
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      router.push('/home');
    } catch (error: any) {
      console.log(error); // In lỗi ra console để debug
      Alert.alert('Lỗi', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push('/home');
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;
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
