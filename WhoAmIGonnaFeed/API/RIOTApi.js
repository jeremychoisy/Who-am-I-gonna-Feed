const API_TOKEN="RGAPI-2fe1799c-08d8-4940-a4c3-81382fed7bab";
const version = "8.21.1";
// data

export function getSum(name){
  const url = "https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + name + "?api_key=" + API_TOKEN;
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getLeague(id){
  const url = "https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + id +"?api_key=" + API_TOKEN;
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getCurrentMatch(id){
  const url = "https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + id +"?api_key=" + API_TOKEN;
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getRunes(){
  const url = "http://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/runesReforged.json"
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

// Icon

export function getSumIcon(id){
  return "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/" + id + ".png";
}

export function getChampIcon(name){
  return "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + name +".png";

}

export function getRuneIcon(path){
  return "https://ddragon.leagueoflegends.com/cdn/img/" + path;

}
