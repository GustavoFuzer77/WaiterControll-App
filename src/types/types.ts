export type TProducts = {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: {
    name: string;
    icon: string;
    _id: string;
  }[];
};

export type TCategories = {
  _id: string;
  name: string;
  icon: string;
};
