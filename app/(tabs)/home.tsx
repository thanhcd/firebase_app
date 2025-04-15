import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Fetch } from '@/lib/Fetch'

const home = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Text>home</Text>
      <Fetch/>
    </SafeAreaView>
  )
}

export default home