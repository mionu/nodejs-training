import { City } from '../models';

function getAllCities() {
  return City.find({});
}

function addCity(newCity) {
  const cityDoc = new City(newCity);
  return cityDoc.save();
}

function removeCityById(id) {
  return City.findByIdAndRemove(id);
}

function upsertCityById(id, fieldsToUpsert) {
  return City.findByIdAndUpdate(id, { $set: fieldsToUpsert }, { upsert: true });
}

export {
  getAllCities,
  addCity,
  removeCityById,
  upsertCityById
};
