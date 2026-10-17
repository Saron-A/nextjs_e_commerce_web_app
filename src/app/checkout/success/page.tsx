import ProtectedRoute from "@/components/ProtectedRoute";
import CheckoutSuccess from "@/components/CheckOutSuccess";

export default function CheckoutSuccessPage() {
  return (
    <ProtectedRoute>
      <CheckoutSuccess />
    </ProtectedRoute>
  );
}
