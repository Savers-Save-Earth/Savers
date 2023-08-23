import React from 'react'

const MyCommunity = ({ params }: { params: { id: string } }) => {
  return (
    <>
    <div>MyCommunity</div>
    <h1>파람스 {params.id}</h1>
    </>
  )
}

export default MyCommunity