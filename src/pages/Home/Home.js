import React from 'react';
import Products from '../Products/Products';
import Layout from '../Shared/Layout';
import Banner from './Banner';

const Home = () => {
    return (
        <Layout >
            <Products></Products>
        </Layout>
    );
};

export default Home;