export const OrderItem = ({ item }) => {
  return (
    <div className="flex items-start space-x-4">
      <img
        src={item.images[0]?.url}
        alt={item.name}
        className="object-cover w-20 h-20 rounded"
      />
      <div>
        <h5 className="text-lg font-medium">{item.name}</h5>
        <p className="text-muted-foreground">
          US${item.discountPrice} x {item.qty}
        </p>
      </div>
    </div>
  );
};

