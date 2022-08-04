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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../../components/Button";


interface IItem {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
}

interface IItemList {
  item: IItem;
}

type IReponseData = {
  results: IItem[]
}


export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);
  // const navigation = useNavigation();

  async function getStarships() {
    try {
      const { data: dataResponse } = await api.get<IReponseData>(`/starships?page=${page}`);

      const mapData = dataResponse.results.map(item => ({
        name: item.name,
        model: item.manufacturer,
        manufacturer: item.manufacturer,
        cost_in_credits: item.cost_in_credits,
        length: item.length,
        max_atmosphering_speed: item.max_atmosphering_speed,
      }))

      setData([...data, ...mapData]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getStarships();
  }, []);

  const renderItem = ({ item }: IItemList) => {
    return (
      <Button
        onPressNavigation={() => true}
      >
        <Text style={styles.title}>Nome:  <Text style={{ color: 'grey', }}>{item.name}</Text></Text>
        <Text style={styles.title}>Modelo: <Text style={{ color: 'grey', }}>{item.model}</Text></Text>
        <Text style={styles.title}>Manufaturação: <Text style={{ color: 'grey', }}>{item.manufacturer}</Text></Text>
        <Text style={styles.title}>Preço em créditos: <Text style={{ color: 'grey', }}>{item.cost_in_credits}</Text></Text>
        <Text style={styles.title}>Velocidade Máxima: <Text style={{ color: 'grey', }}>{item.max_atmosphering_speed}</Text></Text>
      </Button>
    );
  };

  const pullToRefresh = () => {
    setData([])
    setPage(1);

    getStarships();

  };

  const nextPage = () => {
    if (isLoading) {
      return;
    }

    setPage((prev) => prev + 1);
    getStarships();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && data.length > 0 ? (
        <FlatList
          style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}
          ref={flatlistRef}
          data={data}

          keyExtractor={(_) => String(Math.random() * (Math.random() * 20))}
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
