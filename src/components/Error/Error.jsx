import { Link, useParams } from 'react-router-dom';

export default function Error() {
    let { slug } = useParams();
    return (
        <div className="results">
            <h1>Oops</h1>
            <p>
                { slug ? 
                        `Unfortunately, there is no match for ${ slug }. Check you didn't mispell what you were looking for.` 
                        : `Please type something in the searchbar to get a result.`
                }
                </p>
            <Link to={{ pathname: `/`}}>Homepage</Link>
        </div>
    )
}