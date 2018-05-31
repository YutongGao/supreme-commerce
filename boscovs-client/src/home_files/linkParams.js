function linkParamsSubmit(link, event, storeContextPath, disabled)
{
	//alert("in href:" + $(link).attr("href")); 

	if (disabled)
	{
		event.preventDefault();
		return false;
	}
	
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	
	var params = $(link).attr("data-bos-params");

	var url = storeContextPath + "/post-user-url-meta.ajax";
	
	var child = $(link).attr("data-bos-child");
	var parent = $(link).attr("data-bos-parent");
	
	var queryParam = "";
	

	if (parent !== undefined && child !== undefined)
	{
		queryParam = "?prnt=" + encodeURIComponent(parent) + "&chld=" + encodeURIComponent(child);
	}
	else if (parent !== undefined)
	{
		queryParam = "?prnt=" + encodeURIComponent(parent);
	}
	else 
	{
		//console.log("parent or parent/child not defined");
	} 
	
	//alert("before href:" + $(link).attr("href") + " queryParam:" + queryParam); 
	
	if(params !== undefined)
	{
		url = url + "?" + params;
		
		var options =
		{
			type : "POST",
			url : url,
			complete: function(event) { //alert("after href:" + $(link).attr("href") + " queryParam:" + queryParam); 
					 window.location = $(link).attr("href") + queryParam; 
			}
		};
		
		//execute ajax call
		$.ajax(options);		
	}
}