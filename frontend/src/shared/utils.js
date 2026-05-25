const utils=(function(){
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
        deKebab
    }
})()
export default utils