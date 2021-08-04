---
layout: page
---

<link rel="stylesheet" type="text/css" href="/scripsit/uv/uv.css">
<script src="/scripsit/uv/lib/offline.js"></script>
<script src="/scripsit/uv/helpers.js"></script>

<style>
label {
width: 120px;
display: inline-block;
font-weight: bold;
}
</style>

<h2 class='title'></h2>
<table>
<tbody></tbody>
</table>


<!-- start UV -->

<style>
        #uv {
            width: 800px;
            height: 600px;
        }
</style>

<div id="uv" class="uv"></div>





<script>
    
    	var manifest = "https://iiif.wellcomecollection.org/presentation/v2/b18035723";
    
        var myUV;

        window.addEventListener('uvLoaded', function (e) {

            myUV = createUV('#uv', {
                iiifResourceUri: manifest,
                configUri: 'uv-config.json'
            }, new UV.URLDataProvider());

            myUV.on("created", function(obj) {
                //console.log('parsed metadata', myUV.extension.helper.manifest.getMetadata());
                //console.log('raw jsonld', myUV.extension.helper.manifest.__jsonld);
            });

        }, false);

</script>



<!-- end UV -->


<script>

var colophons = {{ site.data.colophons | jsonify }};

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function displayData(row) {

    jQuery('.title').text(row.MS);
    jQuery('tbody').empty();

    jQuery.each(row, function(i,v){
      if(i=="Link") { v = "<a href='"+v+"' target='_blank'>"+v+"</a>"; }
      console.log(i,v);
      if(i=="IIIF_Manifest" && v.includes('http')) { manifest = v; }
      var row = "<tr><td class='label'>"+i+"</td><td class='value'>"+v+"</td></tr>";
      jQuery('tbody').append(row);
    })
}




var id = getParameterByName('id');

for(var x=0;x<=(colophons.length)-1;x++) {
  if(colophons[x].ID == id)  { 
   displayData(colophons[x]);
  }
}
</script>


<script src="/scripsit/uv/uv.js"></script>
