---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---

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
      //console.log(i);
      if(i=="Link") { v = "<a href='"+v+"' target='_blank'>"+v+"</a>"; }
    
      var row = "<tr><td class='label'>"+i+"</td><td class='value'>"+v+"</td></tr>";
      jQuery('tbody').append(row);
    })
}

var id = getParameterByName('id');
console.log(id);
for(var x=0;x<=(colophons.length)-1;x++) {
  if(colophons[x].ID == id)  { 
  
   displayData(colophons[x]);
    

  }
}
</script>
