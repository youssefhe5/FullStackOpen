import axios from "axios";
import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification.js";
import ErrorNotifiction from "./components/ErrorNotification.js";

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
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

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
          personsService
            .update(person.id, personObject)
            .then((newPerson) => {
              console.log(newPerson);
              setPersons(
                persons.filter((p) => p.id !== person.id).concat(newPerson)
              );
              setNewName("");
              setNewNumber("");
              setSuccessMessage(`Updated ${person.name}s number`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
            })
            .catch((error) => {
              setErrorMessage(
                `Information of ${person.name} has already been removed from server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 6000);
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
        setSuccessMessage(`Added ${newPerson.name} to the phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
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

      <Notification message={successMessage} />
      <ErrorNotifiction message={errorMessage} />

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
