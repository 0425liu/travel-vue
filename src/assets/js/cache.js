import storage from "good-storage";
export function saveCity(city) {
  storage.set("city", city);
}
export function loadCity() {
  return storage.get("city", "");
}
