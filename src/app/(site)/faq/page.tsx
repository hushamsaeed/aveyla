import type { Metadata } from "next";
import { getActiveFaq } from "@/lib/data/faq";
import FaqClient from "./FaqClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ | Aveyla Manta Village | Maldives",
  description: "Frequently asked questions about staying at Aveyla Manta Village — transfers, diving, rooms, and booking.",
};

export default async function FAQPage() {
  const faqItems = await getActiveFaq();
  return <FaqClient items={faqItems} />;
}
