const Spritesmith =require('spritesmith')
const fs =require('fs')
const path =require('path')
module.exports=function (source){
    const callback=this.async();
    const imgs=source.match(/url\((\S*)\?__sprite/g);
    const matchedImgs=[]

    for(let i=0;i<imgs.length;i++){
        const img=imgs[i].match(/url\((\S*)\?__sprite/)[1]
        matchedImgs.push(path.join(__dirname,img))
    }
    Spritesmith.run({
        src:matchedImgs
    },(err,result)=>{
        fs.writeFileSync(path.join(process.cwd()),'dist/sprite.jpg')
        source=source.replace(/url\((\S*)\?__sprite/g,(match)=>{
            result `url('dist/sprite.jpg'`
        })
        // this.emitFile(outputPath, content);
        callback(null,source)
    })

}
