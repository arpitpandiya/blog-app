import axios from 'axios'
import React, { useState,useEffect } from 'react'

const Creator = () => {
  const [admin, setAdmin] = useState([]);
  console.log(admin);
  useEffect(() =>{
    const fetchAdmins = async () =>{
      try{
      const {data} = await axios.get("http://localhost:4001/api/users/admins", {
        withCredentials: true,
      })
      console.log(data);
      setAdmin(data);
    } catch(error){
      console.log("Error fetching admins: ",error);
    }
    };
    fetchAdmins();
  }, [])
  return (
    <div className='container mx-auto max-w-screen-xl p-4'>
      <h1 className='text-2xl font-semibold mb-6'>Popular Creators</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5 justify-center items-center'>
      {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div
                key={element._id}
                className="flex flex-col items-center text-center"
              >
                    <img
                      src={element.photo.url}
                      alt="blog"
                      className="md:w-56 md:h-56 object-cover border border-black rounded-full"
                    />
                    <div className='mt-2'>
                      <p>{element.name}</p>
                      <p className='text-gray-600 text-xs'>{element.role}</p>
                    </div>
                    </div>
                 );
          })
        ) : (
          <div className="flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </div>
    </div>
  )
}

export default Creator