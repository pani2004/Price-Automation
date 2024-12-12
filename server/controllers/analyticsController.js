import axios from 'axios';

export const analyzeProduct = async (req, res) => {
  const { product_name, dataset_name } = req.body;

  if (!product_name || !dataset_name) {
    return res.status(400).json({ error: "Product name and dataset name are required" });
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/analyze', { 
      product_name,
      dataset_name 
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};