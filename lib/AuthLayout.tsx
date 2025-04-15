import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';  // Thay đổi theo router bạn sử dụng
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Đảm bảo bạn đã cấu hình Firebase đúng

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Đã đăng nhập:', user);
            } else {
                console.log('Chưa đăng nhập');
            }
        });

        return () => unsubscribe(); // Dọn dẹp khi component bị unmount
    }, []);

    return <>{children}</>;
};

export default AuthLayout;
