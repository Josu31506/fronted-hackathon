const ProductCard = ({ product }) => {
  const { name, brand, price, image_url: imageUrl, colorway } = product;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="aspect-square bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-xs uppercase text-gray-500">{brand}</p>
          <h3 className="text-lg font-semibold">{name}</h3>
          {colorway && <p className="text-sm text-gray-600">{colorway}</p>}
        </div>
        <p className="mt-auto text-base font-bold text-gray-900">${price ?? '--'}</p>
      </div>
    </article>
  );
};

export default ProductCard;
