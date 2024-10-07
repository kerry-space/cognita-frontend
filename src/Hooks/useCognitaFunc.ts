import { useContext } from "react";
import { CognitaContext } from "../Context/CognitaContext";
import { ICognitaContext } from "../Data/Interface";



export function useCognitaFunc(): ICognitaContext {
    return useContext(CognitaContext);
  }

  