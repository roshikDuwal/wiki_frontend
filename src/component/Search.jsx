import React from 'react'

const Search = ({search,setSearch}) => {
  return (
    <>
        <div className="w-full flex items-center justify-center">
            <input type="search"  className='p-3 border-2 border-black' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}  />
        </div>
    </>
  )
}

export default Search