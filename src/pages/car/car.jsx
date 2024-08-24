import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { createCar, deleteCar, getAllCar, updateCar } from '../../service/carService';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { carsState } from './state';
// import useCar from './useCar';

function Car() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => handleSubmitForm(data)

    // const [cars, setCars] = useState([]);

    // async function getCars (){
    //     setCars(await getAllCar());
    // }
    // const {getCars} = useCar();

    // useEffect(() => {
    //     getCars(setCars);
    // }, [cars]);

    const Cars = useRecoilValueLoadable(carsState);
    const refesCar = useRecoilRefresher_UNSTABLE(carsState);
    let { state, contents } = Cars;
    // state -> loading, headvalue, headerrors
    // const Cars1 = useRecoilValue(carsState);
    async function handleSubmitForm(data) {
        var response;
        if (data.id) {
            console.log(data, "Update Car");
            response = await updateCar(data.id,data);
        } else {
            console.log(data, "Create Car");
            response = await createCar(data);
            // console.log(response);
        }
        if(response){
            refesCar();
            document.getElementById("form").reset();
        }
    }


    const handleDelete = async (key) => {
        if (key !== null) {
            if (window.confirm("Are you sure you want to delete")) {
                if(await deleteCar(key)){
                    refesCar();
                } // Gọi hàm deleteCar để thực hiện yêu cầu xóa
                
            }
        }

    };

    const handleEdit = (car) => {
        reset(car);
        
    };
    if (state === "loading") {
        return <div className='container'>
        
            <form id="form" >
                <h1 className='text-center mx-5'>SỬ DỤNG RESTFUL API - MYSQL VỚI REACT</h1>
                <div className='Formm '>
                    <div className='Form my-10 flex mx-40'>
                        <div className='Content-Left mx-5'>
                            <label htmlFor="">Id:</label>
                            <input className='input input-bordered w-full max-w-xs '
                                {...register("id")} hidden
                                type="text" />
                        </div>
                        <div className='Content-Right mx-5'>
                            <label htmlFor="">Name: </label>
                            <input className='input input-bordered w-full max-w-xs'
                                {...register("name")}
                                type="text" />
                        </div>
                        <div className='Content-Right mx-5'>
                            <label htmlFor="">Brand: </label>
                            <input className='input input-bordered w-full max-w-xs'
                                {...register("brand")}

                                type="text" />
                        </div>
                    </div>
                    <div className='Form my-10 flex mx-40'>
                        
                        <div className="mb-3">

                            <label htmlFor="color-select">Color: </label>
                            <select
                                id="color-select"
                                {...register("color")}
                            >
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                                <option value="Blue">Blue</option>
                                <option value="Red">Red</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="mb-3 mx-3 my-3">
                    <button type="submit" className="btn btn-primary me-3" >
                        Save
                    </button>
                    {/* <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                            Update
                        </button> */}
                    <button type="reset" className="btn btn-primary ms-3" >
                        Reset
                    </button>
                </div>
            </form>
            <hr />
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    }
    if (state === "hasValue") {
        return (
            <>


                <div className='container'>
                    <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-center mx-5'>SỬ DỤNG RESTFUL API - MYSQL VỚI REACT</h1>
                        <div className='Formm '>
                            <div className='Form my-10 flex mx-40'>
                                <div className='Content-Left mx-5'>
                                    <label htmlFor="">Id:</label>
                                    <input className='input input-bordered w-full max-w-xs '
                                        {...register("id")} hidden
                                        type="text" />
                                </div>
                                <div className='Content-Right mx-5'>
                                    <label htmlFor="">Name: </label>
                                    <input className='input input-bordered w-full max-w-xs'
                                        {...register("name")}
                                        type="text" />
                                </div>
                                <div className='Content-Right mx-5'>
                                    <label htmlFor="">Brand: </label>
                                    <input className='input input-bordered w-full max-w-xs'
                                        {...register("brand")}

                                        type="text" />
                                </div>
                            </div>
                            <div className='Form my-10 flex mx-40'>
                                
                                <div className="mb-3">

                                    <label htmlFor="color-select">Color: </label>
                                    <select
                                        id="color-select"
                                        {...register("color")}
                                    >
                                        <option value="White">White</option>
                                        <option value="Black">Black</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Red">Red</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="mb-3 mx-3 my-3">
                            <button type="submit" className="btn btn-primary me-3" >
                                Save
                            </button>
                            
                            <button type="reset" className="btn btn-primary ms-3" >
                                Reset
                            </button>
                        </div>
                    </form>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Car ID</th>
                                <th>Full Name</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contents?.map((car, index) => (
                                    <tr key={car.id}>
                                        <td>{index + 1}</td>
                                        <td>{car.id}</td>
                                        <td>{car.name}</td>
                                        <td>{car.brand}</td>
                                        <td>{car.color}</td>
                                        <td>
                                            <button className='btn bg-blue-600 rounded w-[60px]' onClick={() => handleEdit(car)}>Edit</button>
                                            <button className='btn bg-red-600 rounded w-[60px]' onClick={() => handleDelete(car.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div >

            </>

        )
    }
}

export default Car