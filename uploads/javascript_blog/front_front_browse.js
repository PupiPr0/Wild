;(function($,_,undefined){"use strict";ips.controller.register('blog.front.browse.grid',{initialize:function(){this.on('click','.cBlog_grid_item',this.clickNewsItem);this.setup();},setup:function(){},clickNewsItem:function(e){var link=$(e.currentTarget).find('[data-role="newsTitle"]');if($(e.target).closest('a').length>0){return;}
if($(e.target).closest('input').length>0){return;}
window.location=link.attr('href');}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('blog.front.browse.list',{initialize:function(){this.on('change','[data-role="moderation"]',this.selectEntry);},selectEntry:function(e){var row=$(e.currentTarget).closest('.cBlogView_entry');row.toggleClass('cBlogView_entrySelected',$(e.currentTarget).is(':checked'));}});}(jQuery,_));;