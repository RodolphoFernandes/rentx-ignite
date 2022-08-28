import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { 
  GestureHandlerRootView, 
  PanGestureHandler, 
  RectButton 
} from 'react-native-gesture-handler';

//eu digo que o button do recbutton será um elemento animado
const ButtonAnimated = Animated.createAnimatedComponent(RectButton)


import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 

} from './styles';


import { ButtonFloat } from '../../components/ButtonFloat';
import theme from '../../styles/theme';
import { LoadAnimation } from '../../components/LoadAnimation';


export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){      
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
 
  
  function handleCarDetails(car: CarDTO){
    
    navigation.navigate('carDetails', {car});
  }

  function handleMyCars(){
    console.log('cliequei')
    navigation.navigate('myCars');
  }


  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars');
        setCars(response.data);

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }

    }

    fetchCars();

  },[]);

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })

  }, []);

 

 return (
   <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
        <Header>
          <HeaderContent>
            <Logo width={RFValue(108)} height={RFValue(12)}/>
            <TotalCars>
              {!loading && `Total de ${cars.length} carros`}
            </TotalCars>
          </HeaderContent>
        </Header>
        { loading ? <LoadAnimation /> :
            <CarList 
            data={cars}
            KeyExtractor={(item: CarDTO) => item.id}
            renderItem={({item}: any) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }
        
        {/* <GestureHandlerRootView>  
          
        </GestureHandlerRootView>   */}

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22
              }            

            ]}
          >
            <GestureHandlerRootView>

            <ButtonAnimated 
              onPress={handleMyCars}
              style={[styles.button, {backgroundColor: theme.colors.main}]}
            >
                  <Ionicons 
                    name='ios-car-sport' 
                    size={32} 
                    color='#E1E1E8'
                  />
            </ButtonAnimated>
            </GestureHandlerRootView>
          </Animated.View>
        </PanGestureHandler>
        
   </Container>
 );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})