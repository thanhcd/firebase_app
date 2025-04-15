import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'explore' }} />
      <Tabs.Screen name="cart" options={{ title: 'cart' }} />
      <Tabs.Screen name="offer" options={{ title: 'offer' }} />
      <Tabs.Screen name="profile" options={{ title: 'profile' }} />

    </Tabs>
  );
}
