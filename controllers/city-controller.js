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

export {
  getAllCities,
  addCity,
  removeCityById
};
