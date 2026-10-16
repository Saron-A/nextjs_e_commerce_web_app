"use client";

import { Plus } from "lucide-react";
import { useRef, type FormEvent, type ChangeEvent, useState } from "react";
import { createProduct } from "@/Lib/productsApi";
import { useUserStore } from "@/store/userStore";
import { NewProduct } from "@/types/product";
import { Category } from "@/types/category";
// import { Product } from "@/types/product";

interface DialogProp {
  categories: Category[];
}

const AddProductDialog = ({ categories }: DialogProp) => {
  const user = useUserStore((state) => state.user);
  const [newProduct, setNewProduct] = useState({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: "",
    creationAt: new Date().toISOString(),
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: NewProduct = {
      title: newProduct.title.trim(),
      categoryId: Number(newProduct.categoryId),
      price: Number(newProduct.price),
      description: newProduct.description.trim(),
      images: [newProduct.image],
      creationAt: newProduct.creationAt,
    };

    setNewProduct({
      title: "",
      categoryId: "",
      price: "",
      description: "",
      image: "",
      creationAt: new Date().toISOString(),
    });
    try {
      if (!user) return;
      const response = await createProduct({ product, user });
      console.log("Dialog response", response);
      setSuccess("Created new product successfully");

      setTimeout(() => {
        closeDialog();
      }, 5000);

      setNewProduct({
        title: "",
        categoryId: "",
        price: "",
        description: "",
        image: "",
        creationAt: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
      setError("Failed to create product");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="h-5 w-5" /> <span>Add Product</span>
      </button>
      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-sm"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Create New Product
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a new item to your product catalog.
          </p>
        </div>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            <div>
              <label
                htmlFor="title"
                className="text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={newProduct.title}
                onChange={handleChange}
                placeholder="e.g. Ergonomic Office Chair"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-slate-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  placeholder="49"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="categoryId"
                  className="text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={newProduct.categoryId}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                >
                  <option value="">Select a category</option>
                  {categories?.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Enter product description and specifications"
                rows={4}
                className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="text-sm font-medium text-slate-700"
              >
                Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={newProduct.image}
                onChange={handleChange}
                placeholder="https://images.example.com/product.jpg"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Product
            </button>
            {success && (
              <p className="p-2 w-full border border-green-500 bg-green-200 text-green-500">
                {success}
              </p>
            )}
            {error && (
              <p className="p-2 w-full border border-red-500 bg-red-200 text-red-500">
                {error}
              </p>
            )}
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddProductDialog;
