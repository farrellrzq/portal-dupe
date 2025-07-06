'use client'

import { useEffect, useState } from "react";

interface WeatherData {
    list: {
        dt_txt: any;
        main: {
            temp: number;
        };
        weather: {
            description: string;
        }[];
    }[];
}

export default function WeatherData() {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url =
                    'https://api.openweathermap.org/data/2.5/forecast?lat=-6.4054801&lon=106.8184199&appid=06946cbe5b3adecc7da685e69d2e94e5&lang=id';
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }

                const data: WeatherData = await response.json();
                setWeatherData(data);

                // Log the entire list for debugging
                // console.log(data.list);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                return;
            }
        };

        fetchData();
    }, []);


    const list = weatherData?.list || [];
    const todayWeather = list.length > 0 ? list[0] : null;
    const tomorrowWeather = list.find((item) => item.dt_txt.includes('tomorrow')) || null;

    const todayTempValue = todayWeather ? Object.values(todayWeather.main || {})[1] : null;
    const todayTempValRounded = todayTempValue ? Math.floor((todayTempValue as number - 273.15)) : null;

    const tomorrowTempValue = tomorrowWeather ? Object.values(tomorrowWeather.main || {})[1] : null;
    const tomorrowTempValRounded = tomorrowTempValue
        ? Math.floor((tomorrowTempValue as number - 273.15))
        : null;

    return (
        <p>{todayTempValRounded} °C</p>
    )
}