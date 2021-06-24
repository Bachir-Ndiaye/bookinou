import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { useState } from "react";

function App() {

  const axios = require('axios');
  const [data, setData] = useState(null);

  const showData = () => {
    //Authenticate to the API to get the Bearer Token
    const loginResponse = axios.post('https://api-v2.7-dev.mybookinou.com/api/users/login',
      {
        "username": "technical_test@bookinou.com",
        "password": "test69"
      })
      .then((res) => res.data)
      .then((data) => data["hydra:description"])
      .then((token) => {
        console.log(`Bearer ${token}`);
        axios.post('https://api-v2.7-dev.mybookinou.com/api/graphql',
          {
            headers: { Authorization: `Bearer ${token}` },
            query: `
                {
                  stories {
                    edges {
                      node {
                        id
                        title
                        picture {
                          id
                          contentUrl
                                }
                          }
                          }
                          }
                }
                `
          }
        )
          .then((res) => setData(res.data))
          .then((datas) => console.log(datas))
          .catch((err) => console.log(err));
      });
}

return (
  <div className="App">
    <header className="App-header">
      <Button variant="primary" onClick={showData}>Show Data</Button>
    </header>
  </div>
);
}

export default App;
