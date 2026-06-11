import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
  Connect: [
    { label: 'Twitter / X', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-q-dark-surface border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/quantico-icon.png" className="h-8 w-auto" alt="Quantigo" />
              <span className="text-xl font-extrabold tracking-tight text-white">Quantigo</span>
            </div>
            <p className="mt-4 text-sm text-white/40 font-medium leading-relaxed max-w-xs">
              Commerce infrastructure for African businesses. Collective purchasing that 
              lowers costs and accelerates growth.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/register"
                className="rounded-xl bg-q-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-q-blue/20 hover:bg-q-blue-700 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/70 font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-medium">
            © {new Date().getFullYear()} Quantigo. All rights reserved.
          </p>
          <p className="text-xs text-white/25 font-medium">
            Infrastructure powering smarter African commerce.
          </p>
        </div>
      </div>
    </footer>
  )
}
