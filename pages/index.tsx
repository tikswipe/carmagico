import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import CarouselAnimation from '../components/CarouselAnimation';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>CarMagico - AI Car Valuation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Discover Your Car's True Value</span>
              <span className="block bg-gradient-orange-purple from-dark-orange to-purple-600 bg-clip-text text-transparent relative inline-block">
                With AI Precision
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get an accurate estimate of your car's worth in minutes. Upload a few photos and let our AI do the rest.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/estimate">
                <a className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-orange-purple from-dark-orange to-purple-600 rounded-full hover:from-dark-orange hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition duration-300">
                  Start Your Valuation
                  <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99903 20.0002L14.9998 12.9969C16.1037 11.8926 16.1011 10.1018 14.994 9.00068C13.8916 7.90418 12.11 7.90587 11.0097 9.00446L4.00217 16.001C2.89666 17.1048 2.89595 18.896 4.0006 20.0006C5.10478 21.1048 6.89505 21.1046 7.99903 20.0002ZM11 11L13 13L14 12C14.5523 11.4477 14.5523 10.5523 14 10C13.4477 9.44772 12.5523 9.44772 12 10L11 11Z" fill="white"/>
                    <path d="M6.75851 4.89658C6.82492 4.64991 7.1749 4.64991 7.24131 4.89658L7.59888 6.22462C7.62205 6.31066 7.68925 6.37786 7.77529 6.40103L9.10333 6.7586C9.35 6.82501 9.35 7.17499 9.10333 7.2414L7.77529 7.59897C7.68925 7.62214 7.62205 7.68934 7.59888 7.77538L7.24131 9.10342C7.1749 9.35009 6.82492 9.35009 6.75851 9.10342L6.40093 7.77538C6.37777 7.68934 6.31056 7.62214 6.22453 7.59897L4.89649 7.2414C4.64982 7.17499 4.64982 6.82501 4.89649 6.7586L6.22453 6.40103C6.31056 6.37786 6.37777 6.31066 6.40093 6.22462L6.75851 4.89658Z" fill="white"/>
                    <path d="M16.7585 3.89658C16.8249 3.64991 17.1749 3.64991 17.2413 3.89658L17.5989 5.22462C17.622 5.31066 17.6893 5.37786 17.7753 5.40103L19.1033 5.7586C19.35 5.82501 19.35 6.17499 19.1033 6.2414L17.7753 6.59897C17.6893 6.62214 17.622 6.68934 17.5989 6.77538L17.2413 8.10342C17.1749 8.35009 16.8249 8.35009 16.7585 8.10342L16.4009 6.77538C16.3778 6.68934 16.3106 6.62214 16.2245 6.59897L14.8965 6.2414C14.6498 6.17499 14.6498 5.82501 14.8965 5.7586L16.2245 5.40103C16.3106 5.37786 16.3778 5.31066 16.4009 5.22462L16.7585 3.89658Z" fill="white"/>
                    <path d="M17.7585 12.8966C17.8249 12.6499 18.1749 12.6499 18.2413 12.8966L18.5989 14.2246C18.622 14.3107 18.6893 14.3779 18.7753 14.401L20.1033 14.7586C20.35 14.825 20.35 15.175 20.1033 15.2414L18.7753 15.599C18.6893 15.6221 18.622 15.6893 18.5989 15.7754L18.2413 17.1034C18.1749 17.3501 17.8249 17.3501 17.7585 17.1034L17.4009 15.7754C17.3778 15.6893 17.3106 15.6221 17.2245 15.599L15.8965 15.2414C15.6498 15.175 15.6498 14.825 15.8965 14.7586L17.2245 14.401C17.3106 14.3779 17.3778 14.3107 17.4009 14.2246L17.7585 12.8966Z" fill="white"/>
                  </svg>
                </a>
              </Link>
            </div>
            <div className="mt-16">
              <CarouselAnimation className="carousel-custom" />
            </div>
          </div>
        </div>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

