import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Theme,
    useTheme,
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface FilterBarProps {
    locations: string[];
    jobRoles: string[];
    minExperiences: number[];
    minBasePay: number[];
    onSearch: (filters: { locations: string[]|any, jobRoles: string[]|any,  minExperience: number | null, minBasePay: number | null }, companyName: string) => void;
}
// 
const FilterBar: React.FC<FilterBarProps> = ({ locations, jobRoles,minExperiences, minBasePay, onSearch }) => {
    const theme = useTheme();
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
    const [selectedMinExperience, setSelectedMinExperience] = useState<number | null>(null);
    const [selectedMinBasePay, setSelectedMinBasePay] = useState<number | null>(null);
    const [companyName, setCompanyName] = useState<string>('');

    const sortedMinExperiences = minExperiences?.slice().sort((a, b) => a - b);
    const sortedMinBasepay = minBasePay?.slice().sort((a, b) => a - b);

    const handleLocationChange = (event: SelectChangeEvent<typeof selectedLocations>) => {
        const {
            target: { value },
        } = event;
        setSelectedLocations(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleJobRoleChange = (event: SelectChangeEvent<typeof selectedJobRoles>) => {
        const {
            target: { value },
        } = event;
        setSelectedJobRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleMinExperienceChange = (event: SelectChangeEvent<string | number | null>) => {
        console.log(event.target.value)
        setSelectedMinExperience(event.target.value === null ? null : parseInt(event.target.value as string, 10));
    };

    const handleMinBaseChange = (event: SelectChangeEvent<string | number | null>) => {
        setSelectedMinBasePay(event.target.value === null ? null : parseInt(event.target.value as string, 10));
    };

    const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    };

    const handleSearch = () => {
        console.log(selectedLocations, selectedJobRoles, selectedMinExperience, selectedMinBasePay, companyName);
        onSearch({
            locations: selectedLocations.join(','),
            jobRoles: selectedJobRoles.join(','),
            minExperience: selectedMinExperience,
            minBasePay: selectedMinBasePay
        }, companyName);
    };

    return (
        <Grid container spacing={2} alignItems="center" mx={2}>
            <Grid item md={2}>
                <FormControl sx={{ m: 1, width: 180 }}>
                    <InputLabel id="demo-multiple-chip-label">Locations</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedLocations}
                        onChange={handleLocationChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected?.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {locations.map((location) => (
                            <MenuItem
                                key={location}
                                value={location}
                                style={getStyles(location, selectedLocations, theme)}
                            >
                                {location}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2}>
                <FormControl sx={{ m: 1, width: 180 }}>
                    <InputLabel id="demo-multiple-chip-label">Job Roles</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedJobRoles}
                        onChange={handleJobRoleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected?.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {jobRoles.map((role) => (
                            <MenuItem
                                key={role}
                                value={role}
                                style={getStyles(role, selectedJobRoles, theme)}
                            >
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2}>
                <FormControl sx={{ m: 1, width: 180 }}>
                    <InputLabel id="min-experience-label">Min Experience</InputLabel>
                    <Select
                        labelId="min-experience-label"
                        id="min-experience-select"
                        value={selectedMinExperience}
                        onChange={handleMinExperienceChange}
                        input={<OutlinedInput id="select-min-experience" label="Experience" />}
                    >
                        {sortedMinExperiences?.map((experience: number) => (
                            <MenuItem key={experience} value={experience}>
                                {experience}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2}>
                <FormControl sx={{ m: 1, width: 180 }}>
                    <InputLabel id="min-basepay-label">Min Base Pay</InputLabel>
                    <Select
                        labelId="min-basepay-label"
                        id="min-basepay-select"
                        value={selectedMinBasePay}
                        onChange={handleMinBaseChange}
                        input={<OutlinedInput id="select-min-basepay" label="MinBasePay" />}
                    >
                        {sortedMinBasepay?.map((basepay: number) => (
                            <MenuItem key={basepay} value={basepay}>
                                {basepay}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2}>
                <FormControl sx={{ m: 1, width: 180 }}>
                    <TextField
                        id="company-name"
                        label="Company Name"
                        value={companyName}
                        onChange={handleCompanyNameChange}
                    />
                </FormControl>
            </Grid>
            <Grid item md={2}>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </Grid>
        </Grid>
    );
};

export default FilterBar;
