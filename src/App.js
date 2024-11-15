import { useState } from 'react';
import { Box, Tab, Tabs, Typography, ThemeProvider, createTheme } from "@mui/material";
import CreateContact from './pages/CreateContact';
import ContactView from './pages/ContactView';
function App() {
  const [value, setValue] = useState(0);
  const Theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
   <ThemeProvider theme={Theme}>
  
     <div
       style={{ backgroundColor: "#121212", minHeight: "100vh" }}
        className="App"
    >
       <div>
          <Typography variant="h4" sx={{ pt: 2,color:"white",textAlign:"center" }}>
            Contacts Manager
          </Typography>
        </div>
     <Box sx={{ width: '50%', backgroundColor: 'background.paper',mt:"30px",mx:"auto",p:"10px" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Contact List" />
        <Tab label="Add New Contact" />
      </Tabs>
      
    </Box>


    <Box sx={{ p: 3 }}>
    {value === 0 && (
          <Box>
            <ContactView/>
          </Box>
        )}
        {value === 1 && (
          <Box>
            <CreateContact/>
          </Box>
        )}
    </Box>
    </div>
   </ThemeProvider>
  );
}

export default App;
