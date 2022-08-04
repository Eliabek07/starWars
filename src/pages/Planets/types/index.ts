export interface IItem {
  name: string;
  climate: string;
  population: string;
  terrain: string;

}

export interface IItemList {
  item: IItem;
}

export interface IResponse {
  name: string;
  climate: string;
  population: string;
  terrain: string;
}

export type IReponseData = {
  results: IResponse[]
}