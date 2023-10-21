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
import {ButtonComponent} from '../Button/index-button';
import {formatPrice} from '../../utils/functions';

interface IProductModal {
  visible: boolean;
  onClose: () => void;
  product: TProducts | null;
  onAddToCart: (products: TProducts) => void;
}

export const ProductModal = ({visible, onClose, product, onAddToCart}: IProductModal) => {
  if (!product) {
    return null;
  }
  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <ImageBackground
          style={{width: '100%', height: 200}}
          source={{
            uri: `http://192.168.0.71:3001/uploads/1696110494446-OIP.jpeg`,
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
      <View className="px-6 mb-6">
        {product.ingredients.length > 0 && (
          <TextComponent style="font-fontGeneralSansSemibold text-lg text-zinc-900 mt-2">
            Ingredientes:
          </TextComponent>
        )}
      </View>
      <FlatList
        className="px-6"
        data={product.ingredients}
        keyExtractor={key => key._id}
        renderItem={({item: ingredients}) => (
          <View className="border border-gray-300 rounded-md py-5 px-6 flex-row mb-2">
            <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 mr-3">
              {ingredients.icon}
            </TextComponent>
            <TextComponent>{ingredients.name}</TextComponent>
          </View>
        )}
      />
      <View className="h-28 bg-white p-3 ">
        <View className="flex-row justify-between h-full items-center">
          <View className="px-3">
            <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 opacity-50">
              Preço
            </TextComponent>
            <TextComponent style="font-fontGeneralSansBold text-base text-zinc-900 ">
              R$ {formatPrice(product.price)}
            </TextComponent>
          </View>
          <View className="w-2/3 ">
            <ButtonComponent
              text={'Adicionar ao pedido'}
              handleClick={() => {
                onAddToCart(product)
                onClose()
              }}
              state={{
                disabled: false,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
