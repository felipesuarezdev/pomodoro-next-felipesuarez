import './globals.css'

export const metadata = {
  title: 'Pomodoro Timer',
  description: 'A minimalist Pomodoro timer application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}