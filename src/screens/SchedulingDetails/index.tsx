import React, { useEffect, useState } from 'react';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import {format} from 'date-fns';
import { Alert } from 'react-native';

import { Accessory } from '../../components/Accessory';
import {BackButton} from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

import {
 Container,
 Header,
 CarImages,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 Footer,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
RentalPriceLabel,
RentalPriceDetails,
RentalPriceQuota,
RentalPriceTotal,
} from './styles';



interface Params {
  car: CarDTO,
  dates: string[]
}

interface RentalPeriod{
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
    const { car, dates } = route.params as Params;

  function handleGoBack(){
    navigation.goBack();
  }

  async function handleConfirmRental(){
    try {
      setLoading(true)
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        dates,
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      });

      api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      }).then(() => navigation.navigate('schedulingComplete'))
      .catch(() => Alert.alert('Não foi possível confirmar o agendamento.'));


    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento');
      setLoading(false);
    }
    
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

 return (
   <Container>
    <Header>
     <BackButton onPress={handleGoBack}  />
    </Header>

    <CarImages>
      <ImageSlider    
        imageUrl={car.photos} 
      />
    </CarImages>

    <Content>
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


      <RentalPeriod>
        <CalendarIcon>
          <Feather 
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          </CalendarIcon>
          
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>

      </RentalPeriod>

      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
          <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
          <RentalPriceTotal>{`R$ ${car.rent.price * dates.length }`}</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>
    </Content>

    <Footer>
      <Button 
        title="Alugar agora" 
        onPress={handleConfirmRental}
        color={theme.colors.success}
        enabled={!loading}
        loading={loading}
      />
    </Footer>

   </Container>
 );
}