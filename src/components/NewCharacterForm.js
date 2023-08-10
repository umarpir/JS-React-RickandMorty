import { useEffect, useState } from "react"
import "./NewCharacterForm.css"

const NewCharacterForm = (props) => {

const [userInput,setUserInput] = useState({
    name:'',
    status:'',
    species:''
})

const handleName = (e) => {
    setUserInput({
        ...userInput,
        name: e.target.value
    })
}

const handleStatus = (e) => {
    setUserInput({
        ...userInput,
        status: e.target.value
        
    })
}

const handleSpecies = (e) => {
    setUserInput({
        ...userInput,
        species: e.target.value
    })
}
const handleClick = (e) => {
    e.preventDefault();
    console.log(userInput)
    props.onSaveCharacter(e)
    postFunction()
    handleModalClick()
}

    const postFunction = async () => {
        const response = await fetch (
            "http://localhost:3600/graphql",
            {
                method:'post',
                body: JSON.stringify({query:`mutation CreateCharacter($name: String!, $status: String!, $species: String){
                    createCharacter(name: $name, status: $status, species: $species) {
                      
                        name
                        status
                        species
                      
                    }
                  }`,
                variables: {
                    name: userInput.name,
                    status: userInput.status,
                    species: userInput.species
                }
              }),
              headers: {'content-type': 'application/json'}
              }
        )
        const result = await response.json()
        console.log(result)
    }

    const[modal,setModal] = useState(false)

    const handleModalClick = () => {
        setModal(!modal)
    }

    return (
        <>
        <button class="modalButton" onClick={handleModalClick}> NEW Character</button>
        
        {modal && (

<div class="shade show">
  <div class="form modal show">
    <div class="close" onClick={handleModalClick}>&times;</div>  
  <form id="contact">
    <h3>New Character</h3>
    <fieldset>
      <input placeholder="Character Name" type="text" tabIndex="1" required autoFocus onChange={handleName}/>
    </fieldset>
    <fieldset>
      <input placeholder="Status" type="text" tabIndex="2" required onChange={handleStatus}/>
    </fieldset>
    <fieldset>
      <input placeholder="Species" tabIndex="3" required onChange={handleSpecies}></input>
    </fieldset>
  <button onClick={handleClick}>SUBMIT</button>
  </form>
  </div>
</div>
        )}
</>
    )
}
export default NewCharacterForm