

'use client';

import { Container, Typography, Button , TextField, Box} from '@mui/material';
import { useState } from 'react';

export default function HomePage() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount:number = (count + 1) % 4; // 0-3 között váltakozik
    setCount(newCount);
    // setCount(prev => (prev + 1) % 4); // Alternatív megoldás
  
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
 
  const getColor = () => {
    switch (count) {
      case 0: return 'success';   
      case 1: return 'primary';   
      case 2: return 'warning';   
      default: return 'error';    
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Üdv az UpCycle Shopban!
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Kattintások száma: {count}
      </Typography>
      <TextField
        label="ezt fogod látni"
        placeholder="Írj be valamit..."
        variant="outlined"
        color={getColor()} // színváltoztatás
        fullWidth
        sx={{ mb: 2 }}
       value={value}
        onChange={handleChange}
      />
       <Typography variant="h4" sx={{ mb: 2 }}>
        Beírt szöveg: {value}
      </Typography>

      <Button
        variant="contained"
        color={getColor()}          
        size="large"
        onClick={handleClick}
      >
        Fedezd fel
      </Button>
      <Box sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2, mt: 4 }}>
  <Typography variant="overline" >Ez egy doboz belseje</Typography>
</Box>
    </Container>
  );
}

/*
| MUI `color` prop | Valós szín | Mit jelent |
|------------------|------------|------------|
| `success`        | zöld       | siker / rendben |
| `primary`        | kék        | fő stílus |
| `warning`        | sárga      | figyelmeztetés |
| `error`          | piros      | hiba / veszély |
*/