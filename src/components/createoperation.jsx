import { useState,useEffect } from "react";
import react from 'react'
import { createDetails ,updateDetails} from "../services/crudoperationservice";

function CreateForm({ employee,onCancel, onSaved }) {

    const isEdit = employee !== null;

    const [formData, setFormData] = useState(
        employee || {
            name: "",
            age: "",
            gender: "",
            mobileNo: "",
            email: "",
            address: ""
        }
    );

    useEffect(() => {

    if (employee) {
        setFormData(employee);
    }
    else {
        setFormData({
            name: "",
            age: "",
            gender: "",
            mobileNo: "",
            email: "",
            address: ""
        });
    }

}, [employee]);

    //  const [employee, setEmployee] = useState({
    //     name: "",
    //     age: "",
    //     gender: "",
    //     mobileNo: "",
    //     email: "",
    //     address: ""
    // });



    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {
    //         debugger;

    //         const response = await createDetails(employee);

    //         console.log(response.data);

    //         alert("Details saved successfully!");

    //         onSaved();

    //     }
    //     catch (error) {

    //         console.error("Error while saving employee:", error);

    //         alert("Failed to save employee");
    //     }
    // };


      const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (employee) {

            // UPDATE
            await updateDetails(formData);

            alert("Employee updated successfully!");

        }
        else {

            // CREATE
            await createDetails(formData);

            alert("Employee created successfully!");

        }

        onSaved();

    }
    catch (error) {

        console.error("Error while saving employee:", error);

        alert("Failed to save employee");

    }
};

    return (
        <div className="form-container">
            <div className="form-header">
                <div>
                    <h2>Add Details</h2>
                   
                </div>
            </div>
             <form className="employee-form" onSubmit={handleSubmit}>
            <div className="employee-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name ="name" value={formData.name}
                        onChange={handleChange} placeholder="Enter name"  />
                </div>
                 <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age}
                        onChange={handleChange} placeholder="Enter age" />
                </div> 
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}> 
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="NA">None</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mobile No</label>
                    <input type="text"  name="mobileNo"  value={formData.mobileNo}
                        onChange={handleChange} placeholder="Enter mobile number" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter email address" />
                </div> 
                <div className="form-group">
                    <label>Address</label> 
                    <textarea rows="3" name="address"  value={formData.address}
                        onChange={handleChange} placeholder="Enter address" >
                    </textarea>
                </div>
                <div className="form-actions">

                    <button type="button" className="cancel-btn"   onClick={onCancel} > Cancel </button>
                    {/* <button  type="submit" className="save-btn" > Save Employee </button> */}
                    <button type="submit" className="save-btn"> {employee ? "Update Employee" : "Save Employee"}</button>
                </div>
            </div>
         </form>
        </div>
    );
}



export default CreateForm