import {useState} from 'react';
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import {TextComponent} from '../Text/index-text';
import {ButtonComponent} from '../Button/index-button';
import {ICart} from '../../types/interfaces';
import {formatPrice} from '../../utils/functions';
import {PlusCircle} from '../../../assets/icons/PlusCircle';
import {MinusCircle} from '../../../assets/icons/MinusCircle';
import {TProducts} from '../../types/types';
import ModalFinishedOrder from '../ModalFinishedOrder/index-modalFinishedOrder';

interface ICartItem {
  cartItem: ICart[];
  onAdd: (product: TProducts) => void;
  onRemove: (product: TProducts) => void;
}

const Cart = ({cartItem, onAdd, onRemove}: ICartItem) => {
  const [finished, setFinished] = useState(false);

  const totalItems = cartItem.reduce((acc, {product, quantity}) => {
    return acc + product.price * quantity;
  }, 0);

  const handleConfirmOrder = () => {
    setFinished(true);
  };

  return (
    <>
      {finished && <ModalFinishedOrder />}
      <FlatList
        data={cartItem}
        keyExtractor={key => key.product._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item: products}) => (
          <View className="flex-row p-3 bg-gray-200">
            <Image
              source={{
                uri: `http://192.168.0.71:3001/uploads/${products.product.imagePath}`,
              }}
              className="w-20 h-12"
            />
            <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 mx-3 opacity-50">
              {products.quantity}x
            </TextComponent>
            <View
              style={{maxWidth: 220, minWidth: 220, width: 220}}
              className="flex-row justify-between">
              <View style={{maxWidth: 145}} className="w-full">
                <TextComponent numberOfLine={1}>
                  {products.product.name}
                </TextComponent>
                <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 opacity-50">
                  R$ {formatPrice(products.product.price)}
                </TextComponent>
              </View>
              <View className="flex-1 items-center flex-row justify-around">
                <TouchableOpacity onPress={() => onAdd(products.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemove(products.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View className="flex-row items-center justify-between h-28 bg-slate-50 px-3">
        <View>
          {cartItem.length > 0 ? (
            <View>
              <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 opacity-50">
                Total
              </TextComponent>
              <TextComponent style="font-fontGeneralSansBold text-base text-zinc-900">
                R$ {formatPrice(totalItems)}
              </TextComponent>
            </View>
          ) : (
            <TextComponent style="font-fontGeneralSansRegular text-base text-zinc-900 opacity-50">
              Carrinho Vazio
            </TextComponent>
          )}
        </View>
        <ButtonComponent
          text={'Confirmar pedido'}
          handleClick={handleConfirmOrder}
          state={{
            disabled: cartItem.length === 0,
          }}
        />
      </View>
    </>
  );
};

export default Cart;
