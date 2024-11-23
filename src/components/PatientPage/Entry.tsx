import { Box, Typography } from "@mui/material";
import { DiagnoseEntry, Entry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';


const Rating = ({rating} : {rating: HealthCheckRating}) => {
    switch(rating) {
        case HealthCheckRating.Healthy:
            return <FavoriteIcon color="primary" />
        case HealthCheckRating.CriticalRisk:
            return <FavoriteIcon color="disabled" />
        case HealthCheckRating.HighRisk:
            return <FavoriteIcon color="warning" />
        case HealthCheckRating.LowRisk:
            return <FavoriteIcon color="secondary" />
        default:
            const _exhaustiveCheck: never = rating;
            return _exhaustiveCheck;
    }
}

const EntryDetails = ({entry} : {entry: Entry}) => {
    switch(entry.type) {
        case 'HealthCheck':
            return (
                <Box>
                    <Typography variant="body1" fontStyle={"italic"}>
                        {entry.date + ' '} <MedicalServicesIcon /> 
                        <br></br>
                        {entry.description}
                    </Typography>
                    <Rating rating={entry.healthCheckRating as HealthCheckRating} />
                </Box>
            )
        case 'Hospital':
            return (
                <Box>
                    <Typography variant="body1" fontStyle={"italic"}>
                        {entry.date + ' '} <FavoriteIcon /> 
                        <br></br>
                        {entry.description}
                    </Typography>
                </Box>
            )
        case 'OccupationalHealthCare':
            return (
                <Box>
                    <Typography variant="body1" fontStyle={"italic"}>
                        {entry.date + ' '} <HealthAndSafetyIcon /> {entry.employerName}
                        <br></br>
                        {entry.description}
                    </Typography>
                </Box>
            )
        default:
            const _exhaustiveCheck: never = entry;
            return _exhaustiveCheck;
    }
}

const EntryItem = ({entry, diagnosisList} : {entry: Entry, diagnosisList: DiagnoseEntry[]}) => {

    return (
        <>
            <Box border={"1px solid black"} borderRadius={'0.5em'} padding={'0.5em'} margin={'0.5em'}>
                <EntryDetails entry={entry}/>
                <ul>
                    <Typography variant="body2">
                        {entry.diagnosisCodes?.map(diagnosis => <li key={diagnosis}>{diagnosis + ' ' + diagnosisList.find(d => d.code === diagnosis)?.name}</li>)}
                    </Typography>
                </ul>
                diagnose by {entry.specialist}
            </Box>
        </>
    );
}

export default EntryItem