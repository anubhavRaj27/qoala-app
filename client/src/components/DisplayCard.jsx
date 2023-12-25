import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { CardActionArea } from '@mui/material';

const DisplayCard=({result, onDelete})=>{
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://6bbb-122-172-82-83.ngrok-free.app/delete/data/${result.id}`);
      console.log('Delete successful', response.data);
      onDelete(result.id);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} 
    style={{ marginBottom: "20px", backgroundColor: "#F5E8C7" }}
    >
    <CardActionArea>
      <CardContent style={{ textAlign: 'left' }} >
        <Typography gutterBottom variant="body2">Identification Number:{result.Identification_Number}</Typography>
        <Typography gutterBottom variant="body2">Name:{result.Name}</Typography>
        <Typography gutterBottom variant="body2">Last Name:{result.Last_Name}</Typography>
        <Typography gutterBottom variant="body2">Date Of Birth:{result.Date_of_birth}</Typography>
        <Typography gutterBottom variant="body2">Date Of Issue:{result.Date_of_issue}</Typography>
        <Typography gutterBottom variant="body2">Date Of Expiry:{result.Date_of_expiry}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default DisplayCard;