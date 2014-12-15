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

//-- declare the namespace for this app
if(typeof org == "undefined")
	var org = {};
org.ranji = {};
org.ranji.activiti = {};

/**
 *
 *	Init App Layout
 *	
 *	@author RanJi
 *  @date 2014-12-03
 */
org.ranji.activiti.Application = Class.extend({
	appName: "org.ranji.activiti.Application",
	/**
	 * @constructor
	 * 
	 * @param Option param {String} canvasID the id of the DOM element to use as paint container.
	 */
	init: function(canvasID){
		//-- 1. activiti-designer的画布
		this.canvas = new org.ranji.activiti.Canvas('activitiCanvas');
		
		//-- 2. activiti-designer的连接器(全局)
		draw2d.Connection.createConnection = this.createConnection;
		
		//-- 3. activiti-designer的手风琴导航菜单
		this.accordion = new org.ranji.activiti.Accordion(this.canvas);
		
		//-- 4. activiti-designer的工具条
		this.toolbar = new org.ranji.activiti.ToolBar(this.canvas);
		
	},
	
	loadFigure: function(){
		this.canvas.clear();
		this.canvas.add(new draw2d.shape.basic.Oval(),100,100);
		this.canvas.add(new draw2d.shape.basic.Rectangle(),120,150);
		
		this.canvas.add(new draw2d.shape.node.Start(),200,80);
		this.canvas.add(new draw2d.shape.node.End(),350,250);
		
		this.canvas.add(new org.ranji.activiti.Start(),500,500);
		this.canvas.add(new org.ranji.activiti.End(),500,800);
		
	},	
	createConnection: function(sourcePort, targetPort){
		//-- 1. 连接
		var conn = new draw2d.Connection();
		conn.setStroke(1);
		
		//-- 2. 设置连接的锚
		var targetDecorator = new draw2d.decoration.connection.ArrowDecorator(12,12);
		targetDecorator.setBackgroundColor("#000000");
		conn.setTargetDecorator(targetDecorator);
		
		//-- 3. 设置路由
	    conn.setRouter(new draw2d.layout.connection.VertexRouter());
		//conn.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
		
		conn.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
		
	    return conn;
	}
});