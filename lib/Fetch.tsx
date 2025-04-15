import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Đảm bảo bạn đã cấu hình Firebase đúng
import { FlatList, Text, View } from "react-native";

interface User {
    id: string;
    heading: string;
    text: string;
}

export const Fetch = () => {
    const [users, setUsers] = useState<User[]>([]);
    const db = getFirestore(app);
    const todoRef = collection(db, "Todos");

    useEffect(() => {
        const unsubscribe = onSnapshot(
            todoRef,
            (querySnapshot) => {
                const users: User[] = [];
                querySnapshot.forEach((doc) => {
                    const { heading, text } = doc.data() as User;
                    users.push({
                        id: doc.id,
                        heading,
                        text,
                    });
                });
                setUsers(users);
                console.log(users);
            },
            (error) => {
                console.error("Error getting documents: ", error);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // Đảm bảo useEffect chỉ chạy một lần khi component được mount

    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            <FlatList
                style={{ height: '100%' }}
                data={users}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.heading}</Text>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />

        </View>
    );
};
