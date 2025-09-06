import { useAuthStore } from "../store/useAuthStore";
import TextInput from "../components/Common/TextInput";
import Button from "../components/Common/Button";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const onSave = (e) => {
    e.preventDefault();
    alert("Profile save coming soon.");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      <form onSubmit={onSave} className="space-y-4">
        <TextInput label="Name" defaultValue={user?.name || ""} />
        <TextInput label="Email" defaultValue={user?.email || ""} disabled />
        <div className="pt-2">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
