"use client";

import { deleteProductById } from "@/Lib/productsApi";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user";
import { useRef, type FormEvent, useState } from "react";
import { Product } from "@/types/product";
import { Trash } from "lucide-react";

interface DialogProp {
  product: Product;
}

const DeleteProductDialog = ({ product }: DialogProp) => {
  const user = useUserStore((state) => state.user);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) return;
      const response = await deleteProductById({ product, user });
      console.log(response);
      setSuccess("Deletion Successful");
      closeDialog();
    } catch (err) {
      console.log("Unable to delete product", err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors duration-200 hover hover focus focus focus focus hover:bg-red-100 hover:text-red-500"
        onClick={openDialog}
      >
        <Trash size={16} />
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
      >
        <article>
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Delete product
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  This action cannot be undone. The product will be removed.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            <p className="text-sm leading-6 text-slate-600">
              Are you sure you want to delete
              <span className="font-semibold text-slate-900">
                {product.title}
              </span>
              ?
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">Product ID</span>
                <span className="font-medium text-slate-700">
                  #{product.id}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-semibold text-slate-900">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleDelete}
            method="POST"
            className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash size={16} />
              Delete product
            </button>
          </form>
        </article>
      </dialog>
    </>
  );
};

export default DeleteProductDialog;
