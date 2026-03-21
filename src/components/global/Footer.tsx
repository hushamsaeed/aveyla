import Link from "next/link";

const EXPLORE_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Activities", href: "/activities" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
];

const INFO_LINKS = [
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
      <span className="font-body text-[13px] font-semibold text-sand-gold">
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-deep-ocean" role="contentinfo">
      <div className="mx-auto max-w-[1440px] px-4 tablet:px-16 pt-16 pb-8">
        {/* Top section */}
        <div className="flex flex-col tablet:flex-row justify-between gap-10 tablet:gap-8">
          {/* Logo column */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-[24px] font-semibold tracking-[3px] text-pure-white">
              AVEYLA
            </span>
            <span className="font-body text-[13px] font-normal text-white/60">
              Manta Village · Maldives
            </span>
          </div>

          {/* Explore column */}
          <FooterColumn title="Explore">
            {EXPLORE_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Information column */}
          <FooterColumn title="Information">
            {INFO_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact column */}
          <FooterColumn title="Contact">
            <a
              href="tel:+9606680068"
              className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
            >
              +960 668-0068
            </a>
            <a
              href="mailto:info@aveyla.com"
              className="font-body text-[13px] font-normal text-white/[0.73] hover:text-pure-white transition-colors"
            >
              info@aveyla.com
            </a>
            <a
              href="https://wa.me/9606680068"
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
