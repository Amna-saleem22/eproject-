import Service from "../models/Service.js";

// ✅ Add New Service (Admin)
export const addService = async (req, res) => {
  try {
    const { name, price } = req.body;

    const service = await Service.create({
      name,
      price,
    });

    res.status(201).json({
      message: "Service Added Successfully ✅",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
