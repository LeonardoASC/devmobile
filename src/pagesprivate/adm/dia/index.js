import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from "../../../services/api"
import { MaterialIcons } from '@expo/vector-icons';
import OpenDrawerButton from '../../../components/opendrawer';



export function Dia({ navigation }) {

  return (
    <SafeAreaView className="flex-1 bg-[#082f49]">
      <View className="flex h-1/4 justify-center items-center rounded-bl-xl shadow-neu-inset">
      <OpenDrawerButton />
        <Text className="text-white text-2xl font-extrabold text-center">
          Configuração dos dias trabalhados
        </Text>
      </View>
      <View>
        <Text>Dias</Text>
      </View>
      <View>
        <Text>Dias</Text>
      </View>
    </SafeAreaView>

  );
};
