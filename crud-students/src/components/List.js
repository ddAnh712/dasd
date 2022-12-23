import { React, useState, useEffect } from "react";

const List = () => {
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

    return (
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
    )
}

export default List;