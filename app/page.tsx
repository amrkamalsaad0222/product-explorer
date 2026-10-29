import ProductList from "./ProductList";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Product Explorer</h1>
      <ProductList />
    </main>
  );
}
