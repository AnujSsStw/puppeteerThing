
// const puppeteer = require('puppeteer')
import puppeteer from 'puppeteer';
// import { storage } from '/Usenirs/zzzZ/Desktop/ne/firebase'
// const fs = require('fs/promises')
// import * as fs from 'fs/promises'
// import { storage } from './firebase';
// import { uplodad } from './firebase'



import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { getFirestore, collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCz7bQHB_QnBLwtl1fPPPu7BonKQx45UWQ",
    authDomain: "newarchive-1804f.firebaseapp.com",
    projectId: "newarchive-1804f",
    storageBucket: "newarchive-1804f.appspot.com",
    messagingSenderId: "1044080316873",
    appId: "1:1044080316873:web:86a6316a0c6abff0351818",
    measurementId: "G-5BSDE1R0F1"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app)



const today = new Date();


async function Start() {


    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://anujssstw.github.io/Static-page/') //replace the link from which you wanna extract the text and img
    // await page.screenshot({ path: 'i.png' })

    const data = await page.evaluate(() => {
        const image = document.querySelectorAll('body > div > section > div:nth-child(1) > div > img')
        const url = Array.from(image).map(x => x.src)

        return url;
    })

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('body > div > section > div:nth-child(1) > div > h1') // selector which you wanna scrape the text
        ).map(x => x.textContent)

    })




    await browser.close();

    console.log(data)

    // getDocs(dbRef).then((snapshot) => {
    //     let booksarr = []
    //     snapshot.docs.forEach((doc) => {
    //         booksarr.push({ ...doc.data() })
    //     })
    //     console.log(booksarr)
    // })


    const reffff = doc(db, "news", `${today.toDateString()}`)
    const docSnap = await getDoc(reffff);
    // console.log(docSnap)

    if (docSnap.exists()) {
        const dbRef = doc(db, 'news', `${today.toDateString()}`)
        await updateDoc(dbRef, {
            CNN: arrayUnion({
                img: `${data[0]}`,
                headline: `${headline[0]}`
            })

        })
    } else {
        await setDoc(doc(db, 'news', `${today.toDateString()}`), {
            CNN: arrayUnion({
                img: `${data[0]}`,
                headline: `${headline[0]}`
            })

        })
    }




    // if (dbcurrentRef === dbcurrentRef) {
    //     const dbRef = doc(db, 'news', `${today.toDateString()}`)
    //     await updateDoc(dbRef, {
    //         img: arrayUnion("new images")
    //     })
    // } else {
    //     await setDoc(doc(db, 'news', `${today.toDateString()}`, 'CNN'), {
    //         img: `${data[0]}`
    //     })
    // }









    // const message = data[0];
    // const imageRef = ref(storage, `/${today.toDateString()}/`)
    // await uploadString(imageRef, message).then((snapshot) => {
    //     console.log('Uploaded a raw string!');
    // });
    // await getDownloadURL(imageRef).then(url => console.log(url))
    return data;


}


Start();
