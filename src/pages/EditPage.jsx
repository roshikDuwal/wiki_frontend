
import { TextField } from "@mui/material"
import { useFormik } from 'formik'
import FileBase from "react-file-base64"
import { addPost, getSinglePost, updatePost } from "../../api/api"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom'


const EditPage = () => {

  const { id } = useParams()
  const navigate=useNavigate()

  const queryClient = useQueryClient()
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: posts
  } = useQuery(["post", id], () => getSinglePost(id), {
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('post')
      setTimeout(()=>{
        navigate("/")
        window.location.reload()
      },1000)
      return toast.success("Post Updated Successfully")
    },
  })

  const Values = {
    title: posts?.data?.post.title || "",
    message: posts?.data?.post.message || "",
    tags: posts?.data?.post.tags || "",
    selectedFile: posts?.data?.post.selectedFile || "",
    creator: posts?.data?.post.creator || ""
  };

  //SUBMIT -------
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: Values,
    // validationSchema: singUpSchema,
    onSubmit: (values, action) => {
      const postData = {
        title: values.title,
        message: values.message,
        tags: values.tags,
        selectedFile: values.selectedFile,
        creator: values.creator,
      };
      updatePostMutation.mutate({ id, data: postData })
      action.resetForm();
    }
  })

  if (isError) {
    return toast.error(error.message)
  }







  return (
    <>
      {
        isLoading ? <>
          <p>Loading..</p>
        </> : <>
          <div className="container flex p-5">
            <ToastContainer position='top-right'
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              draggable={true}
              pauseOnHover
              theme="light"
              limit={2}
            />

            <div className="registerbox w-full">

              <h2 className="text-3xl font-bold text-center m-4">Updating a Blog</h2>

              <form action="" onSubmit={handleSubmit} className='border-2 w-full flex flex-col justify-center items-center p-5 gap-4'>

                <div >
                  <TextField className='input' id="outlined-basic" label="Creator" variant="outlined" type="text" name="creator"
                    autoComplete='off'
                    value={values.creator}
                    onChange={handleChange}
                    onBlur={handleBlur} />

                  {/* {errors.firstName && touched.firstName ? (<p className='errorval'>{errors.firstName}</p>) : null} */}
                </div>

                <div>
                  <TextField className='input' id="outlined-basic" label="Title" variant="outlined" type="text" name="title"
                    autoComplete='off'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur} />

                  {/* {errors.firstName && touched.firstName ? (<p className='errorval'>{errors.firstName}</p>) : null} */}
                </div>

                <div>
                  <TextField className='input' id="outlined-basic" label="Message" variant="outlined" type="text" name="message"
                    autoComplete='off'
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur} />

                  {/* {errors.firstName && touched.firstName ? (<p className='errorval'>{errors.firstName}</p>) : null} */}
                </div>

                <div>
                  <TextField className='input' id="outlined-basic" label="Tags" variant="outlined" type="text" name="tags"
                    autoComplete='off'
                    value={values.tags}
                    onChange={handleChange}
                    onBlur={handleBlur} />

                  {/* {errors.firstName && touched.firstName ? (<p className='errorval'>{errors.firstName}</p>) : null} */}
                </div>

                <div>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => handleChange({ target: { name: 'selectedFile', value: base64 } })}
                  />
                </div>

                <div>
                  <input className='submit bg-green-500 text-white py-1 px-3 rounded m-2 cursor-pointer' type="submit" value="Submit" />
                </div>

              </form>
            </div>
          </div>
        </>
      }


    </>
  )
}

export default EditPage