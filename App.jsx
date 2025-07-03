import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import StackNav from './navigate/stackNav'
import Loader from './components/loader'



const App = () => {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  )
}

export default App