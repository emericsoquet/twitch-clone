import { Link, useParams } from 'react-router-dom';

export default function Error() {
    let { slug } = useParams();
    return (
        <div className="results">
            <div className="results__container">
                <div className="results__wrapper">
                    <div className="results__error">
                        <h1>Oops</h1>
                        <p>
                            { slug ? 
                                    <>Unfortunately, there is no match for <strong>{ slug }</strong>. Check you didn't mispell what you were looking for.</>
                                    : `Please type something in the searchbar to get a result.`
                            }
                            </p>

                        <div className="results__return">Return to 
                            <Link className="cta" to={{ pathname: `/`}}>Homepage</Link>
                        </div>
                        
                    </div>
                    </div>
                </div>
                
        </div>
    )
}