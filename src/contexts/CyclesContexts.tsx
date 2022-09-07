import { differenceInSeconds } from "date-fns";
import { createContext, useState, ReactNode, useReducer, useEffect } from "react";
import { addNewCycleAction, interruptCycleAction, markCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducers";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}
interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    createNewCycle: (data: CreateCycleData) => void,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({children}: CyclesContextProviderProps) {
    const [ cyclesState, dispatch ] = useReducer(cyclesReducers,
        {
        cycles: [],
        activeCycleId: null
    }, () => {
        const storedStateAsJSON = localStorage.getItem('@pomodoro-react:cycles-state-1.0.0')

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
    })

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@pomodoro-react:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    function markCurrentCycleAsFinished() {
        dispatch(markCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutes: data.minutesAmount,
            startDate: new Date()
        }
        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCycleAction())
    }

    return (
        <CyclesContext.Provider value={{ 
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}