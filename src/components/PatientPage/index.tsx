import { Box, Button, Typography } from '@mui/material';
import { DiagnoseEntry, EntryFormValues, Patient } from "../../types";
import { Male, Female, Transgender } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients'
import diagnoseService from '../../services/diagnosis'
import { useParams } from 'react-router-dom';
import Entry from "./Entry"
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const PatientPage = () => {

    const params = useParams()
    const [patient, setPatient] = useState<Patient>();
    const [diagnosis, setDiagnosis] = useState<DiagnoseEntry[]>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            if(params.id) {
                const patient = await patientService.getById(params.id);
                setPatient(patient);
            }
        };
        const fetchDiagnosis = async () => {
            const diagnosis = await diagnoseService.getAll();
            setDiagnosis(diagnosis);
        }
        void fetchPatient();
        void fetchDiagnosis();
    }, [])

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if(patient) {
                const newEntry = await patientService.addEntry(patient.id, values);
                setPatient({...patient, entries: patient.entries.concat(newEntry)});
                setModalOpen(false);
            }
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

      if(patient) {
        return (
            <div className="App">
                <Box>
                    <br></br>
                    <Typography align="left" variant="h3">
                        {patient?.name + ' '}
                        {patient?.gender === 'male'? <Male /> : patient?.gender === 'female'? <Female /> : <Transgender />}
                    </Typography>
                    <br></br>
                    <Typography align="left" variant="body1">
                        Ssn: {patient?.ssn}
                    </Typography>
                    <Typography align="left" variant="body1">
                        Occupation: {patient?.occupation}
                    </Typography>
                    <br></br>
                    <Typography variant='h4'>
                        Entries
                    </Typography>
                    {patient.entries.map(entry => 
                        <Entry key={entry.id} diagnosisList={diagnosis} entry={entry} />
                    )}
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                        patientName={patient.name}
                        diagnosisCodesList={diagnosis.map(d => d.code)}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        ADD NEW ENTRY
                    </Button>
                </Box>
            </div>
        );
      }
    
};

export default PatientPage;
