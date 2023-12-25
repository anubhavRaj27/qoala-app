import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../navbar/Navbar'
import "./results.css"
import DisplayCard from '../../components/DisplayCard';
const Results = () => {
  const [results, setResults] = useState([]);

  const fetchResults= async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/list_processes');
     
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching processes:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [results]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete/${id}`);
      
      setResults(prevResults => prevResults.filter(result => result.id !== id));
      
      console.log('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className='resultsPage'>
      <div>
        <Navbar />
      </div>
      <div>
        <h2>Fetched Results:</h2>
        <ul>
          {results.map((result) => {
            return <DisplayCard key={result.id} result={result} onDelete={handleDelete} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Results