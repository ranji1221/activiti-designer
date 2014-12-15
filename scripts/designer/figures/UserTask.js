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


org.ranji.activiti.UserTaskICON = draw2d.shape.icon.User.extend({
	NAME: "UserTaskICON",
	
	init: function(){
		this._super();
		this.setDimension(16,16);
	}
});

org.ranji.activiti.UserTaskText = draw2d.shape.basic.Text.extend({
	NAME: "UserTaskText",
	
	init: function(text){
		this._super();
		this.setText(text);
		this.setFontFamily("微软雅黑");
		this.setStroke(0);
		
		this.installEditor(new draw2d.ui.LabelInplaceEditor({
		   onCommit: $.proxy(function(value){
			   if(this.getWidth()>120)
				this.getParent().setWidth(this.getWidth());
			   else{
				this.getParent().setWidth(120);
			   }
			   this.getParent().setHeight(80);
		   },this),
		   onCancel: function(){
		   }
		}));
	}
});

org.ranji.activiti.UserTask = draw2d.shape.basic.Rectangle.extend({
	NAME: "UserTask",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setDimension(120,80);
		this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
		this.setRadius(10);
		
		var userTaskICON = new org.ranji.activiti.UserTaskICON();
		var userTaskText = new org.ranji.activiti.UserTaskText("用户任务");
		
		var userTaskICONLocation = new draw2d.layout.locator.XYRelPortLocator(5,5);
		var userTaskTextLocation = new draw2d.layout.locator.CenterLocator();
		
		
		this.add(userTaskICON,userTaskICONLocation,0);
		this.add(userTaskText,userTaskTextLocation,1);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);
		
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		this.createPort("output",rightLocator);
	},
	
	 /**
     *
     *  Called if the user drop this element onto the dropTarget. 
     * 
     *  will create a "smart insert" of an existing connection.
     * 	COOL and fast network editing.
     * 
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
	onDrop: function(dropTarget,x,y,shiftKey,ctrlKey){
		// Activate a "smart insert" If the user drop this figure on connection
    	if(dropTarget instanceof draw2d.Connection){
		
			var oldSource = dropTarget.getSource();
			
			dropTarget.setSource(this.getOutputPort(0));
			
			
			//var additionalConnection = draw2d.Connection.createConnection();
			//this.getCanvas().add(additionalConnection);
			
			//additionalConnection.setSource(oldSource);
			//additionalConnection.setTarget(this.getInputPort(0));
			
			var cmd = new draw2d.command.CommandConnect(this.getCanvas(),oldSource,this.getInputPort(0));
			this.getCanvas().getCommandStack().execute(cmd);
			
    	}
	},
	
	onContextMenu:function(x,y){
		 $.contextMenu({
            selector: "body", 
            events:
            {  
               hide:function(){ $.contextMenu( 'destroy' ); }
            },
            callback: $.proxy(function(key, options) 
            {
               switch(key){
               case "red":
                   this.setColor('#f3546a');
                   break;
               case "green":
                   this.setColor('#b9dd69');
                   break;
               case "blue":
                   this.setColor('#00A8F0');
                   break;
               case "delete":
                   // without undo/redo support
              //     this.getCanvas().remove(this);
                   
                   // with undo/redo support
                   var cmd = new draw2d.command.CommandDelete(this);
                   this.getCanvas().getCommandStack().execute(cmd);
               default:
                   break;
               }
            
            },this),
            x:x,
            y:y,
            items: 
            {
                "red":    {name: "Red", icon: "edit"},
                "green":  {name: "Green", icon: "cut"},
                "blue":   {name: "Blue", icon: "copy"},
                "sep1":   "---------",
                "delete": {name: "Delete", icon: "delete"}
            }
        });
	} 
	
});









