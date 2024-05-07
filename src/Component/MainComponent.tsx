import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from "@mui/material";
import JobDetailsCard from './JobDetailsCard';
import { JobDetails } from '../Types';
import FilterBar from './FilterBar';

const MainComponent = () => {
    // State variables
    const [jobData, setJobData] = useState<JobDetails[] | null | any>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<string[] | any>([]);
    const [jobRoles, setJobRoles] = useState<string[] | any>([]);
    const [minExperiences, setMinExperiences] = useState<number[] | any>(); 
    const [minBasePay, setMinBasepay] = useState<number[] | any>([]); 

    // Refs
    const observer = useRef<IntersectionObserver | null>(null);
    const lastJobElementRef = useRef<HTMLDivElement | null>(null);

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                "limit": 10,
                "offset": jobData ? jobData.length : 0
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body
            };

            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const newData = await response.json();
            setJobData((prevData: any) => {
                return prevData ? [...prevData, ...newData.jdList] : newData.jdList;
            });
            setHasMore(newData.jdList.length > 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Intersection Observer for infinite scrolling
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                fetchData();
            }
        }, options);

        if (lastJobElementRef.current) {
            observer.current.observe(lastJobElementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore]);

    // Update filter options when job data changes
    useEffect(() => {
        if (jobData) {
            const allLocations = jobData.map((job: { location: any; }) => job.location);
            const uniqueLocations = Array.from(new Set(allLocations));
            setLocations(uniqueLocations);

            const allJobRoles = jobData.map((job: { jobRole: any; }) => job.jobRole);
            const uniqueJobRoles = Array.from(new Set(allJobRoles));
            setJobRoles(uniqueJobRoles);

            const allMinExperiences = jobData.map((job: { minExp: any; }) => job.minExp); 
            const uniqueMinExperiences = Array.from(new Set(allMinExperiences)); 
            setMinExperiences(uniqueMinExperiences);

            const allMinbasePay = jobData.map((job: { minJdSalary: any; }) => job.minJdSalary); 
            const uniqueMinBasePay = Array.from(new Set(allMinbasePay)); 
            setMinBasepay(uniqueMinBasePay);
        }
    }, [jobData]);

    // Search the job base on filters
    const filterJobData = (filters: { locations: string[]; jobRoles: string[];  minExperience: number | null; minBasePay: number | null;}, companyName: string) => {
        let filteredData = jobData;
        
        if (locations.length > 0) {
            filteredData = filteredData?.filter((job: { location: string; }) => filters.locations.includes(job.location));
        }

        if (jobRoles.length > 0) {
            filteredData = filteredData?.filter((job: { jobRole: string; }) => filters.jobRoles.includes(job.jobRole));
        }

        if (minExperiences !== null) {
            filteredData = filteredData?.filter((job: { minExp: number; }) => filters?.minExperience??0 >= job.minExp);
        }

        if (minBasePay !== null) {
            filteredData = filteredData?.filter((job: { minJdSalary: number; }) => filters.minBasePay??0 >= job?.minJdSalary);
        }

        if (companyName.trim() !== '') {
            filteredData = filteredData?.filter((job: { companyName: string; }) => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
        }

        return filteredData;
    };
    
    
    const handleSearch = (filters: { locations: string[], jobRoles: string[], minExperience: number | null, minBasePay: number | null }, companyName: string) => {
        console.log('Filters:', filters);
        console.log('Company Name:', companyName);
        
        // Filter job data based on the provided filters and company name
        const filteredData = filterJobData(filters, companyName);
        
        // Update state with the filtered data
        setJobData(filteredData);
    };
    
    // Render
    return (
        <Grid container spacing={1} mt={2}>
            <FilterBar locations={locations} jobRoles={jobRoles} minExperiences={minExperiences} minBasePay={minBasePay} onSearch={handleSearch}/>
            {jobData && jobData.map((item: JobDetails, index: any) => {
                if (jobData.length === index + 1) {
                    return (
                        <Grid item xs={12} sm={6} key={index} md={4} ref={lastJobElementRef}>
                            <JobDetailsCard job={item} />
                        </Grid>
                    );
                } else {
                    return (
                        <Grid item xs={12} sm={6} key={index} md={4}>
                            <JobDetailsCard job={item} />
                        </Grid>
                    );
                }
            })}
            {loading && (
                <Grid item>
                    <CircularProgress />
                </Grid>
            )}
        </Grid>
    );
};

export default MainComponent;
