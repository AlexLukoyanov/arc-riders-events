import './globals.css'
import Background from '@/components/Background'

const basePath = process.env.NODE_ENV === 'production' ? '/arc-riders-events' : ''

export const metadata = {
  title: 'ARC Raiders - Таймеры событий',
  description: 'Таймеры событий для ARC Raiders',
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Background />
        {children}
      </body>
    </html>
  )
}

