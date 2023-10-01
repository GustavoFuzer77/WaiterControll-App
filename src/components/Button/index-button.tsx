import {TouchableOpacity, View} from 'react-native';
import {TextComponent} from '../Text/index-text';

interface IButton {
  text: string | number;
  handleClick: () => void;
  state: {disabled: boolean};
  backgroundColor?: string;
}

export const ButtonComponent = ({
  text,
  handleClick,
  state,
  backgroundColor,
}: IButton) => {
  const validateButtonStatement = () => {
    if (state.disabled) {
      return `bg-gray-400`;
    }

    if (backgroundColor) {
      return backgroundColor;
    }
    return `bg-red-400`;
  };

  return (
    <TouchableOpacity onPress={handleClick} disabled={state.disabled}>
      <View className={`${validateButtonStatement()} flex rounded-3xl w-full`}>
        <TextComponent
          style={`font-fontGeneralSansSemibold text-lg text-slate-100 p-3 text-center`}>
          {text}
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};
