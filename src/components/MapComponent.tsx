import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon } from 'leaflet';
const fetchCountriesData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
    return data;
};

const createCustomIcon = (country: any) => {
    return new DivIcon({
        html: `
            <div style="display: flex; align-items: center;">
                <img src="${country.countryInfo.flag}" alt="${country.country} flag" style="width: 20px; height: 15px; margin-right: 5px;" />
                <span style="color: black; font-weight: bold;">${country.country}</span>
            </div>
        `,
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
};

const MapComponent: React.FC = () => {
    const { data, error, isLoading } = useQuery('countriesData', fetchCountriesData);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((country: any) => (
                <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]} icon={createCustomIcon(country)}>
                    <Popup>
                        <img src={country.countryInfo.flag} alt={`${country.country} flag`} style={{ width: '50px', height: '30px' }} /><br />
                        <strong>{country.country}</strong><br />
                        Active: {country.active}<br />
                        Recovered: {country.recovered}<br />
                        Deaths: {country.deaths}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
