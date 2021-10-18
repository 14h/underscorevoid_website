import React from 'react';
import '../styles/index.css';

import {AnimateSharedLayout} from 'framer-motion';
import {DotRing} from "../components/DotRing";

export default function MyApp({Component, pageProps}) {
    return (

        <AnimateSharedLayout>
            <DotRing />
            <Component {...pageProps} />
        </AnimateSharedLayout>

    );
}
