---
layout: newdefault
---




<section id="portfolio" class="bg-light-gray">
        <div class="container">
            <div class="row">
 
                <div class="col-lg-12">
                    
			<table id="details">
			  <tbody></tbody>
			</table>


<iframe id="uvframe" style="width:100%;height:800px;" frameborder='0' src="http://universalviewer.io/uv.html?manifest=http://wellcomelibrary.org/iiif/collection/b20417081"></iframe>


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



var id = getParameterByName('id');

for(var x=0;x<=(colophons.length)-1;x++) {
  if(colophons[x].ID == id)  { 
  
   displayData(colophons[x]);
   
   if(manifest!=null) { 
     jQuery("#uvframe").attr('src', "https://universalviewer.io/uv.html?manifest="+manifest);
   }


  }
}



</script>







