import { useGlobalContext } from "../context/context";

const SearchInput = () => {
	
	const {setInputValue} = useGlobalContext();

	const checkPressedKey = (e) =>{
		let keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode > 47 && keyCode < 58) {
			e.preventDefault();
		}
	}

	const getInputValue = (e) =>{
		setInputValue(e.target.value);
	}

	return (
		<section
			className='bg-whiteMain text-darkGray flex mt-8 mb-12 lg:my-8 p-4 shadow-md lg:w-2/5 font-light dark:bg-darkBlue dark:text-whiteMain
		border-gray-100 dark:border-gray-800 border-2'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-8 w-8 mx-8'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
				/>
			</svg>
			<input
				type='text'
				placeholder='Search for a country...'
				className='w-full border-none outline-none dark:bg-darkBlue dark:text-whiteMain'
				onChange={getInputValue}
				onKeyDown={checkPressedKey}
				onKeyUp={checkPressedKey}
			/>
		</section>
	);
}

export default SearchInput
