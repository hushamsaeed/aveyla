import type { Metadata } from "next";
import { getAllPackages } from "@/lib/data/packages";
import { getPageContent } from "@/lib/data/pages";
import { getAllSettings } from "@/lib/data/settings";
import ContactClient from "./ContactClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact | Aveyla Manta Village | Maldives",
  description: "Get in touch with Aveyla Manta Village. Enquire about packages, rooms, and diving in Baa Atoll.",
};

export default async function ContactPage() {
  const [packages, content, settings] = await Promise.all([
    getAllPackages(),
    getPageContent("contact"),
    getAllSettings(),
  ]);
  const settingsMap: Record<string, string> = {};
  for (const s of settings) {
    if (s.value) settingsMap[s.key] = s.value;
  }
  const packageOptions = [
    { value: "", label: "General Enquiry" },
    ...packages.map((p) => ({ value: p.slug, label: p.name })),
  ];
  return (
    <ContactClient
      packageOptions={packageOptions}
      content={content}
      phone={settingsMap.phone_number || "+960 777 3998"}
      email={settingsMap.contact_email || "info@aveyla.com"}
      whatsapp={settingsMap.whatsapp_number || "9607773998"}
    />
  );
}
