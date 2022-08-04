import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import api from "../services";



export default function ModalScreen({ route }) {
  const { name, height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld
  } = route.params.item
  const [data, setData] = useState([])

  async function getHomeWorld() {
    try {
      const response = await api.get(homeworld)
      setData(response.data)
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    getHomeWorld()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Detalhes do personagem</Text>
      <Text style={styles.title}>Nome:  <Text style={{ color: 'grey', }}>{name}</Text></Text>
      <Text style={styles.title}>Genero:  <Text style={{ color: 'grey', }}>{gender}</Text></Text>
      <Text style={styles.title}>Nascimento:  <Text style={{ color: 'grey', }}>{birth_year}</Text></Text>
      <Text style={styles.title}>Cor da pele:  <Text style={{ color: 'grey', }}>{skin_color}</Text></Text>
      <Text style={styles.title}>Peso: <Text style={{ color: 'grey', }}>{mass}</Text></Text>
      <Text style={styles.title}>Altura: <Text style={{ color: 'grey', }}>{height}</Text></Text>
      <Text style={styles.title}>Cor do cabelo: <Text style={{ color: 'grey', }}>{hair_color}</Text></Text>
      <Text style={styles.title}>Cor dos olhos: <MaterialCommunityIcons style={{
        justifyContent: "center",
        textAlignVertical: 'bottom',
      }} size={30} color={eye_color} name="eye-outline" /></Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={[styles.title, { textAlign: 'center' }]}>Detalhes do planeta</Text>

      <Text style={styles.title}>Nome:  <Text style={{ color: 'grey', }}>{data.name}</Text></Text>
      <Text style={styles.title}>Clima: <Text style={{ color: 'grey', }}>{data.climate}</Text></Text>
      <Text style={styles.title}>População: <Text style={{ color: 'grey', }}>{data.population}</Text></Text>
      <Text style={styles.title}>Tipo do terreno: <Text style={{ color: 'grey', }}>{data.terrain}</Text></Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
