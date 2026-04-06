import { getActiveNotices } from "@/lib/data/notices";

const SEVERITY_STYLES: Record<string, string> = {
  info: "bg-muted-ocean/10 text-muted-ocean",
  warning: "bg-coral-clay/20 text-dark-driftwood",
  urgent: "bg-terracotta text-pure-white",
};

export default async function SiteNotices() {
  const notices = await getActiveNotices();

  if (!notices?.length) return null;

  return (
    <div className="relative z-50">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className={`px-6 py-3 text-center font-body text-body-sm ${SEVERITY_STYLES[notice.severity ?? "info"] || SEVERITY_STYLES.info}`}
        >
          {notice.title && <strong className="mr-1">{notice.title}:</strong>}
          {notice.body}
        </div>
      ))}
    </div>
  );
}
