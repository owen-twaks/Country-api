import { GetStaticPaths, GetStaticProps } from 'next';
import {ICountry} from '../../components/Country';
import Head from 'next/head';
import ReturnHomeButton from '../../components/ReturnHomeButton';
import Link from 'next/link';
import { removeParenthesisContentFromString } from '../../Utils/removeParenthesisContentFromString';
import { useGlobalContext } from '../../context/context';
import { useEffect } from 'react';
import Layout from '../../components/Layout';

const getCountryDetails:any = async (id) => {
	
	const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

	const countryDetails = await response.json();

	return countryDetails;
};

interface CountryDetailsProps{
  country: ICountry;
}

const CountryDetails = ({country}:CountryDetailsProps) => {

	const {setInputValue, setSelectedRegion} = useGlobalContext();

	useEffect(() => {
		setInputValue('');
		setSelectedRegion('');
	}, [])

  return (
		<>
			<Head>
				<title>{country.name}</title>
			</Head>

			<Layout>
				
				<div className='bg-veryLightGray dark:bg-veryDarkBlueBackground dark:text-whiteMain'>
					<section className='m-12'>
						<ReturnHomeButton title={'Back'}/>

						<article className='grid lg:grid-cols-2 gap-10 mt-16 lg:gap-x-20 items-start'>
							{/* Flag/Image Section */}

							{/* <section className='border-whiteMain border-2 relative h-64 lg:h-72'>
								<Image src={country.flag} alt={country.name} layout='fill' objectFit='cover'/>
							</section> */}

							<section className='flex justify-center items-center overflow-hidden h-64 lg:h-80 relative'>
								<img
									src={country.flag}
									alt={country.name}
									className='flex-shrink-0 min-w-full min-h-full'
								/>
							</section>

							{/* Text/Details Section */}
							<section>
								<h2 className='font-extrabold text-3xl mb-8'>{country.name}</h2>

								<div className='grid items-start mb-8 gap-y-6 sm:grid-cols-2 sm:gap-x-10'>
									{/* First Group of Properties */}
									<div>
										<p className='paragraph'>
											Native name:
											<span className='span'> {country.nativeName}</span>
										</p>
										<p className='paragraph'>
											Population:
											<span className='span'>
												{' '}
												{country.population.toLocaleString()}
											</span>
										</p>
										<p className='paragraph'>
											Region:
											<span className='span'> {country.region}</span>
										</p>
										<p className='paragraph'>
											Sub Region:
											<span className='span'> {country.subRegion}</span>
										</p>
										<p className='paragraph'>
											Capital:
											<span className='span'> {country.capital}</span>
										</p>
									</div>

									{/* Second Group of Properties */}
									<div>
										<p className='paragraph'>
											Top Level Domain:
											<span className='span'> {country.topLevelDomain}</span>
										</p>
										<p className='paragraph'>
											Currencies:
											{country.currencies.map((currency, index) => {
												return (
													<span key={index} className='span'>
														{` ${currency.name}`}
														{index + 1 === country.currencies.length ? '' : ', '}
													</span>
												);
											})}
										</p>
										<p className='paragraph'>
											Languages:
											{country.languages.map((language, index) => {
												return (
													<span key={index} className='span'>
														{` ${language.name}`}
														{index + 1 === country.languages.length ? '' : ', '}
													</span>
												);
											})}
										</p>
									</div>
								</div>

								{/* Third group of properties */}
								<div>
									<h3 className='text-xl font-semibold'>Border Countries:</h3>
									<div className='grid grid-cols-3 lg:grid-cols-4 gap-4 pt-6'>
										{country.borderCountries.map((borderCountry, index) => (
											<Link key={borderCountry.id} href={`/countries/${borderCountry.id}`}>
												<a>
													<span className='flex justify-center items-center p-2 shadow-lg dark:bg-darkBlue cursor-pointer hover:opacity-70 border-gray-200 border-2 dark:border-gray-800 font-semibold'> 
														{borderCountry.name}
													</span>
												</a>
											</Link>
										))}
									</div>
								</div>
							</section>
						</article>
					</section>
				</div>
			</Layout>
		</>
	);
}

export default CountryDetails

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch('https://restcountries.eu/rest/v2/all');
	const data = await response.json();

	const paths = data.map((country) => {
		return {
			params: { id: country.alpha3Code },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
	const countryDetails = await getCountryDetails(params.id);

	const {
		alpha3Code,
		capital,
		currencies,
		borders,
		flag,
		languages,
		name,
		nativeName,
		population,
		region,
		subregion,
		topLevelDomain,
	} = countryDetails;

	// Removing parenthesis, as well as the content limited by them.
	const countryName = removeParenthesisContentFromString(name);

	// Gets an array of current country's all border countries with all details.
	const borderCountriesDetailed: any = await Promise.all(
		borders.map((borderCountry) => getCountryDetails(borderCountry))
	);

	// Maps the previous array to get both id and name of each border country.
	const borderCountries = borderCountriesDetailed.map((country) => {

		const countryName = removeParenthesisContentFromString(country.name);

		return {
			id: country.alpha3Code,
			name: countryName,
		};
	});

	const country: ICountry = {
		id: alpha3Code,
		name: countryName,
		nativeName,
		population,
		region,
		subRegion: subregion,
		capital,
		topLevelDomain,
		currencies,
		languages,
		borderCountries,
		flag,
	};

	return {
		props: {
			country,
		},
	};
};