import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OpenDrawerButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            // style={{ position: 'absolute', top: 40, left: 10, zIndex: 1 }}
            className="absolute top-12 left-4 z-1"
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons
                name="menu"
                size={30}
                color="#000"
            />
        </TouchableOpacity>
    );
}

export default OpenDrawerButton;
