import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

function Contacts() {
  const userInfo = useSelector((state) => state.auth.userData);
  const id = userInfo.id;
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`http://localhost:63965/api/Contacts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      setContacts(resp);
    });
  }, [id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className='text-wrap text-white-600 m-0 p-2 font-bold bg-blue-600 '>My Contacts</h1>
      {/* <div className="flex flex-wrap justify-around">
        {currentContacts.map((contact, index) => (
          <div key={index} className="w-1/4 mb-4 m-2 border border-black-500 bg-black rounded-lg shadow">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img className="w-24 h-24 mb-3 rounded-full bg-black shadow-lg" src="https://w7.pngwing.com/pngs/577/307/png-transparent-human-with-circle-logo-national-cyber-security-alliance-organization-drupal-association-information-internet-icon-s-customers-free-miscellaneous-company-logo.png" alt="image"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{contact.Name}</h5>
              <span className="text-sm text-blue-500 dark:text-blue">{contact.Email}</span>
              <span className="text-sm text-gray-500 dark:text-white">{contact.MoNumber}</span>
              <div className="flex mt-4 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
                <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div> */}
       <table className="border-collapse  p-1  my-3 w-full">
        <thead className='bg-orange-400'>
          <tr>
            <th className=" px-4 py-2">Sr. No.</th>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Mobile Number</th>
            <th className=" px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody className='bg-black'>
          {currentContacts.map((contact, index) => (
            <tr key={index}>
              <td className="text-zinc-50 font-bold px-4 py-2">{index + 1}</td>
              <td className=" text-zinc-50 font-bold  px-4 py-2">{contact.Name}</td>
              <td className=" text-zinc-50 font-bold  px-4 py-2">{contact.MoNumber}</td>
              <td className="text-zinc-50 font-bold   px-4 py-2">{contact.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {Array.from({ length: Math.ceil(contacts.length / itemsPerPage) }, (_, i) => (
          <button key={i} className="mx-1 px-3 py-1 bg-gray-300 rounded-lg" onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </>
  );
}

export default Contacts;
