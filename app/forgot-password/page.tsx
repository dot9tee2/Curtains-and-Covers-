import PasswordResetRequestForm from "../../components/PasswordResetRequestForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <PasswordResetRequestForm />
    </div>
  );
} 