export const formatPrice = (price: number) => {
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formattedPrice.replace('R$', '').trim();
};
