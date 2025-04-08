//import ExifReader from 'exifreader';

var theUrl = "https://tourism.api.opendatahub.com/v1/WebcamInfo?pagenumber=1&pagesize=20&active=true&fields=Shortname&fields=ImageGallery&removenullvalues=true&getasidarray=false";
var dateUrl = "https://tourism.api.opendatahub.com/v1/WebcamInfo?pagenumber=1&pagesize=20&active=true&fields=Shortname&fields=ImageGallery&removenullvalues=true&getasidarray=false";

    var currentPage = 1;
    var table = document.getElementById("table");

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            fillTable(xmlHttp.responseText);
        }
            
    }

    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);

function fillTable (testo) {
    const obj = JSON.parse(testo);
   
    table.innerHTML = "";

    // Create an empty <thead> element and add it to the table:
    var header = table.createTHead();

    // Create an empty <tr> element and add it to the first position of <thead>:
    var row = header.insertRow(0);    

    // Insert a new cell (<td>) at the first position of the "new" <tr> element:
    var cell = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    // Add some bold text in the new cell:
    cell.innerHTML = "<b>Name</b>";
    cell1.innerHTML = "<b>Image</b>";
    cell2.innerHTML = "<b>Status</b>";

    for (let i = 0; i<obj.Items.length; i++){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        var imgUrl = obj.Items[i].ImageGallery[0].ImageUrl;
        var imgId = "imgId" + i;
        var img = "<img id='"+ imgId +"' width = 200px src='" + imgUrl +"'/>";


        var imgInGallery = obj.Items[i].ImageGallery[0].IsInGallery;

        // Add some text to the new cells:
        cell1.innerHTML = obj.Items[i].Shortname;
        cell2.innerHTML = img;
        if(imgInGallery) {
            cell3.innerHTML = "ok";
        } else {
            cell3.innerHTML = "error";
        }
    }
}

function onClickChangeWebcamPage(direction){

    if(direction == 1){
        currentPage = currentPage+1;
    } else if (direction == -1){
        if(currentPage == 1){
            return;
        }
        currentPage = currentPage-1;
    }

	var str1 = "https://tourism.api.opendatahub.com/v1/WebcamInfo?pagenumber=";
	var str2 = "&pagesize=20&active=true&fields=Shortname&fields=ImageGallery&removenullvalues=true&getasidarray=false";
	var nextRequest = str1 + currentPage + str2;
	
    xmlHttp.open("GET", nextRequest, true); 
    xmlHttp.send(null);
    
    fillTable();
}

function getExif(imgId, cell) {
    var img1 = document.getElementById(imgId);
    EXIF.getData(img1, function() {
        /*
        var date = EXIF.getTag(this, "ModifyDate");
        cell.innerHTML = `${date}`;
        */
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var makeAndModel = document.getElementById("makeAndModel");
        cell.innerHTML = `${make} ${model}`;
        
    });
}