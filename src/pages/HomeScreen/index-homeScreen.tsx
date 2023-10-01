import {useState} from 'react';
import {View} from 'react-native';
import {Categories} from '../../components/Categories/index-categories';
import {Menu} from '../../components/Menu/index-menu';
import {Footer} from '../../components/Footer/index-footer';
import {Header} from '../../components/Header/index-header';
import {TableModal} from '../../components/TableModal/index-tableModal';

export const HomeScreen = () => {
  const [isVisible, setVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');


  const handleSaveTableNumber = (table: string) => setSelectedTable(table);
  const handleCancelOrder = () => setSelectedTable('')


  return (
    <>
      <View className="p-6 bg-stone-200">
        <Header selectedTable={selectedTable} onCancel={handleCancelOrder}/>
        <Categories />
      </View>
      <Menu />
      <Footer setActionModal={() => setVisible(true)} selectedTable={selectedTable} />
      <TableModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        onSave={handleSaveTableNumber}
      />
    </>
  );
};
