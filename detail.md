---
layout: newdefault
---



<style>
label {
width: 120px;
display: inline-block;
font-weight: bold;
}
</style>







<section id="portfolio" class="bg-light-gray">
        <div class="container">
            <div class="row">
 
                <div class="col-lg-12">
                    
			<table id="details">
			  <tbody></tbody>
			</table>
			
			
			<!-- start UV -->

			<style>
				.uv {
				    width: 100%;
				    height: 600px;
				    display:none;
				}
			</style>

			<div class="uv" data-locale="en-GB:English (GB),cy-GB:Cymraeg" data-config="/config.json" data-uri="https://wellcomelibrary.org/iiif/b18035723/manifest" data-collectionindex="0" data-manifestindex="0" data-sequenceindex="0" data-canvasindex="0"></div>
			<script type="text/javascript" id="embedUV" src="https://universalviewer.io/uv/lib/embed.js"></script>


			<script>
			    
			        var manifest = null;
			    
				var myUV;

				window.addEventListener('uvLoaded', function (e) {

				    myUV = createUV('#uv', {
					iiifResourceUri: manifest,
					configUri: '../uv-config.json'
				    }, new UV.URLDataProvider());

				    myUV.on("created", function(obj) {
					//console.log('parsed metadata', myUV.extension.helper.manifest.getMetadata());
					//console.log('raw jsonld', myUV.extension.helper.manifest.__jsonld);
				    });

				}, false);

			</script>



			<!-- end UV -->
                </div>
            </div>

        </div>
</section>




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

      if(i=="IIIF_Manifest" && v.includes('http')) { 
         manifest = v;
       }
      var row = "<tr><td class='details-label'>"+i+"</td><td class='details-value'>"+v+"</td></tr>";
      jQuery('tbody').append(row);
    })
}


function displayUV(){

}


var id = getParameterByName('id');

for(var x=0;x<=(colophons.length)-1;x++) {
  if(colophons[x].ID == id)  { 
  
   displayData(colophons[x]);
   
   if(manifest!=null) { 
     var viewer = jQuery('.uv');
     viewer.attr('data-uri', manifest);
     viewer.show();
   }

  }
}
</script>





