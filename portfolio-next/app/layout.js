import './globals.css';

export const metadata = {
  title: 'Rishabh Bhardwaj — Software Engineer & Full-Stack Developer',
  description: 'Portfolio of Rishabh Bhardwaj — Software Engineer specializing in Backend & Full-Stack Development with JavaScript, Python, React, and Node.js.',
  keywords: 'Rishabh Bhardwaj, Software Engineer, Full-Stack Developer, React, Node.js, Python, JavaScript, Portfolio',
  openGraph: {
    title: 'Rishabh Bhardwaj — Software Engineer',
    description: 'Full-Stack Developer building real-world web applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="bg-gradient" />
        {children}
      </body>
    </html>
  );
}
