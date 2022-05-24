import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextData {
	selectedRegion: string;
	setSelectedRegion: (string) => void;
	inputValue: string;
	setInputValue: (string) => void;
}

const AppContext = createContext({} as AppContextData);


interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({children}:AppProviderProps) =>{

  const [selectedRegion, setSelectedRegion] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
		<AppContext.Provider
			value={{
				selectedRegion,
				setSelectedRegion,
				inputValue,
				setInputValue,
			}}
		>
			{children}
		</AppContext.Provider>
	); 
}

export const useGlobalContext = () =>{
  return useContext(AppContext);
}