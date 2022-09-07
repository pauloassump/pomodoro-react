import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CyclesContext } from '../../../contexts/CyclesContexts'

import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput  
                id="task" 
                list="task-suggestions" 
                placeholder="Dê um nome para o seu projeto" 
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={5}
                min={5}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}