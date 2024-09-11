

document.getElementById('merge-button').addEventListener('click', function() {
    const files = document.getElementById('pdf-files').files;
    
    if (files.length === 0) {
        alert('Please select PDF files to merge.');
        return;
    }

    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('progress-section').classList.remove('hidden');

    mergeFiles(files).then(cha => {
        document.getElementById('progress-section').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');

        console.log(cha.url)
        window.open(cha.url)



        // console.log(blob);
    });
});


function mergeFiles(files){
    return new Promise((resolve) => {

        const formData = new FormData()
        
        for(let i = 0; i< files.length; i++){
            formData.append('pdfs',files[i])
        }

        request = new Request("/merge",{
            method: 'POST',
            body: formData
        })

        fetch(request).then(res=>{
            
            
            resolve(res)
        })
            
            
    })
}