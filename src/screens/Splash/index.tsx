import React, {useEffect} from 'react';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import 
    Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    Easing,
    
}from 'react-native-reanimated';

import {
 Container
} from './styles';


export function Splash(){
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: splashAnimation.value
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: splashAnimation.value
        }
    });


    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            {duration: 1000}
        )
    }, []);


    return (
        <Container>
            <Animated.View style={brandStyle}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={logoStyle}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
            
        </Container>
    );
}