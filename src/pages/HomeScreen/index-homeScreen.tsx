import {useState} from 'react';
import {View} from 'react-native';
import {Categories} from '../../components/Categories/index-categories';
import {Menu} from '../../components/Menu/index-menu';
import {Footer} from '../../components/Footer/index-footer';
import {Header} from '../../components/Header/index-header';
import {TableModal} from '../../components/TableModal/index-tableModal';
import {ICart} from '../../types/interfaces';
import {TProducts} from '../../types/types';

export const HomeScreen = () => {
  const [isVisible, setVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICart[]>([]);

  const handleSaveTableNumber = (table: string) => setSelectedTable(table);
  const handleCancelOrder = () => {
    setSelectedTable('');
    setCartItems([])
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

      console.log(newItem, 'newItem');
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

  return (
    <>
      <View className="p-6 bg-stone-200">
        <Header selectedTable={selectedTable} onCancel={handleCancelOrder} />
        <Categories />
      </View>
      <Menu
        handleSelect={{handleAddProductToCart, handleDecreaseItems}}
        selectedTable={selectedTable}
        handleSelectedTable={() => {
          setVisible(true);
        }}
      />
      <Footer
        setActionModal={() => setVisible(true)}
        selectedTable={selectedTable}
        handleSelect={{handleAddProductToCart, handleDecreaseItems}}
        cartItems={cartItems}
        handleSelectedTable={() => {
          setVisible(true);
        }}
      />
      <TableModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        onSave={handleSaveTableNumber}
      />
    </>
  );
};
