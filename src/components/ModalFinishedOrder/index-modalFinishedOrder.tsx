import {View, Modal} from 'react-native';
import {CheckCircle} from '../../../assets/icons/CheckCircle';
import {TextComponent} from '../Text/index-text';
import {ButtonComponent} from '../Button/index-button';

interface OrderFinished {
  visible?: boolean;
  onClickedOk: () => void
}

const ModalFinishedOrder = ({visible, onClickedOk}: OrderFinished) => {
  return (
    <Modal visible={visible} animationType="fade">
      <View className="w-full h-full bg-red-400 flex-1 align-middle justify-center text-center items-center">
        <CheckCircle />
        <TextComponent style="font-fontGeneralSansBold text-xl text-white ">
          Pedido confirmado
        </TextComponent>
        <TextComponent style="font-fontGeneralSansRegular text-xl text-white">
          O pedido ja entrou na fila de produção!
        </TextComponent>
        <View className=' rounded-2xl bg-slate-100 w-1/4 my-3'>
          <ButtonComponent
            text={'Ok!'}
            style='text-zinc-900 p-2'
            backgroundColor='#fff'
            handleClick={onClickedOk}
            state={{
              disabled: false,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalFinishedOrder;
