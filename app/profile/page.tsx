import ProtectedRoute from "../../components/ProtectedRoute";
import UserInfo from "../../components/UserInfo";
import SignOutButton from "../../components/SignOutButton";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <UserInfo />
        <div className="mt-4">
          <SignOutButton />
        </div>
      </div>
    </ProtectedRoute>
  );
} 