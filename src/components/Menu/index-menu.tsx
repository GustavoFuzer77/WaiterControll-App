import {useState} from 'react';
import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {products} from '../../mocks/products';
import {TextComponent} from '../Text/index-text';
import {formatPrice} from '../../utils/functions';
import {PlusCircle} from '../../../assets/icons/PlusCircle';
import {ProductModal} from '../ProductModal/index-productModal';
import {ICart} from '../../types/interfaces';
import {TProducts} from '../../types/types';

interface IMenu {
  handleSelect: {
    handleAddProductToCart: (product: TProducts) => void;
    handleDecreaseItems: (product: TProducts) => void;
  };
  handleSelectedTable: () => void;
  selectedTable: string;
}

export const Menu = ({
  handleSelect,
  handleSelectedTable,
  selectedTable,
}: IMenu) => {
  const [openDetailProduct, setOpenDetailProduct] = useState(false);
  const [product, setProduct] = useState<null | TProducts>(null);

  const selectProductToOpen = (product: TProducts) => {
    setOpenDetailProduct(true);
    setProduct(product);
  };

  const handleAddToCart = (prod: TProducts) => {
    if (selectedTable.length <= 0) {
      handleSelectedTable();
      handleSelect.handleAddProductToCart(prod);
      return;
    }
    handleSelect.handleAddProductToCart(prod);
  };

  const handleRemoveToCart = (prod: TProducts) => {
    handleSelect.handleDecreaseItems(prod);
  }

  return (
    <>
      <ProductModal
        visible={openDetailProduct}
        onClose={() => setOpenDetailProduct(false)}
        product={product}
        onAddToCart={handleAddToCart}
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
                resizeMode={'cover'}
                source={{
                  uri: `http://192.168.0.71:3001/uploads/${products.imagePath}`,
                }}
              />
            </View>
            <View className="w-2/3 p-2">
              <TextComponent numberOfLine={1} style="font-fontGeneralSansBold text-lg text-zinc-900">
                {products.name}
              </TextComponent>
              <TextComponent numberOfLine={2} style="font-fontGeneralSansRegular text-sm text-zinc-900 opacity-70 h-1/2">
                {products.description}
              </TextComponent>
              <View className="flex-1 flex-row justify-between align-middle items-center">
                <TextComponent style="font-fontGeneralSansSemibold text-lg text-zinc-900">
                  R$
                  <TextComponent>{formatPrice(products.price)}</TextComponent>
                </TextComponent>
                <TouchableOpacity onPress={() => handleAddToCart(products)}>
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
