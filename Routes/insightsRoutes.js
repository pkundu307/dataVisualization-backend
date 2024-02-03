// Import required modules
const express = require('express');
const router = express.Router();
const insightsController = require('../controller/insightsController');

// Routes
router.get('/insights', insightsController.getAllInsights);
router.post('/insights', insightsController.createInsight);
router.get('/intensity', insightsController.getIntensity);
router.get('/likelihood', insightsController.getLikelihood);
router.get('/relevance', insightsController.getRelevance);
router.get('/year', insightsController.getYear);
router.get('/country', insightsController.getCountry);
router.get('/topics', insightsController.getTopics);
router.get('/region', insightsController.getRegion);
router.get('/city', insightsController.getCity);
router.get('/sectors', insightsController.getAllSectors);
router.get('/pest', insightsController.getAllPEST); // New route for fetching all PEST categories
router.get('/sources', insightsController.getAllSources); // New route for fetching all sources
router.get('/swot', insightsController.getAllSWOT); // New route for fetching all SWOT categories
router.get('/topic/:topic', insightsController.getDataByTopic);
router.get('/sector/:sector', insightsController.getDataBySector);
router.get('/region/:region', insightsController.getDataByRegion);
router.get('/pestle/:pestle', insightsController.getDataByPestle);
router.get('/source/:source', insightsController.getDataBySource);
router.get('/country/:country', insightsController.getDataByCountry);


module.exports = router;
