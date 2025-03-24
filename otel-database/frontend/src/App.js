import React, { useState }  from "react";
import axios from "axios";
import './App.css';

function App() {
  const [usersTable, setUsersTable] = useState([]);
  const [showError, setShowError] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchUsers() {
    try {
      const itemsResponse = await axios.get(
        `http://localhost:3030/users`
      );
      generateUsersTable(itemsResponse.data);
      setShowError("none");
    } catch (error) {
      setErrorMessage(`Unable to load latest users info: ${error.message}`);
      setShowError("block");
      console.error("Error fetching users:", error);
    }
  };

  async function addUser() {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
      alert("Fill all values");
      return;
    }
    try {
      const result = await axios.post(
        `http://localhost:3030/add`,
        null,
        { params: 
          { 'first_name': firstName,
            'last_name': lastName,
            'email': email
           },
        }
      );
      console.log(result);
      fetchUsers()
      setShowError("none");
    } catch (error) {
      setErrorMessage(`Unable to add user: ${error.message}`);
      setShowError("block");
      console.error("Error adding user:", error);
    }
  }

  async function removeUser(userID) {
    try {
      await axios.post(
        `http://localhost:3030/remove`,
        null,
        {params: {'userID': userID}}
      );
      fetchUsers();
      setShowError("none");
    } catch (error) {
      setErrorMessage(`Unable to remove user: ${error.message}`);
      setShowError("block");
      console.error("Error removing user:", error);
    }
  }

  function generateUsersTable(users) {
    if (!users) return;
    setUsersTable(
      <table>
        <thead><tr>{getHeadings()}</tr></thead>
        <tbody>{getRows(users)}</tbody>
      </table>
    );
  }

  function getHeadings() {
    return [
      (<th key='user_id'>User ID</th>),
      (<th key='first_name'>First Name</th>),
      (<th key='last_name'>Last Name</th>),
      (<th key='email'>Email</th>),
      (<th key='remove'></th>)]
  }
  function getRows(data) {
    return data.map(user => {
      return <tr key={user['user_id']}>{getCells(user)}</tr>;
    });
  }
  function getCells(user) {
    const cells = Object.values(user).map((value, index) => {
      return <td key={`${user['user_id']}-${index}`}>{value}</td>;
    });
    cells.push(<td key={`${user['user_id']}-4`}><button onClick={() => {removeUser(user['user_id'])}}>REMOVE</button></td>)
    return cells;
  }


  return (
    <div className="App">
      <button onClick={() => {fetchUsers()}}>REFRESH</button>
      {usersTable}
      <span style={{display: showError}}>{errorMessage}</span>

      <div className="add-area">
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" name="fname"></input><br/>

        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname"></input><br/>

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email"></input><br/>

        <button onClick={() => {addUser()}}>ADD</button>
      </div>
    </div>
  );
}

export default App;
