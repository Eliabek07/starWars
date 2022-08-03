import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../services";
import { FlatList, SafeAreaView } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect, useRef, useState } from "react";


interface IItem {
  name: string;
}

interface IItemList {
  item: IItem;
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

  async function getListCharacter() {
    try {
      const response = await api.get(`/planets?page=${page}`);
      setData([...data, ...response.data.results]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getListCharacter();
  }, []);

  const renderItem = ({ item }: IItemList) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Modal");
        }}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          marginVertical: 5,
          padding: 10,
        }}
      >
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const pullToRefresh = () => {
    setPage(1);
    getListCharacter();

  };
  
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
          style={{ flex: 1, width: "100%" }}
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
