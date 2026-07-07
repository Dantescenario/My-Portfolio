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
  title: 'Rishabh Bhardwaj — Machine Learning Engineer & AI Developer',
  description:
    'Portfolio of Rishabh Bhardwaj — Machine Learning Engineer specializing in Computer Vision, Deep Learning, Generative AI, RAG, and FastAPI.',
  keywords:
    'Rishabh Bhardwaj, Machine Learning Engineer, AI Developer, Deep Learning, Computer Vision, RAG, FastAPI, PyTorch, Python, Portfolio',
  openGraph: {
    title: 'Rishabh Bhardwaj — Machine Learning Engineer',
    description: 'Machine Learning Engineer designing and deploying end-to-end AI applications.',
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
