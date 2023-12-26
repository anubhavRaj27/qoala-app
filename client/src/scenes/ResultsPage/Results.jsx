import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../navbar/Navbar'
import "./results.css"
import DisplayCard from '../../components/DisplayCard';
import { Typography } from '@mui/material';
const Results = () => {
  const [results, setResults] = useState([]);

  const fetchResults= async () => {
    try {
      const response = await axios.get('https://fba8-122-172-82-83.ngrok-free.app/list_data');
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching processes:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fba8-122-172-82-83.ngrok-free.app/delete/data/${id}`);
      
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
      <Typography variant="h3" component="h3" style={{ paddingBottom: '30px',paddingTop: '30px' }}>
      Fetched results
    </Typography>
      </div>
      <div className='cardContainerCourse'>
          {results.map((result) => {
            return <DisplayCard key={result.id} result={result} onDelete={handleDelete} />
          })}
      </div>
    </div>
  )
}

export default Results