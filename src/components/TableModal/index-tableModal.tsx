import {Modal, TouchableOpacity, View} from 'react-native';
import {TextComponent} from '../Text/index-text';
import {Close} from '../../../assets/icons/Close';
import {InputComponent} from '../Input/index-input';
import {ButtonComponent} from '../Button/index-button';
import {useState} from 'react';

interface ITableModal {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export const TableModal = ({visible, onClose, onSave}: ITableModal) => {
  const [TableNumber, setTableNumber] = useState<string>('');
  function handleSave(table: string) {
    setTableNumber('')
    onSave(table);
    onClose();
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          alignItems: 'stretch',
          justifyContent: 'center',
          padding: 20,
        }}>
        <View className="w-full h-56 bg-white p-4 rounded-xl">
          <View className=" flex-row justify-between">
            <TextComponent style="font-fontGeneralSansSemibold text-lg text-zinc-900 ">
              Informe a Mesa:
            </TextComponent>
            <TouchableOpacity onPress={onClose}>
              <Close color="black" />
            </TouchableOpacity>
          </View>
          <View className="mt-6 mb-6">
            <InputComponent
              onChange={setTableNumber}
              placeholder="Número da mesa"
            />
          </View>
          <View>
            <ButtonComponent
              text={'Salvar'}
              handleClick={() => handleSave(TableNumber)}
              state={{
                disabled: TableNumber.length === 0 ? true : false,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
