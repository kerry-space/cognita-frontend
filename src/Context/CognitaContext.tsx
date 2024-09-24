import { createContext, ReactElement, ReactNode, useState } from 'react';
import { ICognitaContext, ICourse } from '../Data/Interface';
import CognitaData from '../Data/FetchData';

interface ICognitaProviderProps {
  children: ReactNode;
}

//
export const CognitaContext = createContext<ICognitaContext>(
  {} as ICognitaContext
);

export function CognitaProvider({
  children,
}: ICognitaProviderProps): ReactElement {
  const [ Courses, setCourses ] = useState<ICourse[]>(CognitaData);

  const fetchCoursesAsync = async () => {
    try {
      const URL = 'https://localhost:7147/api/courses';
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('Couldnt fetch the data');
      }

      const data: ICourse[] = await response.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      throw new Error('Failed to fetch course.');
      console.error('Error fetching random cocktail:', error);
    }
  };

  /*const fetchRandomCocktail = async (value: string) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            const processedCocktails: ICocktail[] = data.drinks.map((drink: ICocktail) => processCocktail(drink));

            setCocktails(processedCocktails);

        } catch (error) {
            console.error("Error fetching random cocktail:", error);
        }
    };*/

  const values: ICognitaContext = {
    Courses,
    fetchCoursesAsync,
  };

  return (
    <CognitaContext.Provider value={ values }>{ children }</CognitaContext.Provider>
  );
}
