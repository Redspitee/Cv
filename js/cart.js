$(function(){
	//复制多个商品测试
	var iterm = $(".item-list .item-single").eq(0);
	for(var i= 0;i<15;i++){
		$(".item-list").append(iterm.clone());
	}
	//结算条的浮动
    var WinHei = $(window).height();	  												//屏幕可视区域高度
    var barDis = $(".car-box").height();  												//购物车里商品列表 的高度
    var dis = barDis -WinHei;			
    var scrol = 0;
    var _dis = 0;
    $(window).bind("scroll",scro);
    
    function scro(){		
    	scrol = $(window).scrollTop();
    	_dis = dis - scrol;
    	fixed();
    }
    function fixed(){
    	if(_dis> -60){																		//如果商品太多，结算条固定在底部
        	$(".cart-toolbar").addClass("fixed-bottom");
        	$(".to-add-container").addClass("container");
        }else if(_dis<= -60){
        	$(".cart-toolbar").removeClass("fixed-bottom");
        	$(".to-add-container").removeClass("container");
        }
    }
    
	//选中要付款的商品  显示付款总额
    var prisAll = parseInt(0);
    var numAll = parseInt(0);
    var check,totdiv,pridiv,numdiv,number,pris,pri,numAll;
    $(".check-item").click(function(){												//选择框点击时
    	number =  $(this).parents(".item-single").find(".goods-num").text();
    	pris = $(this).parents(".item-single").find(".total-money");
        pris = pris.text();
        
		if($(this).is(':checked')){													//是选中状态， 商品数量、 总金额在原基础上 加
			numAll +=parseInt(number);
    		
            prisAll +=  parseFloat(pris); 	 
    	}else{																		//是没选中状态， 商品数量、 总金额在原基础上 减
    		numAll -=parseInt(number);
    		prisAll -=  parseFloat(pris); 	
    	}
		$("#total-price").text("￥" + prisAll.toFixed(2));
		$("#num-all").text(numAll);
    });
    
	//商品数量加减
 	$(".cgnum").click(function(){
   	 	number =  $(this).siblings(".goods-num").text();							//商品数量
   	 	numdiv = $(this).siblings(".goods-num");                  					//商品数量 对象
   	 	pridiv = $(this).parents(".item-single").find(".price");    				//单价的标签对象
   	 	totdiv = $(this).parents(".item-single").find(".total-money");				//总价的标签对象
   	 	check = $(this).parents(".item-single").find(".check-item");				//选择框对象
   	   	pri = pridiv.text(); //单价
   	   	
   	   	
		//数量减少
   	 	if($(this).text()=="-"){
   	   	 	if(number>1){
				number--;
				numdiv.text(number);
	        	pris = pri*number;
	        	totdiv.text(pris.toFixed(2));										//总价
			
    			if((check).is(':checked')){
                    prisAll = prisAll - parseFloat(pri); 
                    numAll  = numAll -1;
                    $("#total-price").text("￥" + prisAll.toFixed(2));
                    $("#num-all").text(numAll);
            	}
        	}
   	   	 	
        //数量增加	
   	   }else{
  	   		number++;
			numdiv.text(number);
        	pris = pri*number;
        	totdiv.text(pris.toFixed(2)); 											//总价
        	
        	if((check).is(':checked')){
                prisAll +=  parseFloat(pri); 										//总价
                numAll  = numAll +1;
                $("#total-price").text("￥" + prisAll.toFixed(2));
                $("#num-all").text(numAll);
        	}
   	   }
	});
 	
    //删除本条购物
    $(".item-del").click(function(){
    	check = $(this).parents(".item-single").find(".check-item");	
    	pris = $(this).parents(".item-single").find(".total-money");
    	number =  $(this).parents(".item-single").find(".goods-num").text();
    	pri = pris.text();
    	
		if(check.is(':checked')){													//删除本条，并从总金额里扣掉被删减商品的金额
    		prisAll -=  parseFloat(pri); 
    		numAll  = numAll -number;
    	}
		$("#total-price").text("￥" + prisAll.toFixed(2));
		 $("#num-all").text(numAll);
		$(this).parents(".item-single").remove();
		barDis = $(".car-box").height();
		dis = barDis -WinHei ;
		scro();
    });
    
    //全选
    $(".check-all").click(function(){
    	if($(this).is(':checked')){													//选中全选时
    		$(".check-item").each(function(){  										//针对每个选择框
        		if(!this.checked){	
        			$(this).click();
        		}
        			 
        	});
    	}else{  																	//取消全选时
    		$(".check-item").each(function(){  										//每个选择框去掉选中 ，结算总价为0
    			$(this).removeAttr('checked');
    			 prisAll =0;
    			 numAll =0;
    			 $("#total-price").text("￥" + prisAll.toFixed(2));
    			 $("#num-all").text(numAll);
    		});
    	}
    });
    
    //删除所选
    $(".del-all").click(function(){
    	$(".check-item").each(function(){											//针对每个选择框
    		check = $(this).parents(".item-single").find(".check-item");	
        	pris = $(this).parents(".item-single").find(".total-money");
        	number =  $(this).parents(".item-single").find(".goods-num").text();
        	pri = pris.text();
    		if($(this).is(':checked')){												//如果选中框是勾中的则删除，并从总金额里扣掉被删减商品的金额
    			prisAll -=  parseFloat(pri);
    			numAll  = numAll -number;
    			$(this).parents(".item-single").remove();
    		}
    		$("#total-price").text("￥" + prisAll.toFixed(2));
    		$("#num-all").text(numAll);
    		
    	});
    	barDis = $(".car-box").height();
		dis = barDis -WinHei;
		scro();
    });
});