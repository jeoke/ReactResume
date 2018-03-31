高仿简历
=========
简介
---------
项目代码讲解<br/>
此项目的思路是利用webpack的raw-loader将text解析成为字符串然后利用innerHTML和递归,定时器插入字符串。注意：这个程序是利用异步来完成的。

       const writeChars = (that,nodeName,char) => new Promise((resolve) => {
       	     console.log("a");
       	     resolve();
       	});
       const writeTo = async (that,nodeName,index,char) => {
             console.log("b");
             await writeChars(that,nodeName,char);
             await writeTo(that,nodeName,index,char);
       };
       componentDidMount(){
       	(async (that) => {
       		await writeTo(that,'workArea',0,style1)    		
       	})(this)
       }


writeChars里控制也没innerHTML的输出
writeTo控制需要输出的字符串，所以在里面每输出一个字符串就开始下一个字符串<br/>
注意：await可以接受一个表达式，一般是promise对象,如果不是会专程promise对象<br/>
该程序的执行顺序是

* b
* a
* b


递归执行，直至循环结束<br/>
*****
该项目使用了prism,使代码高亮的库，但就一行代码

      const html = Prism.highlight(origin, Prism.languages.css)


可参考[prism文档](http://prismjs.com/),该语句使字符串origin转换为css高亮的字符串<br/>
该项目还使用了showndown，使markdown语法转换为HTML,仅两行代码
           
           const converter = new showdown.Converter()
           const markdownResume = converter.makeHtml(originResume)


可参考[showdown文档](https://github.com/showdownjs/showdown),该语句使字符串转换为html字符串<br/>

      that.resumeNode.scrollTop = that.resumeNode.scrollHeight


当前不可见部分的元素的高度赋值给该元素顶部被遮住部分的高度，即当元素溢出时，整体上移<br/>

        if(char === "?" || char === "," || char === "!"){
        	interval = 800
        }else{
        	interval = 22
        }

控制字符串输出时间
  
      let speed = 1;
      let char = text.slice(index,index + speed);
      index += speed;
      if(index > text.length){
     	return;
      }


slice截取字符串，speed代表打字速度，每截取一次之后将截取的开始顺序往后移动，当截取的顺序大于所有的字符串长度后，跳出递归，然后componentDidMount异步await就会执行下一个任务,由于async外没有线程任务，所以return的作用只是跳出递归，执行下一个await<br/>

       <div className="workArea" ref={(node) => {this.contentNode = node}}>
            <div dangerouslySetInnerHTML = {{ __html : this.state.styleText }}></div>
            <style dangerouslySetInnerHTML = {{ __html : this.state.DOMStyleText }}></style>
	   </div>

这一段代码中dangerouslySetInnerHTML是react中等同于innerHTML的属性,ref是react中操作DOM的属性,
<br/>
第二行等于直接在style标签中插入css样式,当然你也可以了解下[css-in-js](https://github.com/MicheleBertoli/css-in-js)