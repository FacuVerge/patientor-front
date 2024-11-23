import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { DiagnoseEntry, EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  patientName: string;
  diagnosisCodesList: Array<DiagnoseEntry['code']>;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, patientName, diagnosisCodesList }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry for {patientName}</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnosisCodesList={diagnosisCodesList}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
