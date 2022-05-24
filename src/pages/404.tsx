import Head from 'next/head'
import Layout from "../components/Layout"
import ReturnHomeButton from "../components/ReturnHomeButton"

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <Layout>
        <section className='text-veryDarkBlueText dark:text-white text-center grid my-16 gap-28'>
          <h2 className='text-5xl font-extrabold'>Ops!</h2>
          <p className='text-lg font-semibold'>This page doesn't exist or could not be found.</p>
          <div className='inline-block'>
            <ReturnHomeButton title={'Back to Home'}/>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default NotFound
