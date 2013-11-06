(function(){
	var uMatch = navigator.userAgent.match(/Firefox\/(.*)$/);
	var ffVersion;
	var ffSize = 4.3 ;
	if (uMatch && uMatch.length > 1) {
			ffVersion = uMatch[1];
		}
	
	$.fn.niceFileInput = function(options){
		var settings = $.extend( {
		  'width'         : '100%', //width of button
		  'height'		  : '34',  //height of text
		  'btnText'       : 'Browse', //text of the button     
		  'btnWidth'	  : '100' ,  // width of button
		  'margin'        : '20',	// gap between textbox and button 		  
		}, options);
									
	for(var i= 150 ; i <= settings.width ; i += 5)
	{
		 ffSize = ffSize + 0.715; 				 
	}
	
	this.css({
				'height':settings.height, 
				'width' :settings.width ,
				'zIndex': '99',
				'opacity': '0', 
				'position':'absolute', 
				'right':'0', 
				'top':'0',
				'font-size' : '16px'
			})
			.wrap('<div class="input-group fileWrapper" />')
			.parent()
			.css({
				   width : settings.width
			 })
			.append("<input type='text' class='fileInputText form-control' readonly='readonly' />")
			.append("<span class='input-group-btn'><button type='button' class='fileInputButton btn btn-no-rc "+$(this).attr('data-btn-class')+"'>"+settings.btnText+"</button></span>")
					
			if(ffVersion < 22)
				{
					this.attr('size',ffSize);							
				}														
			this.parent().find('input[type="text"].fileInputText').css({
				'height' : settings.height + "px" ,
				'width'  : function(){
							return settings.width - settings.btnWidth - settings.margin + "px";
							},
				'line-height' : settings.height + "px"
			});
		
		this.change(function(){
				var textPath = $(this).val().replace("C:\\fakepath\\", "");
				$(this).closest('.fileWrapper').find(".fileInputText").val(textPath);
			}			
		)};
		
		return this;					
})();

