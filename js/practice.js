var app = angular.module('reader', []);
app.controller('maincontroller',function($scope){
	$scope.name = "World";
});
app.directive('fileReader', function(){
	return{
		link:funtion(scope, element){
			$(element).on('change', function(changeEvent){
				var files = changeEvent.target.files;
				var error = 0;
				if(!files.length)
				{
					error++;
				}else{
					var ec = files[0].name.split('.');
					if(ec != 0){
						if(ec[ec.length-1]!='csv'){
							error++;
						}
					}else{
						error++;
					}
				}
				if(error == 0){
					var r = new fileReader();
					r.onload = function(e){
						var contents = e.target.result;
						var dpdata = '';
						var alldata = contents.split(/\r\n|\n/);
						for(var i = 0; i<alldata.length;i++){
							var data = alldata[i].split(',');
							var tarr = '';
							for(var j=0;j<data.length;j++){
								if(data[j]!='' && data[j]){
									var count = (alldata[i].split(data[j]).length-1);
									if(count>1){
										error++;
										dpdata+='-'+data[j];
									}
									if(j!=0){
										var xy = data[j].split('|');
										var temp ={ 'x' :parseInt(xy[0]), 'y' : parseInt(xy[1])};
										tarr.push(temp);
									}
								}
							}
						}
					};
				}
			});
		}
	};
});