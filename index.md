---
layout: newdefault
---

<div class="home">


<section id="portfolio" class="bg-light-gray">

        <div class="container">
            <div class="row">
            
                <div class="col-lg-4">
                    {%- include search_filters.html -%}
                </div>            
            
            
                <div class="col-lg-8">
                   
			<div id="results-meta"><span id="hits"></span></div>

			<table id="search-results"></table><!-- /search-results -->

			<div id="pagination"></div>
			
                </div>
            </div>

        </div>
</section>



</div>

<script>
 var csvdata = {{ site.data.colophons | jsonify }};
</script>

<script src="assets/js/search.js"></script>
