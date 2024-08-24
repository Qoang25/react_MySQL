import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import "./account.scss";
import { createAccount, deleteAccount, getAllAccount, updateAccount } from '../service/accountService';

function account() {
    const [accounts, setAccounts] = useState([]);
    const [keyEdit, setKeyEdit] = useState("");

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        getAllAccount()
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleCreate() {
        var newAccount = {
            "id": id,
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "gender": gender,
            "email": email
        };
        console.log(newAccount);
        createAccount(newAccount)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    window.location.href = "/"
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleUpdate = () => {
        const updateAccounts = {
            "id": id,
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "gender": gender,
            "email": email
        };
        updateAccount(keyEdit, updateAccounts)
            .then((response) => {
                if (response.status === 200) {
                    // Cập nhật lại danh sách account sau khi thành công
                    getAllAccount().then((response) => {
                        setAccounts(response.data);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('Updating account:', updateAccount);
        setKeyEdit("");
        setId("");
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
    };

    const handleDelete = (key) => {
        if (key !== null) {
            if (window.confirm("Are you sure you want to delete")) {
                deleteAccount(key) // Gọi hàm deleteAccount để thực hiện yêu cầu xóa
                    .then((response) => {
                        if (response.status === 200) {
                            getAllAccount()
                                .then((response) => {
                                    setAccounts(response.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

    };

    const handleEdit = (account) => {
        setKeyEdit(account.key);
        setId(account.id);
        setFullName(account.fullName);
        setEmail(account.email);
        setPhoneNumber(account.phoneNumber);
        setGender(account.gender);
    };
    return (
        <>
            <div className='container'>
                <h1 className='text-center mx-5'>SỬ DỤNG RESTFUL API VỚI REACT</h1>
                <div className='Formm'>
                    <div className='Form my-10 flex mx-40'>
                        <div className='Content-Left mx-5'>
                            <label htmlFor=""> ID:</label>
                            <input className='Input-Content bg-slate-400 rounded w-[300px] h-[30px]'
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                                name="id"
                                type="text" />
                        </div>
                        <div className='Content-Right mx-5'>
                            <label htmlFor="">Full Name: </label>
                            <input className='Input-Content bg-slate-400 rounded w-[300px] h-[30px]'
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                name="fullName"
                                type="text" />
                        </div>
                        <div className='Content-Right mx-5'>
                            <label htmlFor="">Phone Number: </label>
                            <input className='Input-Content bg-slate-400 rounded w-[300px] h-[30px]'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                name="phoneNumber"
                                type="text" />
                        </div>
                    </div>
                    <div className='Form my-10 flex mx-40'>
                        <div className='Content-Right mx-5'>
                            <label htmlFor="">Email: </label>
                            <input className='Input-Content bg-slate-400 rounded w-[300px] h-[30px]'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                name="email"
                                type="text" />
                        </div>
                        {/* <div className="mb-3">

                            <label htmlFor="country-select">Country: </label>
                            <select
                                id="country-select"
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                name="country"
                            >
                                <option value="VN">Việt Nam</option>
                                <option value="US">America</option>
                                <option value="Korea">Hàn Quốc</option>
                                <option value="JP">Nhật Bản</option>
                            </select>
                        </div> */}
                    </div>
                    <div className='Form my-10 flex mx-40'>
                        <div className='Content-Left mx-5'>
                            <div>
                                <label htmlFor="">Gender: </label>
                                <label>
                                    <input
                                        className='Input-Content bg-slate-400 rounded'
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={gender === true}
                                        onChange={() => setGender(true)}
                                    />
                                    Nam
                                </label>
                                <label>
                                    <input
                                        className='Input-Content bg-slate-400 rounded'
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={gender === false}
                                        onChange={() => setGender(false)}
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3 mx-3 my-3">
                    <button type="button" className="btn btn-primary me-3" onClick={handleCreate}>
                        Create
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                        Update
                    </button>
                    <button type="button" className="btn btn-primary ms-3" onClick={() => {
                        setId("");
                        setFullName("");
                        setEmail("");
                        setPhoneNumber("");
                        setGender("");
                    }}>
                        Reset
                    </button>
                </div>
                <hr />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Account ID</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.map((account, index) => (
                                <tr key={account.key}>
                                    <td>{index + 1}</td>
                                    <td>{account.id}</td>
                                    <td>{account.fullName}</td>
                                    <td>{account.phoneNumber}</td>
                                    <td>{account.email}</td>
                                    <td>{account.gender ? "Nam" : "Nữ"}</td>
                                    <td>
                                        <button className='bg-blue-600 rounded w-[60px]' onClick={() => handleEdit(account)}>Edit</button>
                                        <button className='bg-red-600 rounded w-[60px]' onClick={() => handleDelete(account.key)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default account