var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

http.get(url,function(res){
	var html =''

	
	res.on('data',function(data){
		html += data
	})

	res.on('end',function(){
		var courseData = filterChapters(html)
		printCourseData(courseData)
		//console.log(courseData)
	})
}).on('error',function(e){
	console.log(e.message)
})



function filterChapters(html){
	var $ = cheerio.load(html)
	var courseData = []
	var chapters = $('.chapter')
	
	//var chapter = 
	/*[{
		chapterTitle: '',
		videos:[
			title:'',
			id:''
		]
	}]*/

	chapters.each(function(item){

		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text().replace(/\s+/g,'')
		var videos = chapter.find('.video').children('li')
		var chapterData ={
			chapterTitle: chapterTitle,
			videos: []
		}

		videos.each(function(item){
			var video = $(this)
			var videoTitle = video.find('.J-media-item').text().replace(/\s+/g,'')
			var id =  video.attr('data-media-id')


			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		})
		courseData.push(chapterData)
	})
	return courseData
}

function printCourseData(courseData){
	courseData.forEach(function(item){
		console.log(item.chapterTitle + '\n')

		item.videos.forEach(function(video){
			console.log('  ['+video.id +'] ' + video.title +'\n')
		})
	})
}

