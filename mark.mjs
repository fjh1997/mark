import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: false, userDataDir: './my-user-data' , defaultViewport: null});
const page = await browser.newPage();
// Navigate the page to a URL.
await page.goto('https://mooc2-ans.chaoxing.com/mooc2-ans/exam/test/markpaper?courseid=241341550&gid=0&classid=106186411&groupid=-1&paperId=409998715&id=146276062&start=0&checkHiddenTitle=0&checkHiddenAnswer=0&checkSubjectAnswerWordNum=0&checkHiddenObjectQuestion=1&sheet=0&groupIds=');
const processPage = async (page) => {
await page.setViewport({width: 1080, height: 1024});
await page.waitForSelector('#index_1 > div > div:nth-child(1) > div > div.mark_answer.topicStudentAnswer > div.mark_score > div.totalScore.fl > input')

for (let i = 1; i <= 9; i++) {
    const scoreSelector=await page.locator('#index_'+i.toString()+' > div > div:nth-child(1) > div > div.mark_answer.topicStudentAnswer > div.mark_score > div.totalScore.fl > input').waitHandle();
    const value=await scoreSelector?.evaluate(el => el.value);
    console.log(value)
    if(value==2){
    console.log("满分");
    await page.locator("#index_"+i.toString()+" > div > div:nth-child(2) > div.commentArea.fr > div:nth-child(3) > ul > li.fastScore").click();
    
    }  
    if(value==0){
        console.log("不满分");
        await page.locator("#index_"+i.toString()+" > div > div:nth-child(2) > div.commentArea.fr > div.clearfix.com_markDiv > div > input").fill('0');
        
        }  


}
await page.locator("#index_10 > div.clearfix.topicArea_commentArea > div.commentArea.fr > div:nth-child(3) > ul > li:nth-child(1)").click();


await page.setViewport({
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
  });
await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
processPage(page)

}
await processPage(page);
