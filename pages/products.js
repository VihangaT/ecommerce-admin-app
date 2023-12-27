import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Layout>
      <Link className="btn-primary" href={"/products/new"}>
        Add a New Product
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
