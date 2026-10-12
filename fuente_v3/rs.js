const {chromium}=require('playwright-core');const {spawn}=require('child_process');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROME,args:['--no-sandbox','--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:1080,height:1080}});
 await p.goto('file://'+process.cwd()+'/sintomas.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
 const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','16','-preset','medium','s_silent.mp4'],{stdio:['pipe','inherit','inherit']});
 const N=660;
 for(let i=0;i<N;i++){await p.evaluate(t=>setT(t),i/30);const buf=await p.screenshot({type:'jpeg',quality:96});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close()})();
