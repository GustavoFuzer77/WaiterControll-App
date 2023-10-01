import {
  Modal,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TProducts} from '../../types/types';
import {Close} from '../../../assets/icons/Close';
import {TextComponent} from '../Text/index-text';

interface IProductModal {
  visible: boolean;
  onClose: () => void;
  product: TProducts | null;
}

export const ProductModal = ({visible, onClose, product}: IProductModal) => {
  if (!product) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <ImageBackground
          style={{width: '100%', height: 200}}
          source={{
            uri: 'https://th.bing.com/th/id/R.469eaee2b9ac36c27feedfd2796cee0a?rik=Rvec%2b%2bz8yQtN5g&riu=http%3a%2f%2fastrolabio.com.mx%2fwp-content%2fuploads%2f2015%2f11%2fPizza-Margherita.jpg&ehk=oLfkE5pRt3sWIYWRbo76Bpm4LZPNIJozQ3VuCCbX16M%3d&risl=&pid=ImgRaw&r=0',
          }}>
          <TouchableOpacity
            onPress={onClose}
            className="bg-black opacity-60 rounded-full w-8 h-8 items-center justify-center absolute right-3 top-3">
            <Close />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View className="py-6 px-6">
        <TextComponent style="font-fontGeneralSansBold text-2xl text-zinc-900">
          {product.name}
        </TextComponent>
        <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 mt-2">
          {product.description}
        </TextComponent>
      </View>
      <View className="px-6">
        <TextComponent style="font-fontGeneralSansSemibold text-lg text-zinc-900 mt-2">
          Ingredientes:
        </TextComponent>
      </View>
      <FlatList
        className="px-6"
        data={product.ingredients}
        keyExtractor={key => key._id}
        renderItem={({item: ingredients}) => (
          <View className="border border-gray-300 rounded-md p-8 flex-row">

          </View>
        )}
      />
    </Modal>
  );
};
