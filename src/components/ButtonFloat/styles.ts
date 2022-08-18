import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 60px;
    height: 60px;

    border-radius: 30px;

    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.colors.main};

    position: absolute;
    bottom: 13px;
    right: 22px;
`;
