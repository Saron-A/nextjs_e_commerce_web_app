"use client";

import { editProductById } from "@/Lib/productsApi";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { type EditedProduct } from "@/types/product";
import { type Category } from "@/types/category";
import { useUserStore } from "@/store/userStore";
import { Pencil, X, CheckCircle2, AlertCircle } from "lucide-react";

interface DialogProp {
  product: EditedProduct;
  categories: Category[];
}

const EditProductDialog = ({ product, categories }: DialogProp) => {
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    price: String(product.price),
    categoryId: String(product.categoryId),
    description: product.description,
    image: product.images[0] ?? "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const user = useUserStore((state) => state.user);

  const openDialog = () => {
    setSuccess("");
    setError("");
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setEditedProduct((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any previous result before starting another attempt.
    setSuccess("");
    setError("");

    if (!user) {
      setError("You must be logged in to edit a product.");
      return;
    }

    const finalEditedProduct: EditedProduct = {
      id: product.id,
      title: editedProduct.title.trim(),
      price: Number(editedProduct.price),
      description: editedProduct.description.trim(),
      categoryId: Number(editedProduct.categoryId),
      images: [editedProduct.image.trim()],
      creationAt: product.creationAt,
    };

    setIsSubmitting(true);

    try {
      const response = await editProductById({
        product: finalEditedProduct,
        user,
      });

      console.log("Updated product:", response);

      setError("");
      setSuccess("Product updated successfully.");
    } catch (err) {
      console.error("Failed to edit the product:", err);

      setSuccess("");
      setError("Something went wrong while updating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        <Pencil size={16} />
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Edit product
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Update the details of your product below.
            </p>
          </div>

          {/* <button
            type="button"
            onClick={closeDialog}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <X size={18} />
          </button> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Product title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={editedProduct.title}
                onChange={handleChange}
                placeholder="e.g. Ergonomic Office Chair"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-slate-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                  placeholder="49.99"
                  min="0"
                  step="0.01"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={editedProduct.categoryId}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
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
                className="block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={editedProduct.description}
                onChange={handleChange}
                placeholder="Enter product description and specifications"
                rows={4}
                className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-700"
              >
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={editedProduct.image}
                onChange={handleChange}
                placeholder="https://images.example.com/product.jpg"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Enter a publicly accessible image URL.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Submit Changes
              </button>
            </div>

            {success && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p>{success}</p>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-600"
                />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Submit Changes
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default EditProductDialog;
