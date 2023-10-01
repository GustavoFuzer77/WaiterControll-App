import {FlatList, View, TouchableOpacity} from 'react-native';
import {categories} from '../../mocks/categories';
import {TextComponent} from '../Text/index-text';

export const Categories = () => {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={key => key._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View className="mr-8 flex justify-center items-center">
              <View className="bg-slate-100 p-2 rounded-full w-12 h-12 items-center justify-center">
                <TextComponent>{item.icon}</TextComponent>
              </View>
              <TextComponent style='font-fontGeneralSansRegular text-sm text-zinc-900'>{item.name}</TextComponent>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
