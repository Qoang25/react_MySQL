import axios from "axios";
const URL_BASE = "http://localhost:8080/api/v1/car"

export const getAllCar = async () => await axios.get(URL_BASE).then((response) => {
    return (response.data);
})
    .catch((error) => {
        console.log(error);
    });

export const createCar = async (car) => await axios.post(URL_BASE, car).then((resp) => {
    return (resp.data);
})
    .catch((error) => {
        console.log(error);
        return null;
    })

export const deleteCar = async (id) => await axios.delete(URL_BASE + '/' + id).then((response) => {
    return (response.status === 200);
})
    .catch((error) => {
        console.log(error);
    });;

export const updateCar = async (id, car) => await axios.put(URL_BASE + '/' + id, car).then((response) => {
    return (response.data);

})
    .catch((error) => {
        console.log(error);
    });;