import { Cycle } from "./reducers";

export enum ActionsTypes {
    CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionsTypes.CREATE_NEW_CYCLE,
        payload: {
            newCycle
        }
    }
}

export function markCycleAsFinishedAction() {
    return {
        type: ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED
    }
}

export function interruptCycleAction() {
    return {
        type: ActionsTypes.INTERRUPT_CURRENT_CYCLE
    }
}