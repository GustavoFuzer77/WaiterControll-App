import { ReactNode } from 'react';
import {Text} from 'react-native';

interface IProps {
  children: string | number | ReactNode;
  style?: string;
}

export const TextComponent = ({children, style}: IProps) => {
  return <Text className={style ? style : 'font-fontGeneralSansRegular text-base text-zinc-900 '}>{children}</Text>;
};
