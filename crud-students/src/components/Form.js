import { React, useState, useEffect } from "react";

const Form = () => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredAge, setEnteredAge] = useState("");
    const [enteredAddress, setEnteredAddress] = useState("");
    const [enteredGender, setEnteredGender] = useState("");
    const [students, setStudents] = useState([])
    const [currentStudent, setCurrentStudent] = useState('')

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem('key'))
        if (students) {
            setStudents(students)
        }
        
    }, [])

    // const students = JSON.parse(localStorage.getItem("key"));
    // console.log(students);

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    };

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    };

    const addressChangeHandler = (e) => {
        setEnteredAddress(e.target.value);
    };

    const genderChangeHandler = (e) => {
        setEnteredGender(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const studentsData = {
            name: enteredName,
            age: enteredAge,
            address: enteredAddress,
            gender: enteredGender
        }

        const _students = localStorage.getItem('key') && localStorage.getItem('key').length > 0 ? JSON.parse(localStorage.getItem('key')) : []
        localStorage.setItem('key', JSON.stringify([..._students, studentsData]))
        console.log(studentsData);
        setStudents([...students, studentsData])

        setEnteredName('');
        setEnteredAge('');
        setEnteredAddress('');
        setEnteredGender('');
    }

    const handleUpdate = () => {
        if (!currentStudent) return alert('Choose student to update !');

        const data = [...students]

        const studentUpdate = {
            name: enteredName,
            age: enteredAge,
            address: enteredAddress,
            gender: enteredGender
        };

        data[currentStudent] = studentUpdate;
        setStudents(data);
        localStorage.setItem('key', JSON.stringify(data))

        setEnteredName('');
        setEnteredAge('');
        setEnteredAddress('');
        setEnteredGender('');
    }

    return (
        <div className="col-md-4">
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="" className="form-control" onChange={nameChangeHandler} value={enteredName} />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input type="text" name="" className="form-control" onChange={ageChangeHandler} value={enteredAge} />
            </div>

            <div className="form-group">
                <label>Address</label>
                <input type="text" name="" className="form-control" onChange={addressChangeHandler} value={enteredAddress} />
            </div>

            <div className="form-group">
                <label>Gender</label>
                <input type="text" name="" className="form-control" onChange={genderChangeHandler} value={enteredGender} />
            </div>

            <div className="form-group mt-3">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Add
                </button>
            </div>

            <div className="form-group mt-3">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    )
}

export default Form;