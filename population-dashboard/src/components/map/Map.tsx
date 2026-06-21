import {
    Box,
    Button,
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'


import { provinceCoords34 } from "../../const/provinceCoords34";
import { provinceCoords63 } from "../../const/provinceCoords63";
import { CircleMarker } from "react-leaflet/CircleMarker";
import { Popup } from "react-leaflet/Popup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MapComponentProps = {
    selectedYear: number
}
function MapComponent({ selectedYear }: MapComponentProps) {

    const provinces =
        selectedYear >= 2025
            ? provinceCoords34
            : provinceCoords63

    const navigate =
        useNavigate();

    const [provinceData, setProvinceData] =
        useState<any>(null);



    const getIndicatorValue = (
        indicatorName: string
    ) => {

        return provinceData?.data?.find(
            (x: any) =>
                x.indicator === indicatorName
        )?.value ?? "-"
    }

    const loadProvinceData = async (
        provinceCode: string
    ) => {

        try {
            console.log('heh')
            const res = await fetch(

                `http://127.0.0.1:5000/api/province?code=${provinceCode}&year=${selectedYear}`

            )

            const data =
                await res.json()

            setProvinceData(data)

        }
        catch (err) {

            console.error(err)

        }

    }

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
                    provinces.map((province) => {


                        return (

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

                                eventHandlers={{
                                    click: () => {
                                        loadProvinceData(
                                            province.code
                                        )

                                    }
                                }}
                            >

                                <Popup>

                                    <div>

                                        <b>
                                            {provinceData?.provinceName ??
                                                province.name}
                                        </b>

                                        <br />

                                        Mã tỉnh:
                                        {" "}
                                        {province.code}

                                        {

                                            provinceData &&
                                            provinceData.provinceCode === province.code && (

                                                <TableContainer
                                                    component={Card}
                                                    sx={{
                                                        mt: 1
                                                    }}
                                                >

                                                    <Table
                                                        size="small"
                                                    >

                                                        <TableBody>

                                                            <TableRow>

                                                                <TableCell>
                                                                    TỔNG SỐ HỘ DÂN CƯ
                                                                </TableCell>

                                                                <TableCell align="right">

                                                                    {
                                                                        getIndicatorValue(
                                                                            "TỔNG SỐ HỘ DÂN CƯ"
                                                                        )?.toLocaleString()
                                                                    }

                                                                </TableCell>

                                                            </TableRow>

                                                            <TableRow>

                                                                <TableCell>
                                                                    Nam
                                                                </TableCell>

                                                                <TableCell align="right">

                                                                    {
                                                                        getIndicatorValue(
                                                                            "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NAM"
                                                                        )?.toLocaleString()
                                                                    }

                                                                </TableCell>

                                                            </TableRow>

                                                            <TableRow>

                                                                <TableCell>
                                                                    Nữ
                                                                </TableCell>

                                                                <TableCell align="right">

                                                                    {
                                                                        getIndicatorValue(
                                                                            "DÂN SỐ TRUNG BÌNH CHIA THEO GIỚI TÍNH NỮ"
                                                                        )?.toLocaleString()
                                                                    }

                                                                </TableCell>

                                                            </TableRow>

                                                            <TableRow>

                                                                <TableCell
                                                                    colSpan={2}
                                                                    align="center"
                                                                >
                                                                    <Typography
                                                                        variant="button"
                                                                        sx={{
                                                                            cursor: "pointer"
                                                                        }}
                                                                        onClick={() =>

                                                                            navigate(

                                                                                `/province/${province.code}/${selectedYear}`

                                                                            )

                                                                        }
                                                                    >
                                                                        Xem chi tiết
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                            )

                                        }

                                    </div>

                                </Popup>

                            </CircleMarker>

                        )

                    })
                }

            </MapContainer>

        </Box>

    )

}

export default MapComponent