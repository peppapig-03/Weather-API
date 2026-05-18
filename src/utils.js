const utils=(function(){
    function httpRequestMaker(inputPhrase){
        const httpPhrase=inputPhrase.split(" ").join("%20")
        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${httpPhrase}/?unitGroup=metric&key=DG3J54RLAVLUM2EPNYU2DDP68&contentType=json`
    }
    function synthesiseAddress(inputPhrase){
        if (inputPhrase.toUpperCase()==inputPhrase.toLowerCase()){
           return inputPhrase
        } else {
           const comma=inputPhrase.search(",")
            if (comma==-1){
                return inputPhrase
            } else{
                return inputPhrase.slice(0,comma)
            }
        }    
    }
    function deKebab(inputWord){
        let capitals=[0]
        for(let index=1;index<inputWord.length;index++){
            const letter=inputWord[index]
            if (letter.toUpperCase()==letter){
                capitals.push(index)
            }
        }
        capitals.push(inputWord.length)
        inputWord=`${inputWord[0].toUpperCase()}${inputWord.slice(1,inputWord.length)}`
        if (capitals.length==2){
            return inputWord
        } else{
            let finalWord=""
            for(let rightindex=1;rightindex<capitals.length;rightindex++){
                let right=capitals[rightindex]
                let left=capitals[rightindex-1]
                const currentWord=inputWord.slice(left,right)
                finalWord=`${finalWord} ${currentWord}`
            }
            return finalWord.slice(1,finalWord.length)
        }
    }
    return {
        httpRequestMaker,
        synthesiseAddress,
        deKebab
    }
})()
export default utils