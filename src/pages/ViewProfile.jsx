import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Avatar, Box, Chip } from '@mui/material';
import { blue } from '@mui/material/colors';

const ViewProfile = () => {
    const [email, setEmail] = useState('');
    const [businessUnits, setBusinessUnits] = useState([]);
    const [accessLevel, setAccessLevel] = useState('');
    const buslist={};
    buslist["B1"]="SNE";
    buslist["B2"]="SOGA";
    buslist["B3"]="SPMI";
    buslist["B4"]="SSSI";
    buslist["B5"]="SNHI";
    buslist["B6"]="SNS";
    buslist["B7"]="SFB";
    buslist["B8"]="SSMB";
    buslist["B9"]="SAM";
    buslist["B10"]="TBY";
    buslist["B11"]="AY";
    buslist["B12"]="PY";
    buslist["B13"]="SMS";
    buslist["B14"]="PTS";
    buslist["B15"]="PTK";
    buslist["B16"]="EJA";
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))[0];
        setEmail(userData.email);
        setBusinessUnits(userData.bus);
        if(userData.highprivelege)
        setAccessLevel("Admin, Approver 2");
    else
        setAccessLevel(userData.role);
    }, []);

    return (
        <Container>
            <Box textAlign="center" my={4}>
                <Avatar sx={{ bgcolor: blue[500], width: 80, height: 80, margin: 'auto' }}>
                    {email.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
            </Box>
            <Card sx={{ maxWidth: 600, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary">Email ID</Typography>
                            <Typography variant="body1" gutterBottom>{email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary">Business Unit(s)</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {businessUnits.map((bu, index) => (
                                    <Chip key={index} label={buslist[bu]} color="primary" />
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary">Role(s)</Typography>
                            <Typography variant="body1">{accessLevel}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ViewProfile;
