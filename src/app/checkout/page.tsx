import ProtectedRoute from "@/components/ProtectedRoute";
import CheckoutForm from "@/components/CheckOut";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutForm />
    </ProtectedRoute>
  );
}
