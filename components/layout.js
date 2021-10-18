import Meta from '../components/meta'

export default function Layout({children}) {
    return (
        <>
            <Meta/>
            <main>{children}</main>
        </>
    )
}
