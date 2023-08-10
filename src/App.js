import './App.css';
import './components/ExpenseItem'
import ExpenseItem from './components/ExpenseItem';
import NewCharacterForm from './components/NewCharacterForm';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';
import styled from 'styled-components'


const styledHeader = styled.div`
display: flex;
`

function App() {
  const [data,setData] = useState()
  const [customData,setCustom] = useState()
  const [search,setSearch] = useState("")
  const [saveCharacter, setSaveCharacter] = useState()

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  useEffect(()=> {
    const getFunction = async () => {
      const response = await fetch (
        'http://localhost:3600/graphql',
        {
          method:'post',
          body: JSON.stringify({query:`query {
            getCharacters {
              name
              status
              species
            }
          }`
        }),
        headers: {'content-type': 'application/json'}
        }
      )
      const result = await response.json()
      setCustom(result.data.getCharacters)
    }
    getFunction()
  },[saveCharacter])

  useEffect(()=> {
    const getFunction = async () => {
      const response = await fetch (
        'https://rickandmortyapi.com/graphql',
        {
          method:'post',
          body: JSON.stringify({query:`query {
            characters(filter: { name: "${search}" }) {
              results {
                id
                name
                species
                status
              }
            }
          }`
        }),
        headers: {'content-type': 'application/json'}
        }
      )
      const result = await response.json()
      setData(result.data.characters.results)
    }
    getFunction()
  },[search])


  const saveCharacterHandler = (savedCharacterState) => {
    setSaveCharacter(savedCharacterState)
  }
 // useEffect( ()=> {
  return (
    <div className="App">
      <header className="App-header">
        <div className='search-header'>
        <NewCharacterForm onSaveCharacter={saveCharacterHandler}/>
        <SearchBar onSearch={handleSearch}/>
        </div>
        <div className= "seperator">
        <div>
        <h3>Characters</h3>
        {data && data.map((person) => {
          const {id, name, species, status } = person

          return (
            <>
            <ExpenseItem name={name} status={status} species={species} id={id}></ExpenseItem>
            </>
          )
        })
        }
        </div>
        <div>
        <h3>Custom characters</h3>
          {customData && customData.map((person) => {
            const {name, status, species } = person
            console.log(person)
            return (
              <>
              <ExpenseItem name={name} status={status} species={species}></ExpenseItem>
              </>
            )
          })
          }
        
        </div>
      
        </div>
      </header>
    </div>
  );
 //       },[saveCharacter])
}

export default App;
