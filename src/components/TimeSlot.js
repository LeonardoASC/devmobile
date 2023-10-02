import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimeSlot = ({ time, onEdit, onDelete }) => {
  return (
    <View className="flex-row justify-between items-center mb-4 py-2 px-4 border border-white rounded">
      <Text className="text-white text-lg">{time}</Text>
      <View className="flex-row">
        <Button title="Editar" color="white" />
        <Button title="Excluir" color="white" />
      </View>
    </View>
  );
};


export default TimeSlot;
