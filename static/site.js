const path = "/project/static/box-locations.json";

const xhr = new XMLHttpRequest();
xhr.open("GET", path);
xhr.send();

xhr.addEventListener('load', ()=>{
  displayCards(JSON.parse(xhr.responseText));
});


function displayCards(data){
  
  var display = document.getElementById("cardContainer");
  display.textContent = "";
  
  data.forEach((boxLocation) => {
    var card = document.createElement("div");
    display.appendChild(card);
    
    var desc = document.createElement("h3");
    desc.textContent = boxLocation.name;
    
    var img = document.createElement("img");
    img.src = "https://open.mapquestapi.com/staticmap/v4/getmap?key=9V9esHFJ0JNWGiuIXVieiLhBHzseqFTD&size=600,400&zoom=16&center="
         + boxLocation.lat + "," + boxLocation.lng;
    img.alt="img";
    
    
    card.appendChild(desc);
    card.appendChild(img);
    
  });             
  
}

