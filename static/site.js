const path = "box-locations.json";

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
    
    
    var card = document.createElement("div")
    card.id = "card";
    display.appendChild(card);
    
    var desc = document.createElement("h3");
    desc.textContent = boxLocation.name;
    
    var imgLink = document.createElement("a");
    imgLink.href = "/box-locations/" + boxLocation.id + "/";
    
    card.appendChild(desc);
    card.appendChild(imgLink);
    
    var img = document.createElement("img");
    img.src = "https://www.mapquestapi.com/staticmap/v5/map?key=9V9esHFJ0JNWGiuIXVieiLhBHzseqFTD&size=600,400&zoom=17&locations="
         + boxLocation.lat + "," + boxLocation.lng + "&defaultMarker=marker-lg-3B5998-22407F&size=1100,500@2x";
    img.alt="img";
    img.href="/box-locations/1/";
    
    imgLink.appendChild(img);
    
  });     
  
}

