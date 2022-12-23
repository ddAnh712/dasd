/* eslint-disable array-callback-return */
import React from 'react';
import './Students.css';
import 'bootstrap/dist/css/bootstrap.css';

class Students extends React.Component {
    constructor(props) {
        super(props);
        const cachedStudents = JSON.parse(localStorage.getItem("key"))?.students;
        console.log(cachedStudents);
        this.state = {
            index: 0,
            name: "",
            age: 0,
            address: "",
            gender: "",
            students: cachedStudents
            //  [
            //   {
            //     name: "Jack",
            //     age: 50,
            //     address: "USA",
            //     gender: "male"
            //   },
            //   {
            //     name: "Alex",
            //     age: 45,
            //     address: "USA",
            //     gender: "female"
            //   },
            //   {
            //     name: "Tom",
            //     age: 20,
            //     address: "Spain",
            //     gender: "male"
            //   },
            //   {
            //     name: "Quinn",
            //     age: 30,
            //     address: "England",
            //     gender: "female"
            //   },
            // ],
        }

        this.changeName = this.changeName.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeGender = this.changeGender.bind(this);
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }

    changeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    changeGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    addStudent = () => {
        if (!this.state.students.find(student => student.name === this.state.name)) {
            this.setState({
                students: [
                    ...this.state.students,
                    {
                        name: this.state.name,
                        age: this.state.age,
                        address: this.state.address,
                        gender: this.state.gender
                    }
                ],
                name: "",
                age: 0,
                address: "",
                gender: "",
            }, () => {
                localStorage.setItem('key', JSON.stringify({ students: this.state.students }));
            })
        }
    }

    Edit = (student, index) => {
        this.setState({
            name: student.name,
            age: student.age,
            address: student.address,
            gender: student.gender,
            index: index
        })
    }

    updateStudent = () => {
        let data = this.state.students;
        data.map((student, index) => {
            if (this.state.index === index) {
                student.name = this.state.name;
                student.age = this.state.age;
                student.address = this.state.address;
                student.gender = this.state.gender;
            }
        })
        this.setState({
            student: data,
            name: "",
            age: 0,
            address: "",
            gender: ""
        })
    }

    deleteStudent = (name) => this.setState({
        students: this.state.students.filter(student => student.name !== name)
    })

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h1>{this.state.action}</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="" className="form-control" onChange={this.changeName} value={this.state.name} />
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input type="text" name="" className="form-control" onChange={this.changeAge} value={this.state.age} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="" className="form-control" onChange={this.changeAddress} value={this.state.address} />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <input type="text" name="" className="form-control" onChange={this.changeGender} value={this.state.gender} />
                        </div>

                        <div className="form-group mt-3">
                            <button type="button" className="btn btn-primary" onClick={this.addStudent}>Add</button>
                        </div>

                        <div className="form-group mt-3">
                            <button type="button" className="btn btn-primary" onClick={this.updateStudent}>Update</button>
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
                                    this.state.students.map((student, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{student.name}</td>
                                            <td>{student.age}</td>
                                            <td>{student.address}</td>
                                            <td>{student.gender}</td>
                                            <td><label className="btn btn-warning" onClick={() => this.Edit(student, index)}> Update </label></td>
                                            <td><label className="btn btn-danger" onClick={() => this.deleteStudent(student.name)}> Delete </label></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Students;

