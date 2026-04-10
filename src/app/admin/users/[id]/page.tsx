import { notFound } from "next/navigation";
import { getUserById } from "@/lib/data/users";
import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateUserAction, deleteUserAction } from "../actions";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(Number(id));
  if (!user) notFound();

  const updateAction = updateUserAction.bind(null, user.id);
  const deleteAction = deleteUserAction.bind(null, user.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit User
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{user.email}</p>
        </div>
        <DeleteButton action={deleteAction} label="Delete User" />
      </div>

      <div className="max-w-lg">
        <AdminForm action={updateAction} cancelHref="/admin/users">
          <Field label="Name" htmlFor="name">
            <Input id="name" name="name" type="text" defaultValue={user.name || ""} />
          </Field>

          <Field label="Email" htmlFor="email" required>
            <Input id="email" name="email" type="email" required defaultValue={user.email} />
          </Field>

          <Field
            label="New Password"
            htmlFor="password"
            hint="Leave blank to keep current password. Min 8 chars if changing."
          >
            <Input id="password" name="password" type="password" minLength={8} />
          </Field>

          <Field label="Role" htmlFor="role">
            <Select id="role" name="role" defaultValue={user.role || "admin"}>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
              <option value="editor">Editor</option>
            </Select>
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
