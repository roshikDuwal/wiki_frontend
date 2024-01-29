import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deletePost, getPost, likeCountPost } from '../../api/api'
import moment from "moment"
import { Link } from "react-router-dom"
import Search from "../component/Search"

const Post = () => {
  const [search, setSearch] = useState("")
  const [serachResult, setSearchResult] = useState([])

  const queryclient = useQueryClient()
  const {
    isError,
    error,
    data: posts,
    isLoading,
    isFetching
  } = useQuery("posts", getPost, {
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    const filterResult = posts?.data?.post.filter(elem => ((elem.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filterResult)
  }, [posts, search])




  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("posts")
    }
  })

  const likeCountMutation = useMutation(likeCountPost, {
    onSuccess: () => {
      queryclient.invalidateQueries("posts")
    }
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <div className='flex flex-wrap gap-5 m-5 '>
        <Search search={search} setSearch={setSearch} />
        {
          isFetching ? <><p>Loading</p></> :
            <>
              {
                serachResult?.length ? <>
                  {
                    serachResult.map((elem) => {
                      return (
                        <div key={elem._id} className='border-2 w-80 flex-col  items-center justify-center text-center gap-2  h-[30rem] ' >

                          <img className='w-full' src={elem.selectedFile} alt={elem.title} style={{ height: "60%", objectFit: "contain" }} />
                          <h1>Title:{elem.title}</h1>
                          <p>{elem.message.slice(0, 12)}..</p>
                          <p>Creator:{elem.creator}</p>
                          <p>Tags:{elem.tags}</p>
                          <p>Uploaded:{moment(elem.createdAt).fromNow()}</p>

                          <div className=' flex gap-5 justify-center items-center'>
                            <button className='text-blue-500 cursor-pointer' onClick={() => likeCountMutation.mutate(elem._id)}>Like {elem.likeCount}</button>
                            <Link to={`/post/${elem._id}`} className='underline font-bold cursor-pointer'>Read More</Link>
                          </div>

                          <div className=' flex gap-5 justify-center items-center'>
                            <button onClick={() => deleteMutation.mutate(elem._id)} className='bg-red-500 text-white py-1 px-3 rounded m-2 cursor-pointer'>Delete</button>
                            <Link to={`/edit/${elem._id}`} className='bg-green-500 text-white py-1 px-3 rounded m-2 cursor-pointer'>Edit</Link>
                          </div>

                        </div>
                      )
                    })
                  }
                </>
                  :
                  <>
                    <h1 className='text-center'>No Post found</h1>
                  </>
              }

            </>

        }

      </div>



    </>
  )
}

export default Post