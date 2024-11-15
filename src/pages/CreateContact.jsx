import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
const CreateContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    job_title: "",
  });
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    // Email validation
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);

      axios({
        url: "http://localhost:5000/api/contacts",
        method: "POST",
        data: formData,
      })
        .then((res) => {
          alert("Contact added successfully");
        })

        // Catch errors if any
        .catch((err) => {
          console.log(err);
          alert("Error adding contact");
        });

      // setFormData({
      //   name: "",
      //   phone: "",
      //   email: "",
      //   company: "",
      //   jobTitle: "",
      // });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "white", textAlign: "center" }}
      >
        Add New Contact
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          "& .MuiTextField-root": { mb: 2 },
        }}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleFormChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleFormChange}
          error={!!errors.company}
          helperText={errors.company}
        />
        <TextField
          fullWidth
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleFormChange}
          error={!!errors.jobTitle}
          helperText={errors.jobTitle}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Contact
        </Button>
      </Box>
    </Box>
  );
};

export default CreateContact;
