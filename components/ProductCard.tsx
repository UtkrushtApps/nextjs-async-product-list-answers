import React from "react";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      boxShadow: "0 2px 6px #eee",
      maxWidth: 270,
      padding: 16,
      background: "#fff"
    }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: 170, objectFit: "contain" }}
      />
      <h2 style={{ fontSize: 18, margin: "16px 0 8px" }}>{product.title}</h2>
      <p style={{ color: "#555", marginBottom: 8 }}>{product.description.substring(0, 80)}...</p>
      <div style={{ fontWeight: "bold", fontSize: 16 }}>${product.price.toFixed(2)}</div>
    </div>
  );
};

export default ProductCard;
