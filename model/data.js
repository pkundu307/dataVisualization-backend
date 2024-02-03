const mongoose = require('mongoose');

// Define schema for insights
const insightSchema = new mongoose.Schema({
  startYear: String,
  endYear: String,
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  country: String,
  region: String,
  city: String,
  sector: String,
  topic: String,
  pestle: String,
  source: String,
  title: String,
  insight: String,
  url: String,
  published: String,
  added: String
});

// Create model
const Insight = mongoose.model('Insight', insightSchema);

module.exports = mongoose.model('Insight', insightSchema);
