import React from "react";
import Container from "../components/Container/Container";
import { useSelector } from "react-redux";
function Home() {
  const userData = useSelector((state) => state.auth.userData);
  console.log();

  if (userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold p-2 mx-20 rounded-xl mb-6 bg-blue-600 text-fuchsia-100  ">
              Welcome to Your Truecaller App {userData.name}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Identify and block spam calls with our advanced number lookup
              service. Whether it's an unknown caller or a potential spam, we've
              got you covered.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Search Numbers</h2>
                <p className="text-gray-700">
                  Easily search for any phone number and get information about
                  the caller. Our extensive database provides details to help
                  you decide whether to answer the call.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Block Spam</h2>
                <p className="text-gray-700">
                  Identify and block spam numbers to keep your phone free from
                  unwanted calls. Our spam detection system is constantly
                  updated to provide the best protection.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  Community Reporting
                </h2>
                <p className="text-gray-700">
                  Contribute to our community by reporting spam numbers. Help us
                  build a safer and more secure phone network for everyone.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to Use Our Services....
              </h1>
              <p className="text-lg text-gray-700 mb-6">
              Identify and block spam calls with our advanced number lookup
              service. Whether it's an unknown caller or a potential spam, we've
              got you covered.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Search Numbers</h2>
                <p className="text-gray-700">
                  Easily search for any phone number and get information about
                  the caller. Our extensive database provides details to help
                  you decide whether to answer the call.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Block Spam</h2>
                <p className="text-gray-700">
                  Identify and block spam numbers to keep your phone free from
                  unwanted calls. Our spam detection system is constantly
                  updated to provide the best protection.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  Community Reporting
                </h2>
                <p className="text-gray-700">
                  Contribute to our community by reporting spam numbers. Help us
                  build a safer and more secure phone network for everyone.
                </p>
              </div>
            </div>

            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
