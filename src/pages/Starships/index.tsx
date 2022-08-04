import {
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import api from "../../services";
import * as S from './styles';

import { RootTabScreenProps } from "../../types";
import { useEffect, useRef, useState } from "react";
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

export default function TabTwoScreen({ }: RootTabScreenProps<"TabTwo">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);

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
        <S.TextInfo>Nome: <S.TextDetail>{item.name}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Modelo: <S.TextDetail>{item.model}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Manufaturação: <S.TextDetail>{item.manufacturer}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Preço em créditos: <S.TextDetail>{item.cost_in_credits}</S.TextDetail></S.TextInfo>
        <S.TextInfo>Velocidade Máxima: <S.TextDetail>{item.max_atmosphering_speed}</S.TextDetail></S.TextInfo>
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

