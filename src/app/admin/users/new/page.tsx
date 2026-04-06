import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import { createUserAction } from "../actions";

export default function NewUserPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Admin User
        </h1>
      </div>

      <div className="max-w-lg">
        <AdminForm action={createUserAction} cancelHref="/admin/users">
          <Field label="Name" htmlFor="name">
            <Input id="name" name="name" type="text" />
          </Field>

          <Field label="Email" htmlFor="email" required>
            <Input id="email" name="email" type="email" required />
          </Field>

          <Field label="Password" htmlFor="password" required hint="Minimum 8 characters">
            <Input id="password" name="password" type="password" required minLength={8} />
          </Field>

          <Field label="Role" htmlFor="role">
            <Select id="role" name="role" defaultValue="admin">
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
