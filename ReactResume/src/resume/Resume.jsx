
import React from 'react';
import style1 from './txt/style1.txt';
import resume from './txt/resume.txt';
import style2 from './txt/style2.txt';
import showdown from 'showdown';
import Prism from 'prismjs';
import './styles/preStyle.css';

let interval;
const writeChars = (that,nodeName,char) => new Promise((resolve) => {
	setTimeout(() => {
		if(nodeName === "workArea"){
			const origin = that.state.DOMStyleText + char
            const html = Prism.highlight(origin, Prism.languages.css)
            that.setState({
                styleText: html,
                DOMStyleText: origin
            })
            
            that.contentNode.scrollTop = that.contentNode.scrollHeight
		}else if (nodeName == 'resume') {
            const originResume = that.state.resumeText + char
            const converter = new showdown.Converter()
            const markdownResume = converter.makeHtml(originResume)
            that.setState({
                resumeText: originResume,
                DOMResumeText: markdownResume
            })
            that.resumeNode.scrollTop = that.resumeNode.scrollHeight
        }
     
        if(char === "?" || char === "," || char === "!"){
        	interval = 800
        }else{
        	interval = 22
        }
        resolve();
	},interval)
});
const writeTo = async (that,nodeName,index,text) => {
     let speed = 1;
     let char = text.slice(index,index + speed);
     index += speed;
     if(index > text.length){
     	return;
     }
     await writeChars(that,nodeName,char);
     await writeTo(that,nodeName,index,text);
};

export default class Resume extends React.Component {

	constructor(...props) {
		super(...props);
		this.state = {
            styleText: ``,
            DOMStyleText: ``,
            resumeText: ``,
            DOMResumeText: ``
        };
	}
    
    componentDidMount(){
    	(async (that) => {
    		await writeTo(that,'workArea',0,style1)
    		await writeTo(that,'resume',0,resume)
    		await writeTo(that,'workArea',0,style2)    		
    	})(this)
    }

	render() {
		return (
			<div>
			    <div className="workArea" ref={(node) => {this.contentNode = node}}>
                     <div dangerouslySetInnerHTML = {{ __html : this.state.styleText }}></div>
                     <style dangerouslySetInnerHTML = {{ __html : this.state.DOMStyleText }}></style>
			    </div>
			    <div
                    className='resume'
                    dangerouslySetInnerHTML={{ __html: this.state.DOMResumeText }}
                    ref={(node) => { this.resumeNode = node }}
                >
                </div>
     		</div>
		);
	}
}


