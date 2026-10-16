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

    try {
      if (!user) return;
      const response = await createProduct({ product, user });
      console.log("Dialog response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
      >
        <Plus className="h-5 w-5" />
        <span>Add Product</span>
      </button>
      <dialog ref={dialogRef}>
        <h2>Create New Product</h2>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={newProduct.title}
                onChange={handleChange}
                placeholder="e.g. Ergonomic Office Chair"
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price ($) </label>
              <input
                type="number"
                name="price"
                id="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="49"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="categoryId"
              id="categoryId"
              value={newProduct.categoryId}
              onChange={handleChange}
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
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Enter product description and specifications"
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              id="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="https://images.example.com/product.jpg"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Product
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddProductDialog;
