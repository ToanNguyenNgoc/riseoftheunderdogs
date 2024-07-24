import React from 'react'
import Head from 'next/head'

interface SeoProps {
  title?: string
  description: string
  url: string
  image_url?: string
}

export function Seo(props: SeoProps) {
  const domain = 'https://riseoftheunderdogs.com'
  const name = 'Riseoftheunderdogs'
  const { title, description, url, image_url } = props

  return (
    <Head>
      <title>{title ? `${title} | ${name}` : `${name}`}</title>
      <meta name="title" content={title ? `${title} | ${name}` : name} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Riseoftheunderdogs, sell tickets, sellticket, bán vé, sell tickets, bán vé show diễn riseoftheunderdogs, riseoftheunderdogs, rise of the under dogs, bán vé bray, sell tickets bray"
      />
      <meta name="author" content={name} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="canonical" href={url} />
      {/* Thẻ Open Graph (OG): Giúp tối ưu hóa khi chia sẻ trên mạng xã hội như Facebook, LinkedIn. */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={image_url ?? `${domain}/default-image.png`}
      />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image_url ?? `${domain}/default-image.png`}
      />
      <meta
        name="zalo-platform-site-verification"
        content="GVA5Ex_P5M5Dsi8zkwvrCJsAvYNHz3TuDJG"
      />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "${title ? title : name}",
            "description": "${description}",
            "url": "${url}"
          }
        `}
      </script>
    </Head>
  )
}
