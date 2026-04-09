import type { Metadata } from "next";
import { getAllPackages } from "@/lib/data/packages";
import { getPageContent } from "@/lib/data/pages";
import ContactClient from "./ContactClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact | Aveyla Manta Village | Maldives",
  description: "Get in touch with Aveyla Manta Village. Enquire about packages, rooms, and diving in Baa Atoll.",
};

export default async function ContactPage() {
  const [packages, content] = await Promise.all([
    getAllPackages(),
    getPageContent("contact"),
  ]);
  const packageOptions = [
    { value: "", label: "General Enquiry" },
    ...packages.map((p) => ({ value: p.slug, label: p.name })),
  ];
  return <ContactClient packageOptions={packageOptions} content={content} />;
}
