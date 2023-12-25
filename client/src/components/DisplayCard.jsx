import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const DisplayCard=({result, onDelete})=>{
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/delete/${result.id}`);
      console.log('Delete successful', response.data);
      onDelete(result.id);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="body2">Identification Number:{result.Identification_Number}</Typography>
        <Typography gutterBottom variant="body2">Name:{result.Name}</Typography>
        <Typography gutterBottom variant="body2">Last Name:{result.Last_Name}</Typography>
        <Typography gutterBottom variant="body2">Date Of Birth:{result.Date_of_birth}</Typography>
        <Typography gutterBottom variant="body2">Date Of Issue:{result.Date_of_issue}</Typography>
        <Typography gutterBottom variant="body2">Date Of Expiry:{result.Date_of_expiry}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>Delete</Button>
        <Button size="small">Update</Button>
      </CardActions>
    </Card>
  );
}

export default DisplayCard;