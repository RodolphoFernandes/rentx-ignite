import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';


import {
 Container
} from './styles';

export function ButtonFloat({...rest}: RectButtonProps){
    const theme = useTheme();


    return (
    <GestureHandlerRootView>  
        <Container {...rest}>
            <Ionicons name='ios-car-sport' size={32} color='#E1E1E8'/>
        </Container>
    </GestureHandlerRootView>  
    );
}