$(document).ready(function() {
//SMOOTH TARGET
    $('a[href*=#]').click(function() {
		var $target = $(this.hash);
		
		if ($target.length) {
			var targetOffset = $target.offset().top - 10;
			
			$('html,body').animate({
				scrollTop: targetOffset
			},200);
			
			return false;
		}
    });
	
//MOUSEWHEEL BACKGROUND
/*	$("html").mousewheel(function(event,delta){
		if (delta > 0){
			$("html,body").stop().animate({
				scrollTop: "-=290"
			},300);
		} else {
			$("html,body").stop().animate({
				scrollTop: "+=290"
			},300);
		}
			
		return false;
	});
	*/
	$(window).scroll(function(){
		$("body").css(
			"backgroundPositionY","-=10px"
		);
	});

//JOIN OR DIE
	var $choose,temId;
	var departHeight = $(".depart").height();
	var temPos;
	var $choose;
	var mode = true;
	
	$('.join').click(function(){
		$choose = $(this).parent();
		temPos = $choose.offset().top - 10;
		$choose.addClass("choose");
		joinMode();
		
		$depart = $choose.children().children("h2").text();
		$("input[name|=newer_depart]").attr("value",$depart);
		$("").focus();
	});
	
	$(".cancel").click(function(){
		if (fo === false) {
			outForm();
			fo = true;
		}
		if (mode === false) { normalMode(); }
		if ($choose) {
			$choose.removeClass("choose");
		}
	});
	
	//JOIN-MODE
		function joinMode(){
			var _slideFun = [
				function(){
					$("html,body").animate({scrollTop:"0px"},200,_takeOne);
					$(".depart").not(".choose").animate({height:"0"},400,function(){$(this).hide();});
					$(".join").fadeOut(200);
					$(".choose").animate({height:"742px"},600);
					$(".choose .departWant").show(600);
				},
				function(){
					$(".nav").animate({marginRight:"-300px"},300);
					$("#box").animate({paddingRight:"30px"},500,function(){
						$(".formStyle").animate({width:"320px"});
					});
				}
			];
			
			$("html").queue("slideList",_slideFun);
			var _takeOne = function(){
				$("html").dequeue("slideList");	
			};
			_takeOne();
			
			mode = false;
		}
	
	//NORMAL-MODE
		function normalMode(){
			var _slideFun = [
				function(){
					$(".join").fadeIn(500);
					$(".nav").animate({marginRight: "0px"});
					$("#box").animate({paddingRight:"325px"},300,_takeOne);
					$(".choose .departWant").hide(600);
				},
				function(){
					$(".formStyle").animate({width:"0"});
					$(".depart").not(".choose").show(0,function(){
						$(this).animate({height:"214px"},300);
					});
					$("html,body").animate({
						scrollTop:temPos
					},500);
				}
			];
			
			$("html").queue("slideList",_slideFun);
			var _takeOne = function(){
				$("html").dequeue("slideList");	
			};
			_takeOne();
			
			mode = true;
		}
	//FOCUS-FORM
		var fo = true; 
		
		$("#mainForm input:text").focus(function(){
			if (fo === true) focusForm();
			fo = false;
		})
		$(".formBack").click(function(){
			if (fo === false) outForm();
			fo = true;
		});
		
		function focusForm(){
			$(".formStyle").animate({width:"630px"},300);
			$(".formIn").animate({width:"630px"},300);
			$(".formIn dl").fadeTo("fast",0,function(){
					$("dl").not(".high").addClass("addc");
					$(this).fadeTo("fast",1);
				});
			$("#layout").animate({marginRight:"-320px"},300);
		}
		
		function outForm(){
			$(".formStyle").animate({width:"320px"},200);
			$(".formIn").animate({width:"320px"},300);
			$(".formIn dl").fadeTo("fast",0,function(){
					$(".addc").removeClass("addc");
					$(this).fadeTo("fast",1);
				});
			$("#layout").animate({marginRight:"0"},200);
		}
	
//VALIAD
	var validAlert = [
		"请填写中文姓名",
		"请验明正身",
		"请填写标准阿拉伯数字的年龄",
		"请确定年级",
		"请填写格式正确的学号",
		"请填写专业",
		"请填写格式正确的行动电话",
		"请填写所报部门",
		"请填写格式正确的邮箱地址"
	];

	$(".imp").focusout(function(){
		$mainInput = $(this);
		nInput = $mainInput.parent().parent("dl").index();
		$mainInput.css("background","#fff");
		validForm(nInput);
	});

	function validForm(num) {
		$Input = $("#mainForm dl").eq(num).children().children("input");
	
		if ($Input.val() === "") {
			$Input.css("background",'#fff url("style/img/form-x.gif") no-repeat right 0');
			
			//656013
			return 0;
		}
		
	}
	
	$("#mainForm").submit(function(){
		for (var i=0;i<=8;i++) {
				if(validForm(i) === 0) {
					alert(validAlert[i]);
					$Input.focus();
					return false;
				}
			}
		return validSubmit($("#mainForm"));
	});
	
	function validSubmit(form) {
		var n_name = $("#valid_0").val();
		var n_age = $("#valid_2").val();
		var n_num = $("#valid_4").val();
		var n_ph = $("#valid_6").val();
		var n_email = $("#valid_8").val();
		var n_intro = $("#newer_intro").val();
		
		var reg = /^[\u4e00-\u9fa5]{2,4}$/;
		if (!reg.test(n_name)){
			alert(validAlert[0]);
			$("#valid_0").focus().select();
			return false;
		}		
		
		var reg = /^\d{2}$/;
		if (!reg.test(n_age)){
			alert(validAlert[2]);
			$("#valid_2").focus().select();
			return false;
		}
		
		var reg = /^\d{10,}$/;
		if (!reg.test(n_num)){
			alert(validAlert[4]);
			$("#valid_4").focus().select();
			return false;
		}
		
		var reg = /^[1][0-9]{10}$/;
		if (!reg.test(n_ph)){
			alert(validAlert[6]);
			$("#valid_6").focus().select();
			return false;
		}
		
		var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (!reg.test(n_email)){
			alert(validAlert[8]);
			$("#valid_8").focus().select();
			return false;
		}
	}
//COVER	
	$(".joinin").fadeIn(600);
	
	$(".joinin").click(function(){
		$("#cover").delay(100).animate({height:"0px"},300,function(){
			$(this).hide();
		});
	});

});