export default function Container({children, className}) {
    return <div className={`${className} container-xl mx-auto`}>{children}</div>
}
