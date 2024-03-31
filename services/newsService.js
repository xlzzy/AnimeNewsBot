const axios = require("axios");
const parser = require("xml2js");

// Import config to access newsApiUrl
const config = require("../config/config.json");

// Function to fetch anime news from the RSS feed
async function fetchAnimeNews() {
  try {
    const response = await axios.get(config.newsApiUrl);
    const xmlData = response.data;

    // Parse XML data
    let parsedData = await parseXML(xmlData);

    // Extract relevant information (e.g., titles, links) from parsed data
    const newsItems = parsedData.rss.channel[0].item.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
    }));

    return newsItems;
  } catch (error) {
    console.error("Error fetching anime news:", error);
    return null;
  }
}

// Function to parse XML data using xml2js
function parseXML(xmlData) {
  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  fetchAnimeNews,
};
