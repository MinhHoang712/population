from flask import Flask, request
from flask_cors import CORS
from pathlib import Path
import glob
import json


app = Flask(__name__)

CORS(app)

BASE_DIR = Path(__file__).parent


DATA63 = BASE_DIR / "63provincesdata"

# DATA34 = BASE_DIR / "34provincesdata"
def find_file(
    province_code,
    year
):

    # folder = (
    #     DATA34
    #     if year >= 2025
    #     else DATA63
    # )

    folder = DATA63

    pattern = str(
        folder /
        f"{province_code}_*.json"
    )

    files = glob.glob(pattern)

    if not files:
        return None

    return files[0]

def load_province_data(
    province_code,
    year
):

    file_path = find_file(
        province_code,
        year
    )

    if not file_path:
        return None

    with open(
        file_path,
        encoding="utf-8"
    ) as f:
        return json.load(f)
    
def get_year_data(
    province_data,
    year
):

    result = []

    for item in province_data["data"]:

        value = item.get(
            "values",
            {}
        ).get(
            str(year)
        )

        result.append({

            "id":
                item["id"],

            "indicator":
                item["indicator"],

            "unit":
                item["unit"],

            "value":
                value

        })

    return {

        "provinceCode":
            province_data["provinceCode"],

        "provinceShortName":
            province_data["provinceShortName"],

        "provinceName":
            province_data["provinceName"],

        "year":
            year,

        "data":
            result

    }

@app.route("/api/province")
def province():

    code = request.args.get(
        "code"
    )

    year = int(
        request.args.get(
            "year"
        )
    )

    province_data = load_province_data(
        code,
        year
    )
    

    if not province_data:

        return {
            "error":
            "province not found"
        }, 404

    result = get_year_data(
    province_data,
    year
    )

    print(result)

    return result

@app.route("/api/province/history")
def province_history():

    code = request.args.get(
        "code"
    )

    year = int(
        request.args.get(
            "year",
            2024
        )
    )

    province_data = load_province_data(
        code,
        year
    )

    print(province_data)

    if not province_data:

        return {
            "error":
            "province not found"
        }, 404

    return province_data


if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )