import Vehicle from "../models/Vehicle.js";
import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const feedVehicleData = asyncHandler(async (req, res) => {
    const vehicleData = [
        [
            {
                "Serial Number": 1,
                "Make": "Toyota",
                "Model": "Innova Crysta",
                "AvailableVariants": "GX",
                "Price": "23,91,416",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-crysta"
            },
            {
                "Serial Number": 1,
                "Make": "Toyota",
                "Model": "Innova Crysta",
                "AvailableVariants": "GX Plus",
                "Price": "25,68,240",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-crysta"
            },
            {
                "Serial Number": 1,
                "Make": "Toyota",
                "Model": "Innova Crysta",
                "AvailableVariants": "GX Plus 8str",
                "Price": "25,74,488",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-crysta"
            },
            {
                "Serial Number": 1,
                "Make": "Toyota",
                "Model": "Innova Crysta",
                "AvailableVariants": "VX",
                "Price": "29,69,039",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-crysta"
            },
            {
                "Serial Number": 1,
                "Make": "Toyota",
                "Model": "Innova Crysta",
                "AvailableVariants": "ZX",
                "Price": "31,64,724",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-crysta"
            },
            {
                "Serial Number": 2,
                "Make": "Toyota",
                "Model": "Fortuner",
                "AvailableVariants": "4X2 Diesel",
                "Price": "42,90,591",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Toyota/Toyota_Fortuner"
            },
            {
                "Serial Number": 2,
                "Make": "Toyota",
                "Model": "Fortuner",
                "AvailableVariants": "4X2 Diesel AT",
                "Price": "45,60,679",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Toyota/Toyota_Fortuner"
            },
            {
                "Serial Number": 2,
                "Make": "Toyota",
                "Model": "Fortuner",
                "AvailableVariants": "4X4 Diesel",
                "Price": "47,76,279",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Toyota/Toyota_Fortuner"
            },
            {
                "Serial Number": 2,
                "Make": "Toyota",
                "Model": "Fortuner",
                "AvailableVariants": "4X4 Diesel AT",
                "Price": "50,47,552",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Toyota/Toyota_Fortuner"
            },
            {
                "Serial Number": 3,
                "Make": "Toyota",
                "Model": "Innova Hycross",
                "AvailableVariants": "GX 7STR",
                "Price": "23,19,456",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-hycross"
            },
            {
                "Serial Number": 3,
                "Make": "Toyota",
                "Model": "Innova Hycross",
                "AvailableVariants": "GX (O) 7STR",
                "Price": "24,75,661",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-hycross"
            },
            {
                "Serial Number": 3,
                "Make": "Toyota",
                "Model": "Innova Hycross",
                "AvailableVariants": "VX 7STR Hybrid",
                "Price": "30,51,090",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-hycross"
            },
            {
                "Serial Number": 3,
                "Make": "Toyota",
                "Model": "Innova Hycross",
                "AvailableVariants": "ZX Hybrid",
                "Price": "35,55,309",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-hycross"
            },
            {
                "Serial Number": 3,
                "Make": "Toyota",
                "Model": "Innova Hycross",
                "AvailableVariants": "ZX(O) Hybrid",
                "Price": "36,28,817",
                "WebsiteLink": "https://www.cardekho.com/toyota/innova-hycross"
            },
            {
                "Serial Number": 4,
                "Make": "Mahindra",
                "Model": "ScorpioN",
                "AvailableVariants": "Z4 Diesel",
                "Price": "19,33,133",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio-n"
            },
            {
                "Serial Number": 4,
                "Make": "Mahindra",
                "Model": "ScorpioN",
                "AvailableVariants": "Z6 Diesel",
                "Price": "20,47,778",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio-n"
            },
            {
                "Serial Number": 4,
                "Make": "Mahindra",
                "Model": "ScorpioN",
                "AvailableVariants": "Z4 Diesel 4x4",
                "Price": "21,84,043",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio-n"
            },
            {
                "Serial Number": 4,
                "Make": "Mahindra",
                "Model": "ScorpioN",
                "AvailableVariants": "Z8L Diesel",
                "Price": "25,35,081",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio-n"
            },
            {
                "Serial Number": 4,
                "Make": "Mahindra",
                "Model": "ScorpioN",
                "AvailableVariants": "Z8L Diesel 4x4",
                "Price": "27,76,697",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio-n"
            },
            {
                "Serial Number": 5,
                "Make": "Mahindra",
                "Model": "Scorpio Classic",
                "AvailableVariants": "S",
                "Price": "16,61,175",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio"
            },
            {
                "Serial Number": 5,
                "Make": "Mahindra",
                "Model": "Scorpio Classic",
                "AvailableVariants": "S11 7 seater",
                "Price": "20,73,334",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio"
            },
            {
                "Serial Number": 5,
                "Make": "Mahindra",
                "Model": "Scorpio Classic",
                "AvailableVariants": "S 11",
                "Price": "21,14,278",
                "WebsiteLink": "https://www.cardekho.com/mahindra/scorpio"
            },
            {
                "Serial Number": 6,
                "Make": "Mahindra",
                "Model": "Bolero",
                "AvailableVariants": "B4",
                "Price": "11,25,894",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero"
            },
            {
                "Serial Number": 6,
                "Make": "Mahindra",
                "Model": "Bolero",
                "AvailableVariants": "B6",
                "Price": "11,50,058",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero"
            },
            {
                "Serial Number": 6,
                "Make": "Mahindra",
                "Model": "Bolero",
                "AvailableVariants": "B6 Opt",
                "Price": "13,04,041",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero"
            },
            {
                "Serial Number": 7,
                "Make": "Mahindra",
                "Model": "BoleroNeo",
                "AvailableVariants": "N8",
                "Price": "12,73,017",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero-neo"
            },
            {
                "Serial Number": 7,
                "Make": "Mahindra",
                "Model": "BoleroNeo",
                "AvailableVariants": "N10 R",
                "Price": "13,71,034",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero-neo"
            },
            {
                "Serial Number": 7,
                "Make": "Mahindra",
                "Model": "BoleroNeo",
                "AvailableVariants": "N10 Opt",
                "Price": "14,51,099",
                "WebsiteLink": "https://www.cardekho.com/mahindra/bolero-neo"
            },
            {
                "Serial Number": 8,
                "Make": "Maruti",
                "Model": "Ciaz",
                "AvailableVariants": "Delta",
                "Price": "11,19,004",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ciaz"
            },
            {
                "Serial Number": 8,
                "Make": "Maruti",
                "Model": "Ciaz",
                "AvailableVariants": "Zeta",
                "Price": "12,05,429",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ciaz"
            },
            {
                "Serial Number": 8,
                "Make": "Maruti",
                "Model": "Ciaz",
                "AvailableVariants": "Alpha",
                "Price": "12,96,600",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ciaz"
            },
            {
                "Serial Number": 9,
                "Make": "Maruti",
                "Model": "Ertiga",
                "AvailableVariants": "VXi (O)",
                "Price": "10,91,750",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ertiga"
            },
            {
                "Serial Number": 9,
                "Make": "Maruti",
                "Model": "Ertiga",
                "AvailableVariants": "Zxi (O)",
                "Price": "12,55,213",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ertiga"
            },
            {
                "Serial Number": 9,
                "Make": "Maruti",
                "Model": "Ertiga",
                "AvailableVariants": "ZXI Plus",
                "Price": "13,36,657",
                "WebsiteLink": "https://www.cardekho.com/carmodels/Maruti/Maruti_Ertiga"
            },
            {
                "Serial Number": 10,
                "Make": "Maruti",
                "Model": "Dzire",
                "AvailableVariants": "VXI ",
                "Price": "8,74,302",
                "WebsiteLink": "https://www.cardekho.com/maruti/dzire"
            },
            {
                "Serial Number": 10,
                "Make": "Maruti",
                "Model": "Dzire",
                "AvailableVariants": "ZXI",
                "Price": "9,94,594",
                "WebsiteLink": "https://www.cardekho.com/maruti/dzire"
            },
            {
                "Serial Number": 10,
                "Make": "Maruti",
                "Model": "Dzire",
                "AvailableVariants": "ZXI Plus",
                "Price": "10,82,079",
                "WebsiteLink": "https://www.cardekho.com/maruti/dzire"
            }
        ]
    ]
    try {
        const insertedData = await Vehicle.insertMany(vehicleData.flat());
        res.status(201).json(new ApiResponse({
            message: 'Vehicle data successfully inserted',
            data: insertedData,
        }));
    } catch (error) {
        console.log(error)
    }
});

export const getVehicleData = asyncHandler(async (req, res) => {
    try {
        const data = await Vehicle.find({});
        res.status(200).json(new ApiResponse(200, data, 'Vehicle data fetched successfully.'));
    } catch (error) {
        throw new ApiError(500, 'Failed to fetch data');
    }
})