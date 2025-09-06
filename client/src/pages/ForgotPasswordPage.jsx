import { useForm } from "react-hook-form";
import TextInput from "../components/Common/TextInput";
import Button from "../components/Common/Button";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    // Placeholder only, backend endpoint can be wired later
    alert("Password reset link will be sent if email exists.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              Forgot Password
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextInput
              type="email"
              label="Email"
              placeholder="john@example.com"
              {...register("email")}
            />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
