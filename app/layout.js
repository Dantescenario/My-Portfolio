import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Rishabh Bhardwaj — Software Engineer & Full-Stack Developer',
  description:
    'Portfolio of Rishabh Bhardwaj — Software Engineer specializing in Backend & Full-Stack Development with JavaScript, Python, React, and Node.js.',
  keywords:
    'Rishabh Bhardwaj, Software Engineer, Full-Stack Developer, React, Node.js, Python, JavaScript, Portfolio',
  openGraph: {
    title: 'Rishabh Bhardwaj — Software Engineer',
    description: 'Full-Stack Developer building real-world web applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="bg-gradient" />
        {children}
      </body>
    </html>
  );
}
