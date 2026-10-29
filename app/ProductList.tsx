"use client";
import { useState, useEffect } from "react";
import { Product, Category } from "./types/product";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 12;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(data);
      } catch {
        // الأقسام مش أساسية: لو فشلت، الصفحة تفضل شغالة من غيرها
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const url = selectedCategory
          ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${PAGE_SIZE}&skip=${skip}`
          : `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=${PAGE_SIZE}&skip=${skip}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const data = await res.json();
        if (ignore) return;
        setProducts(data.products);
        setTotal(data.total);
      } catch {
        if (!ignore) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [searchQuery, selectedCategory, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Search Bar"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedCategory("");
            setPage(1);
          }}
        />
        <select
          className="border rounded-lg px-3 py-2 bg-background text-foreground"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchQuery("");
            setPage(1);
          }}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>No products found for &quot; {searchQuery} &quot;</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className="border border-gray-700 rounded-lg px-3 py-2 disabled:opacity-50 hover:border-gray-200 transition-colors ease-in-out disabled:border-gray-700"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous Page
            </button>
            <span>
              Page {page} Of {totalPages}
            </span>

            <button
              className="border border-gray-700 rounded-lg px-3 py-2 disabled:opacity-50 hover:border-gray-200 transition-colors ease-in-out disabled:border-gray-700"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}
