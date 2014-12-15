/*
 * 项目说明：Activiti-Designer是为业务人员、开发人员及系统管理员用图形化方式方便友好的设计工作流而开发的项目。
 * 版权所有 (C) 2014 纪冉
 * 这一程序是自由软件，你可以遵照自由软件基金会出版的GNU通用公共许可证条款来修改和重新发布这一程序。或者用许可证的第二版，或者（根据你的选择）用任何更新的版本。
 * 发布这一程序的目的是希望它有用，但没有任何担保。甚至没有适合特定目的的隐含的担保。更详细的情况请参阅GNU通用公共许可证。
 * 你应该已经和程序一起收到一份GNU通用公共许可证的副本。如果还没有，
 * 写信给：
 * 	 The Free Software Foundation, Inc., 675 Mass Ave, Cambridge,
 *   MA02139, USA
 * 联系方式：QQ(95724368) 泥鳅也是鱼 E-Mail (jiran1221@163.com)
*/


/**
 * Define Navigation Accordion Menu For ProcessDesigner
 *
 * @author RanJi (泥鳅也是鱼)
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