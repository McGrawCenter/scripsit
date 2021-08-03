jQuery(document).ready(function(){

	var filter_fields = [
	    {"column":"Century"	, values:[]},
	    {"column":"Language"	, values:[]}
	    ];

	var perpage = 50;
	var page = 1;

	var dates = [];
	var langs = [];
	
	
	jQuery.each(filter_fields, function(i,v){
	   v = {"title":v,"values":[]}
	});

	jQuery.each(csvdata, function(i,v){
	  jQuery.each(filter_fields, function(j,w){
	    w.values.push(v[w.column]); 
	  });
	});
	jQuery.each(filter_fields, function(i,v){
	    v.values = v.values.filter(onlyUnique).sort();
	    populateFilter(v.column, v.values);
	});

	


	/* triggers */
	jQuery("#search-form").submit(function(e){ e.preventDefault(); });
	 
	 
	jQuery("#search_go").click(function(e){
	  //showresults();
	  e.preventDefault();
	});
	
	jQuery(".filter").change(function(e){
	  showresults();
	});	
	
	
	jQuery(document).on("click",".pager", function(e){
	  page = jQuery(this).attr('rel');
	  //showresults();
	  e.preventDefault();
	});		
	/* end triggers */	 
	 
	 
	 
	 
	 
	 
	 showresults();
	 
	 



	function showresults() {
	
	  var r = [];
	  
	  var results = csvdata;
	  
	  var active_filters = jQuery(".filter:checked");
	  
	  
	  if(active_filters.length > 0) {
	     var eval_string = [];
	     jQuery.each(active_filters, function(i,v){
	        var s = v.value.split(":");
	        eval_string.push("val."+s[0]+" === '"+s[1]+"'");
	        // this magic function does the filtering
	     	//
		
	     });
	     eval_string = eval_string.join(" && ");
	     results = jQuery.grep(csvdata, function(val) { return eval(eval_string); });
	  }

	  displaySearchResults(results, csvdata); // We'll write this in the next section

	}







	 
	 /*
	function showresults() {
	
	  var r = [];
	  

	  console.log(filters);
	  
	  jQuery.each(csvdata, function(i,v){
	    
	    jQuery.each(filters, function(ii,vv){
	      var f = vv.field;
	      if(v[f] == vv.value) { r.push(v); }
	    })
	  });

	  
	  var results = csvdata;
	  
	  if(filters.length > 0) {
	     jQuery.each(filters, function(i,val){
	     
	     
	     	results = jQuery.grep(csvdata, function(v) {
		    //return val.field === val.value;
		    return v[val.field] === val.value;
		});
		
		console.log(results);
		
	     });

	  }
	  console.log(results);

	  displaySearchResults(results, csvdata); // We'll write this in the next section

	}
	 */
	 
	function populateFilter( select_id, array ) {
	
	  jQuery.each(array, function(i,v){
	    //jQuery("#"+select_id).append("<option value='"+v+"'>"+v+"</option>");
	    jQuery("#"+select_id).append("<label><input type='checkbox' class='filter' name='select_id[]' value='"+select_id+":"+v+"'/> "+v+"</label><br />");
	  });	
	  return true;
	}
	 
	/****
	* reduce array to only unique value
	*********************************************/
	function onlyUnique( value, index, self ) {
	  return self.indexOf(value) === index;
	}	 


	/****
	* template for result items
	*********************************************/
	function template(o) { 	   
	  return "<tr><td class='hit'><a href='detail?id="+o.ID+"'>"+o.MS+"</a> ("+o.Date+"): "+o.Type+"</td></tr>";
	}



	/****
	* show the search results
	*********************************************/
	function displaySearchResults(results, csvdata) {
	  jQuery('#search-results').empty();
	  
	  var hits = results.length;
	  
	  jQuery("#hits").html(hits+" records");
	  
	  var pages = parseInt(hits/perpage) + 1;
	  
	  jQuery("#pagination").html(pagination(pages));
	  
	  //slice the results for the current page
	  var start = (page-1) * perpage;
	  var end = start + perpage;
	  results = results.slice(start,end);

	  jQuery.each(results, function(i,v) {
	      jQuery('#search-results').append(template(v));
	  });	  
	  
	}
	
	
	
	
	

	function pagination(pages) {
	  if(pages > 1) {
	     var html = "<ul class='pagination'>";
	     for(var x=1;x<=pages;x++) { 
	        if(x==page) { html += "<a href='#' class='pager' rel='"+x+"'><li class='selected'>"+x+"</li></a>"; }
	        else { html += "<a href='#' class='pager' rel='"+x+"'><li>"+x+"</li></a>"; }
	     }
	     html += "</ul>";
	     return html;
	  }
	  else { return ""; }
	}


/*
  $( ".target" ).keyup(function(){

	var node_title = $('#searchname').val();
	var node_class_id = $('.class_id').val();

	$.getJSON( "json.php?a=nodes&node_title="+node_title, function( data ) {

	  $('#searchresults').html("");
	  $.each( data, function( key,obj ) {
	    $('#searchresults').append("<li id='" + obj.ID + "'>" + obj.node_title + "</li>");
	  });

	});
});
*/



});



