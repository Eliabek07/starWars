import {
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import api from "../../services";

import { RootTabScreenProps } from "../../types";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IItemList, IResponse } from "./types";
import * as S from './styles';


export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const flatlistRef = useRef(null);


  async function getListCharacter() {
    try {
      const { data: dataResponse } = await api.get<IResponse>(`/people?page=${page}`);
      const mapResponse = dataResponse.results.map(item => ({
        name: item.name,
        height: item.height,
        mass: item.mass,
        hair_color: item.hair_color,
        skin_color: item.skin_color,
        eye_color: item.eye_color,
        birth_year: item.birth_year,
        gender: item.gender,
        homeworld: item.homeworld
      }))
      setData([...data, ...mapResponse]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }

  const handleLoading = () => {
    setData([])
    getListCharacter();
  }

  useEffect(() => {
    handleLoading()
  }, []);

  const renderItem = ({ item }: IItemList) => {
    return (
      <Button
        onPressNavigation={() => {
          navigation.navigate("Modal", { item });
        }}
      >
        <S.Content>
          <S.TextInfo>Nome: <S.TextDetail>{item.name}</S.TextDetail></S.TextInfo>
          <S.TextInfo>Altura: <S.TextDetail>{item.height}</S.TextDetail></S.TextInfo>
          <S.TextInfo>Cor do cabelo: <S.TextDetail>{item.hair_color}</S.TextDetail></S.TextInfo>
          <S.TextInfo>Peso: <S.TextDetail>{item.mass}</S.TextDetail></S.TextInfo>
          <S.TextInfo>Cor dos olhos: <MaterialCommunityIcons size={30} color={item.eye_color || 'red'} name="eye-outline" /></S.TextInfo>
        </S.Content>
      </Button >
    );
  };

  const pullToRefresh = () => {
    handleLoading()
    setPage(1);
  };

  const nextPage = () => {
    if (isLoading) {
      return;
    }

    setPage((prev) => prev + 1);
    getListCharacter();
  };

  return (
    <S.Container>
      {!isLoading && data.length > 0 ? (
        <S.List
          ref={flatlistRef}
          data={data}
          keyExtractor={(_) => String(Math.random() * (Math.random() * 20))}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.4}
          onEndReached={nextPage}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={pullToRefresh} />
          }
        />
      ) : (
        <S.Container>
          <ActivityIndicator size="large" color={"grey"} />
        </S.Container>
      )
      }
    </S.Container >
  );
}