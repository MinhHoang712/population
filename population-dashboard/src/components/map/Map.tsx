import {
    Box
} from "@mui/material";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'


import { provinceCoords } from "../../const/provinceCoords";
import { CircleMarker } from "react-leaflet/CircleMarker";
import { Popup } from "react-leaflet/Popup";


function MapComponent() {

    return (

        <Box
            sx={{
                width: "100%",
                height: "100%"
            }}
        >

            <MapContainer
                center={[16.2, 107.5]}
                zoom={5}
                style={{
                    width: "100%",
                    height: "100%"
                }}

            >

                <TileLayer

                    attribution='Tiles © Esri'

                    url="
                        https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
                        "

                />

                {

                    provinceCoords.map((province) => (

                        <CircleMarker

                            key={province.code}

                            center={province.coord}

                            radius={6}

                            pathOptions={{

                                color: "red",

                                fillColor: "red",

                                fillOpacity: 0.9,

                                weight: 1

                            }}

                        >

                            <Popup>

                                <div>

                                    <b>

                                        {province.name}

                                    </b>

                                    <br />

                                    Mã tỉnh:

                                    {" "}

                                    {province.code}

                                </div>

                            </Popup>

                        </CircleMarker>

                    ))

                }

            </MapContainer>

        </Box>

    )

}

export default MapComponent