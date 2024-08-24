import { selector } from "recoil";
import { getAllCar } from "../../service/carService";

export const carsState = selector({
    key: "carsState",
    get: async () => {
        return await getAllCar();
    }
});