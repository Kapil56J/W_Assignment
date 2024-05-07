import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { JobDetails } from "../Types";
import React, { useState } from "react";

export const truncat = (str: string, n: number) => {
    if (str == null || str == undefined || str.length < n) {
        return str;
    }

    return str.slice(0, n) + '...';
};

const JobDetailsCard = ({ job }: { job: JobDetails }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    const truncatedDetails = truncat(job.jobDetailsFromCompany, 200);
    const fullDetails = job.jobDetailsFromCompany;

    return (
        <Card sx={{ mx: 2, height: 'auto', borderRadius: '20px', mb: 2 }}>
            <CardContent sx={{ cursor: 'pointer' }}>
                <Box display={'flex'} alignItems={'center'} gap={5}>
                    <img src={`${job.logoUrl}`} width={30} height={30} alt={`${job.companyName} logo`} />
                    <Box>
                        <Typography fontSize={'24px'} color={'GrayText'}>
                            {job.companyName}
                        </Typography>
                        <Typography fontSize={'18px'}>
                            {job.jobRole}
                        </Typography>
                        <Typography fontSize={'14px'}>
                            {job.location}
                        </Typography>
                    </Box>
                </Box>
                <Typography mt={2}>
                    Estimate Salary: <span>{job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</span>
                </Typography>
                <Box mt={1}>
                    <Typography fontSize={'18px'}>Job Details</Typography>
                    <p>{showFullText ? fullDetails : truncatedDetails}</p>
                    {showFullText ? (
                        <p
                            style={{ textDecoration: 'underline', color: 'blue', fontSize: '12px' }}
                            onClick={toggleShowFullText}
                        >
                            View less
                        </p>
                    ) : (
                        <p
                            style={{ textDecoration: 'underline', color: 'blue', fontSize: '12px' }}
                            onClick={toggleShowFullText}
                        >
                            View more
                        </p>
                    )}
                </Box>
                {job.minExp && <Stack>  
                    <Typography color={'GrayText'}>Minimum Experience </Typography>
                    <Typography>{job.minExp} - {job.maxExp} years</Typography>
                </Stack>}
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{width:'50%', bgcolor:'green', color:'white'}} disableElevation  onClick={() => window.open(job?.jdLink, "_blank")}>
                        EASY APPLY
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobDetailsCard;
