import { notFound } from "next/navigation";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { updateRoomAction, deleteRoomAction } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";

function parseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [room] = db.select().from(rooms).where(eq(rooms.id, Number(id))).limit(1).all();
  if (!room) notFound();

  const amenities = parseJson(room.amenities);
  const updateAction = updateRoomAction.bind(null, room.id);
  const deleteAction = deleteRoomAction.bind(null, room.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Room
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{room.name}</p>
        </div>
        <DeleteButton action={deleteAction} label="Delete Room" />
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/rooms">
          <Field label="Name" htmlFor="name" required>
            <Input id="name" name="name" type="text" required defaultValue={room.name} />
          </Field>

          <Field label="Slug" htmlFor="slug" required hint="URL-friendly identifier">
            <Input id="slug" name="slug" type="text" required defaultValue={room.slug} />
          </Field>

          <Field label="Room Type" htmlFor="roomType">
            <Select id="roomType" name="roomType" defaultValue={room.roomType || ""}>
              <option value="">Select type...</option>
              <option value="village">Village Room</option>
              <option value="beach">Beach Villa</option>
              <option value="water">Water Bungalow</option>
              <option value="suite">Suite</option>
            </Select>
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={5} defaultValue={room.description || ""} />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" defaultValue={room.heroImage || ""} />

          <Field label="Amenities" htmlFor="amenities" hint="One amenity per line">
            <Textarea
              id="amenities"
              name="amenities"
              rows={6}
              defaultValue={amenities.join("\n")}
            />
          </Field>

          <Field label="Price From (USD/night)" htmlFor="priceFrom">
            <Input
              id="priceFrom"
              name="priceFrom"
              type="number"
              min="0"
              step="0.01"
              defaultValue={room.priceFrom?.toString() || ""}
            />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={room.sortOrder?.toString() || "0"}
            />
          </Field>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="noticeActive"
              name="noticeActive"
              value="1"
              defaultChecked={room.noticeActive === 1}
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="noticeActive" className="font-body text-sm text-dark-driftwood">
              Show notice banner on room page
            </label>
          </div>

          <Field label="Notice Text" htmlFor="noticeText" hint="Shown when notice is active">
            <Input id="noticeText" name="noticeText" type="text" defaultValue={room.noticeText || ""} />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
