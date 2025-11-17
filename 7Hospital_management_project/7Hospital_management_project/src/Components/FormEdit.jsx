import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: "",
    patientName: "",
    mobileNumber: "",
    age: "",
    address: "",
    problem: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("Patients")) || [];
    const patient = patients.find(p => p.id == id);
    if (patient) setInput(patient);
    else navigate("/");
  }, [id, navigate]);

  const validate = () => {
    const error = {};
    if (!input.patientName.trim()) error.patientName = "Patient name is required";
    if (!input.mobileNumber) error.mobileNumber = "Mobile number is required";
    if (!input.age) error.age = "Age is required";
    if (!input.address.trim()) error.address = "Address is required";
    if (!input.gender) error.gender = "Gender selection is required";
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const patients = JSON.parse(localStorage.getItem("Patients")) || [];
      const updatedPatients = patients.map(p => (p.id == id ? input : p));
      localStorage.setItem("Patients", JSON.stringify(updatedPatients));
      alert("Patient updated successfully");
      navigate("/");
    }
  };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Edit Patient Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="row mb-3" controlId="formPatientName">
          <Form.Label className="col-sm-2 col-form-label">Patient Name</Form.Label>
          <div className="col-sm-10">
            <Form.Control 
              type="text" 
              name="patientName" 
              value={input.patientName} 
              onChange={handleChange} 
              isInvalid={!!errors.patientName} 
            />
            <Form.Control.Feedback type="invalid">{errors.patientName}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formMobile">
          <Form.Label className="col-sm-2 col-form-label">Mobile Number</Form.Label>
          <div className="col-sm-10">
            <Form.Control 
              type="number" 
              name="mobileNumber" 
              value={input.mobileNumber} 
              onChange={handleChange} 
              isInvalid={!!errors.mobileNumber} 
            />
            <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formAge">
          <Form.Label className="col-sm-2 col-form-label">Age</Form.Label>
          <div className="col-sm-10">
            <Form.Control 
              type="number" 
              name="age" 
              value={input.age} 
              onChange={handleChange} 
              isInvalid={!!errors.age} 
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formAddress">
          <Form.Label className="col-sm-2 col-form-label">Address</Form.Label>
          <div className="col-sm-10">
            <Form.Control 
              type="text" 
              name="address" 
              value={input.address} 
              onChange={handleChange} 
              isInvalid={!!errors.address} 
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="formProblem">
          <Form.Label className="col-sm-2 col-form-label">Doctor Name</Form.Label>
          <div className="col-sm-10">
            <Form.Control 
              type="text" 
              name="problem" 
              value={input.problem} 
              onChange={handleChange} 
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-2 col-form-label">Gender</Form.Label>
          <div className="col-sm-10 d-flex align-items-center">
            <Form.Check 
              inline 
              label="Male" 
              name="gender" 
              type="radio" 
              value="Male" 
              checked={input.gender === "Male"} 
              onChange={handleChange} 
            />
            <Form.Check 
              inline 
              label="Female" 
              name="gender" 
              type="radio" 
              value="Female" 
              checked={input.gender === "Female"} 
              onChange={handleChange} 
            />
            <Form.Check 
              inline 
              label="Other" 
              name="gender" 
              type="radio" 
              value="Other" 
              checked={input.gender === "Other"} 
              onChange={handleChange} 
            />
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="dark">Update Patient</Button>
        </div>
      </Form>
    </div>
  );
}

export default EditPatient;