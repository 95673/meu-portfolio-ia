// src/app/layout.js
export const metadata = {
  title: 'Portfólio IA - Dinostrato EB',
  description: 'Assistente Pessoal e Portfólio com Inteligência Artificial',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fafafa', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}
