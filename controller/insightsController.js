// Import required modules
const Insight = require("../model/data")

// Controller actions
exports.getAllInsights = async (req, res, next) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    next(err);
  }
};
exports.getIntensity = async (req, res, next) => {
    try {
      const intensities = await Insight.find({}, { intensity: 1, _id: 0 });
      res.json(intensities);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getLikelihood = async (req, res, next) => {
    try {
      const likelihoods = await Insight.find({}, { likelihood: 1, _id: 0 });
      res.json(likelihoods);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getRelevance = async (req, res, next) => {
    try {
      const relevances = await Insight.find({}, { relevance: 1, _id: 0 });
      res.json(relevances);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getYear = async (req, res, next) => {
    try {
      const years = await Insight.find({}, { startYear: 1, endYear: 1, _id: 0 });
      res.json(years);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getCountry = async (req, res, next) => {
    try {
        // Query database to fetch all countries
        let countries = await Insight.find({}, { country: 1, _id: 0 });

        // Flatten the array of countries
        countries = countries.map(countryObj => countryObj.country);

        // Remove duplicate and empty strings
        countries = countries.filter((country, index, self) =>
            country && country.trim() !== '' && self.indexOf(country) === index
        );

        res.json(countries);
    } catch (err) {
        next(err);
    }
};

  exports.getTopics = async (req, res, next) => {
    try {
      const topics = await Insight.find({}, { topic: 1, _id: 0 });
      res.json(topics);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getRegion = async (req, res, next) => {
    try {
      const regions = await Insight.find({}, { region: 1, _id: 0 });
      res.json(regions);
    } catch (err) {
      next(err);
    }
  };
  
  exports.getCity = async (req, res, next) => {
    try {
      const cities = await Insight.find({}, { city: 1, _id: 0 });
      res.json(cities);
    } catch (err) {
      next(err);
    }
  };
  exports.getAllSectors = async (req, res, next) => {
    try {
      // Fetch all sectors from the database
      const sectors = await Insight.distinct('sector');
      res.json(sectors);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  };
  exports.getAllPEST = async (req, res, next) => {
    try {
      // Fetch all PEST categories from the database
      const PESTs = await Insight.distinct('pestle');
      res.json(PESTs);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  };
  exports.getAllSources = async (req, res, next) => {
    try {
      // Fetch all unique sources from the database
      const sources = await Insight.distinct('source');
      res.json(sources);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  };
  exports.getAllSWOT = async (req, res, next) => {
    try {
      // Fetch all SWOT categories from the database
      const swotCategories = await Insight.distinct('swot');
      res.json(swotCategories);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  };
  exports.getDataByTopic = async (req, res, next) => {
    try {
      const { topic } = req.params;
  
      // Query database to fetch data related to the specified topic
      const data = await Insight.find({ topic });
  
      // Remove empty strings or empty info
      const filteredData = data.filter(insight => {
        // Check if any field contains empty string or is empty
        return Object.values(insight).every(value => value !== "" && value !== null && value !== undefined);
      });
  
      // Extract relevant fields
      const response = {
        intensity: filteredData.map(insight => insight.intensity),
        likelihood: filteredData.map(insight => insight.likelihood),
        relevance: filteredData.map(insight => insight.relevance),
        year: filteredData.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear })),
        country: filteredData.map(insight => insight.country),
        topics: filteredData.map(insight => insight.topic),
        region: filteredData.map(insight => insight.region),
        city: filteredData.map(insight => insight.city)
      };
  
      res.json(response);
    } catch (err) {
      next(err);
    }
  };
  
// Controller action to fetch data by sector
exports.getDataBySector = async (req, res, next) => {
  try {
    const { sector } = req.params;

    // Query database to fetch data related to the specified sector
    const data = await Insight.find({ sector });

    // Extract relevant fields and remove empty strings, null values, and duplicates
    const cleanedData = {
      intensity: cleanDataField(data.map(insight => insight.intensity)),
      likelihood: cleanDataField(data.map(insight => insight.likelihood)),
      relevance: cleanDataField(data.map(insight => insight.relevance)),
      year: cleanDataField(data.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear }))),
      country: cleanDataField(data.map(insight => insight.country)),
      topics: cleanDataField(data.map(insight => insight.topic)),
      region: cleanDataField(data.map(insight => insight.region)),
      city: cleanDataField(data.map(insight => insight.city))
    };

    res.json(cleanedData);
  } catch (err) {
    next(err);
  }
};

// Function to clean data field (remove empty strings, null values, and duplicates)
function cleanDataField(dataArray) {
  return dataArray.filter((value, index, self) => {
    // Remove empty strings and null values
    if (value === "" || value === null) {
      return false;
    }
    // Remove duplicates
    return self.indexOf(value) === index;
  });
}

exports.getDataByRegion = async (req, res, next) => {
  try {
    const { region } = req.params;

    // Query database to fetch data related to the specified region
    const data = await Insight.find({ region });

    // Filter out empty strings, null values, and duplicate entries
    const filteredData = data.filter(insight => {
      // Check if any field contains empty string or is null
      return Object.values(insight).every(value => value !== "" && value !== null && value !== undefined);
    });

    // Remove duplicate entries using a Set
    const uniqueData = Array.from(new Set(filteredData.map(insight => JSON.stringify(insight))))
      .map(str => JSON.parse(str));

    // Extract relevant fields and remove empty, null, and duplicate values
    const response = {
      intensity: removeDuplicates(filteredData.map(insight => insight.intensity)),
      likelihood: removeDuplicates(filteredData.map(insight => insight.likelihood)),
      relevance: removeDuplicates(filteredData.map(insight => insight.relevance)),
      year: removeDuplicates(filteredData.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear }))),
      country: removeDuplicates(filteredData.map(insight => insight.country)),
      topics: removeDuplicates(filteredData.map(insight => insight.topic)),
      region: removeDuplicates(filteredData.map(insight => insight.region)),
      city: removeDuplicates(filteredData.map(insight => insight.city))
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

// Function to remove duplicates, empty strings, and null values from an array
function removeDuplicates(arr) {
  return Array.from(new Set(arr.filter(item => item !== "" && item !== null)));
}

exports.getDataByPestle = async (req, res, next) => {
  try {
    const { pestle } = req.params;

    // Query database to fetch data related to the specified pestle
    const data = await Insight.find({ pestle });

    // Remove empty strings or empty info
    const filteredData = data.filter(insight => {
      // Check if any field contains empty string or is empty
      return Object.values(insight).every(value => value !== "" && value !== null && value !== undefined);
    });

    // Extract relevant fields
    const response = {
      intensity: filteredData.map(insight => insight.intensity),
      likelihood: filteredData.map(insight => insight.likelihood),
      relevance: filteredData.map(insight => insight.relevance),
      year: filteredData.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear })),
      country: filteredData.map(insight => insight.country),
      topics: filteredData.map(insight => insight.topic),
      region: filteredData.map(insight => insight.region),
      city: filteredData.map(insight => insight.city)
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};
exports.getDataBySource = async (req, res, next) => {
  try {
    const { source } = req.params;

    // Query the database to fetch data related to the specified source
    const data = await Insight.find({ source });

    // Remove duplicate entries and empty strings
    const filteredData = data.filter(insight => {
      // Check if any field contains empty string or is empty
      return Object.values(insight).every(value => value !== "" && value !== null && value !== undefined);
    });

    // Extract relevant fields
    const response = {
      intensity: filteredData.map(insight => insight.intensity),
      likelihood: filteredData.map(insight => insight.likelihood),
      relevance: filteredData.map(insight => insight.relevance),
      year: filteredData.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear })),
      country: filteredData.map(insight => insight.country),
      topics: filteredData.map(insight => insight.topic),
      region: filteredData.map(insight => insight.region),
      city: filteredData.map(insight => insight.city)
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

exports.getDataByCountry = async (req, res, next) => {
  try {
      const { country } = req.params;

      // Query database to fetch data related to the specified country
      const data = await Insight.find({ country });

      // Remove duplicate entries and empty strings
      const filteredData = data.filter(insight => {
          // Check if any field contains empty string or is empty
          return Object.values(insight).every(value => value !== "" && value !== null && value !== undefined);
      });

      // Extract relevant fields
      const response = {
          intensity: filteredData.map(insight => insight.intensity),
          likelihood: filteredData.map(insight => insight.likelihood),
          relevance: filteredData.map(insight => insight.relevance),
          year: filteredData.map(insight => ({ startYear: insight.startYear, endYear: insight.endYear })),
          country: filteredData.map(insight => insight.country),
          topics: filteredData.map(insight => insight.topic),
          region: filteredData.map(insight => insight.region),
          city: filteredData.map(insight => insight.city)
      };

      res.json(response);
  } catch (err) {
      next(err);
  }
};

exports.createInsight = async (req, res, next) => {
  const insight = new Insight({
    startYear: req.body.startYear,
    endYear: req.body.endYear,
    intensity: req.body.intensity,
    likelihood: req.body.likelihood,
    relevance: req.body.relevance,
    country: req.body.country,
    region: req.body.region,
    city: req.body.city,
    sector: req.body.sector,
    topic: req.body.topic,
    pestle: req.body.pestle,
    source: req.body.source,
    title: req.body.title,
    insight: req.body.insight,
    url: req.body.url,
    published: req.body.published,
    added: req.body.added
  });

  try {
    const newInsight = await insight.save();
    res.status(201).json(newInsight);
  } catch (err) {
    next(err);
  }
};
