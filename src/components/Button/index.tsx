import React, { Children, ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface IButton {
    onPressNavigation: () => void
    children: ReactNode | ReactNode[]
}
const Button: React.FC<IButton> = ({ onPressNavigation, children }) => {
    return <TouchableOpacity
        onPress={onPressNavigation}
        style={{
            borderRadius: 10,
            width: "100%",
            backgroundColor: "#fff",
            marginVertical: 5,
            padding: 10,
        }}
    >
        {children}
    </TouchableOpacity >
}

export default Button;