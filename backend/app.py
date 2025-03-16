import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the cleaned dataset
df = pd.read_csv("telangana_crime_data_cleaned.csv")

@app.route('/districts', methods=['GET'])
def get_districts():
    """Return the list of districts in the dataset."""
    districts = df['district'].unique().tolist()
    return jsonify({"districts": districts})

@app.route('/crime-types', methods=['GET'])
def get_crime_types():
    """Return the list of available crime types."""
    crime_types = [col for col in df.columns if col not in ["state_ut", "district", "year", "total_ipc_crimes"]]
    return jsonify({"crime_types": crime_types})

@app.route('/crime-data', methods=['GET'])
def get_crime_data():
    """Return crime statistics based on district and crime type."""
    district = request.args.get('district', None)
    crime_type = request.args.get('crime_type', None)

    if not district or not crime_type:
        return jsonify({"error": "Please provide both district and crime type"}), 400

    filtered_df = df[(df["district"].str.lower() == district.lower())]
    
    if filtered_df.empty:
        return jsonify({"error": "No data found for the selected district"}), 404

    crime_counts = filtered_df[["year", crime_type]].set_index("year").to_dict()[crime_type]

    return jsonify(crime_counts)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
