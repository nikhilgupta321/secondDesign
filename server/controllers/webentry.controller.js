const Entries = require('../models/entries.model');

// Get all items
const getAllEntries = async (req, res) => {
  try {
    const items = await Entries.findAll();
    res.json(items);
  } catch (err) {
    console.error('Error in getAllItems:', err);
    console.error(err.stack);  // Log the stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get a specific item by ID
const getEntriesById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Entries.findByPk(itemId);
    res.json(item);
  } catch (err) {
    console.error(`Error in getItemById for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new item
// const addEntries = async (req, res) => {
//   const newItem = req.body;
//   try {
//     const createdItem = await Entry.create(newItem, { fields: ['id', /* other fields */] });
//     res.json(createdItem);
//   } catch (err) {
//     console.error('Error in addItem:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const addEntries = async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await Entries.create(newItem);
    res.json(createdItem);
  } catch (err) {
    console.error('Error in addItem:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an item
const updateEntries = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    await Entries.update(updatedItem, { where: { id: itemId } });
    res.json({ id: itemId, ...updatedItem });
  } catch (err) {
    console.error(`Error in updateItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an item
const deleteEntries = async (req, res) => {
  const itemId = req.params.id;
  try {
    await Entries.destroy({ where: { id: itemId } });
    res.json({ message: 'Item deleted successfully', id: itemId });
  } catch (err) {
    console.error(`Error in deleteItem for ID ${itemId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 export default {
  getAllEntries,
  getEntriesById,
  addEntries,
  updateEntries,
  deleteEntries,
};