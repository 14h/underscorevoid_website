
import Head from "next/head";

import Container from "../components/container";
import Layout from "../components/layout";

export default function Index() {

    return (
        <div className='overflow-y-hidden'>
            <Layout>
                <Head/>
                <Container>
                    <div
                        className='h-screen relative'
                    >
                        <div
                            className='flex flex-col items-center justify-center py-16 absolute top-0 left-0 right-0 bottom-0'>
                            <div className='flex flex-col items-center justify-center mb-16'>
                                <div
                                    className='text-4xl lg:text-8xl text-center bg-white text-black font-thin'
                                >
                                    &nbsp;_void&nbsp;
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </Layout>
        </div>
    )
}
