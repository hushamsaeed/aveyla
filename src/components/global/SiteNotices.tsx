import { client } from "@/sanity/client";
import { activeNoticesQuery } from "@/sanity/queries";

interface SiteNotice {
  _id: string;
  title: string;
  body: string;
  severity: "info" | "warning" | "urgent";
}

const SEVERITY_STYLES: Record<string, string> = {
  info: "bg-muted-ocean/10 text-muted-ocean",
  warning: "bg-coral-clay/20 text-dark-driftwood",
  urgent: "bg-terracotta text-pure-white",
};

export default async function SiteNotices() {
  let notices: SiteNotice[] = [];
  try {
    notices = await client.fetch(activeNoticesQuery);
  } catch { /* no notices */ }

  if (!notices?.length) return null;

  return (
    <div className="relative z-50">
      {notices.map((notice) => (
        <div
          key={notice._id}
          className={`px-6 py-3 text-center font-body text-body-sm ${SEVERITY_STYLES[notice.severity] || SEVERITY_STYLES.info}`}
        >
          {notice.title && <strong className="mr-1">{notice.title}:</strong>}
          {notice.body}
        </div>
      ))}
    </div>
  );
}
