import React from 'react'
import Head from 'next/head'
import type { ReactNode } from 'react'
import { Navigation } from './navigationBar/Navigation'
import { Flex } from '@chakra-ui/react'
import { Footer } from './Footer'

type Props = {
  children: ReactNode
  title: string
}

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Flex flexDirection={'column'} bg={'gray.50'} w={'full'} h={'full'}>
        {children}
      </Flex>
      <Footer />
    </>
  )
}
