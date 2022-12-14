import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

import { Accessory } from '../../components/Accessory';
import {BackButton} from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider';



import {
 Container,
 Header,
 CarImages, 
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 About,
 Accessories,
 Footer
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';



interface Params {
  car: CarDTO
}

export function CarDetails(){
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value,[0,200],[200,70], Extrapolate.CLAMP)
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1,0])
    }
  });

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;


  function handleGoBack(){
    console.log('cliquei')
    navigation.goBack();
  }

  function handleConfirmRental(){
    navigation.navigate('scheduling', { car });
  }



  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Animated.View 
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>      
          <BackButton onPress={handleGoBack}  />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider    
              imageUrl={car.photos} 
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>

        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory  
              key={accessory.type} 
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}
             />
          ))}

          
         
        </Accessories>


        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher per??odo do aluguel" onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
  back: {
    marginTop: 24
  }
})