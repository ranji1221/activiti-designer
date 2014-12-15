/**
 * Activiti5 Designer 0.0.1
 * 
 * Copyright (c) 2014 RanJi All rights reserved.
 * 
 * This program is free software, and you can follow the Free Software Foundation's GNU General Public License as published by the terms used to modify and redistribute the program. 
 * Or a second license, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY. 
 * Without even the implied warranty for a particular purpose. More detailed information, please refer to the GNU General Public License.
 * You should have received a copy of the GNU General Public License along with the program. If not,
 * Visit the WebSite:
 *	 Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * 
 * To use it on other projects please contact me at jiran1221@163.com
 * Thanks for your using. Good Luck!
 * 
 */

/**
 * Define Navigation Accordion Menu For ProcessDesigner
 *
 * @author RanJi (ÄàöúÒ²ÊÇÓã)
 * @date 2014-12-09
 */
org.ranji.activiti.Accordion = Class.extend({
	accordionName: "org.ranji.activiti.Accordion",

	init: function(view){
		this.view = view;
		$('.easyui-accordion .easyui-linkbutton').draggable({
			proxy:function(source){
				var p = $('<div class="draggable-model-proxy"></div>');
				p.html($(source).html()).appendTo('body');
				return p;
			},
			deltaX: -5,
			deltaY: -5,
			revert: true,
			cursor: 'pointer',
			onStartDrag: function(){
				$(this).draggable('options').cursor = "not-allowed";
			},
			onStopDrag: function(){
				$(this).draggable('options').cursor = "pointer";
			}
		});
		
		$('#'+view.id).droppable({
			accept: '.easyui-linkbutton',
			onDragEnter: function(e,source){
				$(source).draggable('options').cursor = 'move';
			},
			onDragLeave: function(e,source){
				$(source).draggable('options').cursor = 'not-allowed';
			},
			onDrop: function(e,source){
				var x = $(source).draggable('proxy').offset().left;
				var y = $(source).draggable('proxy').offset().top;
				console.log("["+x+":"+y+"]");
				

				var shape = new org.ranji.activiti.UserTask();
				//view.add(shape,x,y);
				var command = new draw2d.command.CommandAdd(view,shape,x,y);
				view.getCommandStack().execute(command);
			}
		});
	}
});