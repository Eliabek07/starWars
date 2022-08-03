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


interface IItem {
  name: string;
  climate: string;
  population: string;
  terrain: string;

}

interface IItemList {
  item: IItem;
}

interface IResponse {
  name: string;
  climate: string;
  population: string;
  terrain: string;
}

type IReponseData = {
  results: IResponse[]
}

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);
  // const navigation = useNavigation();

  async function getPLanets() {
    try {
      const { data: dataResponse } = await api.get<IReponseData>(`/planets?page=${page}`);

      const mapData = dataResponse.results.map(item => ({
        name: item.name,
        climate: item.climate,
        population: item.population,
        terrain: item.terrain,
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
    getPLanets();
  }, []);

  const renderItem = ({ item }: IItemList) => {
    return (
      <Button
        onPressNavigation={() => true}
      >
        <Text style={styles.title}>Nome:  <Text style={{ color: 'grey', }}>{item.name}</Text></Text>
        <Text style={styles.title}>Clima: <Text style={{ color: 'grey', }}>{item.climate}</Text></Text>
        <Text style={styles.title}>População: <Text style={{ color: 'grey', }}>{item.population}</Text></Text>
        <Text style={styles.title}>Tipo do terreno: <Text style={{ color: 'grey', }}>{item.terrain}</Text></Text>
      </Button >
    );
  };

  const pullToRefresh = () => {
    setData([])
    setPage(1);
    getPLanets();

  };

  const nextPage = () => {
    if (isLoading) {
      return;
    }

    setPage((prev) => prev + 1);
    getPLanets();
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && data.length > 0 ? (
        <FlatList
          style={styles.containerFlat}
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
  containerFlat: { flex: 1, width: "100%", paddingHorizontal: 16 },
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
