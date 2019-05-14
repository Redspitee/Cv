	$(document).ready(function(){
		var html = '<div id="editor_div">'
			+'<p class="editor_toolbar"><button class="editor_img" title="表情包"></button></p>'
			+'<div class="editor_bqdiv hide">'
			+'<div class="editor_tc editor_tcl"></div>'
			+'<div class="editor_tc editor_tcr"></div>'
			+'<ul class="editor_sort">'
			+'     <li id="tsj"  class="active">兔斯基</li>'
			+'     <li id="ka">可爱搞笑</li>'
			+'  </ul>'

		+'  	<div class="editor_bqbbox tsj ">'
		+'  	   <!-- 兔斯基表情包 -->'
		+'  	    <table class="tsj">'

		+'      	</table>'
		+'  	</div>'
		+'  	<div class="editor_bqbbox ka hide">'
		+'  	   <!-- 可爱搞笑表情包 -->'
		+'  	    <table class="ka">'

	    +'      	</table>'
	    +'  	</div>'
	    +'</div>'
	    +'<div class="textArea" id="editor_textarea" contenteditable="true"></div>'
	    +'</div>';

	    $("#mybjq").append(html);
		var tr = '<tr></tr>';
		for (var i=0;i<4;i++){
			$("table.tsj").append(tr);
		}
		for (var i=0;i<3;i++){
			$("table.ka").append(tr);
		}
		var td = '<td title=""><img src="bjq/img/0.gif" alt="" /></td>';
		for(var tdLen = 0;tdLen<10;tdLen++){
			$("tr").append(td);
		}

		//表情按钮
		$(".editor_img").click(function(){
			$(".editor_bqdiv").fadeToggle(0);
			//预先加载胖豆
			var tsj = "tsj";
			bqbbg(tsj)
		});
		//表情选项
		$(".editor_sort li").click(function(){
			$(".tc").hide();
			var sort = $(this).attr("id");
			$(".editor_bqbbox"+"."+sort).show().siblings(".editor_bqbbox").hide();
			$(this).addClass("active").siblings().removeClass("active");
			bqbbg(sort)
		});
		function bqbbg(bqid){		
			$("table"+"."+bqid).find("td").addClass(bqid+"_td");
			var size = $("."+bqid+"_td").size();
			for(i=0;i<size;i++){
				var td = $("."+bqid+"_td").eq(i);
				td.find("img").css("background-position","left "+(-35*i)+"px");
			}
		}
		//表情包选择
		$(".editor_bqbbox table td").click(function(){
			var col = $(this).index();
			var row = $(this).parent().index();
			col = row*10 +col;
			var comm = "bjq/img/";
			var sort = $(".editor_sort li.active").attr("id");
			var hz = sort+col+".gif";
			var src = comm+hz;
			var _html = '<img src='+src+' style=" max-width: 70px;" />';
			$("#editor_textarea").append(_html);
			$(".editor_bqdiv").stop().hide(); //选择表情后隐藏
		});
		//表情包预览
		$(".editor_bqbbox td").hover(function(){
			var index = $(this).index();
			if(index>4){
				$(".editor_tcl").show().siblings(".editor_tcr").hide();
			}else{
				$(".editor_tcr").show().siblings(".editor_tcl").hide();
			}
			var col = $(this).index();
			var row = $(this).parent().index();
			col = row*10 +col;
			var comm = "bjq/img/";
			var sort = $(".editor_sort li.active").attr("id");
			var hz = sort+col+".gif";
			var src = comm+hz;
			var _html = '<img src='+src+' />';
			$(".editor_tc").html(_html);
			
		},function(){
			$(".editor_tc").hide();
		});
		//点击输入框 隐藏表情详情
		$("#editor_textarea").click(function(){
			hideBqb();
		});
		function hideBqb(){
			$(".editor_bqdiv").stop().hide();
		}

	});