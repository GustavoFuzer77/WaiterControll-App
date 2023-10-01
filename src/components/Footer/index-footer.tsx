import {View} from 'react-native';
import {TextComponent} from '../Text/index-text';
import {ButtonComponent} from '../Button/index-button';

interface IFooter {
  // setActionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActionModal: () => void;
  selectedTable: string;
}

export const Footer = ({setActionModal, selectedTable}: IFooter) => {
  return (
    <View>
      {false && <></>}
      <View className="h-28 bg-slate-100 p-3 ">
        {selectedTable?.length > 0 ? (
          <View className='flex flex-row items-center justify-between h-full'>
            <View>
              <TextComponent>Carrinho Vazio</TextComponent>
            </View>
            <ButtonComponent
              text={'Confirmar pedido'}
              handleClick={setActionModal}
              state={{
                disabled: true,
              }}
            />
          </View>
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
      </View>
    </View>
  );
};
