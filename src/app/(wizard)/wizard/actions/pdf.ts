import { promises as fs } from 'node:fs'
import fsNormal from 'node:fs'
import path from 'node:path'
import {
    constructURL,
    merge,
} from "google-fonts-helper";
import https from 'node:https'
import redisClient from '@/utils/redisClient';
import { chatModel } from '@/ai/openai';


type Data = {
    executiveSummary: string,
    profileOverview: string,
    bradningGoal: string,
    contentStrategy: string,
    skillDevelopmentPlan: string,
    industryInsights: string,
    actionPlan: string,
    networkingEngagement: string,
    assessmentAndRecommendations: string,
    brandColor: any,
    brandFont: any
}


const genFontFamily = (font: string) => {
    return font ? `"${font}", serif` : 'serif';
}
export const generatePdf = async (name: string, data: Data, jobId: string) => {
    console.log(data.brandColor)
    console.log(data.brandFont)
    let html = await fs.readFile(path.join(process.cwd(), 'html', 'brand.html'), 'utf-8')
    const temp = await fs.readFile(path.join(process.cwd(), 'html', 'content.html'), 'utf-8')
    let htmlWithValues = temp.replaceAll('{{name}}', name)
    const fontUrl = constructURL({
        families: {
          'Mea Culpa': {
            wght: [400],
            ital: [400],
          },
          [data.brandFont.font]: {
            wght: [400, 700],
          },
        },
      })
    for (const [key, value] of Object.entries(data)) {
        htmlWithValues = htmlWithValues.replace(`{{${key}}}`, value)
    }

    html = html.replace('{{importFont}}', fontUrl || '')
    html = html.replace('{{fontFamily}}', genFontFamily(data.brandFont.font))

    htmlWithValues = htmlWithValues.replace('{{primaryColor}}', data.brandColor.primaryColor)
    htmlWithValues = htmlWithValues.replace('{{secondaryColor}}', data.brandColor.secondaryColor)
    const accents = data.brandColor.accentColors.map((color: any) => `<span class="w-16 h-16 block rounded-full" style="background-color: ${color};"></span>`).join('')
    htmlWithValues = htmlWithValues.replace('{{accents}}', accents)
    htmlWithValues = htmlWithValues.replace('{{colorPaletteReason}}', data.brandColor.reason)
    htmlWithValues = htmlWithValues.replace('{{typographyReason}}', data.brandFont.reason)
    htmlWithValues = htmlWithValues.replace('{{date}}', new Date().toLocaleDateString())
    console.log(htmlWithValues)
    const res = await chatModel.invoke(`${htmlWithValues}
        look for the content in the html and and refine the content to make it more professional and polished for the branding document.
        Don't change the strute or play with html tags. just refine the content.
        if content is repeating then remove those. Remove the repeating things like name: , etc. Its must look professional and polished.
        Do not hallucinate. Do not make up factual information.
        If you found any markdown. convert it to html.
        Remove unneccesary things like ###, ###, etc.
        Remove unnecessary things headings.
        Remove nesting of same headings
        `)
        const refinedContent = typeof res.content === 'string' ? res.content : '';

    html = html.replace('{{body}}', refinedContent)

    const url = 'https://v2.api2pdf.com/chrome/pdf/html';

    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'f351a0a8-699b-4e0d-93ea-346f562cb428'
    },
    body: JSON.stringify({
        Html: html,
        Options: {
            Width: "16in",
            Height: "40in"
        }
    })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(file => {
            https.get(file.FileUrl, (res) => {
                console.log(file.FileUrl)
                const final = path.join(process.cwd(), 'result', `${jobId}.pdf`)
                const filePath = fsNormal.createWriteStream(final)
                res.pipe(filePath);
                filePath.on('finish', () => {
                    redisClient.set(`result-${jobId}`, 'done', "EX", 60*30)
                    filePath.close();
                })
            })
        })

    await fs.writeFile(path.join(process.cwd(), 'result', `${jobId}.html`), html)


}
