import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
 CarList

} from './styles';
import { ButtonFloat } from '../../components/ButtonFloat';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  

 
  
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
              Total de {cars.length} carros
            </TotalCars>
          </HeaderContent>
        </Header>
        { loading ? <Load /> :
            <CarList 
            data={cars}
            KeyExtractor={(item: CarDTO) => item.id}
            renderItem={({item}: any) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }
        
        <ButtonFloat  onPress={handleMyCars} />
        
        
   </Container>
 );
}