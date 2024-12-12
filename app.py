import os
from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS

# Set matplotlib backend
matplotlib.use('Agg')

app = Flask(__name__)
CORS(app)

# Ensure a folder exists to store generated plots
if not os.path.exists('static/images'):
    os.makedirs('static/images')

# Dataset mapping
DATASETS = {
    "network": "datasets/networkData.csv",
    "furniture": "datasets/furniture.csv",
    "stationary": "datasets/stationary.csv",
    "it_hardware": "datasets/it-hardware.csv"
}

# Preload datasets into a dictionary
loaded_data = {}
for name, path in DATASETS.items():
    if os.path.exists(path):
        data = pd.read_csv(path)
        price_columns = [col for col in data.columns if "Price" in col]
        reshaped_data = data.melt(id_vars=["Product Name", "Region"],
                                  value_vars=price_columns,
                                  var_name="Month",
                                  value_name="Price")
        reshaped_data["Month"] = reshaped_data["Month"].str.extract(r"(\d+)").astype(int)
        loaded_data[name] = {"original": data, "reshaped": reshaped_data}
    else:
        print(f"Warning: Dataset {path} not found.")

@app.route('/')
def home():
    return "Flask server is running. Use the /analyze endpoint for analytics.", 200

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get dataset and product name from request
        dataset_name = request.json.get('dataset_name', None)
        product_name = request.json.get('product_name', None)
        
        if not dataset_name or dataset_name not in loaded_data:
            return jsonify({"error": "Invalid or missing dataset name"}), 400
        if not product_name:
            return jsonify({"error": "Product name is required"}), 400

        # Retrieve the selected dataset
        dataset = loaded_data[dataset_name]
        monthly_prices = dataset["reshaped"]
        
        # Filter data for the specific product
        product_data = monthly_prices[monthly_prices["Product Name"] == product_name]
        if product_data.empty:
            return jsonify({"error": f"Product '{product_name}' not found in dataset '{dataset_name}'"}), 404

        # Aggregate data to handle duplicates (mean price per month)
        product_data = product_data.groupby("Month", as_index=False).agg({"Price": "mean"})

        # Compute statistics for the specific product
        product_stats = {
            "Mean Price": round(product_data["Price"].mean(), 2),
            "Min Price": round(product_data["Price"].min(), 2),
            "Max Price": round(product_data["Price"].max(), 2),
            "Median Price": round(product_data["Price"].median(), 2),
            "Variance": round(product_data["Price"].var(), 2),
            "Standard Deviation": round(product_data["Price"].std(), 2),
        }

        # Detect unusual price changes
        spike_threshold = 0.2  # 20% threshold
        product_data["Price Change (%)"] = product_data["Price"].pct_change() * 100
        unusual_changes = product_data[abs(product_data["Price Change (%)"]) > spike_threshold * 100]
        unusual_changes_list = unusual_changes.to_dict(orient="records")

        # Generate price trend visualization and save it as a PNG image
        trend_plot_filename = f"price_trend_{dataset_name}_{product_name.replace(' ', '_')}.png"
        trend_plot_path = os.path.join('static/images', trend_plot_filename)

        plt.figure(figsize=(10, 6))
        sns.lineplot(data=product_data, x="Month", y="Price", marker="o")
        plt.title(f"Price Trend for {product_name} ({dataset_name.capitalize()})")
        plt.xlabel("Month")
        plt.ylabel("Price (INR)")
        plt.xticks(range(1, 13))
        plt.grid(True)

        # Save plot as PNG
        plt.savefig(trend_plot_path)
        plt.close()

        # Encode the image as base64 for embedding
        with open(trend_plot_path, "rb") as img_file:
            trend_graph_base64 = base64.b64encode(img_file.read()).decode('utf-8')

        # Generate correlation heatmap for price columns
        corr_matrix = dataset["original"][price_columns].corr()
        heatmap_filename = f"correlation_heatmap_{dataset_name}.png"
        heatmap_path = os.path.join('static/images', heatmap_filename)

        plt.figure(figsize=(12, 8))
        sns.heatmap(corr_matrix, annot=True, cmap="coolwarm", fmt=".2f")
        plt.title(f"Correlation Heatmap of Monthly Prices ({dataset_name.capitalize()})")
        plt.savefig(heatmap_path)
        plt.close()

        # Encode the heatmap image as base64
        with open(heatmap_path, "rb") as heatmap_file:
            heatmap_base64 = base64.b64encode(heatmap_file.read()).decode('utf-8')

        # Return analytics
        return jsonify({
            "stats": product_stats,
            "unusual_changes": unusual_changes_list,
            "trend_graph": trend_graph_base64,
            "correlation_heatmap": heatmap_base64
        })

    except FileNotFoundError as fnf_error:
        return jsonify({"error": str(fnf_error)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/static/images/<filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000, threaded=False)