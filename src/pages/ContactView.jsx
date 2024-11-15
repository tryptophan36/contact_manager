import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  TextField,
  Box,
  Select,
  InputLabel
} from '@mui/material';
import EditContactModal from '../components/EditContactModal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactView = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('name');
  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const rowsPerPage = 8;

  useEffect(() => {
    fetchContacts();
  }, [ filter, filterField]);

  const fetchContacts = async () => {
    try {
      const request = axios.CancelToken.source()
      const response = await axios.get(`http://localhost:5000/api/contacts`, {
       params:{
        filter:filterField,
        search:filter
       },
       cancelToken: request.token
      });
      console.log(response);
      setContacts(response?.data.slice(0,rowsPerPage));
      setTotalCount(response?.data.length);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleFilterFieldChange = (event) => {
    setFilterField(event.target.value);
    setPage(0);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`).then(
        (res) => {
          console.log(res);
          alert("Contact deleted successfully");
        }
      ).catch((err)=>{
        console.log(err);
        alert("Error deleting contact");
      });
      fetchContacts(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <>
      <Paper sx={{ width: '80%', overflow: 'hidden',mx:"auto" }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          <Select
            label="Group By"
            value={filterField}
            onChange={handleFilterFieldChange}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="job_title">Job Title</MenuItem>
          </Select>
          <TextField
            label="Filter"
            value={filter}
            onChange={handleFilterChange}
            placeholder={`Search by ${filterField}...`}
          />
        </Box>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts?.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.job_title}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(contact)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(contact.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>

      {selectedContact && (
        <EditContactModal
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedContact(null);
          }}
          contact={selectedContact}
          onUpdateSuccess={fetchContacts}
        />
      )}
    </>
  );
};

export default ContactView;