import Head from 'next/head'
import { Navbar } from '../ui'

interface ShopLayoutProps {
  children: JSX.Element | JSX.Element[]
  imageFullUrl?: string
  pageDescription: string
  title: string
}

export const ShopLayout = ({
  children,
  imageFullUrl,
  pageDescription,
  title
}: ShopLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      {/* Sidebar */}
      <main
        style={{ margin: '80px auto', maxWidth: 1440, padding: '0px 30px' }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  )
}
