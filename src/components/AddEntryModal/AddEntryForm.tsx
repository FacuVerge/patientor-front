import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Input, Box, Alert } from '@mui/material';

import { Type, EntryFormValues, HealthCheckRating, DiagnoseEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnosisCodesList: Array<DiagnoseEntry['code']>;
}

interface TypeOption{
  value: Type;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(Type).map(v => ({
  value: v, label: v.toString()
}));

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnosisCodesList }: Props) => {
  const [type, setType] = useState(Type.Hospital);
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(Type).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(g => g.toString() === value);
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  const prepareDiagnosisCodes = () => {
    if(diagnosisCodes) {
      const codes = diagnosisCodes.split(',');
      if(codes.every(code => diagnosisCodesList.includes(code))) {
        return diagnosisCodes.split(',');
      }else{
        alert('Incorrect Diagnosis Code')
        setDiagnosisCodes('')
      }
    }
  }

  const validateEndDate = () => {
    if(Date.parse(sickLeaveEndDate) < Date.parse(sickLeaveStartDate)) {
      <Alert severity="error">Incorrect End Date</Alert> 
      setSickLeaveEndDate('');
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let newEntry : EntryFormValues; 
    switch(type) {
      case Type.Hospital:
        newEntry = {
          specialist,
          date,
          description,
          type,
          diagnosisCodes: diagnosisCodes.split(','),
          discharge : {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        }
        break;
      case Type.HealthCheck:
        newEntry = {
          specialist,
          date,
          description,
          type,
          diagnosisCodes: prepareDiagnosisCodes(),
          healthCheckRating
        }
        break;
      case Type.OccupationalHealthCare:
        newEntry = {
          specialist,
          date,
          description,
          type,
          employerName,
          diagnosisCodes: prepareDiagnosisCodes(),
          sickLeave: {
            endDate: sickLeaveEndDate,
            startDate: sickLeaveStartDate
          }
        }
        break;
      default:
        newEntry = {
          specialist,
          date,
          description,
          type,
          diagnosisCodes: prepareDiagnosisCodes(),
          healthCheckRating
        }
        break;
    }
    onSubmit(newEntry);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
      <Box>
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input
          type='date'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        </Box>

        <Box hidden={type != Type.Hospital} border={'1px solid black'} borderRadius={'0.5em'} marginTop={'0.5em'} marginBottom={'0.5em'} padding={'0.5em'}>
          <InputLabel disabled={type != Type.Hospital} style={{ marginTop: 20 }}>Discharge Date</InputLabel>
          <Input
            disabled={type != Type.Hospital}
            type='date'
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />

          <TextField
            style={{ marginTop: 20 }}
            disabled={type != Type.Hospital}
            label="Discharge Criteria"
            fullWidth 
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />

        </Box>
        
        <Box hidden={type != Type.OccupationalHealthCare} border={'1px solid black'} borderRadius={'0.5em'} marginTop={'0.5em'} marginBottom={'0.5em'} padding={'0.5em'}>
        <TextField 
          style={{ marginTop: 20 }}
          disabled={type != Type.OccupationalHealthCare}
          label="Employer Name"
          fullWidth 
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <InputLabel disabled={type != Type.OccupationalHealthCare} style={{ marginTop: 20 }}>Sick Leave Start Date</InputLabel>
        <Input
          disabled={type != Type.OccupationalHealthCare}
          type='date'
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />

        <InputLabel disabled={type != Type.OccupationalHealthCare} style={{ marginTop: 20 }}>Sick Leave End Date</InputLabel>
        <Input
          disabled={type != Type.OccupationalHealthCare}
          type='date'
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => { validateEndDate(); setSickLeaveEndDate(target.value);}}
        />
        </Box>

        <Box hidden={type != Type.HealthCheck} border={'1px solid black'} borderRadius={'0.5em'} marginTop={'0.5em'} marginBottom={'0.5em'} padding={'0.5em'}>
        <InputLabel disabled={type != Type.HealthCheck} style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
        <Select
          disabled={type != Type.HealthCheck}
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
        {healthCheckRatingOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        </Box>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;