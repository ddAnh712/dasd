import { React, useState, useEffect } from "react";

const Input = () => {
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

    const handleDelete = (studentOutIndex) => {
        const _students = students.filter((student, studentInIndex) => {
            if (studentInIndex !== studentOutIndex) {
                return student
            }
        })
        console.log(_students)
        setStudents(_students)
        localStorage.setItem('key', JSON.stringify(_students))
    }

    const handleUpdateClick = (index) => {
        setCurrentStudent(index);
        const student = students[index];
        console.log(student);

        setEnteredName(student.name);
        setEnteredAge(student.age);
        setEnteredAddress(student.address);
        setEnteredGender(student.gender)
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
        <div className="container">
            <div className="row">
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

                <div className="col-md-8">
                    <h1>List Students</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Update</th>
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{student.name}</td>
                                        <td>{student.age}</td>
                                        <td>{student.address}</td>
                                        <td>{student.gender}</td>
                                        <td><label className="btn btn-warning" onClick={() => handleUpdateClick(index)}> Update </label></td>
                                        <td><label className="btn btn-danger" onClick={() => handleDelete(index)}> Delete </label></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Input;
