var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.melaleuca.com.cn'

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.learnchapter')
	//var chapter = 
	/*[{
		chapterTitle: '',
		videos:[
			title:'',
			id:''
		]
	}]*/

	var test=''
}

http.get(url,function(res){
	var html =''

	res.on('data',function(data){
		html += data
	})

	res.on('end',function(){
		//filterChapters(html)
		console.log(html)
	})
}).on('error',function(e){
	console.log(e.message)
})

