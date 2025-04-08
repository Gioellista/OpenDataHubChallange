var map = L.map('map').setView([46.498112, 11.35478], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var theUrl = "https://tourism.api.opendatahub.com/v1/WebcamInfo?pagenumber=1&pagesize=0&fields=ImageGallery&fields=GpsInfo&fields=Shortname&rawfilter=isnotnull%28ImageGallery.0%29&removenullvalues=true&getasidarray=false";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            fillMap(xmlHttp.responseText);
        }
            
    }

    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);


function fillMap (testo) {

    const obj = JSON.parse(testo);
   
    for (let i = 0; i<obj.Items.length; i++){

        if(("GpsInfo" in obj.Items[i])==0 || ("ImageUrl" in obj.Items[i].ImageGallery[0])==0){

            continue;
        }

        var marker = L.marker([obj.Items[i].GpsInfo[0].Latitude, obj.Items[i].GpsInfo[0].Longitude]).addTo(map);
        marker.bindPopup("<h1>"+ obj.Items[i].Shortname + "</h1><img id='provaImmagine' width=250px src='" + obj.Items[i].ImageGallery[0].ImageUrl +"'/>");
        console.log(obj.Items[i].Shortname)

    }
}

