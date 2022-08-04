import styled from 'styled-components/native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

export const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
justify-content: center;
background-color: #282828;
`;

export const Content = styled.View`
flex: 1;
  
`;

export const TextInfo = styled.Text`
font-size: 20;
font-weight: bold
`;

export const TextDetail = styled.Text`
color: grey;
`;

export const List = styled.FlatList`
flex: 1;
width: ${responsiveScreenFontSize(45)}px;
padding: ${responsiveScreenFontSize(1)}px;
`;


