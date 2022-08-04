import {
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import api from "../../services";

import { RootTabScreenProps } from "../../types";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { IItemList, IReponseData } from "./types";
import * as S from './styles';

export default function TabThreeScreen({ }: RootTabScreenProps<"TabOne">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);

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

        <S.TextInfo>Nome: <S.TextDetail>{item.name}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Clime: <S.TextDetail>{item.climate}</S.TextDetail></S.TextInfo>
        <S.TextInfo>População: <S.TextDetail>{item.population}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Tipo do terreno: <S.TextDetail>{item.terrain}</S.TextDetail></S.TextInfo>


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
    <S.Container>
      {!isLoading && data.length > 0 ? (
        <S.List
          ref={flatlistRef}
          data={data}
          keyExtractor={(_) => String(Math.random() * (Math.random() * 20))}
          renderItem={renderItem}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          onEndReached={nextPage}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={pullToRefresh} />
          }
        />
      ) : (
        <S.Container>
          <ActivityIndicator size="large" color={"grey"} />
        </S.Container>
      )}
    </S.Container>
  );
}


