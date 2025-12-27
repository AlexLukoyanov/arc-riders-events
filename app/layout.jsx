import './globals.css'

export const metadata = {
  title: 'ARC Raiders - Таймеры событий',
  description: 'Таймеры событий для ARC Raiders',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

