import React, { useState } from 'react';
import { View, TextInput, Button, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [duration, setDuration] = useState('00:00');
  const [showPicker, setShowPicker] = useState(false);
  
  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    setDuration(`${hours}:${minutes}`);
    setShowPicker(Platform.OS === 'ios'); 
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity activeOpacity={1} onPress={() => setShowPicker(true)}>
        <TextInput
          value={duration}
          placeholder="00:00"
          editable={false} 
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10 }}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
}


