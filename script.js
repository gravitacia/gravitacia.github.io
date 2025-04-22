const asciiArt1 = `
 '.'.:l.  ..                                                                                                  .oc..dk.                
 .cOdcxKo.cKk.                                                                                         ..  .::.oNOd:cl.                
 .o0oxXXd'dWNc..,,.  .c:.      ..'       ,'                                                .    ;x:   :k,.;cx0,;XXXd;'                 
  .c:dWWd;kWMx:okKd'cKWWk'   'd0N0,    .oX0,      .:,                           ..       .cl. .,xWNd.,0Xc.cd0X:.kMNl.                  
    .,0Wd;OMWxcONM0o0MMMW0; .OWMMXo:. .oWMMO'    .oXl              .l;        .cd.   ',.:ONo  :OXMM0;dWNx,'xNWl.kWd.                   
      cXO;xMNc;KMM0dKMMMMWd'dWMMMWNNk..xMMMK,   .oNMx..'          .:Kd.      'xNd. .lK0ONMK:..kWMMMK;lNMK; oWX:.xO'                    
       :kccXX:,KMMKkXMMMWNo'kMMMMMMMWo.dWMMO::' :XMM0,lO;        lkkNd,'   .cKWX:  ;XMMMMMkc.,KMMMMK;;KMK, cNx..l;                     
        ';.cKo;0MM0xXMMMXOc.oWMMMMMMX:.oWMWkxXd.,KMMXcoWK:     .lXWWWdc: .:kNMM0c. .kMMMMNkc..kMMMMX:.OMO. lO,  .                      
            :o'lNWo'xWMM0o, ,KMMMMMXc  oWMWKXMX:.kMMWddWMXl. .c0WMMMNdxc.cNMMMMXO;  :XMMMKkl. cNMMMN:'OK;  ::                          
             ...OK, ,KMMO:. .xMMMMNl   lWMMWMMMx'oWMMOkWMMX: .cXMMMMXO0l .kWMMMMK;  .xWMMX0c  ;KMMNd.,kc   ..                          
                ;l.  lNM0,   cNMMWx.   lWMMMMMK:.:XMMXXWMMO'   cXMMMWNNl  '0MMMM0'   lWMMWK;  cNMXl. ,:.                               
                 .   .xWNl   .kWMMx.   lWMMMWO,  '0MMMMMMX:     cXMMMMNl   ;KMMMk.   oWMMMk. .dWK:                                     
                      .dXO.   .xNM0,   :XMMM0'   .xMMMMMNo.      lNMMMNc   .dWMX:   .kMMWO,  .O0,                                      
                        ;x:    .lXNl   .dNMMk.    cNMMMMO'       ,0MMWx.    lWWd.   ,KMXo.   ,o'                                       
                         .'.     :Kx.   .xWMk.    .xWMMMk.       ,KMM0'     lN0'    cXO;     ..                                        
                                  ,o'    .kWO.     .OMMMk.       ;KMK;      lKc    .co.                      .                         
          .;c.                     ..     'Ok.      ;KMMx.       ;XNl       co.     .                       .lkc.                      
         .xNx.  ..                         ,l.       cNMx.       :Kd.       ,'                           ;;. ;KWl                      
         ,KX:.,dc.                          .        .dNx.       :d.                                  .  .xO:'xNl                      
         .dxcxXk.  ,.                                 .kd.       ''                                  .:,  cNWxlc.                      
          .'oNWx..;o'                                  ,:.                                            ox;'lXMx.                        
            ;XWxcoOk.  ..                               .                             ,'         .:'  cX0doKWl                         
            .dOoxXWx. :x,       ..            ;;                                      lk,         oO:.:NMXl:c.                         
              .,OMWo'dXd.      .c;           :Oc                                      ;XMK:  .:' .:kWXlddWO.                            
               .dWKldWXl. .,.  .ko          ;KX;                                ..    ;XMK:  .:' .:kWXldWO.                            
                ;0dlXW0x: ;o.  :XO.        ;KM0'         ,;              .:.    ;:    '0MMXc .dd.'x0NMOcl;                              
                 .'xWWNKc.dk.  oWX;       ,0MMO.         lk'             ;O:    lk'   .OMMM0'.xXl;OWWM0,                                
                   :XMMO:lK0' .OMWo    .'.lWMMk.        .xNo.           .oNx.   lXo   .OMMMX;.xWXddXMXc                                 
                    c0OccKWNl ;XMMO.   .:;oWMWd.        '0M0d,        .',kMO.   oW0,  ,KMMMNc;KMMNdcl,                                  
                     ...xWMMO,oWMMK;   .lodWMMO'        :XMWNd.       ;llXMO.  .dWWd. :NMMMWo;0MMMk.                                    
                       .OMMMO,c0XMWo    dOOWMMWd.       oWMMMK;      .xkkWMO.  .xMMK;.oWMMMWd'kMMXl.                                    
                        ;OWMO''l0MMK;   dNXWMMMNc      '0MMMMWx.     cXKKMMO.  .kMMWo.xMWMMMk,dW0;                                      
                         .l0d..,kMMMKc  dWMMMMMM0,    .oWMMMMMX:    'OMWWMMO. .lXMMMx:0N0XMMO'.;.                                       
                           .   .dWMMMNd'dMMMMMMMWx.   ;KMMMWXWMk.  .xWMMMMMO''xNMWWMOl0OxNMM0'                                          
                                oWMMMWx,dWMMMMMMMX;  .xWMMW0kKMX; .xWMMMMMMO:kMMN0KM0:ccdWW0:                                           
                                'xXWWx. :XMMMMMMMNc  cXMMMWOd0MX;.xWMMMMMMMO:kMNkkNMO'  'lc.                                            
                                  'cc.   cXMMMMMMWo .OMMMMXkd0MK,'0MMMMMMMMk,xNdlKW0;                                                   
                                          ;OWMMMMMx.;XMMMM0oo0M0,;XMMMMMMMK; ':;kNk'                                                    
                                           .c0WMWNx.;XMMMMkco0MO'lNMMMMMW0;    .:;.                                                     
                                             .:l:'. 'OWMMWd:o0Mk'oWMMMMXo.                                                              
                                                     .;dKXc,okx,.;k0NXx'                                                                
                                                        .,. ..     .'.                                                                  
 `;
 
 const asciiArt2 = `  ▄████ ▓█████▄▄▄█████▓    ██▓███   █     █░███▄    █ ▓█████ ▓█████▄      
  ██▒ ▀█▒▓█   ▀▓  ██▒ ▓▒   ▓██░  ██▒▓█░ █ ░█░██ ▀█   █ ▓█   ▀ ▒██▀ ██▌     
 ▒██░▄▄▄░▒███  ▒ ▓██░ ▒░   ▓██░ ██▓▒▒█░ █ ░█▓██  ▀█ ██▒▒███   ░██   █▌     
 ░▓█  ██▓▒▓█  ▄░ ▓██▓ ░    ▒██▄█▓▒ ▒░█░ █ ░█▓██▒  ▐▌██▒▒▓█  ▄ ░▓█▄   ▌     
 ░▒▓███▀▒░▒████▒ ▒██▒ ░    ▒██▒ ░  ░░░██▒██▓▒██░   ▓██░░▒████▒░▒████▓      
  ░▒   ▒ ░░ ▒░ ░ ▒ ░░      ▒▓▒░ ░  ░░ ▓░▒ ▒ ░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒▒▓  ▒      
   ░   ░  ░ ░  ░   ░       ░▒ ░       ▒ ░ ░ ░ ░░   ░ ▒░ ░ ░  ░ ░ ▒  ▒      
 ░ ░   ░    ░    ░         ░░         ░   ░    ░   ░ ░    ░    ░ ░  ░      
       ░    ░  ░                        ░            ░    ░  ░   ░         
                                                               ░           
  ██▓     ███▄ ▄███▓ ▄▄▄       ▒█████   ▒█████   ▒█████   ▒█████   ▒█████  
 ▓██▒    ▓██▒▀█▀ ██▒▒████▄    ▒██▒  ██▒▒██▒  ██▒▒██▒  ██▒▒██▒  ██▒▒██▒  ██▒
 ▒██░    ▓██    ▓██░▒██  ▀█▄  ▒██░  ██▒▒██░  ██▒▒██░  ██▒▒██░  ██▒▒██░  ██▒
 ▒██░    ▒██    ▒██ ░██▄▄▄▄██ ▒██   ██░▒██   ██░▒██   ██░▒██   ██░▒██   ██░
 ░██████▒▒██▒   ░██▒ ▓█   ▓██▒░ ████▓▒░░ ████▓▒░░ ████▓▒░░ ████▓▒░░ ████▓▒░
 ░ ▒░▓  ░░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▒░▒░ 
 ░ ░ ▒  ░░  ░      ░  ▒   ▒▒ ░  ░ ▒ ▒░   ░ ▒ ▒░   ░ ▒ ▒░   ░ ▒ ▒░   ░ ▒ ▒░ 
   ░ ░   ░      ░     ░   ▒   ░ ░ ░ ▒  ░ ░ ░ ▒  ░ ░ ░ ▒  ░ ░ ░ ▒  ░ ░ ░ ▒  
     ░  ░       ░         ░  ░    ░ ░      ░ ░      ░ ░      ░ ░      ░ ░  `;
 
 const credentials = [
     { email: "chubinidzerati0@gmail.com", password: "asnaeb", link: "https://www.messenger.com" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb123", link: "https://cms.appinstitute.com/cms/app_build.php" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb123", link: "https://www.yola.com" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb12345678@", link: "https://superleague.auth0.com/login" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb213", link: "https://appyet.com/SignUp" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeebb123", link: "https://discord.com/channels/906452630434377758/906458266995937312" },
     { email: "chubinidzerati0@gmail.com", password: "mcpe1234", link: "https://m.facebook.com" },
     { email: "jeltsite@gmail.com", password: "asnaeb213", link: "https://mega.nz/login" },
     { email: "jeltsite@gmail.com", password: "asnaeb21345", link: "https://discord.com/login" },
     { email: "ratichubi2@gmail.com", password: "asnaeb213", link: "https://accounts.google.com/v3/signin/challenge/pwd" },
     { email: "ratichubi2@gmail.com", password: "asnaeb21345", link: "https://blackspigot.com/register/" },
     { email: "ratichubi2@gmail.com", password: "asnaeb21345", link: "https://client.limenodes.com/login" },
     { email: "ratichubi2@gmail.com", password: "asnaeb21345", link: "https://panel.limenodes.com/auth/login" },
     { email: "raticubh@gmail.com", password: "asnaeb213", link: "https://discord.com/invite/5ZQwYn5D/login" },
     { email: "raticubh@gmail.com", password: "asnaeb213", link: "https://minefort.com/authenticate" },
     { email: "raticubh@gmail.com", password: "youtube213", link: "https://accounts.google.com/signin/v2/challenge/pwd" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb1234", link: "https://www.messenger.com" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb213", link: "https://discord.com/register" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb213", link: "https://server.pro/login" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeebb123B", link: "https://id.unity.com/en/conversations/4a2d18e1-1f5c-4600-985d-929f69018bd7009f" },
     { email: "chubinidzerati0@gmail.com", password: "BS:p-bvs8n!67Ls", link: "https://bubble.io" },
     { email: "chubinidzerati0@gmail.com", password: "XEsmn4HM:5n:2!c", link: "https://accounts.yoyogames.com/register" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb1234", link: "(no link)" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeb12345678", link: "(no link)" },
     { email: "chubinidzerati0@gmail.com", password: "XEsmn4HM", link: "(no link)" },
     { email: "chubinidzerati0@gmail.com", password: "XEsmn4HM:5n:2c", link: "(no link)" },
     { email: "chubinidzerati0@gmail.com", password: "asnaeebb123b", link: "(no link)" }
 ];
 
 const messages = [
     "> ACCESS GRANTED",
     "> INITIALIZING DATA DUMP...",
     "> TARGET ACQUIRED"
 ];
 
 const userInfo = [
     "> Full name: Rati Chubinidze",
     "> Age: 13",
     "> Location: 19th Micro-Region of Rustavi, 1st Block, Georgia",
     "> IP Address: 185.115.5.208"
 ];
 
 const finalMessages = [
     "> DATA DUMP COMPLETE",
     "> SYSTEM COMPROMISED",
     "> TARGET OWNED"
 ];
 
 const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
 
 const bootSequence = [
     "> INITIALIZING SYSTEM...",
     "> LOADING CORE COMPONENTS...",
     "> ESTABLISHING SECURE CONNECTION...",
     "> VERIFYING USER CREDENTIALS...",
     "> ACCESS GRANTED",
     "> CLICK TO PROCEED"
 ];
 
 async function typeBootSequence() {
     const bootText = document.getElementById('bootText');
     const clickPrompt = document.getElementById('clickPrompt');
     
     for (const line of bootSequence) {
         const lineElement = document.createElement('div');
         bootText.appendChild(lineElement);
         
         for (let i = 0; i < line.length; i++) {
             lineElement.textContent += line[i];
             await new Promise(resolve => setTimeout(resolve, Math.random() * 20 + 10));
         }
         
         await new Promise(resolve => setTimeout(resolve, 100));
     }
     
     clickPrompt.style.display = 'block';
 }
 
 async function typeText(element, text, speed = 5) {
     for (let i = 0; i < text.length; i++) {
         element.textContent += text[i];
         if (Math.random() < 0.1) {
             await new Promise(resolve => setTimeout(resolve, speed * 3));
         } else {
             await new Promise(resolve => setTimeout(resolve, speed));
         }
     }
 }
 
 async function typeLines(element, lines, speed = 5) {
     for (const line of lines) {
         const p = document.createElement('p');
         element.appendChild(p);
         await typeText(p, line, speed);
         await new Promise(resolve => setTimeout(resolve, 25));
     }
 }
 
 function createMatrixRain() {
     const matrixRain = document.querySelector('.matrix-rain');
     const fontSize = 14;
     const columns = Math.floor(window.innerWidth / fontSize);
     
     for (let i = 0; i < columns; i++) {
         const column = document.createElement('div');
         column.style.position = 'absolute';
         column.style.left = `${i * fontSize}px`;
         column.style.top = '-100px';
         column.style.fontSize = `${fontSize}px`;
         column.style.color = '#0f0';
         column.style.textShadow = '0 0 5px #0f0, 0 0 10px #0f0';
         column.style.opacity = '0.2';
         column.style.animation = `fall ${Math.random() * 1 + 1}s linear infinite`;
         column.style.animationDelay = `${Math.random() * 2}s`;
         
         let text = '';
         for (let j = 0; j < 50; j++) {
             text += matrixChars[Math.floor(Math.random() * matrixChars.length)];
         }
         column.textContent = text;
         
         matrixRain.appendChild(column);
     }
 }
 
 function addGlitchEffect() {
     const glitch = document.createElement('div');
     glitch.className = 'glitch-overlay';
     glitch.style.position = 'fixed';
     glitch.style.top = '0';
     glitch.style.left = '0';
     glitch.style.width = '100%';
     glitch.style.height = '100%';
     glitch.style.pointerEvents = 'none';
     glitch.style.zIndex = '9999';
     glitch.style.mixBlendMode = 'screen';
     glitch.style.opacity = '0.2';
     glitch.style.animation = 'glitch 0.3s infinite';
     document.body.appendChild(glitch);
 }
 
 function addScreenDistortion() {
     const distortion = document.createElement('div');
     distortion.className = 'screen-distortion';
     distortion.style.position = 'fixed';
     distortion.style.top = '0';
     distortion.style.left = '0';
     distortion.style.width = '100%';
     distortion.style.height = '100%';
     distortion.style.pointerEvents = 'none';
     distortion.style.zIndex = '9998';
     distortion.style.background = 'radial-gradient(circle at center, transparent 0%, rgba(0, 255, 0, 0.2) 100%)';
     distortion.style.animation = 'distort 2s infinite';
     document.body.appendChild(distortion);
 }
 
 function addTerminalGlitch() {
     const terminal = document.querySelector('.terminal');
     setInterval(() => {
         if (Math.random() < 0.1) {
             terminal.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
             terminal.style.filter = `brightness(${Math.random() * 0.4 + 0.8}) contrast(${Math.random() * 0.4 + 0.8})`;
         } else {
             terminal.style.transform = 'translate(0)';
             terminal.style.filter = 'brightness(1) contrast(1)';
         }
     }, 100);
 }
 
 function populateTable() {
     const tbody = document.getElementById('table-body');
     credentials.forEach(cred => {
         const tr = document.createElement('tr');
         tr.innerHTML = `
             <td class="email" data-cred="${cred.email}">${cred.email}</td>
             <td class="password" data-cred="${cred.password}">${cred.password}</td>
             <td class="link"><a href="${cred.link}" target="_blank" rel="noopener noreferrer">${cred.link}</a></td>
         `;
         tbody.appendChild(tr);
     });
 
     const cells = document.querySelectorAll('.data-table td.email, .data-table td.password');
     cells.forEach(cell => {
         cell.addEventListener('click', () => {
             const text = cell.textContent;
             const temp = document.createElement('div');
             temp.style.position = 'fixed';
             temp.style.top = '50%';
             temp.style.left = '50%';
             temp.style.transform = 'translate(-50%, -50%)';
             temp.style.color = '#0f0';
             temp.style.fontSize = '24px';
             temp.style.textShadow = '0 0 10px #0f0';
             temp.style.opacity = '0';
             temp.style.transition = 'opacity 0.5s';
             temp.textContent = 'COPIED';
             document.body.appendChild(temp);
 
             navigator.clipboard.writeText(text);
 
             setTimeout(() => {
                 temp.style.opacity = '1';
                 setTimeout(() => {
                     temp.style.opacity = '0';
                     setTimeout(() => {
                         document.body.removeChild(temp);
                     }, 500);
                 }, 1000);
             }, 0);
         });
     });
 }
 
 async function initializeContent() {
     document.getElementById('ascii-art-1').textContent = asciiArt1;
     document.getElementById('ascii-art-2').textContent = asciiArt2;
     
     await typeLines(document.getElementById('messages'), messages);
     await typeLines(document.getElementById('user-info'), userInfo);
     populateTable();
     await typeLines(document.getElementById('final-messages'), finalMessages);
 }
 
 document.addEventListener('DOMContentLoaded', () => {
     const bootOverlay = document.getElementById('bootOverlay');
     const bgMusic = document.getElementById('bgMusic');
     
     
     if (bootOverlay && bgMusic) {
         typeBootSequence().then(() => {
             // Now allow user to click after typing is done
             bootOverlay.addEventListener('click', () => {
                 // Start music
                 bgMusic.volume = 0.5;
                 bgMusic.play().catch(error => {
                     console.error('Error playing audio:', error);
                 });
     
                 // Fade out overlay
                 bootOverlay.style.opacity = '0';
                 setTimeout(() => {
                     bootOverlay.style.display = 'none';
                 }, 500);
     
                 // Initialize everything else
                 initializeContent();
                 createMatrixRain();
                 addGlitchEffect();
                 addScreenDistortion();
                 addTerminalGlitch();
     
                 const tableRows = document.querySelectorAll('#data-table tr');
                 tableRows.forEach(row => {
                     row.addEventListener('mouseenter', () => {
                         row.style.transform = 'scale(1.02)';
                         row.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
                     });
     
                     row.addEventListener('mouseleave', () => {
                         row.style.transform = 'scale(1)';
                         row.style.boxShadow = 'none';
                     });
                 });
             });
         });
     }
     
 });
