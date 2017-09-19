$(function(){
	//面向对象小的选项卡列表(与另一个不能用同一个，拼接字符串不同)
	class tab{
		constructor(){
		}
		init(index){
			this.index = index
			var that = this;
			//单例只请求一次数据
			if(!tab.res){
				//获取数据
				$.ajax({
					url:"http://localhost:8888/winekee/data/list.php",
					dataType:"json"
				})
				.then(function(res){
					tab.res = res;
					console.log(tab.res.length)
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
	new tab().init(0);
	$("#choice>li").on("mouseenter",function(){
		new tab().init($(this).index());
		$(this).siblings().removeClass("enter")
		$(this).addClass("enter");
	})
	//面向对象大的选项卡列表
	class alltab{
		constructor(){
		}
		init(index){
			this.index = index;
			console.log(this.index)
			var that = this;
			//单例只请求一次数据
			if(!alltab.res){
				//获取数据
				$.ajax({
					url:"http://localhost:8888/winekee/data/all.php",
					dataType:"json"
				})
				.then(function(res){
					alltab.res = res;
					that.rendringPage(alltab.res,this.index)
				})
			}else{
				this.rendringPage(alltab.res,this.index)
			}
		}
		rendringPage(res,index){
			//渲染页面
			var html = "";
			for(var i = this.index*12;i<(this.index+1)*12;i++){
				html +=`<li>
						<a href="##">
							<img src="${alltab.res[i].img}" />
						</a>
						<div class="title clearfix">
							<span class="photo"></span>
							<span>${alltab.res[i].tip}</span>
						</div>
						<div class="title2 clearfix">
							<span class="photo"></span>
							<span class="tip">${alltab.res[i].tip}</span>
							<a href="##" id="addCar">加入购物车</a>
						</div>
						<div class="name">${alltab.res[i].name}</div>
						<div class="price">${alltab.res[i].price}</div>
						<div class="sale"><p>已售:</p><span>723728</span></div>
					</li>`
			}
			$("#allgoods").html(html)
		}
	}
	new alltab().init(0);
	$("#bt>li").on("mouseenter",function(){
		new alltab().init($(this).index());
		$(this).siblings().removeClass("enter")
		$(this).addClass("enter");
	})
})