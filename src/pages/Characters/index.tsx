import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../../services";
import { FlatList, SafeAreaView } from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IItem {
  name: string;
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
}

interface IItemList {
  item: IItem;
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);
  // const navigation = useNavigation();

  async function getListCharacter() {
    try {
      const response = await api.get(`/people?page=${page}`);
      setData([...data, ...response.data.results]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setData([])
    getListCharacter();
  }, []);

  const renderItem = ({ item }: IItemList) => {
    return (
      <Button
        onPressNavigation={() => {
          navigation.navigate("Modal");
        }}
      >
        <Text style={styles.title}>Nome:  <Text style={{ color: 'grey', }}>{item.name}</Text></Text>
        <Text style={styles.title}>Altura: <Text style={{ color: 'grey', }}>{item.height}</Text></Text>
        <Text style={styles.title}>Cor do cabelo: <Text style={{ color: 'grey', }}>{item.hair_color}</Text></Text>
        <Text style={styles.title}>Peso: <Text style={{ color: 'grey', }}>{item.mass}</Text></Text>
        <Text style={styles.title }>Cor dos olhos: <MaterialCommunityIcons style={{
          justifyContent: "center",
          textAlignVertical: 'bottom',
        }} size={30} color={item.eye_color} name="eye-outline" /></Text>
      </Button>
    );
  };

  const pullToRefresh = () => {
    setLoading(true);
    setData([])
    setPage(1);
    getListCharacter();

  };
  // const renderItem = ({ item }) => {};

  const nextPage = () => {
    if (isLoading) {
      return;
    }

    setPage((prev) => prev + 1);
    getListCharacter();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && data.length > 0 ? (
        <FlatList
          style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}
          ref={flatlistRef}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          onEndReachedThreshold={0.4}
          // bounces
          onEndReached={nextPage}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={pullToRefresh} />
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={"grey"} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
