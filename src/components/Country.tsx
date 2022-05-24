import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface ICountry {
	id: string;
	name: string;
	nativeName: string;
	population: number;
	region: string;
	subRegion: string;
	capital: string;
	topLevelDomain: string;
	currencies: Array<{name:string}>;
	languages: Array<{name: string}>;
	
	borderCountries: Array<
		{id:string, name:string}
	>;
	
	flag: string;
}

interface CountryProps {
	country: ICountry;
}

const Country = ({ country }: CountryProps) => {

	const [overSized, setOverSized] = useState(false);
	const [showFullContent, setShowFullContent] = useState(false);

	const handleCountryName = (name: string) =>{
		if(name.length > 13) {
			setOverSized(true);
		}
	}

	useEffect(() => {
		handleCountryName(country.name);
	}, [])

	return (
		<article className='bg-whiteMain shadow-lg w-10/12 sm:w-full rounded-lg mx-auto dark:bg-darkBlue dark:text-whiteMain border-gray-300 border-2 dark:border-gray-800'>
			<section className='shadow-md'>
				<Link href={`/countries/${country.id}`}>
					<div className='min-h-full h-44 relative hover:opacity-80 transition-opacity duration-300'>
						<Image
							src={country.flag}
							alt={country.name}
							layout='fill'
							objectFit='cover'
							className=' rounded-t-md cursor-pointer'
						/>
					</div>
				</Link>
			</section>

			<section className='p-5 mt-2'>
				<h2 className='text-2xl font-extrabold mb-6'>
					{overSized?
						 
						 showFullContent?
							 (`${country.name} `)
							: (`${country.name.substring(0, 13)}... `)
						
							: (country.name)
					}

					{overSized && (
						<button
							className='text-base ml-1 hover:opacity-60' style={{outline:'none', border:'none'}}
							onClick={() => setShowFullContent(!showFullContent)}
						>
							{showFullContent ? '(show less)' : ' (read more)'}
						</button>
					)}
				</h2>
				<p className='text-lg font-semibold mb-2'>
					Population:{' '}
					<span className='font-light'>
						{country.population.toLocaleString()}
					</span>
				</p>
				<p className='text-lg font-semibold mb-2'>
					Region: <span className='font-light'>{country.region}</span>
				</p>
				<p className='text-lg font-semibold mb-2'>
					Capital: <span className='font-light'>{country.capital}</span>
				</p>
			</section>
		</article>
	);
};

export default Country;
