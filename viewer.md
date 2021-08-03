---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---


<style>
        #uv {
            width: 800px;
            height: 600px;
        }
</style>

    
<div id="uv" class="uv"></div>

<script>

        var myUV;

        window.addEventListener('uvLoaded', function (e) {

            myUV = createUV('#uv', {
                iiifResourceUri: 'http://wellcomelibrary.org/iiif/b18035723/manifest',
                configUri: '/uv-config.json'
            }, new UV.URLDataProvider());

            myUV.on("created", function(obj) {
                console.log('parsed metadata', myUV.extension.helper.manifest.getMetadata());
                console.log('raw jsonld', myUV.extension.helper.manifest.__jsonld);
            });

        }, false);

</script>

<script src="/uv/uv.js"></script>

