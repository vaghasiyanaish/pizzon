import { useNavigate } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import Hospital_header from "../Components/Header";
import { useState } from "react";

function Homepage() {
    const navigate = useNavigate();
    const patients = JSON.parse(localStorage.getItem("Patients")) || [];

    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleDelete = (id) => {
        const filtered = patients.filter(p => p.id !== id);
        localStorage.setItem("Patients", JSON.stringify(filtered));
    };

    const handleView = (patient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    return (
        <div className="container mt-4">
            <Hospital_header />
            <h2 className="mb-4 mt-4 text-center">Patient List</h2>

            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patient Name</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Doctor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={patient.id}>
                            <td>{index + 1}</td>
                            <td>{patient.patientName}</td>
                            <td>{patient.mobileNumber}</td>
                            <td>{patient.age}</td>
                            <td>{patient.address}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.doctor}</td>
                            <td>
                                <Button variant="primary" className="me-2" onClick={() => handleView(patient)}>View</Button>
                                <Button variant="warning" className="me-2" onClick={() => navigate(`/edit/${patient.id}`)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPatient && (
                        <div>
                            <p><strong>Name:</strong> {selectedPatient.patientName}</p>
                            <p><strong>Mobile:</strong> {selectedPatient.mobileNumber}</p>
                            <p><strong>Age:</strong> {selectedPatient.age}</p>
                            <p><strong>Address:</strong> {selectedPatient.address}</p>
                            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                            <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Homepage;