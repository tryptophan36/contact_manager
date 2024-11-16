import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";

const EditContactModal = ({ open, handleClose, contact, onUpdateSuccess }) => {
  const [formData, setFormData] = useState(contact);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `http://localhost:5000/api/contacts/${contact.id}`,
        formData
      );
      alert("contact updated successfully")
      onUpdateSuccess(); // Callback to refresh the parent component
      handleClose();
    } catch (err) {
      alert("error updating contact")
      setError(
        err.response?.data?.message ||
          "An error occurred while updating the contact"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{color:"white"}} component="h2" mb={2}>
          Edit Contact
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
            <TextField
              name="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="job_title"
              label="Job Title"
              value={formData.job_title}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditContactModal;
