import React, {useState} from "react";
import {useLazyQuery} from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";

//Home Component
function Home(){
    const [citySearched, setCitySearched] = useState("");

    const [getWeather,{data, error}] = useLazyQuery(
        GET_WEATHER_QUERY, 
        {
            variables: { name: citySearched},
        }
    );

    if (error) return <h1>Erro!</h1>;
    if (data){
        console.log(data);
    }
    return(
        <div className='home'>
            <h1>CIDADE</h1>
            <input type="text" placeholder="Ex: São Paulo" 
                onChange={(event) => {
                    setCitySearched(event.target.value);
                }} 
            />
            <button onClick={() => getWeather()}>Pesquisar</button>
            <div className="weather">
                {data && (
                    <>
                        <h3>Cidade:</h3>
                        <p>{data.getCityByName.name}</p>

                        <h3>Temperatura (°C): </h3>
                        <p>{data.getCityByName.weather.temperature.actual - 273.15}</p>

                        <h3>Vento: </h3>
                        <p>{data.getCityByName.weather.wind.speed}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home