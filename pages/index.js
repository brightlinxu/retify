import ManualLogin from '../components/ManualLogin.js'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Index() {
  return (
    <div>
      <ManualLogin />
    </div>
  )
}