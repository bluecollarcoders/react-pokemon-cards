import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(intialFlipState = true) {
    const [isFlipped, setFlipped] = useState(intialFlipState);

    const flip = () => {
        setFlipped(isUp => !isUp);
    };

    return [isFlipped, flip];
}

function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorage(keyInLS);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    const clearResponses = () => setResponses([]);

    return [responses, addResponseData, clearResponses];
}

function useLocalStorage(key, intitialValue = []) {
    if (localStorage.getItem(key)) {
        intitialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(intitialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue]);

    return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };