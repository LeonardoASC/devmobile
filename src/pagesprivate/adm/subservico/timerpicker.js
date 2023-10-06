import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [tempo, setTempo] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setTempo(selectedTime);
    }
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View className="  p-3">
      <TouchableOpacity onPress={showTimepicker}>
        <TextInput
          className="border-cyan-600 border p-4 rounded  bg-white"
          placeholder="Selecione o tempo"
          editable={false}
          value={tempo ? tempo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={new Date(new Date().setHours(0,0))}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
}
