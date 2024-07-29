import { usePatientStore } from "../store";
import { Patient } from "../types/types";
import PatientDetailsItem from "./PatientDetailsItem";

type PatientDetailProps = {
  patient: Patient;
};

export default function PatientDetail({ patient }: PatientDetailProps) {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  return (
    <div className=" mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-lg">
      <PatientDetailsItem label="id" data={patient.id} />
      <PatientDetailsItem label="name" data={patient.name} />
      <PatientDetailsItem label="Propietario" data={patient.caretaker} />
      <PatientDetailsItem label="Email" data={patient.email} />
      <PatientDetailsItem
        label="Fecha de Alta"
        data={patient.date.toString()}
      />
      <PatientDetailsItem label="Sintomas" data={patient.symptoms} />
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg "
        >
          Editar
        </button>
        <button
          type="button"
                  className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg "
                  onClick={()=> deletePatient(patient.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
