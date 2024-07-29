import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid'
import {createJSONStorage, devtools,persist} from 'zustand/middleware'
import { DraftPatient, Patient } from "./types/types";

type PatientState = {
    patients: Patient[],
    activeId:string
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data : DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => { // el data que recibo sera de tipo Draf pero me retornara un type Patient
    return {...patient,id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
    persist((set) => ({  //el devtool es para visualizar los estados en reduxDevTools

        patients: [],
        activeId:'',
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
        },
        getPatientById: (id) => {
            set(() => ({
                activeId:id
            }))
        },
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                activeId:''
            }))
            
        }

    }), {
        name: 'patient-storage',   
        storage:createJSONStorage(()=>sessionStorage) //en el caso de querer guardarlo en session por default viene va a localStorage
        })
    ))
