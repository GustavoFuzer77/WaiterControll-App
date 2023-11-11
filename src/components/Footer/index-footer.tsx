import {View} from 'react-native';
import {useState} from 'react';
import {TextComponent} from '../Text/index-text';
import {ButtonComponent} from '../Button/index-button';
import Cart from '../Cart/index-cart';
import {ICart} from '../../types/interfaces';
import {TProducts} from '../../types/types';

interface IFooter {
  // setActionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActionModal: () => void;
  selectedTable: string;
  cartItems: ICart[];
  handleSelectedTable: () => void;
  handleSelect: {
    handleAddProductToCart: (product: TProducts) => void;
    handleDecreaseItems: (product: TProducts) => void;
  };
  handleConfirmOrder: () => void;
  isLoading: boolean;
  isLoadingFoods: boolean;
}

export const Footer = ({
  setActionModal,
  selectedTable,
  cartItems,
  handleSelect,
  handleConfirmOrder,
  isLoading,
  isLoadingFoods,
}: IFooter) => {
  return (
    <View>
      {selectedTable?.length > 0 && (
        <View
          style={{maxHeight: 300, minHeight: 0, height: 'auto'}}
          className=" bg-gray-200 ">
          <Cart
            onConfirmOrder={handleConfirmOrder}
            onRemove={handleSelect.handleDecreaseItems}
            onAdd={handleSelect.handleAddProductToCart}
            cartItem={cartItems}
            loading={isLoading}
          />
        </View>
      )}

      {!selectedTable && (
        <View className="h-28 bg-slate-100 p-3 ">
          <View className=" h-full justify-center">
            <ButtonComponent
              text={'Novo pedido'}
              handleClick={setActionModal}
              // loading={isLoadingFoods}
              state={{
                disabled: isLoadingFoods,
              }}
            />
          </View>
        </View>
      )}
      {/* <View className="h-28 bg-slate-100 p-3 ">
        {selectedTable?.length > 0 ? (
          <Cart cartItem={cartItems} />
        ) : (
          <View className=" h-full justify-center">
            <ButtonComponent
              text={'Novo pedido'}
              handleClick={setActionModal}
              state={{
                disabled: false,
              }}
            />
          </View>
        )}
      </View> */}
    </View>
  );
};
