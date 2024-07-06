import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OpenDrawerButton = ({cor}) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity className="z-1 left-4"
            onPress={() => navigation.openDrawer()}>
            <Ionicons
                name="menu"
                size={30}
                color={cor ? cor : "#fff"}
            />
        </TouchableOpacity>
    );
}

export default OpenDrawerButton;
