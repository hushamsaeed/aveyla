import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const DEFAULT_EXPLORE = [
  { label: "Rooms", href: "/rooms" },
  { label: "Activities", href: "/activities" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
];

const DEFAULT_INFO = [
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-body text-[13px] font-semibold text-coral-clay">
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLinkEl({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
    >
      {children}
    </Link>
  );
}

interface FooterProps {
  exploreLinks?: FooterLink[];
  infoLinks?: FooterLink[];
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export default function Footer({
  exploreLinks,
  infoLinks,
  phone = "+960 668-0068",
  email = "info@aveyla.com",
  whatsapp = "9606680068",
}: FooterProps) {
  const explore = exploreLinks && exploreLinks.length > 0 ? exploreLinks : DEFAULT_EXPLORE;
  const info = infoLinks && infoLinks.length > 0 ? infoLinks : DEFAULT_INFO;

  return (
    <footer className="w-full bg-dark-driftwood" role="contentinfo">
      <div className="mx-auto max-w-[1440px] px-4 tablet:px-16 pt-16 pb-8">
        {/* Top section */}
        <div className="flex flex-col tablet:flex-row justify-between gap-10 tablet:gap-8">
          {/* Logo column */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo/aveyla-footer.png"
              alt="Aveyla Manta Village"
              width={152}
              height={82}
              className="h-10 w-auto max-w-[120px] object-contain tablet:h-12 tablet:max-w-none"
            />
            <span className="font-body text-[13px] font-normal text-white/60">
              Manta Village · Maldives
            </span>
          </div>

          {/* Explore column */}
          <FooterColumn title="Explore">
            {explore.map((link) => (
              <FooterLinkEl key={link.href} href={link.href}>
                {link.label}
              </FooterLinkEl>
            ))}
          </FooterColumn>

          {/* Information column */}
          <FooterColumn title="Information">
            {info.map((link) => (
              <FooterLinkEl key={link.href} href={link.href}>
                {link.label}
              </FooterLinkEl>
            ))}
          </FooterColumn>

          {/* Contact column */}
          <FooterColumn title="Contact">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
            >
              {email}
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
            >
              WhatsApp
            </a>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex justify-center border-t border-white/[0.13] pt-6">
          <span className="font-body text-[11px] font-normal text-white/40">
            © {new Date().getFullYear()} Aveyla Manta Village. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
