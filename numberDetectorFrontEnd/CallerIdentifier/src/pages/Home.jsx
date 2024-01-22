import React from 'react'
import Container from '../components/Container/Container'

function Home() {

  return (
    <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to Check The True Number
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
  )
}

export default Home