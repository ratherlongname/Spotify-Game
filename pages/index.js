import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>spotify-game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          spotify-game
        </h1>

        <p className={styles.description}>
          Which tracks would you like to play on?
        </p>

        <div className={styles.grid}>
          <a href="/my-top" className={styles.card}>
            <h3>Your top tracks</h3>
            <p>Music you've been listening to recently</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ratherlongname"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with love by ratherlongname
        </a>
      </footer>
    </div>
  )
}
