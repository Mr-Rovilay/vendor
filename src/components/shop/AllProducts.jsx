import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import { deleteProduct, getAllProductsShop } from "@/redux/actions/productAction";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";


const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
      dispatch(getAllProductsShop(seller._id)); // Refresh the list
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
    </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="font-bold">All Products</CardTitle>
      </CardHeader>
      {products?.length > 0 ? (
        <>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sold out</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="">{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>US$ {product.discountPrice}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sold_out || 0}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/product/${product._id}`}>
                          <Button variant="outline" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default AllProducts;