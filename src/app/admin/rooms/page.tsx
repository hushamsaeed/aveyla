import { getAllRooms } from "@/lib/data/rooms";
import Link from "next/link";
import { deleteRoomAction } from "./actions";

export default async function AdminRoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Rooms
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {rooms.length} room{rooms.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/rooms/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Room
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Name</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Slug</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Type</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Price From</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Sort</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No rooms yet. Add your first room.
                </td>
              </tr>
            )}
            {rooms.map((room, idx) => (
              <tr key={room.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-body text-sm text-dark-driftwood font-medium">
                  {room.name}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood font-mono">
                  {room.slug}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {room.roomType || "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {room.priceFrom ? `$${room.priceFrom}` : "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {room.sortOrder}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/rooms/${room.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteRoomAction(room.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="font-body text-sm text-red-500 hover:text-red-700 transition-colors"
                        onClick={(e) => {
                          if (!confirm("Delete this room? This cannot be undone.")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
