import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {TextComponent} from '../Text/index-text';

interface IButton {
  text: string | number;
  handleClick: () => void;
  state?: {disabled: boolean};
  backgroundColor?: string;
  style?: string;
  loading?: boolean;
}

export const ButtonComponent = ({
  text,
  handleClick,
  state,
  backgroundColor,
  style,
  loading,
}: IButton) => {
  const validateButtonStatement = () => {
    if (state?.disabled || loading) {
      return `bg-gray-400`;
    }

    if (backgroundColor) {
      return backgroundColor;
    }
    return `bg-red-400`;
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      disabled={state?.disabled || loading}>
      <View className={`${validateButtonStatement()} flex rounded-3xl w-full`}>
        {!loading && (
          <TextComponent
            style={
              ` text-lg p-3 text-center ${style}` ??
              `font-fontGeneralSansSemibold text-lg text-slate-100 p-3 text-center`
            }>
            {text}
          </TextComponent>
        )}

        {loading && (
          <View className={'justify-center p-4 '}>
            <ActivityIndicator color={'#fff'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
