---
layout: page
---
<link rel="stylesheet" type="text/css" href="/scripsit/assets/js/uv/uv.css">
<script src="/scripsit/assets/js/uv/lib/offline.js"></script>
<script src="/scripsit/assets/js/uv/helpers.js"></script>
    
<style>
        #uv {
            width: 800px;
            height: 600px;
        }
</style>

<div id="uv" class="uv"></div>





<script>
    
    	var manifest = "//figgy.princeton.edu/concern/scanned_resources/929257b7-8410-4f61-a8d1-19f2c24b74dc/manifest?manifest=https://figgy.princeton.edu/concern/scanned_resources/929257b7-8410-4f61-a8d1-19f2c24b74dc/manifest";
    	//var manifest = "https://iiif.wellcomecollection.org/presentation/v2/b18035723";
    
        var myUV;

        window.addEventListener('uvLoaded', function (e) {

            myUV = createUV('#uv', {
                iiifResourceUri: manifest,
                configUri: 'uv-config.json'
            }, new UV.URLDataProvider());

            myUV.on("created", function(obj) {
                console.log('parsed metadata', myUV.extension.helper.manifest.getMetadata());
                console.log('raw jsonld', myUV.extension.helper.manifest.__jsonld);
            });

        }, false);

</script>

<script src="/scripsit/assets/js/uv/uv.js"></script>
