import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import TextInput from "../components/Common/TextInput";
import Button from "../components/Common/Button";
import { api } from "../lib/apiClient";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await api.post("/api/auth/reset-password", {
      token,
      password: data.password,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextInput
              type="password"
              label="New Password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="New strong password"
            />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
