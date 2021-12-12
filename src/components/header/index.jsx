import '../../assets/scss/header.scss';

const Headers = ({ title }) => {
    return (
        <>
            <div className="header">
                <h2 className="title">{title}</h2>
            </div>
        </>
    )
}

export default Headers;