import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/Product";

const PRODUCTS_API = "https://fakestoreapi.com/products"; // Replace with your remote API if desired
const ANALYTICS_API = "/api/analytics/logPageView";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(PRODUCTS_API);
        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }
        const data: Product[] = await res.json();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
          // Start analytics logging; non-blocking and errors are hidden from the user
          void fetch(ANALYTICS_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ event: "products_page_viewed", timestamp: Date.now() })
          }).catch(() => {});
        }
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to load products. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Products</h1>
      {loading && <div>Loading products...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && products && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductsPage;
