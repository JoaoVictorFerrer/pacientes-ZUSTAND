import { create } from "zustand";
import { v4 as uuidv4} from 'uuid'
import { DraftPatient, Patient } from "./types/types";

type PatientState = {
    patients: Patient[],
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id'])=>void
}

const createPatient = (patient: DraftPatient): Patient => { // el data que recibo sera de tipo Draf pero me retornara un type Patient
    return {...patient,id: uuidv4() }
}

export const usePatientStore = create<PatientState>((set) => ({

    patients: [],
    addPatient: (data) => {
        //antes del set se puede utilizar qualquier logica 
        const newPatient = createPatient(data)
        set((state) => ({
          patients:[...state.patients,newPatient]
        }))

    },
    deletePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)
        }))
    }

}))
