import React, { useState } from 'react'
import { movies } from './data.js'

const Movies = () => {
  const [movieList, setmoviesList] = useState(movies)

  const filterByCategory = (cat) =>{
    setmoviesList(movies.filter((data)=>data.category == cat))
  }
  return (
    <>
      <div className='but'>
        <button onClick={()=>setmoviesList(movies)} type="button" class="btn btn-outline-primary">All</button>
        <button onClick={()=>filterByCategory("Action")} type="button" class="btn btn-outline-secondary">Action</button>
        <button onClick={()=>filterByCategory("Thriller")} type="button" class="btn btn-outline-success">Thriller</button>
        <button onClick={()=>filterByCategory("Animation")} type="button" class="btn btn-outline-danger">Animation</button>
        <button onClick={()=>filterByCategory("Horror")} type="button" class="btn btn-outline-warning">Horror</button>
        <button onClick={()=>filterByCategory("Drama")} type="button" class="btn btn-outline-info">Drama</button>
        <button onClick={()=>filterByCategory("Sci-Fi")} type="button" class="btn btn-outline-light">Sci-Fi</button>
      </div>
      <div className='main'>
        {movieList.map((data) => (
          <div className='second'>
            <div>
              <img src={data.poster_path} alt="" />
            </div>
            <h2 className='text'>{data.title}</h2>
            <h2 className='text'>{data.release_date}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default Movies
