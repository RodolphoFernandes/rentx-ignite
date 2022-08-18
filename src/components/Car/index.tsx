import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';


import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
 Container,
 Details,
 Brand,
 Name,
 About,
 Rent,
 Period,
 Price,
 Type,
 CardImage
} from './styles';



interface Props extends RectButtonProps {
    data : CarDTO

}

export function Car({ data, ...rest }: Props){
    const Icon = getAccessoryIcon(data.fuel_type);

 return (
    <GestureHandlerRootView>
        <Container {...rest}>
                <Details>
                    <Brand>{data.brand}</Brand>
                    <Name>{data.name}</Name>

                    <About>
                        <Rent>
                            <Period>{data.rent.period}</Period>
                            <Price>{`R$ ${data.rent.price}`}</Price>
                        </Rent>

                        <Type>
                            <Icon />
                        </Type>
                    </About>
                </Details>

                <CardImage source={{uri: data.thumbnail}} resizeMode="contain"/>
        </Container>
   </GestureHandlerRootView>
 );
}

//'