var theUrl = "https://tourism.api.opendatahub.com/v1/WebcamInfo?pagenumber=1&pagesize=50&active=true&fields=ImageGallery&fields=Shortname&removenullvalues=true&getasidarray=false";


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
   
    var table = document.getElementById("table");
    

    // Create an empty <thead> element and add it to the table:
    var header = table.createTHead();

    // Create an empty <tr> element and add it to the first position of <thead>:
    var row = header.insertRow(0);    

    // Insert a new cell (<td>) at the first position of the "new" <tr> element:
    var cell = row.insertCell(0);
    var cell1 = row.insertCell(1);

    // Add some bold text in the new cell:
    cell.innerHTML = "<b>Name</b>";
    cell1.innerHTML = "<b>Image</b>";

    for (let i = 0; i<obj.Items.length; i++){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:

        cell1.innerHTML = obj.Items[i].Shortname;
        cell2.innerHTML = "<img id='provaImmagine' width = 200px src='" + obj.Items[i].ImageGallery[0].ImageUrl +"'/>" ;

    }

    
}
