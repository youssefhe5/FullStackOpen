import axios from "axios";
import { useEffect, useState } from "react";
import personsService from "./services/persons";

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredArray, removeName }) => {
  return filteredArray.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          console.log(person);
          removeName(person);
        }}
      >
        delete
      </button>
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    persons.find((person) => {
      if (person.name === newName) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personsService.update(person.id, personObject).then((newPerson) => {
            console.log(newPerson);
            setPersons(
              persons.filter((p) => p.id !== person.id).concat(newPerson)
            );
            setNewName("");
            setNewNumber("");
          });
          console.log("update phonebook");
        }
      }
    });

    if (persons.find((person) => person.name === newName)) {
    } else {
      personsService.create(personObject).then((newPerson) => {
        console.log(newPerson);
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removeName = (clickedPerson) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${clickedPerson.name} from your phonebook?`
      )
    ) {
      console.log(clickedPerson, " removed");
      personsService.remove(clickedPerson.id);
      setPersons(persons.filter((person) => clickedPerson.id !== person.id));
    } else {
      console.log(clickedPerson, " was not removed");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredArray = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons filteredArray={filteredArray} removeName={removeName} />
    </div>
  );
};

export default App;
