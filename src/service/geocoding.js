// Synchronous database opening
const fs = require('fs');
const path = require('path');
var maxmind = null;
// This reader object should be reused across lookups 
// as creation of it is expensive.
if (!maxmind) {
  logger.info('Loading maxmind database...');
  try {
    const Reader = require('@maxmind/geoip2-node').Reader;
    const dbBuffer = fs.readFileSync(path.join(__dirname, '../../dist/maxmind/GeoLite2-City.mmdb'));
    maxmind = Reader.openBuffer(dbBuffer);
  } catch (ex) {
    logger.warn({ message: 'Failed to load maxmind database.', ex });
  }
  logger.info('Successfully loaded maxmind database');
} 

function GeoCity(data) {
  this.init = function (data) {
    this.city = {
      city: ((data.city || {}).names || {}).en,
      region: {
        code: (data.subdivisions || [{}])[0].isoCode,
        name: (((data.subdivisions || [{}])[0]).names || {}).en
      },
      country: {
        code: (data.country || {}).isoCode,
        name: ((data.country || {}).names || {}).en
      },
      continent: {
        code: (data.continent || {}).code,
        name: ((data.continent || {}).names || {}).en
      },
      zip: (data.postal || {}).code
    };
  };

  this.get = function () {
    return this.city;
  };

  this.toJSON = function (beautify) {
    if (beautify) {
      return JSON.stringify(this.city, null, 2);
    } else {
      return JSON.stringify(this.city);
    }
  };

  this.toString = function () {
    var transformedCity = [];
    this.city.city && transformedCity.push(this.city.city);
    this.city.region.name && transformedCity.push(this.city.region.name);
    this.city.country.name && transformedCity.push(this.city.country.name);
    this.city.continent.name && transformedCity.push(this.city.continent.name);
    this.city.zip && transformedCity.push(this.city.zip);
    return transformedCity.join(', ');
  };

  // Initialize the object.
  this.init(data || {});
};

function getCity(ip) {
  start = Date.now();
  var city = new GeoCity();
  try {
    city.init(maxmind.city(ip));
  } catch (ex) {
    logger.warn({ message: 'Not able to resolve the geolocation', ex });
  }
  city.loadTime = `${Date.now() - start} ms`;
  return city;
}

module.exports = {
  city: getCity
};
