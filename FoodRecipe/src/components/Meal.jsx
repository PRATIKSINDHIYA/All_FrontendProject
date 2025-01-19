import React, { useEffect, useState } from 'react';

const Meal = () => {
    const [mealdata, setmealdata] = useState([]);
    const [area, setArea] = useState('indian');
    const [inputs, setinputs] = useState("");
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchdatafromapi = async () => {
            setLoading(true); 
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            const data = await api.json();
            setmealdata(data.meals); 
            setLoading(false);
        };
        fetchdatafromapi();
    }, [area]);

    const enterinput = async (event) => {
        event.preventDefault();
        setLoading(true);
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputs}`);
        const data = await api.json();
        console.log("data :- ", data.meals);
        setmealdata(data.meals);
        setLoading(false);
    };

    return (
        <>
            <div className='but'>
                <button onClick={() => setArea('indian')} type="button" className="btn btn-outline-primary">Indian</button>
                <button onClick={() => setArea('american')} type="button" className="btn btn-outline-secondary">American</button>
                <button onClick={() => setArea('Thai')} type="button" className="btn btn-outline-success">Thai</button>
                <button onClick={() => setArea('Canadian')} type="button" className="btn btn-outline-danger">Canadian</button>
                <button onClick={() => setArea('Japanese')} type="button" className="btn btn-outline-warning">Japanese</button>
                <button onClick={() => setArea('Chinese')} type="button" className="btn btn-outline-info">Chinese</button>
                <button onClick={() => setArea('British')} type="button" className="btn btn-outline-light">British</button>
                <button onClick={() => setArea('French')} type="button" className="btn btn-outline-warning">French </button>
            </div>
            <form className='inp' onSubmit={enterinput}>
                <input type="text" placeholder="foods" value={inputs} onChange={(e) => setinputs(e.target.value)} />
                <button className='submitbtn'>Enter</button>
            </form>
            <div className='main'>
                {loading ? (
                    <div className="loading">Loading...</div> 
                ) : (
                    <div className='boxes'>
                        {mealdata.map((data) => (
                            <div className='box' key={data.idMeal}>
                                <div>
                                    <img src={data.strMealThumb} alt="" style={{ width: "250px" }} />
                                </div>
                                <h3>{data.strMeal}</h3>
                            </div>
                        ))}
                        {mealdata.length === 0 && !loading && (
                            <div className="no-results">No meals found.</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Meal;
