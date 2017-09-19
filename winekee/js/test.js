$(function(){
	class tab{
		constructor(){
		}
		init(index,url){
			this.index = index
			var that = this;
			//单例只请求一次数据
			if(!tab.res){
				//获取数据
				$.ajax({
					url:url,
					dataType:"json"
				})
				.then(function(res){
					tab.res = res;
					that.rendringPage(tab.res,this.index)
				})
			}else{
				this.rendringPage(tab.res,this.index)
			}
		}
		rendringPage(res,index){
			//渲染页面
			var html = "";
			for(var i = this.index*5;i<(this.index+1)*5;i++){
				html +=`<li>
							<div class="counttime clearfix">
								<span>剩余</span>
								<span id="hour" class="timer">00</span><span>小时</span>
								<span id="minute" class="timer">00</span><span>分</span>
								<span id="second" class="timer">00</span><span>秒</span>
							</div>
							<a href="##">
								<img src="${tab.res[i].img}" alt="" />
							</a>
							<div class="title clearfix">
								<span class="photo"></span>
								<span>${tab.res[i].tip}</span>
							</div>
							<div class="title2 clearfix">
								<span class="photo"></span>
								<span class="tip">${tab.res[i].tip}</span>
								<a href="##" id="addCar">加入购物车</a>
							</div>
							<div class="name">${tab.res[i].name}</div>
							<div class="price">${tab.res[i].price}</div>
						</li>`
			}
			$("#goods").html(html)
		}
	}
	new tab().init(0,"http://localhost:8888/winekee/data/list.php");
	$("#choice>li").on("mouseenter",function(){
		new tab().init($(this).index());
		$(this).siblings().removeClass("enter")
		$(this).addClass("enter");
	})
})