$(function(){
	var arr = ['#E31232','#A40F23','#DDE6EB','#FDFDFD','#B9D3EC','#D9E2E1','#000000','#E5E5E7'];
//	alert(arr[0])
	$L = $('#lunboImg>li').size();
	$index = 0;
	var $yanse = null;
//	console.log($L);
	function move(){
		if($index>=$L-1){
			$index=-1;
		}
		$index++;
		$yanse = arr[$index]
		$('#lunboImg>li').eq($index).stop().animate({'opacity':'1','background':$yanse},1000);
		$('#lunboImg>li').eq($index).siblings().stop().animate({'opacity':'0','display':"none"},1000);
//		$('#lunboImg>li').css('background',$yanse);
		$('#lunboList>li').eq($index).css('background','#C40000').siblings().css('background','black');
	}
	
	var timer = setInterval(move,5000);
	
	$('#lunboImg>li').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,5000);
	})
	
	
	$('.floatAD').hover(function(){
		clearInterval(timer);
		$('.flo').stop().animate({'left':'150px'},300,function(){
		$('.flo').css('left','-150px');
		});
	},function(){
		timer = setInterval(move,5000);
		
	})
	
	
	
	$('#lunboList>li').hover(function(){
		clearInterval(timer);
		$index = $(this).index();
		$yanse = arr[$index]
		$(this).css('background','#C40000').siblings().css('background','black');
		$('#lunboImg>li').eq($index).stop().animate({'opacity':'1'},1000).siblings().stop().animate({'opacity':'0','display':"none"},1000);
		$('#lunboImg>li').css('background',$yanse);
	},function(){
		timer = setInterval(move,5000)
	})
})

	