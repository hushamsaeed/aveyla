import { getAllSettings } from "@/lib/data/settings";
import { saveSettingsAction, addSettingAction } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Site Settings
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Key-value configuration for the site
        </p>
      </div>

      {/* Existing settings */}
      {settings.length > 0 && (
        <div className="mb-8 max-w-2xl">
          <form action={saveSettingsAction} className="space-y-0">
            <div className="rounded-sm bg-white border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <h2 className="font-body text-sm font-semibold text-dark-driftwood">
                  Current Settings
                </h2>
              </div>
              {settings.map((setting, idx) => (
                <div
                  key={setting.key}
                  className={`flex items-start gap-4 px-4 py-3 border-b border-gray-50 last:border-0 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                  }`}
                >
                  <div className="w-48 shrink-0">
                    <input
                      type="hidden"
                      name="key"
                      value={setting.key}
                    />
                    <p className="font-body text-sm font-medium text-dark-driftwood font-mono">
                      {setting.key}
                    </p>
                    {setting.updatedAt && (
                      <p className="font-body text-xs text-driftwood mt-0.5">
                        Updated {new Date(setting.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="value"
                      defaultValue={setting.value || ""}
                      className="w-full border border-gray-200 px-3 py-2 font-body text-sm outline-none focus:border-muted-ocean transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="submit"
                className="bg-terracotta px-6 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
              >
                Save All Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {settings.length === 0 && (
        <p className="mb-8 font-body text-sm text-driftwood">
          No settings configured yet. Add your first setting below.
        </p>
      )}

      {/* Add new setting */}
      <div className="max-w-2xl">
        <div className="rounded-sm bg-white p-6 border border-gray-100 shadow-sm">
          <h2 className="font-body text-sm font-semibold text-dark-driftwood mb-4">
            Add New Setting
          </h2>
          <form action={addSettingAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="newKey" className="block font-body text-sm font-medium text-dark-driftwood mb-1">
                  Key <span className="text-red-500">*</span>
                </label>
                <input
                  id="newKey"
                  name="newKey"
                  type="text"
                  required
                  placeholder="e.g. phone_number"
                  className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors font-mono"
                />
              </div>
              <div>
                <label htmlFor="newValue" className="block font-body text-sm font-medium text-dark-driftwood mb-1">
                  Value
                </label>
                <input
                  id="newValue"
                  name="newValue"
                  type="text"
                  className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-dark-driftwood px-5 py-2 font-body text-sm font-semibold text-white hover:bg-dark-driftwood/90 transition-colors rounded-sm"
            >
              Add Setting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
