import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form'
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContexts";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
                .min(5, 'O ciclo precisa ser no mínimo 5 minutos')
                .max(60, 'O ciclo precisa ser no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const {activeCycle, interruptCurrentCycle, createNewCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema)
    });

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isDisabledSubmit = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />            
                {activeCycle ? (
                <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
                    <HandPalm size={24} />
                    Interromper
                </StopCountdownButton>
                )
                :
                <StartCountdownButton type="submit" disabled={isDisabledSubmit}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            }
            </form>
        </HomeContainer>
    )
}