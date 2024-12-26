import MainLayout from "./components/layout/main-layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}
