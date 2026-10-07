import React, { useState, useEffect } from "react";
import { getDetails } from "../services/crudoperationservice";
import CreateForm from "../components/createoperation"
import { deleteDetails } from "../services/crudoperationservice";
function CrudOperation() {
    debugger;
    const [employees, setDetails] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadDetails();
    }, []);

    const loadDetails = async () => {
        debugger;

        try {

            const response = await getDetails();

            console.log(response.data);

            setDetails(response.data);

        } catch (error) {

            console.error("Error while fetching details:", error);

        }
    };


   
    if (showForm) {
        return (
            <CreateForm
             employee={selectedEmployee}
                onCancel={() =>{ 
                    setShowForm(false);
                    setSelectedEmployee(null);  
                    }}
                onSaved={() => {
                    setShowForm(false);
                    setSelectedEmployee(null);
                    loadDetails();

                }}
            />
        );
    }

    const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
    };

  const handleDelete = async(id)=>{
   
    const response = confirm("Are you sure you want to delete this employee?");

    if (!response) {
        return;
    }

    try {

        await deleteDetails(id);

        alert("Deleted successfully");

        // Reload employee list
        loadDetails();

    }
    catch (error) {

        //console.error("Error while deleting employee:", error);

        alert("Failed to delete employee");

    }

  }
  
    return (
        <>

            <div className="employee-container">

                <div className="table-header">
                    <div>
                        <h2>List Details</h2>

                    </div>

                    <button className="add-btn" onClick={() => setShowForm(true)} >+ Add New</button>
                </div>

                <div className="table-wrapper">
                    <table className="employee-table">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {employees.map((employee) => (
                                <tr key={employee.id}>

                                    <td>{employee.name}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.mobileNo}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.address}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                                        <button className="delete-btn" onClick={()=>handleDelete(employee.id)}>Delete</button>
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>

            </div>


        </>
    )
}
export default CrudOperation