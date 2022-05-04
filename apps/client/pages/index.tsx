// import styles from './index.module.css';

// import { GetServerSideProps } from "next";

// export function Index({ result }) {
//   return (
//     <>
//       <div>{result.data.hello}</div>
//       <div>{result.data.goodbye}</div>
//     </>
//   );
// }

// export default Index;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const query = `query Goodbye($name: String!) {
//     goodbye(name: $name),
//     hello
//   }`
//   const myName = "Masoud";
//   const response = await fetch('http://localhost:3333/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({query, variables: { name: myName }})
//   })
  
//   const result = await response.json()
//   return {
//     props: {
//       result
//     }
//   }
// }

// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Phones from '../src/components/Phones'
import { PhoneType } from '~utils/types'
// import styles from '../styles/Home.module.css'
import { handlePhonesServerSideRequests } from "../src/utils/handleServerSideRequest"

export default function Home({ phones } : { phones: PhoneType[] }) {
  console.log(phones);
  return (
    <>
      {phones ? <Phones data={phones} /> : <div>Loading...</div>}
    </>
  )
}

export const getServerSideProps = handlePhonesServerSideRequests()