/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import Head from 'next/head'
// import Page from '../containers'
import dynamic from 'next/dynamic'
import { TITLE, pageData } from '../config'

const Page = dynamic(
  () => import('../containers'),
  { ssr: false },
)

export default function MyApp () {
  return (
    <div>
      <Head>

        <title>{TITLE}</title>

        <link rel="manifest" href="/site.webmanifest" />

        <link rel="icon" type="image/png" href="/images/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/images/favicon-32x32.png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-startup-image" href="/images/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-touch-icon-76x76.png" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" />

        <meta name="generator" content="NextJS" />
        <meta name="application-name" content="Toyota Visual Identity System" />
        <meta name="msapplication-tooltip" content="Toyota Visual Identity System" />
        <meta name="msapplication-TileImage" content="/images/favicon/mstile-150x150.png" />
        <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Toyota Visual Identity System" />
        <meta charSet="utf-8" />
        <meta description="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />

      </Head>
      <Page data={pageData} />

    </div>
  )
}
