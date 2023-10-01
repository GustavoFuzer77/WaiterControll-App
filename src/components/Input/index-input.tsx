import {TextInput} from 'react-native';

interface IInput {
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
}

export const InputComponent = ({placeholder, onChange}: IInput) => {
  return (
    <TextInput
      className="p-3 text-zinc-900 bg-white border rounded"
      placeholderTextColor={'rgb(24 24 27)'}
      keyboardType={'number-pad'}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
};
