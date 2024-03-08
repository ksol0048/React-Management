import React from 'react'

function Customer(props) {
  return (
    <div>
      <Customerprofiles id={props.id} image={props.image} name={props.name}/>
      <Customerinfo brithday={props.brithday} gender={props.gender} job={props.job}/>
    </div>
  )
}

function Customerprofiles(props){
  return(
    <div>
      <img src={props.image} alt='profile'></img>
      <h2>{props.name}({props.id})</h2>
    </div>
  )
}

function Customerinfo(props){
  return(
    <div>
      <p>{props.brithday}</p>
      <p>{props.gender}</p>
      <p>{props.job}</p>
    </div>
  )
}

export default Customer
