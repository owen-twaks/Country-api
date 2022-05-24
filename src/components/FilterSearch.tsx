import { useGlobalContext } from "../context/context";

interface FilterSearchProps{
	regions: string[];
}

const FilterSearch = ({regions}:FilterSearchProps) => {

	const {selectedRegion, setSelectedRegion} = useGlobalContext();

	const getSelectedRegion = (e) =>{
		const newSelectedRegion = e.target.value; 
		setSelectedRegion(newSelectedRegion);
	}

  return (
		<section className='bg-whiteMain my-8 p-4 shadow-md w-1/2 lg:w-1/5 lg:flex lg:items-center text-veryDarkBlueText dark:bg-darkBlue dark:text-whiteMain border-gray-100 dark:border-gray-800 border-2'>
			<select
				name='regions'
				id='regions'
				className='bg-whiteMain text-veryDarkBlueText w-full outline-none border-none font-semibold dark:bg-darkBlue dark:text-whiteMain cursor-pointer'
				onChange={getSelectedRegion}
				value={selectedRegion}
			>
				<option value='' disabled>
					Filter by Region:
				</option>

				{regions.map((region) => {
					return (
						<option value={region} key={region} className='font-semibold '>
							{region}
						</option>
					);
				})}
			</select>
		</section>
	);
}

export default FilterSearch
