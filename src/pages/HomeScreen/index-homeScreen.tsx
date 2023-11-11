import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Categories} from '../../components/Categories/index-categories';
import {Menu} from '../../components/Menu/index-menu';
import {Footer} from '../../components/Footer/index-footer';
import {Header} from '../../components/Header/index-header';
import {TableModal} from '../../components/TableModal/index-tableModal';
import {ICart} from '../../types/interfaces';
import {TProducts} from '../../types/types';

import {TextComponent} from '../../components/Text/index-text';
import api from '../../utils/api';

export const HomeScreen = () => {
  const [isVisible, setVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [isLoadingButtonConfirmOrder, setIsLoadingButtonConfirmOrder] =
    useState(false);
  const [isLoadingProducts, setLoadingProducts] = useState(false);
  const [isCLickerCategory, setClickedCategory] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([api.get(`/categories`), api.get(`/products`)]).then(
      ([categoriesResponse, productResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productResponse.data);
        setLoadingProducts(false);
      },
    );
  }, []);

  const handleSaveTableNumber = (table: string) => setSelectedTable(table);
  const handleCancelOrder = () => {
    setSelectedTable('');
    setCartItems([]);
  };

  const handleAddProductToCart = (product: TProducts) => {
    setCartItems(prev => {
      const itemIndex = prev.findIndex(
        cartItem => cartItem.product._id === product._id,
      ); // 1 true -1 false
      if (itemIndex < 0) {
        return prev.concat({quantity: 1, product});
      }

      const newItem = [...prev];

      const restItem = newItem[itemIndex];

      newItem[itemIndex] = {
        ...restItem,
        quantity: newItem[itemIndex].quantity + 1,
      };

      return newItem;
    });
  };

  const handleDecreaseItems = (product: TProducts) => {
    setCartItems(prev => {
      const itemIndex = prev.findIndex(
        cartItem => cartItem.product._id === product._id,
      ); // 1 true -1 false

      const itemDetail = prev[itemIndex];

      const newItem = [...prev];
      const restItem = newItem[itemIndex];

      if (itemDetail.quantity === 1) {
        newItem.splice(itemIndex, 1);
        return newItem;
      }

      newItem[itemIndex] = {
        ...restItem,
        quantity: newItem[itemIndex].quantity - 1,
      };

      return newItem;
    });
  };

  const handleConfirmOrder = async () => {
    const payload = {
      table: selectedTable,
      products: cartItems.map(cartMap => ({
        product: cartMap.product._id,
        quantity: cartMap.quantity,
      })),
    };
    setIsLoadingButtonConfirmOrder(true)
    await api.post('/orders', payload);

    setSelectedTable('');
    setCartItems([]);
    setIsLoadingButtonConfirmOrder(false)
  };

  const handleSelectCategory = (categoryId: string) => {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;
    setClickedCategory(true);
    api.get(route).then(({data}) => {
      setProducts(data);
      setClickedCategory(false);
    });
  };

  return (
    <>
      <View className="p-6 bg-stone-200">
        <Header selectedTable={selectedTable} onCancel={handleCancelOrder} />
        {!isLoadingProducts && (
          <Categories
            handleSelect={handleSelectCategory}
            categories={categories}
          />
        )}
      </View>
      {isCLickerCategory ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={'red'} size={'large'} />
        </View>
      ) : (
        <>
          {isLoadingProducts ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator color={'red'} size={'large'} />
            </View>
          ) : (
            <>
              {products.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                  <TextComponent style="font-fontGeneralSansBold text-xl text-zinc-600">
                    Nenhum item encontrado
                  </TextComponent>
                  <TextComponent>😢</TextComponent>
                </View>
              ) : (
                <Menu
                  handleSelect={{handleAddProductToCart, handleDecreaseItems}}
                  selectedTable={selectedTable}
                  handleSelectedTable={() => {
                    setVisible(true);
                  }}
                  products={products}
                />
              )}
            </>
          )}
        </>
      )}
      <Footer
        setActionModal={() => setVisible(true)}
        selectedTable={selectedTable}
        handleSelect={{handleAddProductToCart, handleDecreaseItems}}
        cartItems={cartItems}
        handleSelectedTable={() => {
          setVisible(true);
        }}
        handleConfirmOrder={handleConfirmOrder}
        isLoading={isLoadingButtonConfirmOrder}
        isLoadingFoods={isLoadingProducts}
      />
      <TableModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        onSave={handleSaveTableNumber}
      />
    </>
  );
};
