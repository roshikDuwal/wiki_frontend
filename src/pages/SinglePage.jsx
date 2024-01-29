import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getSinglePost } from '../../api/api'

const SinglePage = () => {
    const { id } = useParams()

    const {
        isLoading,
        isError,
        error,
        isFetching,
        data: posts
    } = useQuery(["posts", id], () => getSinglePost(id))

    if (isLoading) {
        return <p>Loading</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }


    return (

        <div className='w-full'>
            {
                isFetching ? <><p>Loading</p></> :
                    <>
                        {
                            posts?.data?.post &&
                            <>
                                <Link to="/.." className='text-blue-700 m-5'>Back</Link>
                                <div className='flex-col items-center justify-center text-center gap-6 w-full'>
                                    <div className='flex items-center justify-center'>
                                        <img src={posts?.data?.post.selectedFile} alt="" style={{ width: "30%" }} className='border-2 m-2' />
                                    </div>

                                    <h1 className='font-bold text-3xl m-2'>Title:{posts?.data?.post.title}</h1>
                                    <p>{posts?.data?.post.message}</p>

                                </div>
                            </>
                        }



                    </>
            }
        </div>



    )
}

export default SinglePage