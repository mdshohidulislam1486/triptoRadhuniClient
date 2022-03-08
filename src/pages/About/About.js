import { Box, Grid, Typography } from '@mui/material';

import React from 'react';
import Layout from '../Shared/Layout';

const About = () => {
    return (
       <Layout>
           <Grid container spacing={2} sx={{mb:5}}>
               <Grid item xs={12} sm={6} md={4}>
               <Typography>
               TRIPTO FOUNDATION (TrF): is a nonprofit charitable private organization which is committed to mobilize and use 100 of its resources towards their beneficiaries: destitute girls and geriatric parents.
               </Typography>
               </Grid>
               <Grid item xs={12} sm={6} md={4}>
               <Typography>
               Started in December 2018 with seven destitute girls, TrFs mission is to care of underprivileged girls until they are self-sufficient and fully empowered. The foundation also takes full responsibility of geriatric parents for the rest of their lives.
               </Typography>
               </Grid>
               <Grid item xs={12} sm={6} md={4}>
              <Typography>   TrF is committed to building a holistic campus with residential facilities, school/vocational training center and medical center for the girls and geriatric parents.</Typography>
             </Grid>
           </Grid>
           <Typography variant='h1' color='primary' sx={{textAlign:'center'}}>Photo album</Typography>
           <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{width:'100%'}}> <img width='100%' src="https://assets.news.americanbible.org/uploads/thumbnails/how-an-orphan-in-bangladesh-found-the-hope-she-needed-american-bible-society-ministry-story.jpg" alt="" /> </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box  sx={{width:'100%'}}> <img width='100%'  src="http://taurifoundation.org.bd/images/2.jpeg" alt="" /> </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box  sx={{width:'100%'}}> <img width='100%'  src="https://assets.news.americanbible.org/uploads/thumbnails/how-an-orphan-in-bangladesh-found-the-hope-she-needed-american-bible-society-ministry-story.jpg" alt="" /> </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{width:'100%'}}> <img width='100%' src="https://assets.news.americanbible.org/uploads/thumbnails/how-an-orphan-in-bangladesh-found-the-hope-she-needed-american-bible-society-ministry-story.jpg" alt="" /> </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box  sx={{width:'100%'}}> <img width='100%'  src="http://taurifoundation.org.bd/images/2.jpeg" alt="" /> </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box  sx={{width:'100%'}}> <img width='100%'  src="https://assets.news.americanbible.org/uploads/thumbnails/how-an-orphan-in-bangladesh-found-the-hope-she-needed-american-bible-society-ministry-story.jpg" alt="" /> </Box>
                </Grid>
            </Grid>
       </Layout>
    );
};

export default About;