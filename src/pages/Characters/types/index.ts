export interface IItem {
  name: string;
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
}

export interface IItemList {
  item: IItem;
}

export type IResponse = {
  results: IItem[]
}