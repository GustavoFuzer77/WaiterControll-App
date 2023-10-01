import {useState} from 'react';
import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {products} from '../../mocks/products';
import {TextComponent} from '../Text/index-text';
import {formatPrice} from '../../utils/functions';
import {PlusCircle} from '../../../assets/icons/PlusCircle';
import {ProductModal} from '../ProductModal/index-productModal';

interface IProduct {
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
}

export const Menu = () => {
  const [openDetailProduct, setOpenDetailProduct] = useState(false);
  const [product, setProduct] = useState<null | IProduct>(null);

  const selectProductToOpen = (product: IProduct) => {
    setOpenDetailProduct(true);
    setProduct(product);
  };

  return (
    <>
      <ProductModal
        visible={openDetailProduct}
        onClose={() => setOpenDetailProduct(false)}
        product={product}
      />
      <FlatList
        data={products}
        keyExtractor={elx => elx._id}
        renderItem={({item: products}) => (
          <TouchableOpacity
            className="mt-3 p-2 flex-row  min-w-full h-32 border-b border-b-slate-300 border-opacity-25"
            onPress={() => selectProductToOpen(products)}>
            <View className=" w-1/3 h-auto rounded-md items-center justify-center">
              {/* <TextComponent>SEM FOTO</TextComponent> */}
              <Image
                style={{width: '100%', height: 100, borderRadius: 10}}
                source={{
                  uri: 'https://th.bing.com/th/id/R.469eaee2b9ac36c27feedfd2796cee0a?rik=Rvec%2b%2bz8yQtN5g&riu=http%3a%2f%2fastrolabio.com.mx%2fwp-content%2fuploads%2f2015%2f11%2fPizza-Margherita.jpg&ehk=oLfkE5pRt3sWIYWRbo76Bpm4LZPNIJozQ3VuCCbX16M%3d&risl=&pid=ImgRaw&r=0',
                }}
              />
            </View>
            <View className="w-2/3 p-2">
              <TextComponent style="font-fontGeneralSansBold text-lg text-zinc-900">
                {products.name}
              </TextComponent>
              <TextComponent style="font-fontGeneralSansRegular text-sm text-zinc-900 opacity-70 h-1/2">
                {products.description}
              </TextComponent>
              <View className="flex-1 flex-row justify-between align-middle items-center">
                <TextComponent style="font-fontGeneralSansSemibold text-lg text-zinc-900">
                  R$
                  <TextComponent>{formatPrice(products.price)}</TextComponent>
                </TextComponent>
                <TouchableOpacity>
                  <TextComponent>
                    <PlusCircle />
                  </TextComponent>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
