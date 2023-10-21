import { ReactNode } from 'react';
import {Text} from 'react-native';

interface IProps {
  children: string | number | ReactNode;
  style?: string;
  numberOfLine?: number
}

export const TextComponent = ({children, style, numberOfLine}: IProps) => {
  return <Text ellipsizeMode="tail" numberOfLines={numberOfLine} className={style ? style : 'font-fontGeneralSansRegular text-base text-zinc-900 '}>{children}</Text>;
};
