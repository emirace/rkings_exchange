// ProductContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import {
  createProductService,
  deleteProductService,
  fetchProductByIdService,
  fetchProductsService,
  updateProductService,
} from '../services/product';
import { ProductProps } from '../type/product';
import useAuth from './AuthContext';
import { getBackendErrorMessage } from '../utils/error';
import { convertCurrency } from '../utils/currency';
import { useWallet } from './WalletContext';

interface Props {
  children: ReactNode;
}

// Create the product context
export const ProductContext = createContext<
  | {
      products: ProductProps[];
      loading: boolean;
      error: string;
      fetchProductById: (productId: string) => Promise<ProductProps>;
      updateProduct: (product: ProductProps) => Promise<boolean>;
      createProduct: (product: ProductProps) => Promise<boolean>;
      fetchProducts: () => void;
      deleteProduct: (productId: string) => Promise<boolean>;
    }
  | undefined
>(undefined);

// Create the ProductProvider component
export const ProductProvider: React.FC<Props> = ({ children }) => {
  const { setAuthErrorModalOpen } = useAuth();
  const { baseCurrency } = useWallet();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false);

    // Check if the error indicates an invalid or expired token
    if (error === 'Token expired' || error === 'Invalid token') {
      setError('');
      // Set the state to open the auth error modal
      setAuthErrorModalOpen(true);
    } else {
      setError(error || 'An error occurred.');
    }
  };

  // Function to fetch products (implement your own API call)
  const fetchProductById = async (productId: string) => {
    try {
      setLoading(true);
      const result = await fetchProductByIdService(productId);
      setLoading(false);
      return result;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return null;
    }
  };

  const createProduct = async (productData: ProductProps) => {
    try {
      setLoading(true);
      const result = await createProductService(productData);
      setProducts((prevProducts) => {
        const updatedProducts = [result, ...prevProducts];
        return updatedProducts;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return false;
    }
  };

  const updateProduct = async (productData: ProductProps) => {
    try {
      setLoading(true);
      const result = await updateProductService(productData);
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((p) => {
          if (p._id === productData._id) {
            return result;
          } else {
            return p;
          }
        });
        return updatedProducts;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return false;
    }
  };

  // Function to delete a product (implement your own API call)
  const deleteProduct = async (productId: string) => {
    try {
      setLoading(true);
      const result = await deleteProductService(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== result._id)
      );
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return false;
    }
  };

  const updateProducts = async (products: ProductProps[]) => {
    setLoading(true);
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        product.baseCostPrice = await convertCurrency(
          product.costPrice,
          product.currency,
          baseCurrency?.currency
        );
        product.baseSellingPrice = await convertCurrency(
          product.sellingPrice,
          product.currency,
          baseCurrency?.currency
        );
        console.log(product);
        return product;
      })
    );
    setLoading(false);
    setProducts(updatedProducts);
  };

  const fetchProducts = async () => {
    setError('');
    try {
      const data = await fetchProductsService();
      setProducts(data);
      updateProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      handleError(getBackendErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    updateProducts(products);
  }, [baseCurrency]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook for using the product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
