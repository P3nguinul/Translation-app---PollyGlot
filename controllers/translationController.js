    import {GoogleGenerativeAI } from '@google/generative-ai'
    import dotenv from 'dotenv'

    dotenv.config()

    const genAI =  new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest'})

    export async function translate ( req, res) {
        
        const { language, text } = req.body

        try { 

            const result  = await  model.generateContent(`Translate the following sentence into ${language}. Only provide the translated text, nothing else. "${text}"`)
            const response = await result.response
            const translatedText = response.text()
            
            res.json({TranslatedText: translatedText})

        } catch (err) {

            console.log('There has been an error: ', err)
            res.status(500).json({error: 'Translation failed!'})
        }

        }
        
