import { createContext, useState, ReactNode } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutes: number;
    startDate: Date;
    interruptDate?: Date;
    finishedDate?: Date;
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
    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
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
        console.log(newCycle)
        setCycles(state => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        setCycles((state) => 
            state.map((cycle) => {
                    if(cycle.id === activeCycleId) {
                        return { ...cycle, interruptDate: new Date() }
                    } else {
                        return cycle
                    }
                }
            )
        ),
        setActiveCycleId(null)
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