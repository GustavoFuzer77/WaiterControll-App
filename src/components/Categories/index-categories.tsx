import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {categories} from '../../mocks/categories';
import {TextComponent} from '../Text/index-text';
import {TCategories} from '../../types/types';
import {Close} from '../../../assets/icons/Close';
import {apiRoute} from '../../utils/consts';
import {useState} from 'react';

interface ICategories {
  categories: TCategories[];
  handleSelect: (id: string) => void;
}

export const Categories = ({categories, handleSelect}: ICategories) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelector = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId;
    handleSelect(category);
    setSelectedCategory(category);
  };

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={key => key._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelector(item._id)}>
            <View className="mr-8 flex justify-center items-center">
              <View className={"bg-slate-100 p-2 rounded-full w-12 h-12 items-center justify-center"}>
                <ImageBackground
                  style={{width: '100%', height: 20}}
                  source={{
                    uri: `${apiRoute}/uploads/${item.icon}`,
                  }}
                />
              </View>
              <TextComponent style="font-fontGeneralSansRegular text-sm text-zinc-900">
                {item.name}
              </TextComponent>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
