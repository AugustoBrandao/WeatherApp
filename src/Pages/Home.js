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

    const weather =()=> {
        let w = data.getCityByName.weather.temperature.actual - 273.15;
        if(w < 20){
            return "SIM";
        }
        else{
            return "NÃO";
        }
    }

    if (error) return <h1>Erro!</h1>;
    if (data){
        console.log(data);
    }
    
    return(
        <div className='home'>
            <h1>Weather App</h1>
            <input type="text" placeholder="Ex: São Paulo" 
                onChange={(event) => {
                    setCitySearched(event.target.value);
                }} 
            />
            <button onClick={() => getWeather()}>Pesquisar</button>
            <div className="weather">
                {data && (
                    <>
                        <p>Cidade: {data.getCityByName.name}</p>
                        <p>Temperatura: {(data.getCityByName.weather.temperature.actual - 273.15).toFixed()} °C</p>
                        <p>Vento: {data.getCityByName.weather.wind.speed} Mph</p>
                        <p role="textbox">Leva Casaco?  {weather()}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home
