import {View, TouchableOpacity} from 'react-native';
import {TextComponent} from '../Text/index-text';

interface IHeader {
  selectedTable: string;
  onCancel: () => void;
}

export const Header = ({selectedTable, onCancel}: IHeader) => {
  return (
    <View className="mb-6 flex flex-row justify-between">
      {selectedTable.length > 1 ? (
        <View className="flex flex-col">
          <TextComponent style="font-fontGeneralSansBold text-2xl text-zinc-900">
            Pedido
          </TextComponent>
          <TextComponent style="font-fontGeneralSansRegular text-sm text-zinc-900">MESA - {selectedTable}</TextComponent>
        </View>
      ) : (
        <View>
          <TextComponent>bem vindo(a) ao</TextComponent>
          <TextComponent style="font-fontGeneralSansBold text-xl text-zinc-900">
            FOOD
            <TextComponent style="font-fontGeneralSansRegular text-xl text-zinc-900">
              APP
            </TextComponent>
          </TextComponent>
        </View>
      )}
      <View>
        {selectedTable.length > 1 && (
          <TouchableOpacity onPress={onCancel}>
            <TextComponent style="font-fontGeneralSansRegular text-sm p-2 rounded bg-red-500 text-slate-200">
              Cancelar Pedido
            </TextComponent>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
